import useAuthActions from "@/services/auth/use-auth-actions";
import Image from "next/image";
import Link from "next/link";

const UserProfileNav = () => {
  const { logOut } = useAuthActions();
  return (
    <ul className="user-account menu p-0">
      <li>
        <Link
          href={"/my-profile"}
          className="bg-[#F6F6F6] hover:bg-[#F6F6F6] font-causten-semi-bold text-[#807D7E] hover:text-[#807D7E] text-lg"
        >
          <Image
            src={"/images/icon/user.svg"}
            width={0}
            height={0}
            alt="image"
            className="w-[20px] h-[20px] mr-2"
          />
          My Profile
        </Link>
      </li>
      <li>
        <Link
          href={"/orders"}
          className=" hover:bg-[#F6F6F6] font-causten-semi-bold text-[#807D7E] hover:text-[#807D7E] text-lg hover:rounded-r-md hover:rounded-l-none"
        >
          <Image
            src={"/images/icon/myorders.svg"}
            width={0}
            height={0}
            alt="image"
            className="w-[20px] h-[20px] mr-2"
          />
          Orders
        </Link>
      </li>
      <li>
        <Link
          href={"/wish-list"}
          className=" hover:bg-[#F6F6F6] font-causten-semi-bold text-[#807D7E] hover:text-[#807D7E] text-lg hover:rounded-r-md hover:rounded-l-none"
        >
          <Image
            src={"/images/icon/heart.svg"}
            width={20}
            height={0}
            alt="image"
            className="h-[20px] mr-2 w-auto"
          />
          Wish List
        </Link>
      </li>
      <li>
        <button
          onClick={logOut}
          className=" hover:bg-[#F6F6F6] font-causten-semi-bold text-[#807D7E] hover:text-[#807D7E] text-lg hover:rounded-r-md hover:rounded-l-none"
        >
          <Image
            src={"/images/icon/signout.svg"}
            width={0}
            height={0}
            alt="image"
            className="w-[20px] h-[20px] mr-2"
          />
          Sign Out
        </button>
      </li>
    </ul>
  );
};

export default UserProfileNav;
