import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../Typography/SectionHeading";

const BigSavingZone = () => {
  return (
    <div className="container section-space">
      <SectionHeading text={"Big Saving Zone"}></SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-5 mt-8 sm:mt-12">
        <div className="sm:col-span-2 bg-[url(/images/saving-zone-1.png)] bg-cover text-white rounded-xl px-5 py-16">
          <h3 className="w-32 font-causten-bold text-[1.75rem]">
            Hawaiian Shirts
          </h3>
          <span className="font-causten-semi-bold text-sm">
            Dress up in summer vibe
          </span>
          <h4 className="font-causten-bold text-[1.13rem]">UPTO 50% OFF</h4>
          <div className="my-10 w-24  h-[20px]">
            <Image
              src={"/images/icon/white-arrow-down.png"}
              alt={"arrow down"}
              width={23}
              height={20}
              className="mx-auto"
            />
          </div>
          <Link href={"/"} className="t-btn">
            Shop Now
          </Link>
        </div>
        <div className="sm:col-span-2 bg-[url(/images/saving-zone-1.png)] bg-cover text-white rounded-xl px-5 py-16">
          <h3 className="w-32 font-causten-bold text-[1.75rem]">
            Hawaiian Shirts
          </h3>
          <span className="font-causten-semi-bold text-sm">
            Dress up in summer vibe
          </span>
          <h4 className="font-causten-bold text-[1.13rem]">UPTO 50% OFF</h4>
          <div className="my-10 w-24  h-[20px]">
            <Image
              src={"/images/icon/white-arrow-down.png"}
              alt={"arrow down"}
              width={23}
              height={20}
              className="mx-auto"
            />
          </div>
          <Link href={"/"} className="t-btn">
            Shop Now
          </Link>
        </div>
        <div className="sm:col-span-2 bg-[url(/images/saving-zone-1.png)] bg-cover bg-no-repeat text-white rounded-xl px-5 py-16">
          <h3 className="w-32 font-causten-bold text-[1.75rem]">
            Hawaiian Shirts
          </h3>
          <span className="font-causten-semi-bold text-sm">
            Dress up in summer vibe
          </span>
          <h4 className="font-causten-bold text-[1.13rem]">UPTO 50% OFF</h4>
          <div className="my-10 w-24  h-[20px]">
            <Image
              src={"/images/icon/white-arrow-down.png"}
              alt={"arrow down"}
              width={23}
              height={20}
              className="mx-auto"
            />
          </div>
          <Link href={"/"} className="t-btn">
            Shop Now
          </Link>
        </div>
        <div className="sm:col-span-3 bg-[url(/images/saving-zone-1.png)] bg-cover text-white rounded-xl px-5 py-16">
          <h3 className="w-32 font-causten-bold text-[1.75rem]">
            Hawaiian Shirts
          </h3>
          <span className="font-causten-semi-bold text-sm">
            Dress up in summer vibe
          </span>
          <h4 className="font-causten-bold text-[1.13rem]">UPTO 50% OFF</h4>
          <div className="my-10 w-24  h-[20px]">
            <Image
              src={"/images/icon/white-arrow-down.png"}
              alt={"arrow down"}
              width={23}
              height={20}
              className="mx-auto"
            />
          </div>
          <Link href={"/"} className="t-btn">
            Shop Now
          </Link>
        </div>
        <div className="sm:col-span-3 bg-[url(/images/saving-zone-1.png)] bg-cover text-white rounded-xl px-5 py-16">
          <h3 className="w-32 font-causten-bold text-[1.75rem]">
            Hawaiian Shirts
          </h3>
          <span className="font-causten-semi-bold text-sm">
            Dress up in summer vibe
          </span>
          <h4 className="font-causten-bold text-[1.13rem]">UPTO 50% OFF</h4>
          <div className="my-10 w-24  h-[20px]">
            <Image
              src={"/images/icon/white-arrow-down.png"}
              alt={"arrow down"}
              width={23}
              height={20}
              className="mx-auto"
            />
          </div>
          <Link href={"/"} className="t-btn">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BigSavingZone;
