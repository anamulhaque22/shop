import Image from "next/image";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const WishListItem = ({ wishList, toggleWishlist }) => {
  return (
    <div className="flex gap-x-5 items-center justify-between gap-4 custom-shadow p-4 rounded-md">
      <div className="flex items-center gap-x-4">
        <Image
          className="rounded-md"
          src={
            wishList?.product?.images?.[0]?.imageUrl ||
            "/images/product-placeholder.jpg"
          }
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "150px", height: "150px" }}
          alt="image"
        />
        <div>
          <Link
            href={`/products/details/${wishList?.product?.id}`}
            className="font-causten-bold text-lg text-[#3C4242]"
          >
            {wishList?.product?.title}
          </Link>
          <h4 className="font-causten-bold text-lg text-[#3C4242]">
            Price:{" "}
            <span className="text-[#807D7E]">
              ${wishList?.product?.sellPrice}
            </span>
          </h4>
        </div>
      </div>
      <div className="flex flex-col h-full justify-between py-1">
        <button
          className="text-[#807D7E]"
          onClick={() => toggleWishlist(wishList?.product)}
        >
          <MdDelete size={20} color="#000" />
        </button>

        <Link href={`products/details/${wishList?.product?.id}`} className="">
          <FaCartShopping color="#000" />
        </Link>
      </div>
    </div>
  );
};

export default WishListItem;
