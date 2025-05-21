"use client";

import { createContext } from "react";

export const FacebookContext = createContext({
  login: async () => {
    throw new Error("FacebookAuthProvider not mounted");
  },
});
