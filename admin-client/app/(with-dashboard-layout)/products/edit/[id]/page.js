import EditProduct from "@/views/edit-product";

export function generateMetadata() {
  return {
    title: "Edit Product",
  };
}

export default function InternalPage() {
  return <EditProduct />;
}
