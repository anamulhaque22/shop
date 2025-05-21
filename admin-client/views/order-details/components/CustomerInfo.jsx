import { FaUser } from "react-icons/fa6";

export default function CustomerInfo({ user }) {
  return (
    <div className="flex gap-x-2">
      <div className="h-12 w-12 bg-[#646fe465] flex justify-center items-center rounded-full">
        <FaUser className="text-xl text-[#646EE4]" />
      </div>
      <div className="text-text space-y-1">
        <p className="font-normal">
          <span className="font-semibold text-base">Name:</span> {user?.name}
        </p>
        <p className="font-normal">
          <span className="font-semibold text-base">Phone:</span> {user?.phone}
        </p>
        <p className="font-normal">
          <span className="font-semibold text-base">City:</span> {user?.city}
        </p>
        <p className="font-normal">
          <span className="font-semibold text-base">Full Address:</span>{" "}
          {user?.fullAddress}
        </p>
      </div>
    </div>
  );
}
