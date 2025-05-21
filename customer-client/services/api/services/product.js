import { useCallback } from "react";
import { API_URL } from "../config";
import useFetchBase from "../use-fetch-base";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

/*
    const productReq = {
        page: 1, //optional
        limit: 10, //optional
        categorys: [1, 2, 3], // array of category id optional
        search: "search query", //optional
        minPrice: 1000, //optional
        maxPrice: 10000, //optional
        size: 1, //size id optional
    }
*/

/**
 * Fetches products based on user request parameters.
 *
 * @param {Object} productReq - The request object containing query parameters.
 * @param {number} [productReq.page=1] - The page number for pagination (optional).
 * @param {number} [productReq.limit=10] - The number of items per page (optional).
 * @param {number[]} [productReq.categorys] - An array of category IDs (optional).
 * @param {string} [productReq.search] - Search query string (optional).
 * @param {number} [productReq.minPrice] - Minimum price filter (optional).
 * @param {number} [productReq.maxPrice] - Maximum price filter (optional).
 * @param {number} [productReq.size] - Size ID filter (optional).
 *
 * @returns {Object} The result of the product search.
 */

export function useGetProductsService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (productReq, requestConfig) => {
      const requestUrl = new URL(`${API_URL}/v1/products/`);

      if (productReq) {
        if (productReq.page)
          requestUrl.searchParams.append("page", productReq.page);

        if (productReq.limit)
          requestUrl.searchParams.append("limit", productReq.limit);

        if (productReq.category) {
          requestUrl.searchParams.append("category", productReq.category);
        }

        if (productReq.subCategory) {
          requestUrl.searchParams.append("subCategory", productReq.subCategory);
        }

        if (productReq.search)
          requestUrl.searchParams.append("search", productReq.search);

        if (productReq.minPrice)
          requestUrl.searchParams.append("minPrice", productReq.minPrice);

        if (productReq.maxPrice)
          requestUrl.searchParams.append("maxPrice", productReq.maxPrice);

        if (productReq.size)
          requestUrl.searchParams.append("size", productReq.size);
      }

      return fetchBase(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useGetProductService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (productId) => {
      return fetchBase(`${API_URL}/v1/products/${productId}`, {
        method: "GET",
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}
