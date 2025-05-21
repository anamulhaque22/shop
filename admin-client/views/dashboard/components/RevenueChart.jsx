// components/RevenueChart.js
import { useGetMonthlyRevenue } from "@/services/api/services/analytics";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RevenueChart = () => {
  const fetchMonthlyRevenue = useGetMonthlyRevenue();
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Revenue",
        data: [
          // 4500, 5600, 6100, 8000, 12000, 15000, 16000, 14000, 13000, 17000,
          // 20000, 24000,
        ], // Example data
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: ["#4CAF50"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "inherit", // Inherit color from parent]
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (v) => `$${v.toFixed(2)}`,
          style: {
            colors: "inherit", // Inherit color from parent
            // cssClass: "apexcharts-yaxis-label-textx",
          },
        },
      },
      tooltip: {
        x: {
          format: "MM",
        },
      },
    },
  });

  useEffect(() => {
    const getChartData = async () => {
      const { data, status } = await fetchMonthlyRevenue();
      if (status === 200) {
        const categories = data.map((item) =>
          new Date(item.month).toLocaleString("default", {
            month: "short",
          })
        );

        setChartData((prev) => ({
          ...prev,
          series: [
            {
              ...prev.series[0],
              data: data.map((item) => item["revenue"]),
            },
          ],
          options: {
            ...prev.options,
            xaxis: {
              ...prev.options.xaxis,
              categories,
            },
          },
        }));
      }
    };
    getChartData();
  }, []);

  return (
    <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc dark:fill-white">
      <h3 className="text-lg font-medium text-text">Monthly Revenue</h3>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default RevenueChart;
