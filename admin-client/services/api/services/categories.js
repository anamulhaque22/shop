import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
import useFetchBase from "../use-fetch-base";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function usePostCategoryService() {
  const fetch = useFetch();

  return useCallback(
    (data, requestConfig) => {
      return fetch(`${API_URL}/v1/categories`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useGetCategoriesService() {
  const fetchBase = useFetchBase();

  return useCallback(
    async (data) => {
      return fetchBase(`${API_URL}/v1/categories`, {
        method: "GET",
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useGetCategoryService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (id, requestConfig) => {
      return fetchBase(`${API_URL}/v1/categories/${id}/`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useDeleteCategoryService() {
  const fetch = useFetch();

  return useCallback(
    (id, requestConfig) => {
      return fetch(`${API_URL}/v1/categories/${id}/`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function usePatchCategoryService() {
  const fetch = useFetch();

  return useCallback(
    (data, requestConfig) => {
      return fetch(`${API_URL}/v1/categories/${data.id}/`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}
