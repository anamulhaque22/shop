"use client";
import { useCallback } from "react";
import { AUTH_REFRESH_URL } from "./config";

/**
 * @input
 * @returns
 */
function useFetchBase() {
  return useCallback(async (input, init, tokens) => {
    let headers = {};
    if (!(init?.body instanceof FormData)) {
      headers = {
        ...headers,
        "Content-Type": "application/json",
      };
    }

    if (tokens?.token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${tokens.token}`,
      };
    }

    if (tokens?.tokenExpires && tokens.tokenExpires <= Date.now()) {
      const newToken = await fetch(AUTH_REFRESH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.refreshToken}`,
        },
      }).then((res) => res.json());

      if (newToken.token) {
        tokens?.setTokensInfo?.({
          token: newToken.token,
          refreshToken: newToken.refreshToken,
          tokenExpires: newToken.tokenExpires,
        });
        headers = {
          ...headers,
          Authorization: `Bearer ${newToken.token}`,
        };
      } else {
        tokens?.setTokensInfo?.(null);
        throw new Error("Refresh token expired");
      }
    }

    return fetch(input, {
      ...init,
      headers: {
        ...headers,
        ...init?.headers,
      },
    });
  }, []);
}
export default useFetchBase;
