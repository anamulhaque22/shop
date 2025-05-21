"use client";
import useDebounce from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(() => {
    const searchParamsSearch = searchParams.get("search");
    if (searchParamsSearch) return searchParamsSearch;
    return "";
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      const params = new URLSearchParams(window.location.search);
      params.delete("search");
      router.push(window.location.pathname + "?" + params.toString());
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set("search", debouncedSearchTerm);
    router.push(window.location.pathname + "?" + params.toString());
  }, [debouncedSearchTerm, router]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Immediately set search term
  };

  // const handleChange = (e) => {
  //   if (e.target.value === "") {
  //     const searchParams = new URLSearchParams(window.location.search);
  //     searchParams.delete("search");
  //     setSearchTerm("");
  //     router.push(window.location.pathname + "?" + searchParams.toString());
  //     return;
  //   }
  //   const searchParams = new URLSearchParams(window.location.search);
  //   searchParams.set("search", e.target.value);
  //   setSearchTerm(e.target.value);
  //   router.push(window.location.pathname + "?" + searchParams.toString());
  // };

  return (
    <label className="w-full max-w-xs order-search input input-bordered flex items-center gap-2 outline-none focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary text-text">
      <input
        type="text"
        className="grow"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}
