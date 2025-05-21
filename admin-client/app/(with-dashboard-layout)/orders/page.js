import OrderListContent from "./page-content";

export function generateMetadata() {
  return {
    title: "Orders",
  };
}

export default function InternalOrderListPage() {
  return <OrderListContent />;
}
