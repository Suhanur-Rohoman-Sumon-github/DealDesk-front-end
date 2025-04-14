"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CategoryList from "./CategoryList";

import { FaUser, FaLayerGroup } from "react-icons/fa";
import { categories } from "@/data/data";

const Sidebar = () => {
  return (
    <div
      className="fixed top-[65px] left-0 z-50 
             w-full sm:w-[250px] md:w-[280px] lg:w-[280px] 
             h-[calc(100vh-60px)] 
             shadow-lg backdrop-blur-md bg-white/5 border border-white/10 text-white overflow-hidden"
    >
      <Tabs defaultValue="single" className="flex flex-col h-full">
        {/* Tabs Navigation */}
        <TabsList
          className="w-full flex justify-between p-0 space-x-1 flex-none 
                     sticky top-0 z-10 px-2 py-2 bg-[#1f1b37]/80 backdrop-blur-md"
        >
          <TabsTrigger
            value="single"
            className="w-full py-4 mt-2  flex items-center justify-center space-x-2 rounded-md text-white text-xs sm:text-sm transition-all 
                       data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#572c7c] data-[state=active]:to-[#9133df] 
                       data-[state=active]:border-2 data-[state=active]:border-[#572c7c] hover:bg-gradient-to-r  hover:from-[#572c7c] hover:to-[#9133df]"
          >
            <FaUser className="text-base sm:text-lg" />
            <span>Single</span>
          </TabsTrigger>
          <TabsTrigger
            value="combo"
            className="w-full py-4 mt-2 flex items-center justify-center space-x-2 rounded-md text-white text-xs sm:text-sm transition-all 
                       data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#572c7c] data-[state=active]:to-[#9133df] 
                       data-[state=active]:border-2 data-[state=active]:border-[#572c7c] hover:bg-gradient-to-r hover:from-[#572c7c] hover:to-[#9133df]"
          >
            <FaLayerGroup className="text-base sm:text-lg" />
            <span>Combo</span>
          </TabsTrigger>
        </TabsList>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 max-h-full mt-2 px-2 pb-4">
          <TabsContent value="single">
            <CategoryList categories={categories} />
          </TabsContent>
          <TabsContent value="combo">
            <CategoryList categories={categories} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Sidebar;
