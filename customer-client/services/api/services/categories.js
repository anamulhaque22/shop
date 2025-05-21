import { useCallback } from "react";
import { API_URL } from "../config";
import useFetchBase from "../use-fetch-base";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useGetHeaderCategoriesService() {
  // fetches the categories that will be displayed in the header
  const fetchBase = useFetchBase();

  return useCallback(
    (requestConfig) => {
      return fetchBase(`${API_URL}/v1/categories/`, {
        method: "GET",
        ...requestConfig,
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

export function useGetSubCategoryService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (id, requestConfig) => {
      return fetchBase(`${API_URL}/v1/categories/${id}/sub-categories/`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}
