import OrderDetails from "@/views/order-details";

export function generateMetadata() {
  return {
    title: "Order Details",
  };
}

export default function InternalOrderDetailsPage() {
  return <OrderDetails />;
}
