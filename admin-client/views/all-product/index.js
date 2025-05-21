"use client";
import { useProductListQuery } from "@/app/(with-dashboard-layout)/products/queries/products-queries";
import { useGetCategoryService } from "@/services/api/services/categories";
import withPageRequiredAuth from "@/services/auth/page-with-required-auth";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import CategoryFilter from "./components/CategoryFilter";

function AllProductList() {
  const searchParams = useSearchParams();
  const fetchCategory = useGetCategoryService();
  const router = useRouter();
  const [clothFor, setClothFor] = useState(null);
  const [categories, setCategories] = useState(null);

  const filter = useMemo(() => {
    const category = searchParams.get("category");

    const filterPamams = {
      category: category,
    };

    return filterPamams;
  }, [searchParams]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useProductListQuery(filter);

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = typeof window === undefined ? 0 : window.innerHeight;

    if (scrollHeight - scrollTop <= clientHeight + 300) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll);

    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, [handleScroll]);

  const result = useMemo(() => {
    const result = data?.pages.flatMap((page) => page?.data) ?? null;
    if (result) {
      return removeDuplicatesFromArrayObjects(result, "id");
    }
    return null;
  }, [data]);

  return (
    <div className="pt-8 px-6">
      <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
        <div className="flex justify-between">
          <CategoryFilter />

          {/* <VisibilityFilter /> */}
        </div>
        <div className="overflow-x-auto w-full text-text">
          <table className="table w-full ">
            <thead>
              <tr className="text-text border-bc">
                <th>Product Name</th>
                <th>Price</th>
                <th>Buy Price</th>
                <th>Sell Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {result?.map((product) => (
                <tr
                  key={product?.id}
                  className="hover:bg-[#8b33fd21] !border-bc"
                >
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12">
                        <Image
                          src={
                            product?.images?.[0]?.imageUrl ||
                            "/images/product-placeholder.jpg"
                          }
                          width={250}
                          height={250}
                          alt="product image"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{product?.title}</td>
                  <td>$ {product?.buyPrice}</td>
                  <td>$ {product?.sellPrice}</td>
                  <td>{product?.quantity}</td>
                  <td>
                    <button className="btn btn-primary !text-text btn-xs cursor-default">
                      {product?.visibility}
                    </button>
                  </td>
                  <td>
                    <div className="flex flex-row gap-x-1">
                      <Link
                        href={`/products/edit/${product?.id}`}
                        className="btn btn-primary !text-text btn-xs"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-primary !text-text btn-xs"
                        type="submit"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredAuth(AllProductList);
