import Image from "next/image";
import Link from "next/link";

const AuthLayoutNav = () => {
  return (
    <div className="border-b border-b-[#BEBCBD]">
      <div className="container flex justify-between items-center py-5 relative">
        <div>
          <a href="/">
            <Image
              src={"/images/logo.png"}
              height={100}
              width={100}
              alt="logo"
              priority={true}
            />
          </a>
        </div>
        <div className="relative hidden sm:flex items-center w-64">
          <label className="absolute my-auto  left-5">
            <Image
              src={"/images/icon/search.svg"}
              alt="search icon"
              width={20}
              height={20}
            />
          </label>
          <input
            className="bg-off-white-light font-causten-regular text-secondary-light w-full rounded-lg focus:outline-none pl-12 py-3 text-base"
            type="text"
            placeholder="Search"
          />
        </div>

        <div className="flex gap-x-2 sm:gap-x-7">
          <Link
            href={"/login"}
            className="bg-primary border border-primary font-causten-medium sm:text-lg rounded-lg px-6 py-2 sm:px-12 md:py-3 text-white"
          >
            Login
          </Link>
          <Link
            href={"/register"}
            className="bg-transparent border border-secondary font-causten-medium sm:text-lg rounded-lg px-6 py-2 sm:px-12 md:py-3 text-black"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutNav;
