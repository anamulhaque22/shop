import { useCallback } from "react";
import { API_URL } from "../config";
import useFetch from "../use-fetch";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export function useGetBestSellingProducts() {
  const fetch = useFetch();
  return useCallback(
    (requestConfig) => {
      return fetch(`${API_URL}/v1/analytics/best-selling-products/`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useGetMonthlyRevenue() {
  const fetch = useFetch();
  return useCallback(
    (requestConfig) => {
      return fetch(`${API_URL}/v1/analytics/monthly-revenue/`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}

export function useGetDashboardMetrics() {
  const fetch = useFetch();
  return useCallback(
    (requestConfig) => {
      return fetch(`${API_URL}/v1/analytics/dashboard-metrics/`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse);
    },
    [fetch]
  );
}
