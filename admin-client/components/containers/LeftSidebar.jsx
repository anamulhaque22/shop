"use client";
import { HiOutlineXMark } from "react-icons/hi2";

import routes from "@/routes/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../Logo";
import SidebarSubmenu from "./SidebarSubmenu";

function LeftSidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const close = (e) => {
    document.getElementById("left-sidebar-drawer").click();
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="drawer-side border-r border-r-bc">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu  pt-2 w-80 h-full bg-primary  text-text">
        <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          //   onClick={() => close()}
        >
          {/* <XMarkIcon className="h-5 inline-block w-5" /> */}
          <HiOutlineXMark className="h-5 inline-block w-5" />
        </button>

        <li className="mb-2 font-semibold text-xl">
          <Link
            href={"/"}
            className="active:!bg-transparent active:!text-text hover:bg-transparent"
          >
            <Logo />
          </Link>
        </li>

        {routes.map((route, k) => {
          return (
            <li className="" key={k}>
              {route.submenu ? (
                <SidebarSubmenu
                  {...route}
                  submenuId={`submenu-${k}`}
                  openDropdown={openDropdown}
                  toggleDropdown={toggleDropdown}
                />
              ) : (
                <Link
                  href={route.path}
                  className={`dark:hover:!bg-bc text-text hover:!bg-[#8b33fd21] px-4 py-2 rounded-md active:!bg-[#8b33fd21] active:!text-text focus:!bg-[#8b33fd21] focus:!text-text ${
                    pathname === route.path ? "bg-[#8b33fd21] dark:!bg-bc" : ""
                  }`}
                >
                  {route.icon} {route.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
