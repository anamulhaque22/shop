"use client";

import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  isLoaded: true,
});

export const AuthActionsContext = createContext({
  setUser: () => {},
  logOut: () => {},
});

export const AuthTokensContext = createContext({
  tokensInfoRef: {
    current: {
      token: null,
      refreshToken: null,
      tokenExpires: null,
    },
  },
  setTokensInfo: () => {},
});
