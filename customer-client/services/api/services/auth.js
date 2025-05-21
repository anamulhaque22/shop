import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
import useFetchBase from "../use-fetch-base";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useAuthSignUpService() {
  const fetchBase = useFetchBase();
  return useCallback(
    (data, requestConfig) => {
      return fetchBase(`${API_URL}/v1/auth/email/register`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useAuthLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data) => {
      return fetchBase(`${API_URL}/v1/auth/email/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useAuthGoogleLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data) => {
      return fetchBase(`${API_URL}/v1/auth/google/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useAuthFacebookLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data, requestConfig) => {
      return fetchBase(`${API_URL}/v1/auth/facebook/login`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useAuthForgotPasswordService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data) => {
      return fetchBase(`${API_URL}/v1/auth/forgot/password`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useAuthResetPasswordService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data) => {
      return fetchBase(`${API_URL}/v1/auth/reset/password`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}

export function useAuthPatchMeService() {
  const fetch = useFetch();

  return useCallback(
    (data, requestConfig) => {
      return fetch(`${API_URL}/v1/auth/me`, {
        method: "PATCH",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

// upload user image
export function useUploadUserImageService() {
  const fetch = useFetch();

  return useCallback(
    (fileData, reqConfig) => {
      const data = new FormData();
      data.append("image", fileData);
      return fetch(`${API_URL}/v1/auth/image`, {
        method: "POST",
        body: data,
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useAuthConfirmEmailService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data, requestConfig) => {
      return fetchBase(`${API_URL}/v1/auth/email/confirm`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}
