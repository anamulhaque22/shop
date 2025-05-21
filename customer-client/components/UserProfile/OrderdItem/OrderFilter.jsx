"use client";
import { ORDER_STATUS } from "@/constants/order-status";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChange = (e) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("filter", JSON.stringify({ status: e.target.value }));
    router.push(window.location.pathname + "?" + searchParams.toString());
  };
  return (
    <select
      className="select select-bordered w-full max-w-xs focus:outline-none focus:bg-white"
      onChange={handleChange}
    >
      <option disabled selected>
        Order Status
      </option>
      {Object.keys(ORDER_STATUS).map((key, index) => (
        <option key={index} value={ORDER_STATUS[key]}>
          {ORDER_STATUS[key]}
        </option>
      ))}
    </select>
  );
}
