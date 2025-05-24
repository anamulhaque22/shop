"use client";
import { useWishlist } from "@/context/wish-list/use-wish-list";
import useToast from "@/hooks/useToast";
import useAuth from "@/services/auth/use-auth";
import Image from "next/image";
import Link from "next/link";

const Product = ({ productCategory, product }) => {
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const showToast = useToast();

  const handleToggeWishlist = (product) => {
    if (!user) {
      showToast("Please login to add to wishlist", "error");
      return;
    }
    toggleWishlist(product);
  };

  // Calculate discounted price
  const discount = parseFloat(product?.discount || 0);
  const sellPrice = parseFloat(product?.sellPrice || 0);
  const discountedPrice =
    discount > 0 ? sellPrice - (sellPrice * discount) / 100 : sellPrice;

  return (
    <div className="border  p-3 rounded-md">
      <div className="relative rounded-md">
        <Link
          href={`/products/details/${product?.id}`}
          className="truncate text-base font-causten-semi-bold text-secondary"
        >
          <Image
            src={
              product?.images?.[0]?.imageUrl ??
              "/images/product-placeholder.jpg"
            }
            width={0}
            height={0}
            sizes="100vw"
            className="w-full sm:h-80"
            alt="product"
            priority={true}
          />
        </Link>
        {/* <div className="w-[32px] h-[32px] flex justify-center bg-white absolute top-5 right-4 rounded-full">
          <button onClick={() => handleToggeWishlist(product)}>
            {isInWishlist(product?.id) ? (
              <IoIosHeart size={20} color="#FF0000" />
            ) : (
              <CiHeart size={20} color="#000" />
            )}
          </button>
        </div> */}
      </div>
      <div className="flex flex-col justify-between items-center mt-7 space-y-2">
        <Link
          href={`/products/details/${product?.id}`}
          className="text-base text-center font-causten-semi-bold text-secondary"
        >
          {product?.title}
        </Link>
        {/* <p className="text-sm font-causten-medium text-gray-500">
            AS{"'"}s Brand
          </p> */}

        {/* <div>
          <p className="font-causten-bold text-sm inline-block bg-off-white-light py-2 px-4 rounded-md">
            {product?.sellPrice} TK
          </p>
        </div> */}

        <div className="text-center">
          {discount > 0 ? (
            <div className="flex flex-col items-center space-x-2">
              <p className="font-causten-bold text-xs md:text-sm  rounded-md text-red-400 line-through">
                {sellPrice.toFixed(2)} TK
              </p>
              <p className="font-causten-bold text-xs md:text-sm  p-2 md:py-2 md:px-4 rounded-md text-re">
                {discountedPrice.toFixed(2)} TK
              </p>
            </div>
          ) : (
            <p className="font-causten-bold md:text-sm rounded-md">
              {sellPrice.toFixed(2)} TK
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
