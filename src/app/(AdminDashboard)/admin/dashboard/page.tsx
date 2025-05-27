"use client";
import React, { useState } from "react";
import { subDays } from "date-fns";
import {
  Wallet,
  UserPlus,
  PackageCheck,
  PackageSearch,
  Banknote,
  CreditCard,
  Boxes,
  Flame,
} from "lucide-react";
import StatsCard from "@/components/Admindashboard/StatsCard";
import SalesChart from "@/components/Admindashboard/SalesChart";
import AccountStatement from "@/components/Admindashboard/AccountStatement";
import { useGetAdminDashBoardDataQuery } from "@/hooks/User.hook";
import Link from "next/link";

// Mock data for testing
const getMockSalesData = () => {
  const today = new Date();
  const data = [];
  for (let i = 30; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      sales: Math.floor(Math.random() * 10000) + 5000,
      orders: Math.floor(Math.random() * 100) + 50,
    });
  }
  return data;
};

const categoryData = [
  { name: "Electronics", value: 35, color: "#8884d8" },
  { name: "Clothing", value: 25, color: "#82ca9d" },
  { name: "Home & Kitchen", value: 20, color: "#ffc658" },
  { name: "Beauty", value: 15, color: "#ff8042" },
  { name: "Books", value: 5, color: "#0088fe" },
];

const trafficData = [
  { source: "Organic Search", visits: 4000, conversions: 240 },
  { source: "Direct", visits: 3000, conversions: 198 },
  { source: "Social Media", visits: 2000, conversions: 120 },
  { source: "Referral", visits: 2780, conversions: 189 },
  { source: "Email", visits: 1890, conversions: 239 },
  { source: "Paid Ads", visits: 2390, conversions: 299 },
];

const AdminDashboard = () => {
  const { data, isLoading } = useGetAdminDashBoardDataQuery();
  if (isLoading) return <div>Loading...</div>;
  console.log("Admin Dashboard Data", data);

  const {
    todaysSellAmount,
    todaysCompletedOrders,
    todaysPendingOrders,
    totalCompletedOrders,
    lifetimeSellAmount,
    todaysRevenue,
    totalRevenue,
    currentBalance,
    graphData,
    jabedaStatements,
    pendingAccounts,
    currentProducts,
  } = data.data;
  const salesData = getMockSalesData();

  console.log("Today's Sell Amount", todaysSellAmount);

  const calculatePercentage = (today: number, yesterday: number): number => {
    if (yesterday === 0) return today === 0 ? 0 : 100;
    return Math.round(((today - yesterday) / yesterday) * 100);
  };

  const yesterdaysSellAmount = 1000;

  const yesterdaysCompletedOrders = 20;

  const yesterdaysPendingOrders = 8;

  const yesterdaysRevenue = 56465454;

  return (
    <div className=" py-24 px-4 ">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Today's Sell Amount"
          value={`$${todaysSellAmount.toLocaleString()}`}
          icon={<Wallet />}
          percentage={calculatePercentage(
            todaysSellAmount,
            yesterdaysSellAmount
          )}
          isPositive={todaysSellAmount >= yesterdaysSellAmount}
          className="bg-rose-50 border border-rose-200"
        />

        <StatsCard
          title="Today's Completed Orders"
          value={todaysCompletedOrders}
          icon={<PackageCheck />}
          percentage={calculatePercentage(
            todaysCompletedOrders,
            yesterdaysCompletedOrders
          )}
          isPositive={todaysCompletedOrders >= yesterdaysCompletedOrders}
          className="bg-emerald-50 border border-emerald-200"
        />

        <Link href={"/admin/dashboard/orders/orderList"}>
          <StatsCard
            title="Today's Pending Orders"
            value={todaysPendingOrders}
            icon={<PackageSearch />}
            percentage={calculatePercentage(
              todaysPendingOrders,
              yesterdaysPendingOrders
            )}
            isPositive={todaysPendingOrders >= yesterdaysPendingOrders}
            className="bg-orange-50 border border-orange-200"
          />
        </Link>

        <Link href={"/admin/dashboard/user/all-user"}>
          <StatsCard
            title="New Users Today"
            value={pendingAccounts}
            icon={<UserPlus />}
            percentage={calculatePercentage(
              todaysPendingOrders,
              yesterdaysPendingOrders
            )}
            isPositive={todaysPendingOrders >= yesterdaysPendingOrders}
            className="bg-purple-50 border border-purple-200"
          />
        </Link>

        <StatsCard
          title="Lifetime Sell Amount"
          value={`$${lifetimeSellAmount.toLocaleString()}`}
          icon={<Banknote />}
          className="bg-cyan-50 border border-cyan-200"
        />

        <StatsCard
          title="Current Balance"
          value={currentBalance}
          icon={<CreditCard />}
          className="bg-lime-50 border border-lime-200"
        />

        <Link href={"/admin/dashboard/products/all-products"}>
          <StatsCard
            title="Current Products"
            value={currentProducts}
            icon={<Boxes />}
            className="bg-fuchsia-50 border border-fuchsia-200"
          />
        </Link>

        <StatsCard
          title="🔥 Trending Metric"
          value="N/A"
          icon={<Flame />}
          className="bg-yellow-100 border border-yellow-300"
        />
      </div>

      <div className="grid gap-6 w-full mt-4">
        <SalesChart data={graphData} />
      </div>

      {/* <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <CategoryChart data={categoryData} />
        <TrafficChart data={trafficData} />
      </div> */}

      <AccountStatement
        jabedaStatements={jabedaStatements}
        startingBalance={currentBalance}
      />
    </div>
  );
};

export default AdminDashboard;
