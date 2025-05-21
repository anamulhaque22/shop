import useAuth from "@/services/auth/use-auth";
import Image from "next/image";
import Link from "next/link";

const PersonalDetails = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row justify-between custom-shadow  py-6 px-5 rounded-lg">
      <div className="md:w-3/5">
        <h3 className="font-causten-bold text-2xl text-[#3C4242] mb-3">
          Personal Details
        </h3>
        <div className="flex flex-col md:flex-row justify-between md:gap-5">
          <div>
            <p className="text-base font-causten-bold">
              First Name{" "}
              <span className="font-causten-regular ml-2">
                {user?.firstName && user?.firstName}
              </span>
            </p>
            <p className="text-base font-causten-bold">
              Last Name{" "}
              <span className="font-causten-regular ml-2">
                {user?.lastName && user?.lastName}
              </span>
            </p>
          </div>
          <div>
            <p className="text-base font-causten-bold">
              Phone{" "}
              <span className="font-causten-regular ml-2">
                {user?.phone && user?.phone}
              </span>
            </p>
            <p className="text-base font-causten-bold">
              Email{" "}
              <span className="font-causten-regular ml-2">
                {user?.email && user?.email}
              </span>
            </p>
          </div>
        </div>
      </div>
      <Link href={"/edit-profile"} className="btn">
        Edit Profile
        <Image
          src={"/images/icon/edit.png"}
          width={18}
          height={18}
          alt="edit icon"
          className="text-white"
        />
      </Link>
    </div>
  );
};

export default PersonalDetails;
