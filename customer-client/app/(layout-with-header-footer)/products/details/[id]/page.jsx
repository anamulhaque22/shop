import ProductDetailsContain from "./pgae-content";

export function generateMetadata() {
  return {
    title: "Product Details",
  };
}

const InternalPage = () => {
  return <ProductDetailsContain />;
};

export default InternalPage;
