"use client";
import { useOrderListQuery } from "@/app/(with-dashboard-layout)/orders/queries/orders-query";
import { ORDER_STATUS } from "@/constants/order-status";
import { SORT_TYPE } from "@/constants/sort-type";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import moment from "moment";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import { TableVirtuoso } from "react-virtuoso";
import OrderFilter from "./components/OrderFilter";
import OrderSearch from "./components/OrderSearch";

const STATUS_COLOR = {
  [ORDER_STATUS.PENDING]: "text-yellow-500 bg-yellow-100",
  [ORDER_STATUS.PROCESSING]: "text-blue-500 bg-blue-100",
  [ORDER_STATUS.COMFIRMED]: "text-indigo-500 bg-indigo-100",
  [ORDER_STATUS.SHIPPED]: "text-purple-500 bg-purple-100",
  [ORDER_STATUS.OUT_FOR_DELIVERY]: "text-orange-500 bg-orange-100",
  [ORDER_STATUS.DELIVERED]: "text-green-500 bg-green-100",
  [ORDER_STATUS.COMPLETED]: "text-teal-500 bg-teal-100",
  [ORDER_STATUS.CANCELLED]: "text-red-500 bg-red-100",
  [ORDER_STATUS.RETURNED]: "text-pink-500 bg-pink-100",
  [ORDER_STATUS.REFUNDED]: "text-gray-500 bg-gray-100",
  [ORDER_STATUS.FAILED]: "text-red-600 bg-red-100",
};

export default function OrderList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [{ order, orderBy }, setSort] = useState(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) return JSON.parse(searchParamsSort);
    return { order: SORT_TYPE.DESC, orderBy: "id" };
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === SORT_TYPE.ASC;
    const searchParams = new URLSearchParams(window.location.search);
    const newOrder = isAsc ? SORT_TYPE.DESC : SORT_TYPE.ASC;
    const newOrderBy = property;
    searchParams.set(
      "sort",
      JSON.stringify({ order: newOrder, orderBy: newOrderBy })
    );
    setSort({ order: newOrder, orderBy: newOrderBy });
    router.push(window.location.pathname + "?" + searchParams.toString());
  };

  const filter = useMemo(() => {
    const searchParamsFilter = searchParams.get("filter");
    if (searchParamsFilter) return JSON.parse(searchParamsFilter);
    return undefined;
  }, [searchParams]);

  const search = useMemo(() => {
    const searchParamsSearch = searchParams.get("search");
    if (searchParamsSearch) return searchParamsSearch;
    return undefined;
  }, [searchParams]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useOrderListQuery({ filter, sort: { order, orderBy }, search: search });

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const result = useMemo(() => {
    const result = data?.pages.flatMap((page) => page?.data) ?? [];
    return removeDuplicatesFromArrayObjects(result, "id");
  }, [data]);
  return (
    <>
      <div className="flex justify-between">
        <OrderSearch />

        <OrderFilter />
      </div>
      <div className=" text-base w-full ">
        <TableVirtuoso
          style={{ height: 500 }}
          data={result}
          components={{
            Table: ({ style, ...props }) => (
              <table
                {...props}
                style={{ ...style, width: "100%", display: "table" }}
              />
            ),
            TableRow: ({ style, ...props }) => (
              <tr
                {...props}
                style={{
                  ...style,
                  borderBottomWidth: "1px",
                }}
              />
            ),
          }}
          endReached={handleScroll}
          overscan={20}
          useWindowScroll
          increaseViewportBy={400}
          fixedHeaderContent={() => (
            <tr className="text-text text-lg border-b">
              <th
                className="cursor-pointer text-left py-4 pl-2 pr-3 hover:bg-slate-500"
                onClick={() => handleRequestSort("id")}
              >
                <div className="flex items-center justify-between">
                  <div>#ID</div>
                  <div className="flex flex-col justify-center -inset-1">
                    <IoCaretUpSharp
                      size={14}
                      color={`${
                        orderBy === "id" && order === SORT_TYPE.ASC
                          ? "black"
                          : "gray"
                      }`}
                    />

                    <IoCaretDownSharp
                      size={14}
                      color={`${
                        orderBy === "id" && order === SORT_TYPE.DESC
                          ? "black"
                          : "gray"
                      }`}
                    />
                  </div>
                </div>
              </th>
              <th className="text-left pl-2 pr-3">Customer</th>
              <th
                className=" text-left cursor-pointer select-none py-4 pl-2 pr-3"
                onClick={() => handleRequestSort("createdAt")}
              >
                <div className="flex items-center justify-between">
                  <div>Order date</div>
                  <div className="flex flex-col justify-center -inset-1">
                    <IoCaretUpSharp
                      size={14}
                      color={`${
                        orderBy === "createdAt" && order === SORT_TYPE.ASC
                          ? "black"
                          : "gray"
                      }`}
                    />

                    <IoCaretDownSharp
                      size={14}
                      color={`${
                        orderBy === "createdAt" && order === SORT_TYPE.DESC
                          ? "black"
                          : "gray"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th className="text-left pl-2 pr-3">Delivery Status</th>

              <th
                className="cursor-pointer text-left py-4 pl-2 pr-3"
                onClick={() => handleRequestSort("totalAmount")}
              >
                <div className="flex items-center justify-between">
                  <div>Total Amount</div>
                  <div className="flex flex-col justify-center -inset-1">
                    <IoCaretUpSharp
                      size={14}
                      color={`${
                        orderBy === "totalAmount" && order === SORT_TYPE.ASC
                          ? "black"
                          : "gray"
                      }`}
                    />

                    <IoCaretDownSharp
                      size={14}
                      color={`${
                        orderBy === "totalAmount" && order === SORT_TYPE.DESC
                          ? "black"
                          : "gray"
                      }`}
                    />
                  </div>
                </div>
              </th>
              <th className="text-left pl-2 pr-3">Action</th>
            </tr>
          )}
          itemContent={(index, order) => (
            <>
              <td className="pl-2 pr-3 text-text">{order?.id}</td>
              <td className="text-left pl-2 pr-3 text-text">
                <div className="flex flex-col text-text">
                  <h3 className="text-base font-bold">{order?.user?.name}</h3>
                  <p>{order?.userInfo?.name}</p>
                  <p>{order?.userInfo?.phone}</p>
                </div>
              </td>
              <td className="py-4 text-left pl-2 pr-3 text-text">
                {moment(order?.createdAt).format("MMMM DD, YYYY")}
              </td>
              <td className={`text-left pl-2 pr-3`}>
                <span
                  className={`px-3 py-1 rounded-full ${
                    STATUS_COLOR[order?.status]
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td className="text-left pl-2 pr-3 text-text">
                ${order.totalAmount}
              </td>
              <td className="text-left pl-2 pr-3 text-text ">
                <Link
                  href={`/orders/details/${order.id}`}
                  className="btn btn-primary btn-sm text-text"
                >
                  Order Details
                </Link>
              </td>
            </>
          )}
        ></TableVirtuoso>
      </div>
    </>
  );
}
