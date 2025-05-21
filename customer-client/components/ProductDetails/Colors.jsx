export default function Colors({
  colors,
  onHandleColor,
  color,
  size,
  isColorExistOfSize,
}) {
  return (
    <div className="space-y-2">
      <h4 className="font-causten-semi-bold text-base lg:text-[1.125rem] text-[#3F4646]">
        Select Color
      </h4>
      <div className="flex gap-5 font-causten-medium text-sm text-[#3C4242]">
        {colors?.map((item) =>
          item?.colorName !== "white" ? (
            <span
              key={item?.id}
              style={{
                border: `${
                  color?.id === item?.id
                    ? `1px solid ${item.colorCode}`
                    : "none"
                }`,
              }}
              onClick={() => onHandleColor(item)}
              className={
                "tooltip tooltip-top w-[30px] h-[30px] flex justify-center items-center text-center border border-[#BEBCBD] rounded-full" +
                (!isColorExistOfSize(item.colorSizeWiseQuantity)
                  ? ""
                  : " cursor-pointer")
              }
              data-tip={item.colorName}
            >
              <span
                className={`w-[22px] h-[22px] rounded-full ${
                  !isColorExistOfSize(item.colorSizeWiseQuantity) && "cross"
                }`}
                style={{ backgroundColor: item.colorCode }}
              ></span>
            </span>
          ) : (
            <span
              key={index}
              onClick={() => setColor(item)}
              className={
                " w-[30px] h-[30px] flex justify-center items-center text-center border border-[#BEBCBD] rounded-full"
              }
            >
              <span
                className="w-[22px] h-[22px] rounded-full"
                style={{ backgroundColor: item }}
              ></span>
            </span>
          )
        )}
      </div>
    </div>
  );
}
