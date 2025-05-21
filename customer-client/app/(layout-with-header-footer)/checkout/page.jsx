import CheckoutContent from "./page-content";

export function generateMetadata() {
  return {
    title: "Checkout",
  };
}

const page = () => {
  return <CheckoutContent />;
};

export default page;
