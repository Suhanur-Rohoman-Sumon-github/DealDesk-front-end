"use client";

import { useState } from "react";
import { FaBars, FaListAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import CategoryList from "./CategoryList";
import FeedbackForm from "./FeedbackForm";

import { useGetCategoryQuery } from "@/hooks/Products.hook";
import CategorySkeleton from "../skeleton/CategorySkeleton";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { data: categories, isLoading } = useGetCategoryQuery();

  if (isLoading) {
    return <CategorySkeleton count={20} />;
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <div
        onClick={() => setToggleSidebar(true)}
        className="cursor-pointer w-fit lg:hidden text-white mt-16 gap-2 flex items-center space-x-1 border border-white/20 rounded-full px-4 py-2 bg-[#060b1f]/90 backdrop-blur-md shadow-lg"
      >
        <span className="font-semibold text-sm flex items-center gap-2">
          <FaBars className="text-white" /> <span>Open Menu</span>
        </span>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-[58px] ${
          toggleSidebar ? "left-0" : "-left-[100vw]"
        } lg:left-0 z-50 
        w-full sm:w-[250px] md:w-[280px] lg:w-[280px] 
        h-[calc(100vh-58px)] 
        backdrop-blur-md bg-[#1f1b37]/90 lg:bg-white/5 border-r border-white/10 shadow-xl text-white 
        transition-all duration-300 flex flex-col`}
      >
        {/* Header and Close Icon on Mobile */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <div className="text-lg font-semibold flex items-center gap-2">
            <FaListAlt /> <span>Categories</span>
          </div>
          <FaXmark
            onClick={() => setToggleSidebar(false)}
            className="cursor-pointer text-2xl"
          />
        </div>

        {/* Scrollable Category List */}
        <div
          className="overflow-y-auto px-4 pt-4 pb-2"
          style={{ height: "calc(100vh - 58px - 140px)" }}
        >
          <CategoryList categories={categories} />
        </div>

        {/* Fixed Feedback Form with Icon */}
        <div className="">
          <FeedbackForm />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
