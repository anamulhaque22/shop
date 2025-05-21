import Image from "next/image";

const TitleFilterFor = ({ title, icon }) => {
  return (
    <div className="border-y border-y-secondary-lighter">
      <div className="flex justify-between px-7 py-5">
        <h4 className="font-causten-semi-bold text-[1.375rem] text-secondary-light">
          {title}
        </h4>
        {icon ? (
          <Image src={icon} width={18} height={18} alt="filter icon" />
        ) : (
          <Image
            src={"/images/icon/chevron/up.svg"}
            width={18}
            height={18}
            alt="icon"
            className="h-auto w-auto"
          />
        )}
      </div>
    </div>
  );
};

export default TitleFilterFor;
