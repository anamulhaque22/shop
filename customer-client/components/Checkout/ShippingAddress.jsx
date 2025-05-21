const ShippingAddress = ({
  isShippingAddressDifferent,
  handleDifferentShippingAddress,
}) => {
  return (
    <div>
      <div className="mb-7">
        <h4 className="font-core-sans-bold text-[1.375rem] text-[#3C4242]">
          Shipping Address
        </h4>
        <p className="font-causten-regular text-base text-[3C4242]">
          Select the address that matches your card or payment method.
        </p>
      </div>
      <div className="bg-[#F6F6F6] rounded-md py-9 px-7">
        <div className="flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="ripple-on"
            // dataRippleDark="true"
          >
            <input
              onChange={() => handleDifferentShippingAddress(false)}
              checked={!isShippingAddressDifferent}
              id="ripple-on"
              name="ripple"
              type="radio"
              className="before:content[''] peer relative h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none rounded-full border border-[#3C4242] text-[#3C4242] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3C4242] checked:before:bg-[#3C4242] hover:before:opacity-10"
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#3C4242] opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
              </svg>
            </div>
          </label>
          <label
            className="mt-px cursor-pointer select-none font-causten-bold text-xl text-[#3C4242]"
            htmlFor="ripple-on"
          >
            Same as Billing address
          </label>
        </div>
        <div className="divider"></div>
        <div className="flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="ripple-off"
          >
            <input
              onChange={() => handleDifferentShippingAddress(true)}
              checked={isShippingAddressDifferent}
              id="ripple-off"
              name="ripple"
              type="radio"
              className="before:content[''] peer relative h-[1.125rem] w-[1.125rem] cursor-pointer appearance-none rounded-full border border-[#3C4242] text-[#3C4242] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#3C4242] checked:before:bg-[#3C4242] hover:before:opacity-10"
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#3C4242] opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle dataname="ellipse" cx="8" cy="8" r="8"></circle>
              </svg>
            </div>
          </label>
          <label
            className="mt-px cursor-pointer select-none font-causten-bold text-xl text-[#3C4242]"
            htmlFor="ripple-off"
          >
            Use a different shipping address
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
