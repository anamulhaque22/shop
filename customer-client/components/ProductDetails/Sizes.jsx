export default function Sizes({ sizes, onHandleSelectSize, size }) {
  return (
    <div className="space-y-4 lg:space-y-5">
      <div className="flex gap-5 items-center">
        <h4 className="font-causten-semi-bold text-base lg:text-[1.125rem] text-[#3F4646]">
          Select Size
        </h4>
        {/* <div className="flex gap-4 items-center">
          <h4 className="font-causten-medium text-base lg:text-[1.125rem] text-[#807D7E]">
            Size Guide{" "}
          </h4>
          <Image
            src={"/images/icon/arrow/right.svg"}
            width={16}
            height={12}
            alt="right arrow"
          />
        </div> */}
      </div>
      <div className="flex gap-5 font-causten-medium text-sm text-[#3C4242]">
        {sizes?.map((item) => (
          <span
            key={item?.id}
            onClick={() => onHandleSelectSize(item)}
            className={
              "cursor-pointer w-[40px] h-[40px] flex justify-center items-center text-center border border-[#BEBCBD] rounded-xl " +
              (size?.name === item.name
                ? "bg-[#3C4242] border-[#3C4242] text-white"
                : "")
            }
          >
            {item?.name}
          </span>
        ))}
      </div>
    </div>
  );
}
