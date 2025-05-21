"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FilterSection from "./FilterSection";
const productSize = [
  { name: "xs", id: 1 },
  { name: "s", id: 2 },
  { name: "m", id: 3 },
  { name: "l", id: 4 },
  { name: "xl", id: 6 },
  { name: "xxl", id: 7 },
  { name: "xxxl", id: 8 },
];
const SizeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSizes, setSelectedSizes] = useState(() => {
    const sizes = searchParams.get("size");

    if (sizes) {
      return sizes.split(",").map(Number);
    }

    return [];
  });

  const handleAddSize = (newSizeId) => {
    const params = new URLSearchParams(window.location.search);

    setSelectedSizes((prev) => {
      if (prev.includes(newSizeId)) {
        return prev.filter((id) => id !== newSizeId);
      } else {
        return [...prev, newSizeId];
      }
    });

    const sizes = params.get("size");
    if (sizes) {
      const sizeArray = sizes.split(",").map(Number);

      if (sizeArray.includes(newSizeId)) {
        const updatedSizeArray = sizeArray.filter((id) => id !== newSizeId);

        if (updatedSizeArray.length > 0) {
          params.set("size", updatedSizeArray.join(","));
        } else {
          params.delete("size");
        }
      } else {
        params.set("size", [...sizeArray, newSizeId].join(","));
      }
    } else {
      params.set("size", newSizeId);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <FilterSection title="Size">
      <div className="grid grid-cols-3 gap-[18px] px-7 py-10">
        {productSize.map((size) => (
          <button
            onClick={() => handleAddSize(size.id)}
            key={size.id}
            className={`px-4 py-2 border border-[#BEBCBD] rounded-md font-causten-semi-bold text-sm  ${
              selectedSizes.includes(size.id)
                ? "bg-primary text-white"
                : "text-[#3C4242] bg-transparent"
            }`}
          >
            {size.name.toUpperCase()}
          </button>
        ))}
      </div>
    </FilterSection>
  );
};

export default SizeFilter;
{
  /* <div>
      <TitleFilterFor title="Size" />
      <div className="grid grid-cols-3 gap-[18px] px-7 py-10">
        <button className="px-4 py-2 border border-[#BEBCBD] rounded-md font-causten-semi-bold text-sm text-[#3C4242]">
          XXS
        </button>
        <button className="px-4 py-2 border border-[#BEBCBD] rounded-md font-causten-semi-bold text-sm text-[#3C4242]">
          XXS
        </button>
        <button className="px-4 py-2 border border-[#BEBCBD] rounded-md font-causten-semi-bold text-sm text-[#3C4242]">
          XXS
        </button>
        <button className="px-4 py-2 border border-[#BEBCBD] rounded-md font-causten-semi-bold text-sm text-[#3C4242]">
          XXS
        </button>
        <button className="px-4 py-2 border border-[#BEBCBD] rounded-md font-causten-semi-bold text-sm text-[#3C4242]">
          XXS
        </button>
        <button className="px-4 py-2 border border-[#BEBCBD] rounded-md font-causten-semi-bold text-sm text-[#3C4242]">
          XXS
        </button>
      </div>
    </div> */
}
