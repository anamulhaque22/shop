import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useUploadProductImagesService() {
  const fetch = useFetch();

  return useCallback(
    async (data, reqConfig) => {
      return fetch(`${API_URL}/v1/products/image/add`, {
        method: "POST",
        "Content-Type": "multipart/form-data",
        body: data,
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

// get all products
export function useGetProductsService() {
  const fetch = useFetch();

  return useCallback(
    (productReq, requestConfig) => {
      const requestUrl = new URL(`${API_URL}/v1/products/all/admin`);

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

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useCreateProductService() {
  const fetch = useFetch();

  return useCallback(
    async (data, reqConfig) => {
      return fetch(`${API_URL}/v1/products`, {
        method: "POST",
        body: JSON.stringify(data),
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useUpdateProductService() {
  const fetch = useFetch();

  return useCallback(
    async (productId, data, reqConfig) => {
      return fetch(`${API_URL}/v1/products/${productId}`, {
        method: "POST",
        body: JSON.stringify(data),
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

// fetch single product
export function useGetProductService() {
  const fetch = useFetch();

  return useCallback(
    (productId) => {
      return fetch(`${API_URL}/v1/products/${productId}/details/admin`, {
        method: "GET",
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}
