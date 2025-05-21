"use client";
import { useCart } from "@/context/cart/useCart";
import Image from "next/image";

export default function OrderSummery({ district }) {
  const { cart } = useCart();
  const subTotal = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log("district", district);
  const shippingCost = !!district
    ? district.toLowerCase() === "dhaka"
      ? 60
      : 100
    : 0;
  return (
    <div className="w-full lg:w-[43%]">
      <div className="shadow-md shadow-[#EDEEF2] px-5 py-10 mt-6">
        <h3 className="font-core-sans-bold text-2xl text-[#3C4242]">
          Order Summary
        </h3>
        <div className="custom-divider"></div>

        <div className="flex flex-col">
          {cart?.map((item) => (
            <>
              <div
                className="flex gap-x-5 items-center justify-between"
                key={item?.productId}
              >
                <div className="flex items-center gap-x-4">
                  <Image
                    className="rounded-md"
                    src={item?.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "65px", height: "65px" }}
                    alt="image"
                  />
                  <div>
                    <div className="flex items-center content-center">
                      <h4 className="font-causten-bold text-sm text-[#3C4242]">
                        {item?.title}
                      </h4>
                      <span className="font-causten-bold text-sm text-[#807D7E] px-1">
                        x
                      </span>
                      <span className="font-causten-bold text-sm text-[#807D7E]">
                        {item?.quantity}
                      </span>
                    </div>
                    <h4 className="font-causten-bold text-sm text-[#3C4242]">
                      Color:{" "}
                      <span className="text-[#807D7E]">
                        {item?.color?.colorName}
                      </span>
                    </h4>
                  </div>
                </div>
                <span className="font-causten-bold text-sm text-[#807D7E]">
                  TK {item?.price}
                </span>
              </div>
              <div className="custom-divider"></div>
            </>
          ))}

          <div>
            <div className="flex gap-x-5 items-center justify-between">
              <h4 className="font-causten-bold text-lg text-[#3C4242]">
                Subtotal{" "}
                <span className="font-causten-semi-bold text-[#807D7E]">
                  ({cart?.length} items)
                </span>
              </h4>
              <span className="font-causten-bold text-lg text-[#3C4242]">
                TK{subTotal}
              </span>
            </div>
            {/* <div className="flex gap-x-5 items-center justify-between">
              <h4 className="font-causten-bold text-lg text-[#3C4242]">
                Savings
              </h4>
              <span className="font-causten-bold text-lg text-[#3C4242]">
                TK -0.00
              </span>
            </div> */}
          </div>
          <div className="custom-divider"></div>
          <div className="flex gap-x-5 items-center justify-between">
            <h4 className="font-causten-bold text-lg text-[#3C4242]">
              Shipping
            </h4>
            <span className="font-causten-bold text-lg text-[#3C4242]">
              TK {shippingCost}
            </span>
          </div>
          <div className="custom-divider"></div>
          <div className="flex gap-x-5 items-center justify-between">
            <h4 className="font-causten-bold text-lg text-[#3C4242]">Total</h4>
            <span className="font-causten-bold text-lg text-[#3C4242]">
              TK {subTotal + shippingCost}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
