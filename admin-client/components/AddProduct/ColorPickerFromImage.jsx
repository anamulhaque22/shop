import Image from "next/image";
import { useRef } from "react";
import InputError from "../Input/InputError";
import SizeWiseQuantity from "./SizeWiseQuantity";

const ColorPickerFromImage = ({
  productInfo,
  setProductInfo,
  sizes,
  name,
  errors,
}) => {
  const canvasRef = useRef([]);
  const imgRefs = useRef([]);
  const imgContainerRef = useRef();

  // uploading image
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Use e.target.files to access the file list
    if (!file) {
      console.error("No file selected.");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      const newImage = reader.result;
      setProductInfo(name, [
        ...productInfo,
        {
          image: file,
          color: "",
          colorWiseQuantity: null,
          colorSizeWiseQuantity: Object.fromEntries(
            sizes?.map((s) => [s.name, 0])
          ),
          previewImage: newImage,
        },
      ]); // setting image preview
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
    e.target.value = null;
  };

  // handle image load
  const handleImageLoad = (index) => {
    const canvas = canvasRef.current[index];
    const img = imgRefs.current[index];
    canvas.width = imgContainerRef.current.offsetWidth - 32;
    const ctxWidth = imgContainerRef.current.offsetWidth - 32;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, ctxWidth, img.height);
  };

  // handle click on image to pick color
  const handleClick = (e, index) => {
    // e is event
    const canvas = canvasRef.current[index];
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

    const updatedProductInfo = productInfo.map((info, i) => {
      if (i === index) {
        return {
          ...info,
          color,
        };
      }
      return info;
    });
    setProductInfo(name, updatedProductInfo);
  };

  // handle size wise quantity
  const handleSizeWiseQuantity = (e, index, size) => {
    const { value } = e.target;
    const updatedProductInfo = productInfo.map((info, i) => {
      if (i === index) {
        return {
          ...info,
          colorSizeWiseQuantity: {
            ...info.colorSizeWiseQuantity,
            [size?.name?.toLowerCase()]: Number(value),
          },
        };
      }
      return info;
    });
    setProductInfo(name, updatedProductInfo);
  };

  // delete image from product info
  const deleteImage = (index) => {
    const updatedProductInfo = productInfo.filter((_, i) => i !== index);
    setProductInfo(name, updatedProductInfo);
  };

  // handle color name
  const handleColorName = (e, index) => {
    const { value } = e.target;
    const updatedProductInfo = productInfo.map((info, i) => {
      if (i === index) {
        return {
          ...info,
          colorName: value,
        };
      }
      return info;
    });
    setProductInfo(name, updatedProductInfo);
  };

  const handleColorWiseQuantity = (e, index) => {
    const { value } = e.target;
    const updatedProductInfo = productInfo.map((info, i) => {
      if (i === index) {
        return {
          ...info,
          colorWiseQuantity: Number(value),
        };
      }
      return info;
    });
    setProductInfo(name, updatedProductInfo);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        // required={productInfo?.length === 0}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 mt-4">
        {productInfo.map((info, index) => (
          <div
            ref={imgContainerRef}
            className="border p-4 rounded-md flex flex-col items-center"
            key={index}
          >
            {/* image preview here */}
            {info?.previewImage && (
              <>
                <Image
                  ref={(el) => (imgRefs.current[index] = el)}
                  src={info ? info.previewImage : ""}
                  width={0}
                  height={200}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-[300px]"
                  alt="image"
                  style={{ display: "none" }}
                  onLoad={() => handleImageLoad(index)}
                />
                <canvas
                  ref={(el) => (canvasRef.current[index] = el)}
                  onClick={(e) => handleClick(e, index)}
                  style={{ cursor: "crosshair" }}
                />
              </>
            )}
            {/* product image and color wise product info  */}
            <div>
              <div className="mt-4 mb-4 flex flex-col gap-x-3">
                <div className="flex items-center">
                  <p className="text-sm">Click on IMAGE to pick Color:</p>
                  <div
                    style={{
                      backgroundColor: info.color,
                      width: "30px",
                      height: "30px",
                      margin: "5px",
                      border: "1px solid #fff",
                      borderRadius: "6px",
                    }}
                  ></div>
                </div>
                <InputError>
                  {errors?.[index]?.color?.message &&
                    errors[index]?.color?.message}
                </InputError>
              </div>

              <div className="flex flex-col gap-x-3 mb-3">
                <div className="flex">
                  <label htmlFor="color-name" className="text-sm">
                    Color Name:
                  </label>
                  <input
                    value={info?.colorName || ""}
                    type="text"
                    id="color-name"
                    className="bg-secondary w-full input input-bordered  h-8 focus:outline-1 focus:outline-offset-1"
                    onChange={(e) => handleColorName(e, index)}
                  />
                </div>

                <InputError>
                  {errors?.[index]?.colorName?.message &&
                    errors[index]?.colorName?.message}
                </InputError>
              </div>

              <div className="flex flex-col gap-x-3 mb-3">
                <div className="flex items-center">
                  <label htmlFor="color-wise-quantity" className="text-sm">
                    Color Wise Quantity:
                  </label>
                  <input
                    type="number"
                    value={info?.colorWiseQuantity || 0}
                    id="color-wise-quantity"
                    className="w-16 input  input-bordered  h-8 focus:outline-1 focus:outline-offset-1 bg-secondary"
                    onChange={(e) => handleColorWiseQuantity(e, index)}
                  />
                </div>

                <InputError>
                  {errors?.[index]?.colorWiseQuantity?.message &&
                    errors[index]?.colorWiseQuantity?.message}
                </InputError>
              </div>

              {sizes?.length > 0 && (
                <>
                  <SizeWiseQuantity
                    info={info}
                    onHandleSizeWiseQuantity={(e, size) =>
                      handleSizeWiseQuantity(e, index, size)
                    }
                    sizes={sizes}
                  />
                  <InputError>
                    {errors?.[index]?.colorSizeWiseQuantity?.message &&
                      errors[index]?.colorSizeWiseQuantity?.message}
                  </InputError>
                </>
              )}

              <div className="flex justify-center mt-3">
                <button
                  onClick={() => deleteImage(index)}
                  className="btn btn-primary btn-sm !text-text"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerFromImage;
