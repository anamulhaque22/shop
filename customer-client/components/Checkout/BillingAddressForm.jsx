import { useQuery } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";
import InputText from "../Input/InputText";
import TextAreaInput from "../Input/TextAreaInput";

export default function BillingAddressForm({ isShipping = false }) {
  const { control } = useFormContext();
  // Fetch districts using TanStack Query
  // Fetch districts using TanStack Query
  const {
    data: districts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/districts`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch districts");
      }
      return response.json(); // Assuming the API returns JSON data
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });

  const sortedDistricts = districts.length
    ? [...districts].sort((a, b) => a.name.localeCompare(b.name))
    : [];
  return (
    <form>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <InputText
          name={"name"}
          type="text"
          containerStyle="mt-0"
          labelTitle="First Name*"
        />
        <InputText
          name="phone"
          type="text"
          containerStyle="mt-0"
          labelTitle="Phone*"
        />

        {/* <InputText
          name={"lastName"}
          type="text"
          containerStyle="mt-0"
          labelTitle="Last Name*"
        /> */}

        <div className="form-control w-full mt-0 sm:mt-6">
          <label
            htmlFor="city"
            className="label font-causten-semi-bold text-base text-[#3C4242]"
          >
            City
          </label>
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <select
                  {...field}
                  className="select select-bordered w-full focus:outline-none"
                  disabled={
                    isLoading || isError || sortedDistricts.length === 0
                  }
                  onKeyDown={(e) => {
                    const letter = e.key.toLowerCase();
                    const currentIndex = sortedDistricts.findIndex(
                      (district) => district.name === field.value
                    );

                    // Find the next district starting with the pressed letter
                    const nextIndex = sortedDistricts.findIndex(
                      (district, index) =>
                        index > currentIndex &&
                        district.name.toLowerCase().startsWith(letter)
                    );

                    // If no match is found after the current index, start from the beginning
                    const fallbackIndex = sortedDistricts.findIndex(
                      (district) =>
                        district.name.toLowerCase().startsWith(letter)
                    );

                    // Update the selected value
                    if (nextIndex !== -1) {
                      field.onChange(sortedDistricts[nextIndex].name);
                    } else if (fallbackIndex !== -1) {
                      field.onChange(sortedDistricts[fallbackIndex].name);
                    }
                  }}
                >
                  <option value="" disabled>
                    {isLoading
                      ? "Loading cities..."
                      : isError || sortedDistricts.length === 0
                      ? "No cities available"
                      : "Select your city"}
                  </option>
                  {sortedDistricts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {fieldState?.error?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <InputText
          name="fullAddress"
          type="text"
          containerStyle="mt-0 sm:mt-6"
          labelTitle="Full Address*"
        />

        {/* <InputText
          name="aptSuiteUnit"
          type="text"
          containerStyle="mt-0 sm:mt-6"
          labelTitle="Apt, Suite, Unit"
        /> */}
      </div>

      <TextAreaInput
        containerStyle="mt-6"
        labelTitle={"Order notes (optional)"}
        labelStyle={"text-base text-[#3C4242] font-causten-semi-bold"}
        placeholder={"Notes about your order, e.g. special notes for delivery."}
      />
      {/* <input
                  className="btn mt-7 mb-5"
                  type="button"
                  value="Continue to delivery"
                /> */}
      {/* {!isShipping && (
        <div className="flex items-center">
          <label
            className="relative flex items-center rounded-full cursor-pointer"
            htmlFor="login"
          >
            <Controller
              name="saveInfoForFasterCheckout"
              defaultValue={false}
              render={({ field, fieldState }) => (
                <>
                  <input
                    name="saveInfoForFasterCheckout"
                    id="login"
                    type="checkbox"
                    className="before:content[''] peer relative h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none border border-[#BEBCBD] transition-all before:absolute before:top-2/4 before:left-2/4  before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity checked:border-[#3C4242] checked:bg-[#3C4242] checked:before:bg-[#3C4242] hover:before:opacity-10"
                    {...field}
                  />
                  {fieldState?.error?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <label
            className="ml-3 mt-px font-causten-regular text-lg cursor-pointer select-none"
            htmlFor="login"
          >
            Save my information for a faster checkout
          </label>
        </div>
      )} */}
    </form>
  );
}
