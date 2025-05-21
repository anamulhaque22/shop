import Image from "next/image";

const AccountSummery = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      <div className="flex justify-between custom-shadow py-6 px-5 rounded-lg">
        <div>
          <p className="font-causten-bold text-2xl text-[#3C4242]">0</p>
          <p className="font-causten-medium text-base">Orders</p>
        </div>
        <Image
          src={"/images/order.png"}
          width={226}
          height={26}
          alt="image"
          className="w-[26px] h-[26px]"
        />
      </div>
      <div className="flex justify-between custom-shadow py-6 px-5 rounded-lg">
        <div>
          <p className="font-causten-bold text-2xl text-[#3C4242]">$0.00</p>
          <p className="font-causten-medium text-base">Amount In Wallet</p>
        </div>
        <Image
          src={"/images/wallet.png"}
          width={226}
          height={26}
          alt="image"
          className="w-[26px] h-[26px]"
        />
      </div>
      <div className="flex justify-between custom-shadow py-6 px-5 rounded-lg">
        <div>
          <p className="font-causten-bold text-2xl text-[#3C4242]">0</p>
          <p className="font-causten-medium text-base">Loyalty Points</p>
        </div>
        <Image
          src={"/images/loyaty-point.png"}
          width={226}
          height={26}
          alt="image"
          className="w-[26px] h-[26px]"
        />
      </div>
      <div className="flex justify-between custom-shadow py-6 px-5 rounded-lg">
        <div>
          <p className="font-causten-bold text-2xl text-[#3C4242]">0</p>
          <p className="font-causten-medium text-base">Products In Wishlist</p>
        </div>
        <Image
          src={"/images/icon/heart.svg"}
          width={0}
          height={0}
          alt="image"
          className="w-[26px] h-[26px] w-auto"
        />
      </div>
    </div>
  );
};

export default AccountSummery;
