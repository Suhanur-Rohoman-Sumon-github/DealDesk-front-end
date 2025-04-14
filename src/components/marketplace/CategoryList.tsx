"use client";
import React from "react";

const CategoryList = ({
  categories,
}: {
  categories: {
    category: string;
  }[];
}) => {
  return (
    <div className="space-y-3">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex justify-between items-center text-center bg-[#2d2b47] text-white py-3 px-4 rounded-md shadow-md hover:bg-[#3b3a5a] transition"
        >
          <h4 className="text-sm font-semibold text-center">
            {category.category}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
