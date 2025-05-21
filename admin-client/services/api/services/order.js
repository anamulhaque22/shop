import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export const usePlaceOrderService = () => {
  const fetch = useFetch();

  return useCallback(
    (data, reqConfig) => {
      return fetch(`${API_URL}/v1/orders`, {
        method: "POST",
        body: JSON.stringify(data),
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
};

// list orders
export const useGetOrdersService = () => {
  const fetch = useFetch();

  return useCallback(
    (ordersReq, reqConfig) => {
      const requestUrl = new URL(`${API_URL}/v1/orders/`);
      if (ordersReq) {
        if (ordersReq.page)
          requestUrl.searchParams.append("page", ordersReq.page.toString());

        if (ordersReq.limit)
          requestUrl.searchParams.append("limit", ordersReq.limit.toString());

        if (ordersReq?.sort)
          requestUrl.searchParams.append(
            "sort",
            JSON.stringify(ordersReq.sort)
          );

        if (ordersReq?.filters)
          requestUrl.searchParams.append(
            "filters",
            JSON.stringify(ordersReq.filters)
          );

        if (ordersReq?.status)
          requestUrl.searchParams.append("status", ordersReq.status.toString());

        if (ordersReq?.search)
          requestUrl.searchParams.append("search", ordersReq.search.toString());
      }

      return fetch(requestUrl, {
        method: "GET",
        ...reqConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
};

// get a single order
export function useGetOrderService() {
  const fetch = useFetch();

  return useCallback(
    (orderId, requestConfig) => {
      return fetch(`${API_URL}/v1/orders/${orderId}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

// update order status
export function useUpdateOrderStatusService() {
  const fetch = useFetch();

  return useCallback(
    (orderId, status, requestConfig) => {
      return fetch(`${API_URL}/v1/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ orderStatus: status }),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}
