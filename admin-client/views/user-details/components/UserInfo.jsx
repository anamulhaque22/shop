import Image from "next/image";

export default function UserInfo() {
  return (
    <div className="flex justify-evenly md:flex-col bg-content-bg px-5 py-3 rounded-xl border border-bc w-full md:w-[30%]">
      <div className="flex flex-col sm:items-center md:border-b border-bc pb-3">
        <div>
          <Image
            src={"/images/avatar-placeholder.png"}
            width={100}
            height={100}
            alt="product image"
          />
        </div>
        <div className="text-sm text-text sm:text-center space-y-1">
          <h4 className="font-medium text-base">Anamul Haque</h4>
          <p>anamul.ah00@gmail.com</p>
          <p>+88018343566</p>
        </div>
      </div>
      <div className="text-text space-y-3 py-4">
        <div>
          <h4 className="text-base font-medium">Last Order</h4>
          <p className="text-sm">
            7 days ago - <span className="text-blue-700">#53453</span>
          </p>
        </div>
        <div>
          <h4 className="text-base font-medium">Average Order Value</h4>
          <p className="text-sm">$574.00</p>
        </div>
        <div>
          <h4 className="text-base font-medium">Registered</h4>
          <p className="text-sm">$574.00</p>
        </div>
      </div>
    </div>
  );
}
