"use client";

import { useCart } from "@/context/cart/useCart";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import SectionHeading from "../Typography/SectionHeading";
import Colors from "./Colors";
import Sizes from "./Sizes";

const ProductsDetails = ({ product }) => {
  const { addToCart } = useCart();
  const [size, setSize] = useState(product?.sizes?.[0] || null);
  const [color, setColor] = useState(product?.productInfo?.[0] || null);
  const [isValidProduct, setIsValidProduct] = useState(true);

  const isColorExistOfSize = (sizes) => {
    if (!size) return true;

    const selectedSize = size?.name?.toLowerCase();
    const isValid = sizes[selectedSize] > 0 ? true : false;
    // setIsValidProduct(isValid);
    return sizes[selectedSize] > 0 ? true : false;
  };

  const handleSelectSize = (s) => {
    setSize(s);
    setColor(null);
  };

  const handleSelectColor = (color) => {
    if (isColorExistOfSize(color?.colorSizeWiseQuantity)) setColor(color);
    else
      enqueueSnackbar("This color product is not exists!", {
        variant: "error",
      });
  };

  const handleAddToCart = () => {
    if (!size) {
      enqueueSnackbar("Please select a size to add to your cart!", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }

    if (!color) {
      enqueueSnackbar("Please select a color to add to your cart.", {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
    if (size && color) {
      addToCart({
        title: product?.title,
        productId: product?.id,
        size,
        color,
        image:
          product?.images?.[0]?.imageUrl || "/images/product-placeholder.jpg",
        sellPrice: product?.sellPrice,
        discount: product?.discount,
      });
      setSize(null);
      setColor(null);
    }
  };

  // Calculate discounted price
  const discount = parseFloat(product?.discount || 0);
  const sellPrice = parseFloat(product?.sellPrice || 0);
  const discountedPrice =
    discount > 0 ? sellPrice - (sellPrice * discount) / 100 : sellPrice;

  return (
    <div className="container mb-7">
      <div className="flex flex-col md:flex-row gap-8 md:gap-7 lg:gap-16">
        <div className="flex md:w-1/2 gap-4 lg:gap-8">
          <div className="hidden w-[75px] sm:flex flex-col justify-center gap-6">
            {/* image section  */}
            <div className="flex flex-col justify-center gap-5">
              {product?.images?.map((image) => {
                return (
                  <div
                    className="border border-[#3C4242] rounded-md p-1 h-[75px]"
                    key={image.id}
                  >
                    <Image
                      className="rounded-md"
                      src={image.imageUrl}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "100%" }}
                      alt="image"
                    />
                  </div>
                );
              })}
            </div>
            {/* arrow button secton  */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center items-center w-[25px] h-[25px] rounded-full bg-[#F6F6F6]">
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.20265 5.31582C7.94441 5.51271 7.57546 5.46298 7.37857 5.20474L4.44464 1.35664C4.37159 1.30828 4.26495 1.30828 4.1919 1.35664L1.25797 5.20474C1.06108 5.46298 0.692129 5.51271 0.433893 5.31582C0.175656 5.11894 0.125924 4.74999 0.322812 4.49175L3.26687 0.630362C3.30122 0.585302 3.35321 0.52294 3.42523 0.463271C3.93832 0.0381217 4.69821 0.0381217 5.21131 0.463271C5.28332 0.52294 5.33532 0.585302 5.36967 0.630362L8.31373 4.49175C8.51061 4.74999 8.46088 5.11894 8.20265 5.31582Z"
                    fill="#3C4242"
                  />
                </svg>
              </div>
              <div className="flex justify-center items-center w-[25px] h-[25px] rounded-full bg-[#3C4242]">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.19871 0.600008C1.45694 0.403119 1.82589 0.452851 2.02278 0.711088L4.95671 4.5592C5.02976 4.60755 5.13641 4.60755 5.20945 4.5592L8.14338 0.711088C8.34027 0.452851 8.70922 0.403119 8.96746 0.600008C9.2257 0.796896 9.27543 1.16585 9.07854 1.42408L6.13449 5.28547C6.10013 5.33053 6.04814 5.39289 5.97612 5.45256C5.46303 5.87771 4.70314 5.87771 4.19004 5.45256C4.11803 5.39289 4.06604 5.33053 4.03168 5.28547L1.08763 1.42408C0.890738 1.16585 0.94047 0.796896 1.19871 0.600008Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[calc(100%-75px)] h-[70vh] md:h-full">
            <Image
              src={
                product?.images?.[0]?.imageUrl ||
                "/images/product-placeholder.jpg"
              }
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
              alt="image"
            />
          </div>
        </div>
        <div className="flex flex-col md:w-1/2 space-y-[15px] lg:space-y-[30px]">
          {/* <ol className="hidden list-reset md:flex font-causten-medium text-[1rem] md:text-[1.125rem] space-x-1 md:space-x-3 mt-2">
            <li>
              <a href="#" className="transition duration-150 ease-in-out">
                cool
              </a>
            </li>
            <li>
              <span className=""> / </span>
            </li>
            <li className="">colorful</li>
            <li>
              <span className=""> / </span>
            </li>
            <li className="">comfy</li>
          </ol> */}

          <h2 className="font-core-sans-bold text-[1.125rem] lg:text-[2.125rem] text-[#3C4242] mt-3">
            {product?.title}
          </h2>
          {/* ratting  */}
          {/* <Ratting /> */}
          {/* size start  */}
          <Sizes
            sizes={product?.sizes}
            onHandleSelectSize={handleSelectSize}
            size={size}
          />
          {/* size end */}

          {/* color start  */}
          <Colors
            colors={product?.productInfo}
            onHandleColor={handleSelectColor}
            color={color}
            isColorExistOfSize={isColorExistOfSize}
          />
          {/* color end  */}
          <div className="flex gap-6 items-center">
            <button
              onClick={handleAddToCart}
              className="font-causten-semi-bold text-[1.125rem] text-white bg-primary flex items-center gap-2 py-3 px-5 lg:px-10 rounded-lg disabled:bg-primary"
              // disabled={size === null || color === null}
            >
              <Image
                src={"/images/icon/white-shopping.svg"}
                width={15}
                height={15}
                alt="cart icon"
              />
              <span className="font-causten-semi-bold text-[1.125rem] text-white">
                Add to Cart
              </span>
            </button>
            <div className="flex flex-col">
              {discount > 0 ? (
                <div className="flex items-center space-x-2">
                  <p className="font-causten-bold text-sm text-red-500 line-through">
                    {sellPrice.toFixed(2)} TK
                  </p>
                  <p className="font-causten-bold text-sm text-green-500">
                    {discountedPrice.toFixed(2)} TK
                  </p>
                </div>
              ) : (
                <p className="font-causten-bold text-sm text-[#3C4242]">
                  {sellPrice.toFixed(2)} TK
                </p>
              )}
            </div>
          </div>

          <div className="hidden divider"></div>
          {/* <div className=" grid grid-cols-2 gap-y-5">
            <div className="flex items-center gap-[15px]">
              <div className="flex items-center justify-center w-[44px] h-[44px] bg-[#F6F6F6] rounded-full">
                <FaRegCreditCard size={18} />
              </div>
              <h4 className="font-causten-medium text-[1.125rem] text-[#3C4242] font-medium">
                Secure payment
              </h4>
            </div>
            <div className="flex items-center gap-[15px]">
              <div className="flex items-center justify-center w-[44px] h-[44px] bg-[#F6F6F6] rounded-full">
                <FaShirt size={18} />
              </div>
              <h4 className="font-causten-medium text-[1.125rem] text-[#3C4242] font-medium">
                Size & Fit
              </h4>
            </div>
            <div className="flex items-center gap-[15px]">
              <div className="flex items-center justify-center w-[44px] h-[44px] bg-[#F6F6F6] rounded-full">
                <FaCarSide size={18} />
              </div>
              <h4 className="font-causten-medium text-[1.125rem] text-[#3C4242] font-medium">
                Free shipping
              </h4>
            </div>
            <div className="flex items-center gap-[15px]">
              <div className="flex items-center justify-center w-[44px] h-[44px] bg-[#F6F6F6] rounded-full">
                <FaRepeat size={18} />
              </div>
              <h4 className="font-causten-medium text-[1.125rem] text-[#3C4242] font-medium">
                Free Shipping & Returns
              </h4>
            </div>
          </div> */}
        </div>
      </div>
      <div className="mt-10 lg:mt-20">
        <SectionHeading text="Product Description" />
        <p className="text-[#807D7E] text-base font-causten-regular mt-7">
          {product?.description}
        </p>
      </div>
    </div>
  );
};

export default ProductsDetails;
