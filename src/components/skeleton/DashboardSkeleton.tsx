/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

const SalesChartSkeleton = () => (
  <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg ">
    <div className="p-4">
      <div className="text-white font-semibold mb-2 p-4">
        <Skeleton />
      </div>
      <div className="text-secondary mb-4 p-12">
        <Skeleton />
      </div>
      <div className="h-[300px] bg-transparent p-4 rounded-xl">
        <Skeleton />
      </div>
    </div>
  </div>
);

const StatsCardSkeleton = () => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md">
    <div className="flex flex-row items-center justify-between p-4">
      <div className="text-sm font-medium text-white">
        <Skeleton />
      </div>
      <Skeleton />
    </div>
    <div className="p-4">
      <Skeleton />
    </div>
  </div>
);

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col ">
      {/* Skeletons for Stats Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>

      {/* Skeleton for the Sales Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 p-4 w-full">
        <SalesChartSkeleton />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
