import Image from "next/image";

export default function OrderdProducts({
  orderItems,
  orderStatus,
  shippingCost,
}) {
  const subtotal = orderItems.reduce((acc, item) => {
    const discountedPrice =
      Number(item?.price) -
      (Number(item?.price) * Number(item?.discount)) / 100;
    return acc + discountedPrice * item?.quantity;
  }, 0);
  return (
    <div className="overflow-x-auto w-full text-text bg-content-bg rounded-xl border border-bc p-4">
      <table className="table w-full ">
        <thead>
          <tr className="text-text bg-[#F7F8F9] dark:bg-[#32394E] border-none">
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item) => (
            <tr className="border-none" key={item?.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-25 h-24">
                      <Image
                        src={item?.["product"]?.images?.[0]?.imageUrl}
                        width={250}
                        height={250}
                        alt="product image"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="font-bold">
                      Title: {item?.product?.title}
                    </div>
                    <p>Size: {item?.size}</p>
                    <p>Color: {item?.color}</p>
                  </div>
                </div>
              </td>
              <td>
                {Number(item?.price) -
                  (Number(item?.price) * Number(item?.discount)) / 100}{" "}
                TK
              </td>
              <td>{item?.quantity}</td>
              <td className="text-right">
                {(Number(item?.price) -
                  (Number(item?.price) * Number(item?.discount)) / 100) *
                  item?.quantity}{" "}
                TK
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4 text-sm">
        <div className="w-80 max-w-lg px-4 space-y-[5px]">
          <div className="flex flex-row justify-between">
            <p>Subtotal:</p>
            <p>{subtotal} TK</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Shippint Cost:</p>
            <p>{shippingCost} TK</p>
          </div>

          <div className="flex flex-row justify-between items-center">
            <p>Grand total</p>

            <p className="text-xl">
              <b>{+subtotal + +shippingCost} TK</b>
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Order Status</p>

            <button className="btn btn-xs bg-[#ccf0d1] border-[#ccf0d1] hover:bg-[#ccf0d1] text-[#00B517] rounded-full">
              {orderStatus}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
