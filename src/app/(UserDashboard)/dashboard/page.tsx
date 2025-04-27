/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CreditCard, DollarSign, Package, TrendingUp } from "lucide-react";
import { useGetUserDashBoardDataQuery } from "@/hooks/User.hook";
import { useUser } from "@/context/userProvider";
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";

const SalesChart = ({
  data,
}: {
  data: { date: string; amount: number; orders: number }[];
}) => (
  <Card className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
    <CardHeader>
      <CardTitle className="text-white">Order Overview</CardTitle>
      <CardDescription className="text-secondary">
        Monthly Purchases and order counts
      </CardDescription>
    </CardHeader>
    <CardContent className="h-[300px] bg-transparent p-4 rounded-xl">
      <div className="h-full bg-transparent">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="amount"
              stroke="#DB7093"
              strokeWidth={2}
              name="Amount spend "
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#6f26dc"
              strokeWidth={2}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

// const PaymentPieChart = ({
//   data,
// }: {
//   data: { name: string; value: number }[];
// }) => (
//   <Card className="w-full">
//     <CardHeader>
//       <CardTitle>Payment Methods</CardTitle>
//       <CardDescription>Order distribution by payment type</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={90}
//               fill="#8884d8"
//               label
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </CardContent>
//   </Card>
// );

const StatsCard = ({
  title,
  icon: Icon,
  value,
}: {
  title: string;
  icon: any;
  value: string | number;
}) => (
  <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md">
    <CardHeader className="flex flex-row items-center justify-between ">
      <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
      <Icon className="w-4 h-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const { user } = useUser();

  const { data: userData, isLoading } = useGetUserDashBoardDataQuery(
    user?.id as string
  );

  console.log("userData", userData);

  return (
    <div>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Spend Today"
              icon={CreditCard}
              value={`$${userData?.data?.totalBuyToday}`}
            />
            <StatsCard
              title="Total amount spent"
              icon={DollarSign}
              value={`$${userData?.data?.totalBuyForever}`}
            />
            <StatsCard
              title="Today's orders"
              icon={Package}
              value={`${userData?.data?.todaysOrders}`}
            />
            <StatsCard
              title="Pending Orders"
              icon={TrendingUp}
              value={userData?.data?.pendingOrders}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 p-4">
            <SalesChart data={userData?.data?.graphData} />
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
