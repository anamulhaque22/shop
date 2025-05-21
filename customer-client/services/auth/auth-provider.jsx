"use client";

import Cookies from "js-cookie";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AUTH_LOGOUT_URL, AUTH_ME_URL } from "../api/config";
import HTTP_CODES from "../api/constants/http-codes";
import useFetchBase from "../api/use-fetch-base";
import {
  AuthActionsContext,
  AuthContext,
  AuthTokensContext,
} from "./auth-context";

function AuthProvider(props) {
  const AUTH_TOKEN_KEY = "auth-token-key";
  const [tabId] = useState(() => Math.random().toString(36).slice(2));
  const [broadcastChannel] = useState(
    () => new BroadcastChannel(AUTH_TOKEN_KEY)
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const tokensInfoRef = useRef({
    token: null,
    refreshToken: null,
    tokenExpires: null,
  });
  const fetchBase = useFetchBase();

  const setTokensInfoRef = useCallback((tokens) => {
    tokensInfoRef.current = tokens ?? {
      token: null,
      refreshToken: null,
      tokenExpires: null,
    };
  }, []);

  const setTokensInfo = useCallback(
    (tokenInfo) => {
      setTokensInfoRef(tokenInfo);
      broadcastChannel.postMessage({
        tabId,
        tokens: tokenInfo,
      });
      if (tokenInfo) {
        Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(tokenInfo));
      } else {
        Cookies.remove(AUTH_TOKEN_KEY);
        setUser(null);
      }
    },
    [setTokensInfoRef, broadcastChannel, tabId]
  );

  const logOut = useCallback(async () => {
    if (tokensInfoRef.current.token) {
      await fetchBase(
        AUTH_LOGOUT_URL,
        {
          method: "POST",
        },
        {
          token: tokensInfoRef.current.token,
          refreshToken: tokensInfoRef.current.refreshToken,
          tokenExpires: tokensInfoRef.current.tokenExpires,
        }
      );
    }
    setTokensInfo(null);
  }, [setTokensInfo, fetchBase]);

  const loadData = useCallback(async () => {
    const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? "null");
    setTokensInfoRef(tokens);

    try {
      if (tokens?.token) {
        const response = await fetchBase(
          AUTH_ME_URL,
          {
            method: "GET",
          },
          {
            token: tokens.token,
            refreshToken: tokens.refreshToken,
            tokenExpires: tokens.tokenExpires,
            setTokensInfo,
          }
        );

        if (response.status === HTTP_CODES.UNAUTHORIZED) {
          logOut();
          return;
        }
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      logOut();
    } finally {
      setIsLoaded(true);
    }
  }, [fetchBase, setTokensInfo, setTokensInfoRef, logOut]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const onMessage = (event) => {
      if (event.data.tabId === tabId) return;
      if (!event.data.tokens) setUser(null);
      setTokensInfoRef(event.data.tokens);
    };

    broadcastChannel.addEventListener("message", onMessage);

    return () => {
      broadcastChannel.removeEventListener("message", onMessage);
    };
  }, [broadcastChannel, setTokensInfoRef, tabId]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
    }),
    [isLoaded, user]
  );
  const contextActionsValue = useMemo(
    () => ({
      setUser,
      logOut,
    }),
    [logOut]
  );
  const contextTokensValue = useMemo(
    () => ({
      tokensInfoRef,
      setTokensInfo,
    }),
    [setTokensInfo]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthActionsContext.Provider value={contextActionsValue}>
        <AuthTokensContext.Provider value={contextTokensValue}>
          {props.children}
        </AuthTokensContext.Provider>
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
