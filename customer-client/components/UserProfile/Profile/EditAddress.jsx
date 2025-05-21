import InputText from "@/components/Input/InputText";
import { AddressType } from "@/constants/address-type";
import { Controller, FormProvider } from "react-hook-form";

export default function EditAddress({
  methods,
  onSubmit,
  onClose,
  isSubmitting,
}) {
  return (
    <dialog id="edit-address-modal" open className="modal">
      <div className="modal-box">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <InputText
                name={"firstName"}
                type="text"
                containerStyle="mt-0"
                labelTitle="First Name*"
              />

              <InputText
                name={"lastName"}
                type="text"
                containerStyle="mt-0"
                labelTitle="Last Name*"
              />

              <InputText
                name="streetAddress"
                type="text"
                containerStyle="mt-0 sm:mt-6"
                labelTitle="Street Address*"
              />

              <InputText
                name="aptSuiteUnit"
                type="text"
                containerStyle="mt-0 sm:mt-6"
                labelTitle="Apt, Suite, Unit"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <InputText
                name="city"
                type="text"
                updateType="city"
                containerStyle="mt-0 sm:mt-6"
                labelTitle="City*"
              />

              <InputText
                name="phone"
                type="text"
                containerStyle="mt-0 sm:mt-6"
                labelTitle="Phone*"
              />
            </div>

            {/* address type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <Controller
                name="addressType"
                defaultValue={AddressType.HOME}
                render={({ field, fieldState }) => (
                  <div className="form-control w-full after:mt-0 sm:mt-6">
                    <label
                      htmlFor="userName"
                      className={`label font-causten-semi-bold text-base text-[#3C4242]`}
                    >
                      Address Type*
                    </label>
                    <select
                      {...field}
                      name="addressType"
                      className="select select-bordered w-full focus:outline-none"
                    >
                      <option value={AddressType.HOME}>
                        {AddressType.HOME}
                      </option>
                      <option value={AddressType.OFFICE}>
                        {AddressType.OFFICE}
                      </option>
                      <option value={AddressType.BILLING}>
                        {AddressType.BILLING}
                      </option>
                      <option value={AddressType.SHIPPING}>
                        {AddressType.SHIPPING}
                      </option>
                    </select>
                    {fieldState?.error?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* default shipping and billing address checkbox*/}
            <div className="flex items-center mt-3">
              <label
                className="relative flex items-center rounded-full cursor-pointer"
                htmlFor="isDefaultShipping"
              >
                <Controller
                  name="isDefaultShipping"
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        name="isDefaultShipping"
                        id="isDefaultShipping"
                        type="checkbox"
                        className="before:content[''] peer relative h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none border border-[#BEBCBD] transition-all before:absolute before:top-2/4 before:left-2/4  before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity checked:border-[#3C4242] checked:bg-[#3C4242] checked:before:bg-[#3C4242] hover:before:opacity-10"
                        {...field}
                        checked={field.value}
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
                Set as default shipping address
              </label>
            </div>

            {/* default billing address checkbox*/}
            <div className="flex items-center mb-3">
              <label
                className="relative flex items-center rounded-full cursor-pointer"
                htmlFor="login"
              >
                <Controller
                  name="isDefaultBilling"
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        name="isDefaultBilling"
                        id="isDefaultBilling"
                        type="checkbox"
                        className="before:content[''] peer relative h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none border border-[#BEBCBD] transition-all before:absolute before:top-2/4 before:left-2/4  before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity checked:border-[#3C4242] checked:bg-[#3C4242] checked:before:bg-[#3C4242] hover:before:opacity-10"
                        checked={field.value}
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
                htmlFor="isDefaultBillingAddress"
              >
                Set as default billing address
              </label>
            </div>

            <div className="flex gap-x-4">
              <button
                type="submit"
                className="btn text-white disabled:bg-slate-600 disabled:border-slate-600"
                disabled={isSubmitting}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn bg-slate-700 hover:bg-slate-600"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
