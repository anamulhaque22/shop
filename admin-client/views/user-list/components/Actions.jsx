import { SORT_TYPE } from "@/constants/sort-type";
import { useDeleteUserService } from "@/services/api/services/user";
import useAuth from "@/services/auth/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { FaTrash, FaUserPen } from "react-icons/fa6";
// FaUserPen;
export default function Actions({ user }) {
  const { user: authUser } = useAuth();
  const fetchUserDelete = useDeleteUserService();
  const queryClient = useQueryClient();
  const canDelete = user.id !== authUser?.id;

  const handleDelete = async () => {
    const isConfirmed = true;
    if (isConfirmed) {
      // setOpen(false)
      const searchParams = new URLSearchParams(window.location.search);
      const searchParamsFilter = searchParams.get("filter");
      const searchParamsSort = searchParams.get("sort");

      let filter = undefined;
      let sort = {
        order: SORT_TYPE.DESC,
        orderBy: "id",
      };

      if (searchParamsFilter) {
        filter = JSON.parse(searchParamsFilter);
      }

      if (searchParamsSort) {
        sort = JSON.parse(searchParamsSort);
      }

      const previousData = queryClient.getQueryData(["users", sort, filter]);
      await queryClient.cancelQueries(["users"]);

      const newData = {
        ...previousData,
        pages: previousData?.pages.map((page) => ({
          ...page,
          data: page?.data.filter((item) => item.id !== user.id),
        })),
      };

      queryClient.setQueryData(["users", sort, filter], newData);

      await fetchUserDelete({ id: user.id });
      //   queryClient.invalidateQueries("users");
    }
  };
  return (
    <div className="flex gap-x-1">
      {/* <Link
        href={`/users/details/${user.id}`}
        className="btn btn-primary btn-sm text-text"
      >
        <FiUser />
      </Link> */}

      <Link
        href={`/users/edit/${user.id}`}
        className="btn btn-primary btn-sm text-text"
      >
        <FaUserPen />
      </Link>

      {canDelete && (
        <button
          className="btn btn-primary btn-sm text-text"
          onClick={handleDelete}
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
}
