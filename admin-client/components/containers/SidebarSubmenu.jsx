"use client";
import { HiChevronDown } from "react-icons/hi";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const location = {
  pathname: "/login",
};
function SidebarSubmenu({
  submenu,
  name,
  icon,
  submenuId,
  openDropdown,
  toggleDropdown,
}) {
  const [heights, setHeights] = useState({});
  const refs = useRef({});

  const pathname = usePathname();

  useEffect(() => {
    const calculatedHeights = {};
    Object.keys(refs.current).forEach((key) => {
      if (refs.current[key]) {
        calculatedHeights[key] = refs.current[key].scrollHeight;
      }
    });
    setHeights(calculatedHeights);
  }, []);

  const isActive = submenu.some((item) => pathname === item.path);

  return (
    <div className="flex flex-col px-0 py-0 !bg-transparent">
      <div
        className={`w-full flex justify-between items-center dark:hover:!bg-bc text-text hover:!bg-[#8b33fd21] px-4 py-2 rounded-md cursor-pointer ${
          isActive ? "bg-[#8b33fd21] dark:!bg-bc" : ""
        }`}
        onClick={() => toggleDropdown(submenuId)}
      >
        <div className="flex items-center gap-x-2">
          {icon} <span>{name}</span>
        </div>
        <HiChevronDown
          className={
            "w-5 h-5 mt-1 float-right delay-300 duration-200 transition-all"
          }
        />
      </div>

      {/** Submenu list */}
      <div
        ref={(el) => (refs.current.submenuId = el)}
        style={{
          transition: "max-height 0.3s ease-in-out",
          maxHeight:
            openDropdown === submenuId ? `${heights.submenuId}px` : "0px",
        }}
        className="overflow-hidden w-full"
      >
        <ul className="!text-left items-start before:w-0">
          {submenu.map((m, k) => {
            return (
              <li key={k} className="">
                <Link
                  href={m.path}
                  className="dark:hover:!bg-bc text-text hover:!bg-[#8b33fd21] px-4 py-2 rounded-md focus:!bg-[#8b33fd21] focus:!text-text active:!bg-[#8b33fd21] active:!text-text"
                >
                  {m.icon} {m.name}
                  {/* {location.pathname == m.path ? (
                    <span
                      className="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null} */}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SidebarSubmenu;
