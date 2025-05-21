import HTTP_CODES from "@/services/api/constants/http-codes";
import { useGetProductsService } from "@/services/api/services/product";
import { useInfiniteQuery } from "@tanstack/react-query";

/*
 query = {
    category: string, ex: "1,2,3"
    minPrice: number, ex: 1000
    maxPrice: number, ex: 5000
    size: string, ex: "1,2"
    search: string, ex: "tshirt"
    limit: number, ex: 10
    page: number, ex: 1
 }
 */
export const useProductListQuery = (queryParams) => {
  const fetchProduct = useGetProductsService();

  const query = useInfiniteQuery({
    queryKey: ["products", queryParams],
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetchProduct(
        { page: pageParam, limit: 10, ...queryParams },
        { signal }
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
