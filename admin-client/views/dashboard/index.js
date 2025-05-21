"use client";
import Loading from "@/app/loading";
import { useGetBestSellingProducts } from "@/services/api/services/analytics";
import withPageRequiredAuth from "@/services/auth/page-with-required-auth";
import { useQuery } from "@tanstack/react-query";
import BestSellingProduct from "./components/BestSellingProduct";
import RevenueChart from "./components/RevenueChart";
import StatisticsOverview from "./components/StatisticsOverview";

/*
  Dashboard feature list
    - Total revenue
    - Total orders
    - Total products
    - Total users

    - Best selling products
    - Revenue chart
    - Transaction (Total mount by card, cash, etc)
*/
function Deshboard() {
  const fetchBestSellingProducts = useGetBestSellingProducts();
  const { data: bestSellingProducts, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchBestSellingProducts,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="pt-8 px-6">
      <StatisticsOverview />
      <div className="grid grid-cols-2 gap-x-5 mt-6">
        <RevenueChart />
        <BestSellingProduct products={bestSellingProducts?.["data"]} />
      </div>
    </div>
  );
}

export default withPageRequiredAuth(Deshboard);
