"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LiveChatSkeleton = () => {
  return (
    <>
      {/* Toggle Button Skeleton */}
      <div className="z-10 absolute top-[50px] mt-12 right-5 text-white lg:hidden items-center gap-2 flex space-x-1 border-2 border-white/20 rounded-full px-4 py-2 bg-[#04091d]/90 backdrop-blur-md">
        <Skeleton className="h-4 w-24 bg-white/20" />
      </div>

      {/* Glassmorphism Box */}
      <div className="transition-all duration-300 right-0 fixed h-[calc(100vh-50px)] -mt-3 z-50 space-y-3 p-4 backdrop-blur-md bg-white/5 border border-white/10 shadow-lg text-white top-[70px] overflow-hidden w-full md:w-[300px] lg:w-[300px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-xs">
            <Skeleton className="w-6 h-6 rounded-full bg-white/10" />
            <Skeleton className="w-12 h-4 bg-white/20" />
            <Skeleton className="w-20 h-4 bg-white/20" />
          </div>
          <Skeleton className="w-12 h-4 bg-white/20" />
        </div>

        {/* Notification Cards Skeleton */}
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex flex-col items-center text-center p-4 rounded-xl bg-white/10 shadow-md transition duration-500"
          >
            <Skeleton className="w-full h-28 rounded-md bg-white/20 mb-3" />
            <Skeleton className="w-24 h-4 bg-white/30 mb-1" />
            <Skeleton className="w-32 h-3 bg-white/20" />
          </div>
        ))}

        {/* Recent Orders Table Skeleton */}
        <div className="mt-auto text-xs bg-white/5 rounded-md p-2 border border-white/10 space-y-2">
          <Skeleton className="h-4 w-32 bg-white/20 mb-1" />
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center space-x-2"
            >
              <Skeleton className="h-3 w-20 bg-white/20" />
              <Skeleton className="h-3 w-10 bg-white/20" />
              <Skeleton className="h-3 w-8 bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LiveChatSkeleton;
