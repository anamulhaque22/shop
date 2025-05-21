import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../Typography/SectionHeading";

const Cagegories = ({ cagegoryFor, cagegories }) => {
  return (
    <div className="container section-space">
      <SectionHeading text={cagegoryFor}></SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-8 sm:mt-12 gap-6 md:gap-8 lg:gap-12">
        <div>
          <div>
            <Image
              src={"/images/categoryImage.png"}
              alt={"cagegory-1"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="mr-2 overflow-hidden">
              <h3 className="font-causten-bold text-[1.125rem]">
                <Link href={"/"} className="block truncate">
                  Hoodies & Sweetshirt fsdfasd
                </Link>
              </h3>
              <span className="font-causten-medium text-sm">Explore Now!</span>
            </div>
            <Image
              src={"/images/icon/arrow/right.svg"}
              width={30}
              height={20}
              alt="arrow right"
            />
          </div>
        </div>
        <div>
          <div>
            <Image
              src={"/images/categoryImage.png"}
              alt={"cagegory-1"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="mr-2 overflow-hidden">
              <h3 className="font-causten-bold text-[1.125rem]">
                <Link href={"/"} className="block truncate">
                  Hoodies & Sweetshirt fsdfasd
                </Link>
              </h3>
              <span className="font-causten-medium text-sm">Explore Now!</span>
            </div>
            <Image
              src={"/images/icon/arrow/right.svg"}
              width={30}
              height={20}
              alt="arrow right"
            />
          </div>
        </div>
        <div>
          <div>
            <Image
              src={"/images/categoryImage.png"}
              alt={"cagegory-1"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="mr-2 overflow-hidden">
              <h3 className="font-causten-bold text-[1.125rem]">
                <Link href={"/"} className="block truncate">
                  Hoodies & Sweetshirt fsdfasd
                </Link>
              </h3>
              <span className="font-causten-medium text-sm">Explore Now!</span>
            </div>
            <Image
              src={"/images/icon/arrow/right.svg"}
              width={30}
              height={20}
              alt="arrow right"
            />
          </div>
        </div>
        <div>
          <div>
            <Image
              src={"/images/categoryImage.png"}
              alt={"cagegory-1"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="mr-2 overflow-hidden">
              <h3 className="font-causten-bold text-[1.125rem]">
                <Link href={"/"} className="block truncate">
                  Hoodies & Sweetshirt fsdfasd
                </Link>
              </h3>
              <span className="font-causten-medium text-sm">Explore Now!</span>
            </div>
            <Image
              src={"/images/icon/arrow/right.svg"}
              width={30}
              height={20}
              alt="arrow right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cagegories;
