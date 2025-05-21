import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="container py-20">
      <div className="flex flex-col justify-center items-center relative">
        <Image
          src="/images/404.png"
          alt="404"
          width={257}
          height={0}
          className="w-[181px] h-[257px]"
        />
        <div className="flex font-causten-bold text-[11rem] sm:text-[12rem] leading-[1] absolute">
          <span>4</span>
          <span className="text-white">0</span>
          <span className="rotate-[28deg] ml-3">4</span>
        </div>
      </div>

      <div className="text-center mt-6">
        <h2 className="font-causten-bold text-[2.125rem]">
          Oops! Page not found
        </h2>
        <p className="font-causten-medium text-base">
          The page you are looking for might have been removed or temporarily
          unavailable.
        </p>
        <Link href="/" className="btn mt-5">
          {" "}
          Back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
