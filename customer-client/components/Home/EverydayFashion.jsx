import Link from "next/link";

const EverydayFashion = () => {
  return (
    <div className="container section-space mb-8">
      <div className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2 gap-4 sm:gap-0">
        <div className="w-full bg-[url(/images/everyday-fashion.png)] rounded-md bg-cover bg-no-repeat text-white px-5 lg:px-14 py-7 lg:py-44 space-y-4 sm:space-y-6 sm:rounded-r-none">
          <h2 className="font-coresans-extra-bold text-[1.5rem] sm:text-[2.125rem]">
            WE MADE YOUR EVERYDAY FASHION BETTER!
          </h2>
          <p className="font-causten-light text-xl">
            In our journey to improve everyday fashion, euphoria presents
            EVERYDAY wear range - Comfortable & Affordable fashion 24/7
          </p>
          <Link
            href={"/products"}
            className="t-btn text-[1.125rem] text-secondary bg-white inline-block"
          >
            Shop Now
          </Link>
        </div>
        <div className="w-full bg-[url(/images/everyday-fashion-2.png)] bg-cover bg-no-repeat rounded-md sm:rounded-l-none"></div>
      </div>
    </div>
  );
};

export default EverydayFashion;
