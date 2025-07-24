"use client";

import { useState } from "react";
import { FaBars, FaListAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import CategoryList from "./CategoryList";
import { useGetCategoryQuery } from "@/hooks/Products.hook";
import CategorySkeleton from "../skeleton/CategorySkeleton";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { data: categories, isLoading } = useGetCategoryQuery();

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="mt-14">
        <CategorySkeleton count={20} />
      </div>
    );
  }

  return (
    <div>
      {/* ✅ Mobile Toggle Button */}
      <div
        onClick={() => setToggleSidebar(true)}
        className="fixed top-[120px] left-0 z-[999] lg:hidden text-white flex items-center rounded-full px-4 py-2 bg-[#04091d]/90 backdrop-blur-md shadow-lg cursor-pointer transition hover:bg-[#04091d]/80"
      >
        <FaBars className="text-white mr-2" />
        <span className="text-sm font-semibold">Category</span>
      </div>

      {/* ✅ Mobile Overlay */}
      {toggleSidebar && (
        <div
          onClick={() => setToggleSidebar(false)}
          className="fixed inset-0 bg-black/50 z-[998] lg:hidden"
        />
      )}

      {/* ✅ Sidebar Panel */}
      <div
        className={`fixed md:top-[58px] top-[110px] ${
          toggleSidebar ? "left-0" : "-left-full"
        } lg:left-0 z-[999] 
        w-[80%] sm:w-[250px] md:w-[280px] lg:w-[250px] 
        h-[calc(100vh-58px)] 
        bg-[#04091d]/90 lg:bg-white/5 
        backdrop-blur-md border-r border-white/10 shadow-xl text-white 
        transition-all duration-300 flex flex-col`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <div className="text-lg font-semibold flex items-center gap-2">
            <FaListAlt /> <span>Categories</span>
          </div>
          <FaXmark
            onClick={() => setToggleSidebar(false)}
            className="cursor-pointer text-2xl"
          />
        </div>

        {/* Category List */}
        <div className="overflow-y-auto px-4 pt-4 pb-2">
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
