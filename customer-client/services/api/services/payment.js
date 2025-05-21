import { useCallback } from "react";
import { API_URL } from "../config";
import useFetchBase from "../use-fetch-base";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useGetPaymentIntent() {
  const fetchBase = useFetchBase();

  return useCallback(
    (paymentReq, requestConfig) => {
      return fetchBase(`${API_URL}/v1/stripe/create-payment-intent`, {
        method: "POST",
        body: JSON.stringify(paymentReq),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase]
  );
}
