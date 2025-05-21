"use client";
import { useCallback, useMemo, useRef, useState } from "react";

const { ConfirmDialogActionsContext } = require("./confirm-dialog-context");

function ConfirmDialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const resolveRef = useRef();

  const defaultConfirmDialogInfo = useMemo(
    () => ({
      title: "title",
      message: "message",
      successButtonText: "Yes",
      cancelButtonText: "No",
    }),
    []
  );

  const [confirmDialogInfo, setConfirmDialogInfo] = useState(
    defaultConfirmDialogInfo
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const onCancel = () => {
    setIsOpen(false);
    resolveRef.current?.(false);
  };

  const onSuccess = () => {
    setIsOpen(false);
    resolveRef.current?.(true);
  };

  const confirmDialog = useCallback(
    (options) => {
      return new Promise((resolve) => {
        setConfirmDialogInfo({
          ...defaultConfirmDialogInfo,
          ...options,
        });
        setIsOpen(true);
        resolveRef.current = resolve;
      });
    },
    [defaultConfirmDialogInfo]
  );

  const contextActions = useMemo(
    () => ({
      confirmDialog,
    }),
    [confirmDialog]
  );
  return (
    <>
      <ConfirmDialogActionsContext.Provider value={contextActions}>
        {children}
      </ConfirmDialogActionsContext.Provider>

      {isOpen && (
        <dialog id="my_modal" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">{confirmDialogInfo.title}</h3>
            <p className="py-4">{confirmDialogInfo.message}</p>
            <div className="modal-action">
              <button className="btn" onClick={onCancel}>
                {confirmDialogInfo.cancelButtonText}
              </button>
              <button className="btn btn-primary" onClick={onSuccess}>
                {confirmDialogInfo.successButtonText}
              </button>
            </div>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
          >
            <button>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}

export default ConfirmDialogProvider;
