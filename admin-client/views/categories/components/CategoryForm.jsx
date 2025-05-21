import CategoryInput from "@/components/AddProduct/CategoryInput";
import InputError from "@/components/Input/InputError";
import InputText from "@/components/Input/InputText";
import useToast from "@/hooks/useToast";
import {
  usePatchCategoryService,
  usePostCategoryService,
} from "@/services/api/services/categories";
import HTTP_CODES from "@/services/api/types/http-codes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  parentCategory: yup.object().optional().nullable().shape({
    id: yup.number().optional(),
  }),
  isVisibleInMenu: yup
    .boolean()
    .required("Category visibility in menu is required"),
});

export default function CategoryForm({
  handleSetCategory,
  editCategory,
  isEditMode,
}) {
  const fetchPostCategory = usePostCategoryService();
  const fetchPatchCategory = usePatchCategoryService(); // Assume you have this service for updating
  const showToast = useToast();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: editCategory?.name || "",
      parentCategory: editCategory?.parentCategory || null,
      isVisibleInMenu: editCategory?.isVisibleInMenu || false,
    },
  });

  const { handleSubmit, setError, setValue, reset } = methods;

  useEffect(() => {
    if (editCategory) {
      setValue("name", editCategory.name);
      setValue("parentCategory", editCategory.parentCategory || null);
      setValue("isVisibleInMenu", editCategory.isVisibleInMenu);
    }
  }, [editCategory, setValue]);

  const onSubmit = handleSubmit(async (formData) => {
    const { status, data } = isEditMode
      ? await fetchPatchCategory({
          id: editCategory.id,
          data: formData,
        })
      : await fetchPostCategory(formData);

    if (status === HTTP_CODES.UNPROCESSABLE_ENTITY) {
      Object.keys(data.errors).forEach((key) => {
        setError(key, {
          type: "manual",
          message: data.errors[key],
        });
      });
      return;
    }

    if (status === HTTP_CODES.CREATED || status === HTTP_CODES.OK) {
      handleSetCategory(data);
      reset();
      showToast(
        `Category ${isEditMode ? "updated" : "created"} successfully`,
        "success"
      );
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="w-full">
        <InputText
          type="text"
          name="name"
          placeholder={"Type here"}
          labelTitle="Name"
          containerStyle="mt-0 "
          inputStyle={"h-10"}
        />
        <Controller
          name="parentCategory"
          control={methods.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col w-full">
              <CategoryInput
                {...field}
                setValue={setValue}
                getValues={methods.getValues}
              />
              <InputError>
                {fieldState.error ? fieldState.error.message : ""}
              </InputError>
            </div>
          )}
        />

        <div className="form-control w-full">
          <label
            htmlFor="isVisibleInMenu"
            className="label font-causten-semi-bold text-base text-text"
          >
            Show in Menu
          </label>
          <Controller
            name="isVisibleInMenu"
            control={methods.control}
            defaultValue={false}
            render={({ field }) => (
              <select
                {...field}
                className="select select-bordered w-full focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary min-h-10 h-10"
              >
                <option value={true}>YES</option>
                <option value={false}>NO</option>
              </select>
            )}
          />
        </div>

        <div className="flex justify-start">
          <button className="btn btn-primary mt-4 !text-text" type="submit">
            {isEditMode ? "Update Category" : "Create Category"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
