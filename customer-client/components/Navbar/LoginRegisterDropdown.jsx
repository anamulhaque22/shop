import Link from "next/link";
import { LuUser2 } from "react-icons/lu";

export default function LoginRegisterDropdown() {
  return (
    <div className="dropdown dropdown-bottom dropdown-left">
      <div tabIndex={0} role="button" className="cursor-pointer">
        <LuUser2 size={22} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-md z-[1] p-2 shadow space-y-0"
      >
        <li>
          <Link
            className="py-1 checked:!bg-none active:!bg-transparent target:!bg-none text-secondary active:!text-secondary"
            href={"/login"}
          >
            Login
          </Link>
        </li>
        <li>
          <Link className="py-1" href={"/register"}>
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
}
