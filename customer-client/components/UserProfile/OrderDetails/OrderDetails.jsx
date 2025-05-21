"use client";
import Loading from "@/components/Loading/Loading";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useGetOrderService } from "@/services/api/services/order";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import OrderTimeLime from "./OrderTimeLime";

const OrderDetails = () => {
  const params = useParams();
  const fetchGetOrder = useGetOrderService();
  const [order, setOrder] = useState(null);
  const orderId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      setLoading(true);
      try {
        const { status, data: order } = await fetchGetOrder(orderId);

        if (status === HTTP_CODES.OK) {
          setOrder(order);
        }
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [orderId, fetchGetOrder]);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return order ? (
    <div className="flex flex-col gap-y-5 md:gap-y-10 custom-shadow py-6 px-5 rounded-lg">
      <div className="">
        <h3 className="font-core-sans-bold text-[1.75rem] flex items-center">
          <Link href={"/orders"} className="mr-2">
            <Image
              src={"/images/icon/chevron/left.svg"}
              width={20}
              height={10}
              alt="left arrow"
            />
          </Link>
          Order Details
        </h3>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-[#F6F6F6] p-5 sm:px-8 sm:py-7 rounded-lg">
        <div>
          <h3 className="font-causten-semi-bold text-xl text-secondary">
            Order no: #{order.id}
          </h3>
          <p className="font-causten-regular text-base text-[#BEBCBD]">
            Placed On {moment(order?.createdAt).format("D MMM YYYY h:mm A")}
          </p>
        </div>
        <p className="font-causten-semi-bold text-lg text-secondary">
          <span className="text-[#807D7E]">Total:</span> ${order.totalAmount}
        </p>
      </div>

      {/* order status timeline  */}
      <OrderTimeLime status={order.status} updatedAt={order?.updatedAt} />

      <div className="flex flex-col bg-[#F6F6F6] p-5 sm:px-8 sm:py-7 rounded-lg">
        {order?.orderItems?.map((item, index) => {
          const isLastItem = index === order?.orderItems?.length - 1;
          return (
            <>
              <div
                className="flex flex-col sm:flex-row gap-x-5 justify-between"
                key={item.id}
              >
                <div className="flex flex-col sm:flex-row gap-x-4">
                  <Image
                    src={item?.product?.images?.[0]?.imageUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="image"
                    className="w-full h-[250px] sm:w-[102px] sm:h-[102px] mb-3 sm:mb-0"
                  />
                  <div>
                    <h4 className="font-causten-bold text-base text-[#3C4242]">
                      {item?.product?.title}
                    </h4>
                    <div className="flex flex-row sm:flex-col justify-between">
                      <p className="font-causten-bold text-base text-[#3C4242] ">
                        Color:{" "}
                        <span className="font-causten-regular text-[#807D7E]">
                          {item?.color}
                        </span>
                      </p>
                      <p className="font-causten-bold text-base text-[#3C4242] ">
                        Size:{" "}
                        <span className="font-causten-regular text-[#807D7E]">
                          {item?.size}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col justify-between">
                  <span className="font-causten-bold text-base sm:text-[1.375rem] text-[#3C4242]">
                    Qty:{" "}
                    <span className="font-causten-regular text-[#807D7E]">
                      {item?.quantity}
                    </span>
                  </span>
                  <span className="font-causten-bold text-base sm:text-[1.375rem] text-[#3C4242] block sm:hidden">
                    Amount:{" "}
                    <span className="font-causten-regular text-[#807D7E]">
                      ${item?.price}
                    </span>
                  </span>
                </div>
                <span className="font-causten-bold text-base sm:text-[1.375rem] text-[#807D7E] hidden sm:block">
                  ${item?.price}
                </span>
              </div>
              <div
                className={`  ${
                  isLastItem
                    ? "hidden"
                    : "custom-divider before:bg-[#BEBCBD] after:bg-[#BEBCBD]"
                }`}
              ></div>
            </>
          );
        })}
      </div>
    </div>
  ) : (
    <h3 className="text-center"> No order found! </h3>
  );
};

export default withPageRequiredAuth(OrderDetails);
