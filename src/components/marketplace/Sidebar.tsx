'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CategoryList from './CategoryList';

import { FaUser, FaLayerGroup, FaBars } from 'react-icons/fa';
import { categories } from '@/data/data';
import FeedbackForm from './FeedbackForm';
import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <>
      <div
        onClick={() => setToggleSidebar(true)}
        className="cursor-pointer w-fit lg:hidden  text-white mt-16  gap-2 flex  items-center space-x-1 border-2 border-white/20 rounded-full px-4 py-2 bg-[#16142a]/90 backdrop-blur-md"
      >
        <button className="font-bold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] via-[#3B82F6] to-[#6EE7B7] flex items-center gap-2">
          {' '}
          <FaBars className="text-white" /> Menu
        </button>
      </div>
      {/* Sidebar for Desktop */}
      <div
        className={` absolute -left-[100vw] ${
          toggleSidebar ? 'left-0' : '-left-[100vw]'
        }  lg:fixed top-[58px] lg:left-0 z-50 
                 w-full sm:w-[250px] md:w-[280px] lg:w-[280px] 
                 h-[calc(100vh-60px)] 
                 backdrop-blur-md bg-[#1f1b37]/80  lg:bg-white/5 border border-white/10 shadow-lg text-white overflow-hidden lg:flex flex-col transition-all duration-300`}
      >
        <Tabs defaultValue="single" className="flex   flex-col h-full">
          {/* close the menu for mobile vew */}

          {/* Tabs Header */}

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
            <div
              onClick={() => setToggleSidebar(false)}
              className="    lg:hidden justify-end w-fit mt-2  text-white   flex items-center gap-2"
            >
              <button className="cursor-pointer p-2 rounded-full bg-white/10 transition-all duration-300">
                <FaXmark />
              </button>
            </div>
          </TabsList>

          {/* Scrollable Category List + Sticky Feedback Form */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div
              className="overflow-y-auto px-2 pb-3"
              style={{ height: 'calc(100% - 120px)' }}
            >
              <TabsContent value="single">
                <CategoryList categories={categories} />
              </TabsContent>
              <TabsContent value="combo">
                <CategoryList categories={categories} />
              </TabsContent>
            </div>

            {/* Fixed Feedback Form */}
            <div className="mt-auto">
              <FeedbackForm />
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Sidebar;
