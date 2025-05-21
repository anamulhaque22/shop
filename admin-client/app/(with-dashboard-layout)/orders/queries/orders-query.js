import { useGetOrdersService } from "@/services/api/services/order";
import HTTP_CODES from "@/services/api/types/http-codes";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useOrderListQuery = ({ sort, filter, search }) => {
  const fetch = useGetOrdersService();

  const query = useInfiniteQuery({
    queryKey: ["orders", sort, filter, search],
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
          filters: filter,
          sort: sort ? [sort] : undefined,
          search,
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
