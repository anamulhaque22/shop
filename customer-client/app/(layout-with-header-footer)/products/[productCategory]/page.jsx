import ListOfProductPageLayout from "@/components/ListOfProduct/ListOfProductPageLayout";

export function generateMetadata() {
  return {
    title: "Products",
  };
}

const page = ({ params }) => {
  return <ListOfProductPageLayout productCategory={params.productCategory} />;
};

export default page;
