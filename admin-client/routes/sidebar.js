/** Icons are imported separatly to reduce build time */

import {
  FaCartArrowDown,
  FaRectangleList,
  FaUserPlus,
  FaUsers,
  FaUsersLine,
} from "react-icons/fa6";
import { GoTable } from "react-icons/go";
import { HiAcademicCap } from "react-icons/hi2";

import { HiOutlineShoppingBag, HiSquaresPlus } from "react-icons/hi2";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/",
    icon: <HiAcademicCap className={iconClasses} />,
    name: "Dashboard",
  },

  {
    path: "/orders",
    icon: <FaCartArrowDown className={iconClasses} />,
    name: "Orders",
  },

  {
    path: "",
    icon: <HiOutlineShoppingBag className={iconClasses} />,
    name: "Products",
    submenu: [
      {
        path: "/products/add",
        icon: <HiSquaresPlus className={submenuIconClasses} />,
        name: "Add Product",
      },
      {
        path: "/products",
        icon: <FaRectangleList className={submenuIconClasses} />,
        name: "All Products",
      },
    ],
  },

  {
    path: "/categories",
    icon: <GoTable className={iconClasses} />,
    name: "Categories",
  },

  {
    path: "",
    icon: <FaUsers className={iconClasses} />,
    name: "Users",
    submenu: [
      {
        path: "/users",
        icon: <FaUsersLine className={submenuIconClasses} />,
        name: "User List",
      },
      {
        path: "/users/create",
        icon: <FaUserPlus className={submenuIconClasses} />,
        name: "Add User",
      },
    ],
  },

  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <HiDocumentDuplicate className={`${iconClasses} inline`} />, // icon component
  //   name: "Pages", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/login",
  //       icon: <HiArrowRightEndOnRectangle className={submenuIconClasses} />,
  //       name: "Login",
  //     },
  //     {
  //       path: "/register", //url
  //       icon: <HiMiniUserPlus className={submenuIconClasses} />, // icon component
  //       name: "Register", // name that appear in Sidebar
  //     },
  //   ],
  // },

  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <HiDocumentDuplicate className={`${iconClasses} inline`} />, // icon component
  //   name: "Pages", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/login",
  //       icon: <HiArrowRightEndOnRectangle className={submenuIconClasses} />,
  //       name: "Login",
  //     },
  //     {
  //       path: "/register", //url
  //       icon: <HiMiniUserPlus className={submenuIconClasses} />, // icon component
  //       name: "Register", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/register", //url
  //       icon: <HiMiniUserPlus className={submenuIconClasses} />, // icon component
  //       name: "Register", // name that appear in Sidebar
  //     },
  //   ],
  // },
];

export default routes;
