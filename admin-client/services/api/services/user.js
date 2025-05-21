import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useGetUsersService() {
  const fetch = useFetch();

  return useCallback(
    (userReq, reqConfig) => {
      const requestUrl = new URL(`${API_URL}/v1/users/`);

      if (userReq) {
        if (userReq.page) requestUrl.searchParams.append("page", userReq.page);

        if (userReq.limit)
          requestUrl.searchParams.append("limit", userReq.limit);

        if (userReq.sort)
          requestUrl.searchParams.append("sort", JSON.stringify(userReq.sort));

        if (userReq.filters)
          requestUrl.searchParams.append(
            "filters",
            JSON.stringify(userReq.filters)
          );
      }

      return fetch(requestUrl, {
        method: "GET",
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useGetUserService() {
  const fetch = useFetch();

  return useCallback(
    (userId, reqConfig) => {
      return fetch(`${API_URL}/v1/users/${userId}`, {
        method: "GET",
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

// udpate user
export function usePatchUserService() {
  const fetch = useFetch();

  return useCallback(
    (data, reqConfig) => {
      return fetch(`${API_URL}/v1/users/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...reqConfig,
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
      return fetch(`${API_URL}/v1/users/image`, {
        method: "POST",
        body: data,
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

// create user
export function usePostUserService() {
  const fetch = useFetch();

  return useCallback(
    (data, reqConfig) => {
      return fetch(`${API_URL}/v1/users`, {
        method: "POST",
        body: JSON.stringify(data),
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

//delete user
export function useDeleteUserService() {
  const fetch = useFetch();

  return useCallback(
    (data, reqConfig) => {
      return fetch(`${API_URL}/v1/users/${data.id}`, {
        method: "DELETE",
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}
