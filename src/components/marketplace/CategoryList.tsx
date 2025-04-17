"use client";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const CategoryList = ({
  categories,
}: {
  categories: {
    name: string;
  }[];
}) => {
  return (
    <div className="space-y-3">
      {categories.map((category, index) => (
        <div
          key={index}
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
