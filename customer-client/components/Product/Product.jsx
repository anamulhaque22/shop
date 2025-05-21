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
      <div className="flex justify-between items-center mt-7">
        <div className="overflow-hidden">
          <Link
            href={`/products/details/${product?.id}`}
            className="truncate text-base font-causten-semi-bold text-secondary"
          >
            {product?.title}
          </Link>
          {/* <p className="text-sm font-causten-medium text-gray-500">
            AS{"'"}s Brand
          </p> */}
        </div>
        <div>
          <p className="font-causten-bold text-sm inline-block bg-off-white-light py-2 px-4 rounded-md">
            {product?.sellPrice} TK
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
