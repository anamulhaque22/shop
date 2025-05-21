import UserInfo from "./components/UserInfo";
import UserOrder from "./components/UserOrder";

export default function UserDetails() {
  return (
    <div className="pt-8 px-6">
      <div className="flex flex-col md:flex-row items-start justify-center gap-y-5 md:gap-y-0 gap-x-5">
        <UserInfo />
        <UserOrder />
      </div>
    </div>
  );
}
