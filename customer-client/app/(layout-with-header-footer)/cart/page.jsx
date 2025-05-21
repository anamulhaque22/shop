import Cart from "@/components/Cart/Cart";
// import EmptyCart from "@/components/Cart/EmptyCart";
export function generateMetadata() {
  return {
    title: "Cart",
  };
}

const page = () => {
  return <Cart />;
};

export default page;
