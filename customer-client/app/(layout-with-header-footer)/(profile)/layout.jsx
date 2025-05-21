"use client";
import UserProfileNav from "@/components/Navbar/UserProfileNav";
import useAuth from "@/services/auth/use-auth";
import moment from "moment";
import Image from "next/image";

const UserProfileLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="container h-full">
      <div className="drawer lg:drawer-open my-5 lg:gap-x-5">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="rounded border border-black p-1 mb-3 inline-block lg:hidden"
          >
            <Image
              src={"/images/icon/menu-arrow.svg"}
              width={24}
              height={24}
              alt="filter icon"
            />
          </label>
          {/* <!-- Page content here --> */}
          {children}
        </div>
        <div className="drawer-side lg:rounded-md lg:custom-shadow lg:h-[340px] z-50">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="bg-white w-80 min-h-full  p-4">
            <div className="flex gap-4 items-center mb-5">
              <div className="avatar">
                <div className="w-20 rounded-full bg-slate-200">
                  <Image
                    src={`${
                      user?.photo
                        ? user?.photo?.url
                        : "/images/icon/user-icon.png"
                    }`}
                    width={80}
                    height={80}
                    className="w-80"
                    alt="user profile"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-causten-bold text-lg text-[#3C4242]">
                  {user?.firstName} {user?.lastName}
                </h4>
                <p className="font-causten-medium text-base">
                  Joined {moment(user?.createdAt).format("MMM Do YY")}
                </p>
              </div>
            </div>
            <UserProfileNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
