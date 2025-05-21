import moment from "moment";

export default function UserOrder() {
  return (
    <div className="w-full md:w-[70%]">
      <div className="overflow-x-auto bg-content-bg px-5 py-3 rounded-xl border border-bc">
        <div className="overflow-x-auto w-full text-text">
          <table className="table w-full ">
            <thead>
              <tr className="text-text border-bc">
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Delivery Status</th>
                <th>Order Items</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr key="" className="hover:bg-[#8b33fd21] !border-bc">
                <td>
                  <div className="font-bold">#fas435</div>
                </td>
                <td>{moment(new Date()).format("MMM DD, YYYY")}</td>
                <td>Pending</td>
                <td>4 items</td>
                <td>$435</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
