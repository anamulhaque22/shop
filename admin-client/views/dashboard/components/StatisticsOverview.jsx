import { useGetDashboardMetrics } from "@/services/api/services/analytics";
import HTTP_CODES from "@/services/api/types/http-codes";
import { useEffect, useState } from "react";
import { FaDollarSign, FaUserLarge } from "react-icons/fa6";
import { MdLocalShipping, MdOutlineQrCode } from "react-icons/md";

export default function StatisticsOverview() {
  const fetchStatisticsOverview = useGetDashboardMetrics();
  const [statisticeOverview, setStatisticsOverview] = useState(null);

  useEffect(() => {
    const getStatisticsOverview = async () => {
      const { data, status } = await fetchStatisticsOverview();
      if (status === HTTP_CODES.OK) {
        setStatisticsOverview(data);
      }
    };
    getStatisticsOverview();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-x-4">
      <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
        <div className="flex gap-x-4">
          <div className="h-12 w-12 bg-[#646fe465] flex justify-center items-center rounded-full">
            <FaDollarSign className="text-xl text-[#646EE4]" />
          </div>
          <div className="text-text">
            <h4 className="font-semibold text-sm mb-1">Revenue</h4>
            <p className="font-semibold text-[1.275rem]">
              ${statisticeOverview?.totalRevenue}
            </p>
          </div>
        </div>
        <p className="font-normal text-sm text-[#6c757d]">
          Shipping fees are not included
        </p>
      </div>

      <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
        <div className="flex gap-x-4">
          <div className="h-12 min-w-12 bg-[#224A3A] flex justify-center items-center rounded-full">
            <MdLocalShipping className="text-xl text-[#00B517]" />
          </div>
          <div className="text-text">
            <h4 className="font-semibold text-sm mb-1">Orders</h4>
            <p className="font-semibold text-[1.275rem]">
              {statisticeOverview?.totalOrders}
            </p>
          </div>
        </div>
        <p className="font-normal text-sm text-[#6c757d]">
          Excluding all orders without completed payment
        </p>
      </div>

      <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
        <div className="flex gap-x-4">
          <div className="h-12 w-12 bg-[#554239] flex justify-center items-center rounded-full">
            <MdOutlineQrCode className="text-xl text-[#fd8a14]" />
          </div>
          <div className="text-text">
            <h4 className="font-semibold text-sm mb-1">Tatal Products</h4>
            <p className="font-semibold text-[1.275rem]">
              {statisticeOverview?.totalProducts}
            </p>
            <p className="font-normal text-sm text-[#6c757d]">Active</p>
          </div>
        </div>
      </div>

      <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
        <div className="flex gap-x-4">
          <div className="h-12 w-12 bg-[#254E51] flex justify-center items-center rounded-full">
            <FaUserLarge className="text-xl text-[#0dcaf0]" />
          </div>
          <div className="text-text">
            <h4 className="font-semibold text-sm mb-1">Tatal Customer</h4>
            <p className="font-semibold text-[1.275rem]">
              {statisticeOverview?.totalActiveCustomers}
            </p>
            <p className="font-normal text-sm text-[#6c757d]">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
