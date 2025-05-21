import HTTP_CODES from "@/services/api/constants/http-codes";
import { useGetOrdersService } from "@/services/api/services/order";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useOrderListQuery = ({ sort, filter }) => {
  const fetch = useGetOrdersService();

  const query = useInfiniteQuery({
    queryKey: ["orders", sort, filter],
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
          filters: filter,
          sort: sort ? [sort] : undefined,
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
