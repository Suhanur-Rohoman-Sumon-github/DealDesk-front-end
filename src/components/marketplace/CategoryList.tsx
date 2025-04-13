"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";



const CategoryList = ({
  categories,
}: {
  categories: {
    category: string;
    stockLimit: number;
    subCategories: string[];
  }[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <div key={index}>
          <div
            className="flex justify-between items-center text-white cursor-pointer py-2 px-4 rounded-md hover:bg-[#33324f] transition-colors"
            onClick={() => toggleCategory(index)}
          >
            <h4 className="text-sm font-semibold">{category.category}</h4>
            <span
              className={clsx(
                "text-xs font-medium",
                category.stockLimit > 0 ? "text-green-400" : "text-red-400"
              )}
            >
              {category.stockLimit > 0
                ? ` (${category.stockLimit})`
                : "Out of Stock"}
            </span>
            {openIndex === index ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </div>

          {openIndex === index && (
            <div className="space-y-2 mt-2 text-white bg-[#2d2b47] p-4 rounded-lg">
              {category.subCategories.map((sub, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{sub}</span>
                  <span
                    className={clsx(
                      "text-xs font-medium",
                      category.stockLimit > 0
                        ? "text-green-400"
                        : "text-red-400"
                    )}
                  >
                    {category.stockLimit > 0
                      ? ` (${category.stockLimit})`
                      : "Out of Stock"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
