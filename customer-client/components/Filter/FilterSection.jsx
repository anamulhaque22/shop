"use client";
import Image from "next/image";
import { useState } from "react";

const FilterSection = ({ title, icon, titleBorder, children }) => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <div
        className={`${
          titleBorder ? titleBorder : "border-y border-y-secondary-lighter"
        } ${show ? "" : " border-b-0"}`}
      >
        <div className="flex justify-between px-7 py-5">
          <h4 className="font-causten-semi-bold text-[1.375rem] text-secondary-light">
            {title}
          </h4>
          {icon ? (
            <Image src={icon} width={18} height={18} alt="filter icon" />
          ) : (
            <Image
              src={
                show
                  ? "/images/icon/chevron/up.svg"
                  : "/images/icon/chevron/down.svg"
              }
              width={18}
              height={18}
              alt="icon"
              className="cursor-pointer h-auto"
              onClick={() => setShow(!show)}
            />
          )}
        </div>
      </div>
      <div className={`${show ? "block" : "hidden"} transition-all`}>
        {children}
      </div>
    </div>
  );
};

export default FilterSection;
