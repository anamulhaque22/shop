import { ORDER_STATUS } from "@/constants/order-status";
import moment from "moment";
const CLIENT_ORDER_STATUSES = {
  PENDING: ORDER_STATUS.PENDING,
  PROCESSING: ORDER_STATUS.PROCESSING,
  SHIPPED: ORDER_STATUS.SHIPPED,
  OUT_FOR_DELIVERY: ORDER_STATUS.OUT_FOR_DELIVERY,
  DELIVERED: ORDER_STATUS.DELIVERED,
  CANCELLED: ORDER_STATUS.CANCELLED,
  RETURNED: ORDER_STATUS.RETURNED,
};
const mapOrderStatus = (status) => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return CLIENT_ORDER_STATUSES.PENDING;
    case ORDER_STATUS.PROCESSING:
      return CLIENT_ORDER_STATUSES.PROCESSING;
    case ORDER_STATUS.COMFIRMED:
      return CLIENT_ORDER_STATUSES.PROCESSING;
    case ORDER_STATUS.SHIPPED:
      return CLIENT_ORDER_STATUSES.SHIPPED;
    case ORDER_STATUS.OUT_FOR_DELIVERY:
      return CLIENT_ORDER_STATUSES.OUT_FOR_DELIVERY;
    case ORDER_STATUS.DELIVERED:
      return CLIENT_ORDER_STATUSES.DELIVERED;
    case ORDER_STATUS.COMPLETED:
      return CLIENT_ORDER_STATUSES.DELIVERED;
    case ORDER_STATUS.CANCELLED:
      return CLIENT_ORDER_STATUSES.CANCELLED;
    case ORDER_STATUS.RETURNED:
      return CLIENT_ORDER_STATUSES.RETURNED;
    default:
      return "";
  }
};
const STATUS_MESSAGES = {
  PENDING: "Your order has been placed and is awaiting processing.",
  PROCESSING: "Your order is being processed. Please wait for updates.",
  SHIPPED: "Your order has been shipped and is on its way!",
  OUT_FOR_DELIVERY: "Your order is out for delivery. It will reach you soon.",
  DELIVERED: "Your order has been delivered successfully.",
  CANCELLED: "Your order has been cancelled.",
  RETURNED: "Your order has been returned.",
};
export default function OrderTimeLime({ status, updatedAt }) {
  const activeStatus = mapOrderStatus(status.toUpperCase());
  const statusMessage =
    STATUS_MESSAGES[activeStatus] || "Order status unknown.";
  return (
    <>
      <div className="px-5 sm:px-0">
        <ul className="timeline timeline-vertical sm:timeline-horizontal timeline-compact sm:justify-center">
          {Object.entries(CLIENT_ORDER_STATUSES)
            // .splice(0, 3)
            .map(([key, value], index) => {
              const firstStatus = index === 0;
              const lastStatus =
                index === Object.keys(CLIENT_ORDER_STATUSES).length - 1;
              const isDone =
                Object.values(CLIENT_ORDER_STATUSES).indexOf(activeStatus) >=
                index;
              const isCurrent = value === activeStatus;
              return (
                <li className="" key={index}>
                  <hr className={`${firstStatus ? "hidden" : "block"}`} />
                  <div className="timeline-middle">
                    <div
                      className={`${
                        isDone
                          ? `w-[17px] h-[17px] bg-secondary rounded-full ${
                              isCurrent && " border-[3px] border-[#CFCFCF]"
                            }`
                          : "w-[17px] h-[17px] bg-[#CFCFCF] rounded-full"
                      }`}
                    ></div>
                  </div>
                  <div className="font-causten-semi-bold text-sm timeline-end">
                    {value[0].toUpperCase() +
                      value.slice(1).toLocaleLowerCase()}
                  </div>
                  <hr className={`${lastStatus ? "hidden" : "block"}`} />
                </li>
              );
            })}
          {/* <li className="sm:w-1/5">
          <div className="timeline-middle">
            <div className="w-[20px] h-[20px] bg-secondary rounded-full"></div>
          </div>
          <div className="font-causten-semi-bold text-sm timeline-end">
            Order Placed
          </div>
          <hr />
        </li>
        <li className="sm:w-1/5">
          <hr />
          <div className="timeline-middle">
            <div className="w-[20px] h-[20px] bg-secondary rounded-full"></div>
          </div>
          <div className="font-causten-semi-bold text-sm timeline-end">
            Inprogres
          </div>
          <hr />
        </li>
        <li className="sm:w-1/5">
          <hr />
          <div className="timeline-middle">
            <div className="w-[20px] h-[20px] bg-secondary rounded-full border-[3px] border-[#CFCFCF]"></div>
          </div>
          <div className="font-causten-semi-bold text-sm timeline-end">
            Shipped
          </div>
          <hr />
        </li>
        <li className="sm:w-1/5">
          <hr />
          <div className="timeline-middle">
            <div className="w-[16px] h-[16px] bg-[#CFCFCF] rounded-full"></div>
          </div>
          <div className="font-causten-semi-bold text-sm timeline-end">
            Delivered
          </div>
        </li> */}
        </ul>
      </div>
      <div className="md:w-4/5 mx-auto rounded-lg p-5 sm:px-7 sm:py-6 bg-[#F6F6F6]">
        <p className="font-causten-semi-bold text-base text-[#807D7E]">
          {moment(updatedAt).format("D MMMM YYYY h:mm A")}{" "}
          <span className="text-secondary">{statusMessage}</span>
        </p>
      </div>
    </>
  );
}
