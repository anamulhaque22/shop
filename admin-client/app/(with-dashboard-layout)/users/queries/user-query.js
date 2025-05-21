import { useGetUsersService } from "@/services/api/services/user";
import HTTP_CODES from "@/services/api/types/http-codes";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useUserListQuery = ({ sort, filter }) => {
  const fetch = useGetUsersService();
  const query = useInfiniteQuery({
    queryKey: ["users", sort, filter],
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
          sort: sort ? [sort] : undefined,
          filters: filter,
        },
        {
          signal,
        }
      );

      if (status === HTTP_CODES.OK) {
        return {
          data: data.data,
          nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
    gcTime: 0,
  });
  return query;
};
