import Image from "next/image";
import FilterSection from "./FilterSection";
const dressStyle = [
  {
    name: "Classic",
  },
  {
    name: "Casual",
  },
  {
    name: "Business",
  },
  {
    name: "Sport",
  },
  {
    name: "Elegant",
  },
  {
    name: "Formal (evening)",
  },
];

const DressStyleFilter = () => {
  return (
    <FilterSection title="Dress Style">
      <div className="flex justify-between px-7 py-10">
        <ul className="w-full space-y-[18px]">
          {dressStyle.map((d) => (
            <li key={d.name} className="flex justify-between">
              <span className="font-causten-semi-bold text-base text-[#8A8989] cursor-pointer">
                {d.name}
              </span>
              <Image
                src={"/images/icon/chevron/right.svg"}
                width={18}
                height={18}
                alt="filter icon"
              />
            </li>
          ))}
        </ul>
      </div>
    </FilterSection>
  );
};

export default DressStyleFilter;
