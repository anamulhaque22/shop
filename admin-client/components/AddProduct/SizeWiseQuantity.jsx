"use client";
export default function SizeWiseQuantity({
  info,
  onHandleSizeWiseQuantity,
  sizes,
}) {
  return (
    <div className="mt-5">
      <label htmlFor="size-wise-quantity " className="text-sm">
        Size Wise Quantity:
      </label>
      <div className="mt-1">
        {sizes?.map((s, i) => {
          return (
            <div className="flex items-center gap-x-3 mb-3" key={i}>
              <label htmlFor="size-wise-quantity " className="text-sm">
                {s?.name}:{" "}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  name="colorSizeWiseQuantity"
                  type="number"
                  id="size-wise-quantity"
                  className="w-16 text-sm bg-secondary input input-bordered h-7 focus:outline-1 focus:outline-offset-1"
                  onChange={(e) => onHandleSizeWiseQuantity(e, s)}
                  value={info.colorSizeWiseQuantity[s?.name.toLowerCase()] || 0}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
