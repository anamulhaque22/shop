"use client";
import OrderdItems from "@/components/UserProfile/OrderdItem/OrderdItems";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";

function OrdersList() {
  return <OrderdItems />;
}
export default withPageRequiredAuth(OrdersList);
