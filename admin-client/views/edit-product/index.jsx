"use client";
import CategoryInput from "@/components/AddProduct/CategoryInput";
import ColorPickerFromImage from "@/components/AddProduct/ColorPickerFromImage";
import SizesInput from "@/components/AddProduct/SizesInput";
import TagsInput from "@/components/AddProduct/TagsInput";
import InputError from "@/components/Input/InputError";
import InputText from "@/components/Input/InputText";
import { ProductVisibility } from "@/constants";
import useToast from "@/hooks/useToast";
import {
  useGetProductService,
  useUpdateProductService,
  useUploadProductImagesService,
} from "@/services/api/services/product";
import HTTP_CODES from "@/services/api/types/http-codes";
import withPageRequiredAuth from "@/services/auth/page-with-required-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  buyPrice: yup.number().required("Buy Price is required"),
  sellPrice: yup.number().required("Sell Price is required"),
  category: yup.object().shape({
    id: yup.string().required("Category is required"),
  }),
  tags: yup.array().of(yup.string()),
  quantity: yup.number().required("Quantity is required"),
  discount: yup.number().required("Discount is required"),
  sizes: yup.array().min(1, "Please select at least one size"),
  visibility: yup.string().required("Visibility is required"),
  productInfo: yup
    .array()
    .min(1, "Please upload one image")
    .of(
      yup.object().shape({
        id: yup.number().optional(),
        color: yup.string().required("Click on image to pick color"),
        colorWiseQuantity: yup
          .number()
          .required("Color Wise Quantity is required"),
        colorSizeWiseQuantity: yup
          .object()
          .test(
            "sizes-exist",
            "All sizes must exist in colorSizeWiseQuantity",
            (value, context) => {
              const sizes = context.parent.sizes || [];
              if (!value || typeof value !== "object") return false;
              return sizes.every((size) => Object.keys(value).includes(size));
            }
          ),
        colorName: yup.string().required("Color Name is required"),
        image: yup.mixed().optional(),
      })
    ),
});

function keysToLowercase(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
  );
}

const EditProduct = () => {
  const params = useParams();
  const fetchProduct = useGetProductService();
  const router = useRouter();
  const fetchUploadImages = useUploadProductImagesService();
  const fetchUpdateProduct = useUpdateProductService();
  const showToast = useToast();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      buyPrice: null,
      sellPrice: null,
      category: null,
      tags: [],
      quantity: null,
      discount: null,
      sizes: [], //array of sizes. [{id: 1, name: xs}]
      visibility: ProductVisibility.HIDDEN,
      productInfo: [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors },
  } = methods;

  const sizes = methods.watch("sizes");

  const onSubmit = handleSubmit(async (formData) => {
    // validate quantity and size wise quantity
    const invalidProductInfo = formData.productInfo.find((info) => {
      const sizeWiseQuantity = Object.values(info.colorSizeWiseQuantity);
      const totalSizeWiseQuantity = sizeWiseQuantity.reduce(
        (acc, qty) => acc + qty,
        0
      );

      return info.colorWiseQuantity < totalSizeWiseQuantity;
    });

    if (invalidProductInfo) {
      showToast(
        "Color wise quantity must be greater than or equal to total size wise quantity",
        "error"
      );
      return;
    }

    const productImages = formData.productInfo.filter(
      (info) => info.image && info.image instanceof File
    );

    // upload images
    let imgResData = null;
    if (productImages.length !== 0) {
      const imageData = new FormData();
      productImages.forEach((img) => {
        imageData.append("images", img.image);
      });

      const { status, data: imageResData } = await fetchUploadImages(imageData);
      if (status !== HTTP_CODES.OK) {
        showToast("Failed to upload images", "error");
        return;
      }
      imgResData = imageResData;
    }

    // create product
    const productData = {
      ...formData,
      images: imgResData ? imgResData.map((img) => ({ id: img.id })) : null,
      sizes: formData.sizes.map((s) => ({
        id: s.id,
      })),
      category: {
        id: Number(formData.category.id),
      },
      productInfo: formData.productInfo.map((info) => ({
        colorCode: info.color,
        colorWiseQuantity: info.colorWiseQuantity,
        colorSizeWiseQuantity: info.colorSizeWiseQuantity,
        colorName: info.colorName,
      })),
    };

    const { status: createStatus, data: createData } = await fetchUpdateProduct(
      productId,
      productData
    );

    if (createStatus !== HTTP_CODES.OK) {
      showToast("Failed to udpate product", "error");
      return;
    }

    showToast("Product updated successfully", "success");
    reset();
    router.push("/products");
  });

  useEffect(() => {
    const product = async () => {
      try {
        const { data, status } = await fetchProduct(productId);
        if (status === HTTP_CODES.OK) {
          reset({
            title: data.title,
            description: data.description,
            buyPrice: data.buyPrice,
            sellPrice: data.sellPrice,
            category: data.category,
            tags: data?.tags,
            quantity: data.quantity,
            discount: data.discount,
            sizes: data.sizes,
            visibility: data.visibility,
            productInfo: data.productInfo.map((info) => ({
              id: info.id,
              color: info.colorCode,
              colorWiseQuantity: info.colorWiseQuantity,
              colorSizeWiseQuantity: keysToLowercase(
                info.colorSizeWiseQuantity
              ),
              colorName: info.colorName,
              // image: data?.images?.map((img) => ({
              //   id: img.id,
              //   imageUrl: img.imageUrl,
              // })),
            })),
          });
          setProduct(data);
        } else if (
          status === HTTP_CODES.NOT_FOUND ||
          status === HTTP_CODES.INTERNAL_SERVER_ERROR
        ) {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(true);
      }
    };
    product();
  }, [productId, fetchProduct]);

  return (
    <div className="pt-8 px-6">
      <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <div className="form-control w-full">
              <InputText
                name="title"
                type="text"
                containerStyle="mt-0"
                labelTitle="Product Title"
                placeholder="Product Title"
                inputStyle="h-10"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="description"
                className="label label-text text-text"
              >
                Product Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <textarea
                      {...field}
                      placeholder="Product Description"
                      rows={5}
                      cols={20}
                      className="py-2 input !h-auto text-text input-bordered w-full  focus:outline-1 focus:outline-offset-1 bg-secondary focus:bg-white dark:focus:bg-secondary"
                    ></textarea>
                    <InputError>
                      {fieldState.error ? fieldState.error.message : ""}
                    </InputError>
                  </>
                )}
              />
            </div>

            <div className="mt-4 flex items-center gap-x-7">
              <div className="form-control basis-1/2">
                <InputText
                  name="buyPrice"
                  type="number"
                  containerStyle="mt-0"
                  labelTitle="Buy Price"
                  placeholder="$ 0.00"
                  inputStyle="h-10"
                />
              </div>
              <div className="form-control basis-1/2">
                <InputText
                  name="sellPrice"
                  type="number"
                  containerStyle="mt-0"
                  labelTitle="Sell Price"
                  placeholder="$ 0.00"
                  inputStyle="h-10"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-x-7">
              <div className="basis-1/2">
                <InputText
                  name="discount"
                  type="number"
                  containerStyle="mt-0"
                  labelTitle="Discounts"
                  placeholder="0 %"
                  inputStyle="h-10"
                />
              </div>
              {/* quantity  */}
              <div className="form-control basis-1/2">
                <InputText
                  name="quantity"
                  type="number"
                  containerStyle="mt-0"
                  labelTitle="Quantity"
                  placeholder="Quantity"
                  inputStyle="h-10"
                />
              </div>
            </div>

            {/* size and category */}
            <div className="mt-4 grid grid-cols-2 it gap-x-7">
              <Controller
                name="sizes"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <SizesInput
                      {...field}
                      setValue={setValue}
                      getValues={getValues}
                    />
                    <InputError>
                      {fieldState.error ? fieldState.error.message : ""}
                    </InputError>
                  </div>
                )}
              />
              {/* <SizesInput sizes={sizes} handleSelectSize={handleSelectSize} /> */}
              <Controller
                name="category"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col w-full">
                    <CategoryInput
                      {...field}
                      setValue={setValue}
                      getValues={getValues}
                    />

                    <InputError>
                      {fieldState.error ? fieldState.error.message : ""}
                    </InputError>
                  </div>
                )}
              />
            </div>

            {/* Visivility and tags inputs */}
            <div className="mt-4 grid grid-cols-2 gap-x-7">
              <div className="basis-1/2 flex flex-col">
                <label htmlFor="price" className="label label-text text-text">
                  Visivility:
                </label>
                <Controller
                  name="visibility"
                  control={methods.control}
                  render={({ field }) => (
                    <select
                      className="text-text input-bordered border bg-secondary h-10 px-4 pr-8 rounded leading-tight focus:outline-1 focus:outline-offset-1 focus:bg-white dark:focus:bg-secondary"
                      {...field}
                      id="visibility"
                    >
                      {Object.entries(ProductVisibility).map(([key, value]) => (
                        <option key={key} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <Controller
                name="tags"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col w-full">
                    <TagsInput
                      tags={field.value}
                      onSetTags={(updatedTags) => field.onChange(updatedTags)}
                    />

                    <InputError>
                      {fieldState.error ? fieldState.error.message : ""}
                    </InputError>
                  </div>
                )}
              />
              {/* <TagsInput tags={tags} onSetTags={setTags} /> */}
            </div>

            <div className="mt-4">
              <Controller
                control={control}
                name="productInfo"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <ColorPickerFromImage
                        {...field}
                        productInfo={getValues("productInfo")}
                        setProductInfo={setValue}
                        sizes={getValues("sizes")}
                        errors={fieldState.error}
                      />
                      {fieldState.error && (
                        <InputError>{fieldState.error.message}</InputError>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div className="flex justify-end">
              <button className="btn btn-primary mt-4 !text-text" type="submit">
                Add Product
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default withPageRequiredAuth(EditProduct);
