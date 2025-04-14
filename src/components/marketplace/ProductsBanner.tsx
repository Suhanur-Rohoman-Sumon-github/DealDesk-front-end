import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ProductsBanner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full  gap-3 bg-transparent text-white z-50 pb-4">
      {/* 🏆 Left Section - Top Voted Product */}
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <FaArrowUp className="text-green-400 text-[10px]" />
        <span className="font-medium">Mecha Pro X75</span>
        <button className="ml-2 text-[11px] bg-green-500 hover:bg-green-600 px-2 py-[2px] rounded transition">
          Vote Now
        </button>
      </div>

      {/* 🔍 Middle Section - Search Bar */}
      <div className="relative w-full max-w-xs">
        <Input
          type="text"
          placeholder="Search..."
          className="pl-8 pr-10 rounded-md bg-[#ffffff1a] text-white placeholder-white/60 text-xs border border-white/20"
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 h-4 w-4 pointer-events-none" />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ffffff1a] hover:bg-[#ffffff2a] text-white p-1 rounded-full transition"
        >
          <Search size={14} />
        </button>
      </div>

      {/* 🔽 Right Section - Sorting Dropdown */}
      <select className="text-xs bg-[#ffffff1a] text-white border border-white/30 rounded px-2 py-1 focus:outline-none">
        <option value="default">Sort by</option>
        <option value="low-to-high">Price: Low to High</option>
        <option value="high-to-low">Price: High to Low</option>
      </select>
    </div>
  );
};

export default ProductsBanner;
