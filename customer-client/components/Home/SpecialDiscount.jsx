import Image from "next/image";

const SpecialDiscount = () => {
  return (
    <div className="container section-space">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="lenier-bg-1 rounded-xl md:w-1/2 pl-7 py-16 text-white shadow-2xl relative z-10">
          <div className="z-30">
            <h5 className="text-lg font-causten-medium">Low Price</h5>
            <h3 className="text-[2rem] font-coresans-extra-bold pt-5">
              High Coziness
            </h3>
            <p className="pb-6 text-base font-core-sans-medium">UPTO 50% OFF</p>
            <a
              href="#"
              className="text-xl font-coresans-extra-bold underline underline-offset-1"
            >
              Explore Items
            </a>
          </div>
          <div className="absolute w-[50%] top-0 right-0 h-full -z-10">
            <Image
              src="/images/discount-imge-1.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
              }}
              alt="discount image"
            />
          </div>
        </div>
        <div className="lenier-bg-2 rounded-xl md:w-1/2 pl-7 py-16 text-white shadow-2xl relative z-10">
          <div className="z-30">
            <h5 className="text-lg font-causten-medium">Beyoung Presents</h5>
            <h3 className="text-[2rem] font-coresans-extra-bold pt-5 leading-[1.3]">
              Breezy Summer
              <br />
              Style
            </h3>
            <p className="pb-6 text-base font-core-sans-medium">UPTO 50% OFF</p>
            <a
              href="#"
              className="text-xl font-coresans-extra-bold underline underline-offset-[0.5px]"
            >
              Explore Items
            </a>
          </div>
          <div className="absolute w-[50%] top-0 right-0 h-full -z-10">
            <Image
              src="/images/discount-imge-1.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
              }}
              alt="discount image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialDiscount;
