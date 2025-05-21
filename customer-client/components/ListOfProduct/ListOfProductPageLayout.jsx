"use client";
import { useState } from "react";
import LayoutContent from "./LayoutContent";
import LayoutLeftSidebar from "./LayoutLeftSidebar";

const ListOfProductPageLayout = ({ productCategory }) => {
  const [isOpen, setIsOpen] = useState(false); // filter container

  return (
    <div className="container mb-5">
      <div className="drawer lg:auto-cols-auto lg:drawer-open ">
        <input
          id="product-filter-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <LayoutContent productCategory={productCategory} />
        <LayoutLeftSidebar productCategory={productCategory} />
      </div>
    </div>
  );
};

export default ListOfProductPageLayout;
