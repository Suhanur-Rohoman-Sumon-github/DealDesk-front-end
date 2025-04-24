"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

const CategoryList = ({
  categories,
}: {
  categories: {
    name: string;
  }[];
}) => {
  const router = useRouter();

  const handleClick = (categoryName?: string) => {
    if (categoryName) {
      router.push(
        `/marketplaces/?category=${encodeURIComponent(categoryName)}`
      );
    } else {
      router.push(`/marketplaces`);
    }
  };

  return (
    <div className="space-y-3">
      {/* All / Remove Filter */}
      <div
        onClick={() => handleClick()}
        className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all cursor-pointer group"
      >
        <span className="text-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-300">
          All Categories
        </span>
        <FaChevronRight className="text-white text-xs opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>

      {categories?.map((category, index) => (
        <div
          key={index}
          onClick={() => handleClick(category.name)}
          className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all cursor-pointer group"
        >
          <span className="text-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-300">
            {category.name}
          </span>
          <FaChevronRight className="text-white text-xs opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
