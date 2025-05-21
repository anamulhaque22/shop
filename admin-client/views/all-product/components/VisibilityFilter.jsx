import { ProductVisibility } from "@/constants";

export default function VisibilityFilter() {
  return (
    <select className="select !h-10 min-h-10 select-bordered w-full max-w-xs focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary">
      <option disabled selected>
        Status
      </option>
      {Object.entries(ProductVisibility).map(([key, value]) => (
        <option key={key} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
