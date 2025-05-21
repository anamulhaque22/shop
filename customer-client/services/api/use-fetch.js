"use client";
import { useCallback } from "react";
import useAuthTokens from "../auth/use-auth-tokens";
import useFetchBase from "./use-fetch-base";

function useFetch(data) {
  const { tokensInfoRef, setTokensInfo } = useAuthTokens();
  const fetchBase = useFetchBase();

  const fetchWrapper = useCallback(
    async (input, init) => {
      return fetchBase(input, init, {
        token: tokensInfoRef.current?.token,
        refreshToken: tokensInfoRef.current?.refreshToken,
        tokenExpires: tokensInfoRef.current?.tokenExpires,
        setTokensInfo,
      });
    },
    [fetchBase, tokensInfoRef, setTokensInfo]
  );

  return fetchWrapper;
}

export default useFetch;
