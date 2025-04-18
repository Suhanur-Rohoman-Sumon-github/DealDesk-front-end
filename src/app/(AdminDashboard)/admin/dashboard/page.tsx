"use client";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import {
  ShoppingBag,
  DollarSign,
  Users,
  TrendingUp,
  Package,
  AlarmClock,
} from "lucide-react";
import { DateRangePicker } from "@/components/Admindashboard/DateRangePicker";
import StatsCard from "@/components/Admindashboard/StatsCard";
import SalesChart from "@/components/Admindashboard/SalesChart";
import CategoryChart from "@/components/Admindashboard/CategoryChart";
import TrafficChart from "@/components/Admindashboard/TrafficChart";

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

const Index = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const salesData = getMockSalesData();

  return (
    <div className=" py-4 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$157,492"
          icon={<DollarSign />}
          change={{ value: "12.5%", positive: true }}
        />
        <StatsCard
          title="Total Orders"
          value="3,849"
          icon={<ShoppingBag />}
          change={{ value: "8.2%", positive: true }}
        />
        <StatsCard
          title="Products"
          value="1,423"
          icon={<Package />}
          change={{ value: "4.1%", positive: true }}
        />
        <StatsCard
          title="Customers"
          value="5,782"
          icon={<Users />}
          change={{ value: "2.3%", positive: false }}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <SalesChart data={salesData} />
        <div className="grid gap-6 grid-cols-1">
          <StatsCard
            title="Conversion Rate"
            value="4.28%"
            icon={<TrendingUp />}
            change={{ value: "0.5%", positive: true }}
            className="h-[140px]"
          />
          <StatsCard
            title="Average Order Value"
            value="$85.42"
            icon={<DollarSign />}
            change={{ value: "3.1%", positive: true }}
            className="h-[140px]"
          />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <CategoryChart data={categoryData} />
        <TrafficChart data={trafficData} />
      </div>

      <div className="grid gap-6 grid-cols-1">
        <div className="border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlarmClock className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center py-2 border-b"
              >
                <div>
                  <p className="text-sm font-medium">
                    New order #{Math.floor(Math.random() * 10000) + 10000}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.floor(Math.random() * 60)} minutes ago
                  </p>
                </div>
                <span className="text-sm font-medium">
                  ${(Math.random() * 200 + 50).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
