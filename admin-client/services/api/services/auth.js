import { useCallback } from "react";
import { API_URL } from "../config";
import useFetchBase from "../use-fetch-base";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useAuthLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    async (data) => {
      return fetchBase(`${API_URL}/v1/auth/email/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useAuthSignUpService() {
  const fetchBase = useFetchBase();

  return useCallback(
    async (data, requestConfig) => {
      return fetchBase(`${API_URL}/v1/auth/email/signup`, {
        method: "GET",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}
