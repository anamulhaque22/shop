import Image from "next/image";
import Link from "next/link";

const EmptyWithList = () => {
  return (
    <div className="flex flex-col items-center custom-shadow py-14 px-5 rounded-lg gap-5">
      <div className="h-[170px] w-[170px] bg-[#F0F9F4] flex justify-center items-center rounded-full">
        <Image
          src="/images/empty-withlist.png"
          width={62}
          height={55}
          alt="heart"
        />
      </div>
      <div className="text-center mt-6">
        <h2 className="font-causten-bold text-[2.125rem]">
          Your wishlist is empty.
        </h2>
        <p className="font-causten-medium text-base">
          You don{"'"}t have any products in the wishlist yet. You will find a
          lot of interesting products on our Shop page.
        </p>
        <Link href="/products" className="btn mt-5">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyWithList;
