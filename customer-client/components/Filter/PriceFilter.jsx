"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useRef, useState } from "react";
import ReactSlider from "react-slider";
import FilterSection from "./FilterSection";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const PriceFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const maxProductPrice = 50000;
  const [maxPrice, setMaxPrice] = useState(() => {
    const maxPrice = parseInt(searchParams.get("maxPrice")) || maxProductPrice;
    return maxPrice;
  });
  const [minPrice, setMinPrice] = useState(() => {
    const minPrice = parseInt(searchParams.get("minPrice")) || 0;
    return minPrice;
  });

  const debouncedHandleRangeValue = useRef(
    debounce((value) => {
      const params = new URLSearchParams(window.location.search);

      if (value[0] === 0 && value[1] === maxProductPrice) {
        params.delete("maxPrice");
        params.delete("minPrice");
      } else {
        params.set("minPrice", value[0]);
        params.set("maxPrice", value[1]);
      }

      router.push(`?${params.toString()}`, { scroll: false });
    }, 500) // 500ms debounce delay
  ).current;

  const handleRangeValue = (value) => {
    setMaxPrice(value[1]);
    setMinPrice(value[0]);
    debouncedHandleRangeValue(value);
  };

  const handleMinPrice = (value) => {
    setMinPrice(value);
    debouncedHandleRangeValue([value, maxPrice]);
  };

  const handleMaxPrice = (value) => {
    setMaxPrice(value);
    debouncedHandleRangeValue([minPrice, value]);
  };

  return (
    <FilterSection title="Price">
      <div className="flex flex-col px-7 py-10">
        <div className="">
          <ReactSlider
            // min={minPrice}
            max={maxProductPrice}
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={[minPrice, maxPrice]}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            //   renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            pearling
            minDistance={10}
            onChange={(value) => handleRangeValue(value)}
          />
        </div>
        <div className="flex flex-row justify-between mt-10 gap-2">
          <div className="w-1/2 text-center">
            <div className="flex items-center relative">
              <label
                htmlFor=""
                className="left-5 absolute font-causten-medium text-base text-secondary"
              >
                $
              </label>
              <input
                className="text-center border border-[#BEBCBD] w-full rounded-md px-5 py-2 font-causten-medium text-secondary text-base focus-visible:outline-1 focus-visible:outline-[#BEBCBD]"
                value={minPrice}
                onChange={(e) => handleMinPrice(parseInt(e.target.value))}
                type="number"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="w-1/2 text-center">
            <div className="flex items-center relative">
              <label
                htmlFor=""
                className="left-5 absolute font-causten-medium text-base text-secondary"
              >
                $
              </label>
              <input
                className="text-center border border-[#BEBCBD] w-full rounded-md px-5 py-2 font-causten-medium text-secondary text-base focus-visible:outline-1 focus-visible:outline-[#BEBCBD]"
                value={maxPrice}
                onChange={(e) => handleMaxPrice(parseInt(e.target.value))}
                type="number"
                name=""
                id=""
              />
            </div>
          </div>
        </div>
      </div>
    </FilterSection>
  );
};

export default memo(PriceFilter);
