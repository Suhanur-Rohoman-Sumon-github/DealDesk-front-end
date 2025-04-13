"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CategoryList from "./CategoryList";
import SingleCategories, { ComboCategories } from "./singleCategories";

const Sidebar = () => {
  return (
    <div className="rounded-lg shadow-lg bg-[#1f1b37] p-4 max-w-xs mx-auto backdrop-blur-lg bg-opacity-30">
      <Tabs defaultValue="single">
        <TabsList className="w-full flex justify-between mb-6 bg-transparent p-0 space-x-1">
          <TabsTrigger
            value="single"
            className="w-full py-2 rounded-md text-white text-sm transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#572c7c] data-[state=active]:to-[#9133df] data-[state=active]:border-2 data-[state=active]:border-[#572c7c] hover:bg-gradient-to-r hover:from-[#572c7c] hover:to-[#9133df]"
          >
            Single
          </TabsTrigger>
          <TabsTrigger
            value="combo"
            className="w-full py-2 rounded-md text-white text-sm transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#572c7c] data-[state=active]:to-[#9133df] data-[state=active]:border-2 data-[state=active]:border-[#572c7c] hover:bg-gradient-to-r hover:from-[#572c7c] hover:to-[#9133df]"
          >
            Combo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <CategoryList categories={SingleCategories} />
        </TabsContent>

        <TabsContent value="combo">
          <CategoryList categories={ComboCategories} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sidebar;
