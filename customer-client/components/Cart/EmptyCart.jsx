import Image from "next/image";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center custom-shadow py-14 px-5 rounded-lg gap-5">
      <div className="sm:w-[440px] sm:h-[327px]">
        <Image
          src="/images/empty-cart.png"
          width={447}
          height={327}
          alt="heart"
        />
      </div>
      <div className="text-center mt-6">
        <h2 className="font-causten-bold text-[2.125rem]">
          Your cart is empty and sad :{"("}
        </h2>
        <p className="font-causten-medium text-base">
          Add something to make it happy!
        </p>
        <Link href="/products" className="btn mt-5">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
