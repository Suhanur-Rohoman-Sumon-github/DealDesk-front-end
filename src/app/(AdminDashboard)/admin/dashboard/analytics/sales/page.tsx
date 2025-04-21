"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, ShoppingCart, BarChart3 } from "lucide-react";
import React from "react";

const SalesAnalyticsPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold">Sales Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          icon={<DollarSign className="text-green-600" />}
          label="Total Revenue"
          value="$35,200"
        />
        <AnalyticsCard
          icon={<TrendingUp className="text-blue-600" />}
          label="Monthly Growth"
          value="12%"
        />
        <AnalyticsCard
          icon={<ShoppingCart className="text-purple-600" />}
          label="Orders"
          value="1,200"
        />
        <AnalyticsCard
          icon={<BarChart3 className="text-yellow-600" />}
          label="Avg. Order Value"
          value="$29.33"
        />
      </div>

      {/* Sales Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 border border-dashed rounded-md flex items-center justify-center text-muted-foreground">
            {/* Replace this with your chart (e.g., Recharts/Chart.js) */}
            <span>📊 Chart goes here</span>
          </div>
        </CardContent>
      </Card>

      {/* Top Selling Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Units Sold</th>
                <th className="text-left p-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Wireless Keyboard", units: 320, revenue: "$6,400" },
                { name: "Gaming Mouse", units: 250, revenue: "$5,000" },
                { name: "Monitor 24in", units: 180, revenue: "$9,000" },
              ].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.units}</td>
                  <td className="p-2">{item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesAnalyticsPage;

// Reusable Analytics Card
const AnalyticsCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </Card>
  );
};
