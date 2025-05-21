import Categories from "@/views/categories";

export function generateMetadata() {
  return {
    title: "Categories",
  };
}

export default function InternalPage() {
  return <Categories />;
}
