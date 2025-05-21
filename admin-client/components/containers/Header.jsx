"use client";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import Image from "next/image";
import Link from "next/link";
import { HiBars3 } from "react-icons/hi2";
import ThemeSwitch from "../ThemeSwitch";

function Header() {
  const { logOut } = useAuthActions();
  const { user } = useAuth();
  function logoutUser() {
    logOut();
  }

  return (
    <>
      <div className="navbar  flex justify-between bg-primary border-b border-b-bc z-10">
        {/* Menu toogle for mobile view or small screen */}
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <HiBars3 className="h-5 inline-block w-5" />
          </label>
          {/* <h1 className="text-2xl font-semibold ml-2">{"pageTitle"}</h1> */}
        </div>

        <div className="flex-none space-x-3 mr-6">
          <div>
            <ThemeSwitch />
          </div>

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end h-12 w-12 ring-2 ring-blue-500 ring-offset-0 rounded-full ml-">
            <label tabIndex={0} className="">
              <Image
                src={
                  !!user?.photo
                    ? user.photo.url
                    : "/images/avatar-placeholder.png"
                }
                height={100}
                width={100}
                // fill={true}
                className="rounded-full  object-fill"
                alt="avatar"
              />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link href={`/users/edit/${user?.id}`}>Profile Settings</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
