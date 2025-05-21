import MyProfile from "./page-context";

export function generateMetadata() {
  return {
    title: "My Profile",
  };
}

const page = () => {
  return <MyProfile />;
};

export default page;
