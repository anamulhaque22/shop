import { PAYMENT_PROVIDER } from "@/constants/payment-provider";

const PaymentMethod = ({ paymentType, onSetPaymentType }) => {
  return (
    <div>
      <div className="mb-7">
        <h4 className="font-core-sans-bold text-[1.375rem] text-[#3C4242]">
          Payment Method
        </h4>
        <p className="font-causten-regular text-base text-[3C4242]">
          All transactions are secure and encrypted.
        </p>
      </div>
      <div className="bg-[#F6F6F6] rounded-md py-9 px-7">
        <div className="flex items-center gap-x-3">
          <input
            value={PAYMENT_PROVIDER.COD}
            onChange={() => onSetPaymentType(PAYMENT_PROVIDER.COD)}
            checked={paymentType === PAYMENT_PROVIDER.COD}
            id="cod-provider"
            type="radio"
            name="radio-1"
            className=" radio checked:border-[#3C4242] checked:bg-[#3C4242]"
          />
          <label className="mt-px cursor-pointer select-none font-causten-bold text-xl text-[#3C4242] flex flex-col">
            Cash on delivery
            <span className="font-causten-medium text-base text-[#807D7E]">
              Pay with cash upon delivery.
            </span>
          </label>
        </div>

        {/* <div className="divider"></div> */}

        {/* <div className="flex items-center gap-x-3 mb-3">
          <input
            onChange={() => onSetPaymentType(PAYMENT_PROVIDER.STRIPE)}
            value={PAYMENT_PROVIDER.STRIPE}
            checked={paymentType === PAYMENT_PROVIDER.STRIPE}
            id="stripe-provider"
            type="radio"
            name="radio-1"
            className=" radio checked:border-[#3C4242] checked:bg-[#3C4242]"
          />

          <label
            className="mt-px cursor-pointer select-none font-causten-bold text-xl text-[#3C4242] flex flex-col"
            htmlFor="ripple-off"
          >
            Stripe
          </label>
        </div> */}

        {/* cart form with cart image  */}

        {/* <div className="ml-4">
          <CardElement
            options={{
              hidePostalCode: true,
              iconStyle: "solid",
              classes: {
                base: "text-[#3C4242] font-causten-regular",
                invalid: "text-[#FF0000]",
              },
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default PaymentMethod;
