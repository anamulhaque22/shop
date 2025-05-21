"use client";
import { useUserListQuery } from "@/app/(with-dashboard-layout)/users/queries/user-query";
import { SORT_TYPE } from "@/constants/sort-type";
import withPageRequiredAuth from "@/services/auth/page-with-required-auth";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import moment from "moment";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import { TableVirtuoso } from "react-virtuoso";
import Actions from "./components/Actions";
import FilterUser from "./components/FilterUser";

function UserListView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [{ order, orderBy }, setSort] = useState(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) {
      return JSON.parse(searchParamsSort);
    }
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
    if (searchParamsFilter) {
      return JSON.parse(searchParamsFilter);
    }

    return undefined;
  }, [searchParams]);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useUserListQuery({ filter, sort: { order, orderBy } });

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const result = useMemo(() => {
    const result = data?.pages.flatMap((page) => page?.data) ?? [];

    return removeDuplicatesFromArrayObjects(result, "id");
  }, [data]);
  return (
    <div className="pt-8 px-6">
      <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
        <div className="flex items-center justify-end gap-x-4">
          <FilterUser />

          <Link
            href={"/users/create"}
            className="btn btn-sm btn-primary !text-text"
            type="submit"
          >
            Add User
          </Link>
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
                <th className="text-left pl-2 pr-3">Name</th>
                <th
                  className=" text-left cursor-pointer select-none py-4 pl-2 pr-3"
                  onClick={() => handleRequestSort("createdAt")}
                >
                  <div className="flex items-center justify-between">Email</div>
                </th>

                <th className="text-left pl-2 pr-3">Registered</th>

                <th className="text-left pl-2 pr-3">Role</th>
                <th className="text-left pl-2 pr-3">Action</th>
              </tr>
            )}
            itemContent={(index, user) => (
              <>
                <td className="pl-2 pr-3 text-text">{user?.id}</td>
                <td className="text-left pl-2 pr-3 text-text">
                  <div className="flex flex-col text-text">
                    <h3 className="text-base font-bold">
                      {user?.firstName} {user?.lastName}
                    </h3>
                  </div>
                </td>
                <td className="text-left pl-2 pr-3 text-text">{user?.email}</td>

                <td className="py-4 text-left pl-2 pr-3 text-text">
                  {moment(user?.createdAt).format("MMMM DD, YYYY")}
                </td>
                <td className={`text-left pl-2 pr-3 text-text`}>
                  {user?.role?.name}
                </td>

                <td className="text-left pl-2 pr-3 text-text ">
                  {!!user && <Actions user={user} />}
                </td>
              </>
            )}
          ></TableVirtuoso>
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredAuth(UserListView);
