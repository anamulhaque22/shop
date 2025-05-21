import { SIZES } from "@/constants";

export default function SizesInput({ setValue, getValues, name: fieldName }) {
  const handleSelectSize = ({ name, id }) => {
    const currentSizes = getValues(fieldName) || [];
    const isSelected = currentSizes.some((size) => size.id === id);

    const updatedSizes = isSelected
      ? currentSizes.filter((size) => size.id !== id) // Remove size
      : [...currentSizes, { name, id }]; // Add size

    setValue(fieldName, updatedSizes, { shouldValidate: true });
  };

  const selectedSizes = getValues(fieldName) || [];

  return (
    <div>
      <p className="text-text text-sm mb-2">Size: </p>
      <div className="flex gap-x-3">
        {Object.entries(SIZES).map(([name, id]) => (
          <div key={id}>
            <input
              type="checkbox"
              id={name}
              hidden
              onClick={() => handleSelectSize({ name, id })}
            />
            <label
              htmlFor={name}
              className={`flex items-center justify-center w-10 h-10 rounded-md text-text text-xs cursor-pointer ${
                selectedSizes.some((size) => size.id === id)
                  ? "dark:bg-[#3b82f633] bg-[#eff6ff] border dark:border-[#1d4ed8] border-[#93c5fd]"
                  : "border border-bc dark:bg-transparent bg-[#F8F9FA]"
              }`}
              aria-pressed={selectedSizes.some((size) => size.id === id)}
            >
              {name.toUpperCase()}
            </label>
          </div>
        ))}
      </div>
    </div>

    // <div className="basis-1/2">
    //   <p className="text-text text-sm mb-2">Size: </p>
    //   <div className="flex gap-x-3">
    //     {Object.entries(SIZES).map(([key, id], i) => (
    //       <div key={i}>
    //         <input
    //           type="checkbox"
    //           name="size"
    //           value={key}
    //           id={key}
    //           hidden
    //           onClick={() => handleSelectSize({ key, id })}
    //         />
    //         <label
    //           htmlFor={key}
    //           className={`flex items-center justify-center w-10 h-10 rounded-md  text-text text-xs cursor-pointer ${
    //             sizes.some((s) => s.id === id)
    //               ? "dark:bg-[#3b82f633] bg-[#eff6ff] border dark:border-[#1d4ed8] border-[#93c5fd]"
    //               : "border border-bc dark:bg-transparent bg-[#F8F9FA]"
    //           }`}
    //         >
    //           {key.toUpperCase()}
    //         </label>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
