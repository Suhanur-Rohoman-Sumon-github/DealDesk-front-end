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
    <div className="space-y-3 ">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex justify-between items-center text-center cursor-pointer bg-white/10 border border-white/10  text-white py-1 px-4 rounded-md shadow-md hover:bg-[#3b3a5a] transition"
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
