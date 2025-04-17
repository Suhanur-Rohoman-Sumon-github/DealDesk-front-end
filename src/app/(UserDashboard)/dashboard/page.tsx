"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Package,
  TrendingUp,
} from "lucide-react";

const data = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 3200 },
  { name: "May", total: 2800 },
  { name: "Jun", total: 3600 },
  { name: "Jul", total: 4200 },
];

const activityData = [
  { day: "Mon", purchases: 5 },
  { day: "Tue", purchases: 8 },
  { day: "Wed", purchases: 3 },
  { day: "Thu", purchases: 7 },
  { day: "Fri", purchases: 12 },
  { day: "Sat", purchases: 15 },
  { day: "Sun", purchases: 6 },
];

const StatCard = ({
  title,
  icon: Icon,
  value,
  description,
}: {
  title: string;
  icon: any;
  value: string | number;
  description: string;
}) => (
  <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
      <Icon className="w-4 h-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const ChartCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) => (
  <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md col-span-1">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <Icon className="h-5 w-5" />
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Your purchase overview and statistics
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          icon={DollarSign}
          value="$18,420.50"
          description="+20.1% from last month"
        />
        <StatCard
          title="Todays Purchases"
          icon={Package}
          value="+28"
          description="+12% from yesterday"
        />
        <StatCard
          title="Total Cost"
          icon={CreditCard}
          value="$1,945.32"
          description="+8.5% from last week"
        />
        <StatCard
          title="Active Orders"
          icon={TrendingUp}
          value="16"
          description="Processing shipment"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <ChartCard title="Weekly Activity" icon={BarChart3}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar
                dataKey="purchases"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Trend" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;
