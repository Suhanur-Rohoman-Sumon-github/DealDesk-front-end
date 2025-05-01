"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowUp, FaChevronRight } from "react-icons/fa";

const CategoryList = ({
  categories,
}: {
  categories: {
    _id: string;
    name: string;
  }[];
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Get the current category ID from the pathname
  const selectedCategoryId = pathname?.split("/").pop();

  const handleClick = (categoryId?: string) => {
    if (categoryId) {
      router.push(`/marketplaces/category/${categoryId}`);
    } else {
      router.push(`/marketplaces`);
    }
  };

  return (
    <div className="space-y-3">
      {/* All / Remove Filter */}
      <div
        onClick={() => handleClick()}
        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all cursor-pointer group
        ${
          !selectedCategoryId
            ? "text-sm font-medium group-hover:translate-x-1  backdrop-blur-md bg-[#1f1b37]/90 lg:bg-white/5 border-r border-white/10 shadow-xl text-white transition-all duration-300 flex flex-col"
            : "hover:bg-white/10 hover:border "
        }`}
      >
        <span className="">Trending Products</span>
        <FaArrowUp className="animate-bounce text-green-500" />
      </div>

      {categories?.map((category, index) => {
        // Skip "Trending Products"
        if (category.name === "Trending Products") return null;

        const isActive = selectedCategoryId === category._id;

        return (
          <div
            key={index}
            onClick={() => handleClick(category._id)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all cursor-pointer group
            ${
              isActive
                ? "bg-white/10 border border-white/10 backdrop-blur-md"
                : "hover:bg-white/10 hover:backdrop-blur-md"
            }`}
          >
            <span className="text-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-300">
              {category.name}
            </span>
            <FaChevronRight className="text-white text-xs opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
