import OrderList from "./page-content";

export function generateMetadata() {
  return {
    title: "My Orders",
  };
}

const Orders = () => {
  return <OrderList />;
};

export default Orders;
