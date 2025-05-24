"use client";
import { PAYMENT_PROVIDER } from "@/constants/payment-provider";
import { useCart } from "@/context/cart/useCart";
import useToast from "@/hooks/useToast";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { usePlaceOrderService } from "@/services/api/services/order";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import SectionHeading from "../Typography/SectionHeading";
import BillingAddressForm from "./BillingAddressForm";
import OrderSummery from "./OrderSummery";
import PaymentMethod from "./PaymentMethod";

const billingAddressValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  fullAddress: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  phone: yup.string().length(11).required("Phone number is required"),
});

const Checkout = () => {
  const [paymentType, setPaymentType] = useState(PAYMENT_PROVIDER.COD);
  const [error, setError] = useState(null);
  const { cart, clearCart } = useCart();
  const fetchOrder = usePlaceOrderService();
  const showToast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const billingAddress = useForm({
    resolver: yupResolver(billingAddressValidationSchema),
    defaultValues: {
      name: "",
      fullAddress: "",
      orderNote: "",
      city: "",
      phone: "",
    },
  });

  const handleSetBillingAddressId = (id) => {
    billingAddress.setValue("billingAddressId", id);
  };

  const handlePlaceOrder = async (data) => {
    const orderData = await fetchOrder(data);
    if (orderData.status !== HTTP_CODES.CREATED) {
      showToast("Order processing failed!", "error");
      return;
    }
    clearCart();
    showToast("Order placed successfully!", "success");
    // router.push(`/orders/details/${orderData.data.id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await billingAddress.trigger();
    const billingAddressData = billingAddress.getValues();

    if (!isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    setLoading(true);

    let reqBody;

    reqBody = {
      billingAddress: {
        ...billingAddressData,
      },
      shippingAmount: billingAddressData.city === "Dhaka" ? 0 : 60,

      orderItems: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        size: {
          id: item.size.id,
        },
        color: {
          id: item.color.id,
        },
      })),
    };

    if (paymentType === PAYMENT_PROVIDER.COD) {
      handlePlaceOrder({ ...reqBody, paymentType: PAYMENT_PROVIDER.COD });
    }
    setLoading(false);
  };
  return (
    <div className="container mb-11 md:mb-24">
      <div className="flex flex-col md:flex-row gap-x-8">
        <div className="w-full lg:w-[63%]">
          {/* section heading */}
          <div className="lg:py-4">
            <SectionHeading text="Check Out" />
            <h4 className="font-core-sans-bold text-[1.375rem] text-[#3C4242] mt-2">
              Billing Details
            </h4>
          </div>

          {/* checkout form  */}
          <div>
            <FormProvider {...billingAddress}>
              <BillingAddressForm />
            </FormProvider>

            <div className="custom-divider"></div>

            <PaymentMethod
              paymentType={paymentType}
              onSetPaymentType={(type) => setPaymentType(type)}
            />
          </div>
        </div>
        {/* order summery  */}
        <OrderSummery district={billingAddress.watch("city")} />
      </div>

      <button
        type="submit"
        className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white disabled:bg-slate-600 disabled:border-slate-600 mt-8 lg:mt-10"
        onClick={handleSubmit}
        disabled={loading}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
