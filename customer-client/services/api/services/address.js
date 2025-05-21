import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function usePostAddressService() {
  const fetch = useFetch({ test: "usePostAddressService" });
  return useCallback(
    (data, requestConfig) => {
      return fetch(`${API_URL}/v1/addresses`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useGetAddressesService() {
  const fetch = useFetch();
  return useCallback(
    (requestConfig) => {
      return fetch(`${API_URL}/v1/addresses`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useGetAddressService() {
  const fetch = useFetch();
  return useCallback(
    (id, requestConfig) => {
      return fetch(`${API_URL}/v1/addresses/${id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function usePatchAddressService() {
  const fetch = useFetch();
  return useCallback(
    (id, data, requestConfig) => {
      return fetch(`${API_URL}/v1/addresses/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useDeleteAddressService() {
  const fetch = useFetch();
  return useCallback(
    (id, requestConfig) => {
      return fetch(`${API_URL}/v1/addresses/${id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}
