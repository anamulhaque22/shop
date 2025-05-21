import Login from "@/views/login";

export function generateMetadata() {
  return {
    title: "Orders",
  };
}

export default function page() {
  return <Login />;
}
