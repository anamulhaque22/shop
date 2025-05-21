const ShippingMethod = () => {
  return (
    <div>
      <div className="mb-7">
        <h4 className="font-core-sans-bold text-[1.375rem] text-[#3C4242]">
          Shipping Method
        </h4>
      </div>
      <div className="bg-[#F6F6F6] rounded-md py-9 px-7">
        <p
          className="mt-px cursor-pointer select-none font-causten-bold text-xl text-[#3C4242]"
          htmlFor="ripple-on"
        >
          Arrives by Monday, June 7
        </p>
        <div className="divider"></div>
        <p
          className="mt-px cursor-pointer select-none font-causten-bold text-xl text-[#3C4242] flex justify-between"
          htmlFor="ripple-on"
        >
          <span>Delivery Charges</span> <span>$5.00</span>
        </p>
        <p className="font-causten-medium text-base text-[#807D7E]">
          Additional fess may apply
        </p>
      </div>
    </div>
  );
};

export default ShippingMethod;
