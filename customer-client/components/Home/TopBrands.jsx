import Image from "next/image";
import Link from "next/link";

const TopBrands = () => {
  return (
    <div className="container section-sapce mt-10 sm:mt-16 lg:mt-24">
      <div className="bg-secondary rounded-md py-10 lg:px-28 text-white space-y-5 md:space-y-7 flex items-center flex-col text-center">
        <h2 className="font-coresans-extra-bold text-2xl md:text-5xl">
          Top Brands Deal
        </h2>
        <p className="font-core-sans-medium text-xl font-normal">
          Up to <span className="text-[#FBD103] font-bold">60%</span> off on
          brands
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 content-center gap-3  px-5">
          <Link href="/" className="">
            <Image
              src={"/images/brand.png"}
              alt={"brand-1"}
              width={177}
              height={85}
            />
          </Link>
          <Link href="/" className="">
            <Image
              src={"/images/brand.png"}
              alt={"brand-1"}
              width={177}
              height={85}
            />
          </Link>
          <Link href="/" className="">
            <Image
              src={"/images/brand.png"}
              alt={"brand-1"}
              width={177}
              height={85}
            />
          </Link>
          <Link href="/" className="">
            <Image
              src={"/images/brand.png"}
              alt={"brand-1"}
              width={177}
              height={85}
            />
          </Link>
          <Link href="/" className="">
            <Image
              src={"/images/brand.png"}
              alt={"brand-1"}
              width={177}
              height={85}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBrands;
