"use client";
import React from "react";
import clsx from "clsx";

const CategorySkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            "flex items-center justify-between px-4 py-3 rounded-lg",
            "bg-white/5 border border-white/10 backdrop-blur-md",
            "animate-pulse"
          )}
        >
          <div className="h-4 w-32 bg-white/20 rounded-sm" />
          <div className="h-3 w-3 bg-white/30 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
