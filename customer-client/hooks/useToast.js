import { useSnackbar } from "notistack";

export default function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Display a toast message
   * @param {string} message - The message to display in the toast
   * @param {("default"|"error"|"success"|"warning"|"info")} variant - The variant of the toast
   * @param {number} hideDuration - The duration to hide the toast
   */
  const showToast = (message, variant = "default", hideDuration = 1000) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
      autoHideDuration: hideDuration,
    });
  };

  return showToast;
}
