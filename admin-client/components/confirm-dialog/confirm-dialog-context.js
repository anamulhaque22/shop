"use client";

import { createContext } from "react";

export const ConfirmDialogActionsContext = createContext({
  confirmDialog: () => Promise.reject(false),
});
