import Image from "next/image";

export default function Ratting() {
  return (
    <div className="flex items-center gap-5 lg:gap-6">
      <div className="flex items-center gap-[5px]">
        <Image
          src="/images/icon/star/star-full.png"
          alt="Feedback"
          width={22}
          height={22}
        />
        <Image
          src="/images/icon/star/star-full.png"
          alt="Feedback"
          width={22}
          height={22}
        />
        <Image
          src="/images/icon/star/star-full.png"
          alt="Feedback"
          width={22}
          height={22}
        />
        <Image
          src="/images/icon/star/star-full.png"
          alt="Feedback"
          width={22}
          height={22}
        />
        <Image
          src="/images/icon/star/star-full.png"
          alt="Feedback"
          width={22}
          height={22}
        />
        <span className="font-causten-medium text-base lg:text-[1.125rem] text-[#807D7E] ml-[5px]">
          3.5
        </span>
      </div>

      <div className="flex items-center gap-[15px]">
        <Image
          src={"/images/icon/message.png"}
          width={20}
          height={17}
          alt="message icon"
        />
        <span className="font-causten-medium text-[1rem] lg:text-[1.125rem] text-[#807D7E]">
          120 comment
        </span>
      </div>
    </div>
  );
}
