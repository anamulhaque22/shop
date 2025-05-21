"use client";
import { ORDER_STATUS } from "@/constants/order-status";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OrderFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState(() => {
    const searchParamsFilter = searchParams.get("filter");
    if (searchParamsFilter) return JSON.parse(searchParamsFilter);
    return undefined;
  });

  const handleChange = (e) => {
    if (e.target.value === "") {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("filter");
      setFilter(undefined);
      router.push(window.location.pathname + "?" + searchParams.toString());
      return;
    }
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("filter", JSON.stringify({ status: e.target.value }));
    setFilter({ status: e.target.value });
    router.push(window.location.pathname + "?" + searchParams.toString());
  };

  return (
    <select
      className="select select-bordered w-full max-w-xs focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary text-text"
      onChange={handleChange}
      value={filter?.status}
    >
      <option value={""}>Order Status</option>
      {Object.keys(ORDER_STATUS).map((key, index) => (
        <option key={index} value={ORDER_STATUS[key]}>
          {ORDER_STATUS[key]}
        </option>
      ))}
    </select>
  );
}
