import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useGetWishListService() {
  const fetch = useFetch();

  return useCallback(
    (requestConfig) => {
      return fetch(`${API_URL}/v1/wish-list/`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useAddToWishListService() {
  const fetch = useFetch();

  return useCallback(
    (productId, requestConfig) => {
      return fetch(`${API_URL}/v1/wish-list/`, {
        method: "POST",
        ...requestConfig,
        body: JSON.stringify({ productId }),
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useRemoveFromWishListService() {
  const fetch = useFetch();

  return useCallback(
    (id, requestConfig) => {
      return fetch(`${API_URL}/v1/wish-list/${id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}
