import Image from "next/image";

export default function BestSellingProduct({ products }) {
  return (
    <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
      <div className="flex justify-between items-center text-text py-3">
        <h3>Best Selling Product</h3>
        {/* <div className="flex items-center gap-x-2">
          <p className="">Short By</p>
          <select className=" select select-sm select-bordered focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary">
            <option disabled selected>
              Status
            </option>
            <option>Active</option>
            <option>Hidden</option>
          </select>
        </div> */}
      </div>
      <div className="overflow-x-auto w-full text-text">
        <table className="table w-full ">
          <thead>
            <tr className="text-text bg-[#F7F8F9] dark:bg-[#32394E] border-none">
              <th>Product</th>
              <th>Price</th>
              <th>Orders</th>
              <th>Stock</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="border-none">
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-12 h-12">
                        <Image
                          src={product.images[0]}
                          width={250}
                          height={250}
                          alt="product image"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.title}</div>
                    </div>
                  </div>
                </td>
                <td>${product.sellPrice}</td>
                <td>{product.orders}</td>
                <td>{product.stock}</td>
                <td className="text-right">${product.totalRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
