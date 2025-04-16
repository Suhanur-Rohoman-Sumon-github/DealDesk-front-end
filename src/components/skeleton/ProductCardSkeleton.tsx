import { FaArrowUp } from "react-icons/fa";
import { Search } from "lucide-react";

const ProductCardSkeleton = () => {
  return (
    <div className="w-full px-2">
      {/* 🔮 Banner Skeleton */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 text-white z-50 mb-4 -mt-3.5 bg-white/5 border border-white/10 backdrop-blur-md px-4 h-14 animate-pulse">
        {/* Left Section */}
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-1 bg-green-500/10 border border-green-400/30 px-2 py-[2px] rounded-full">
            <FaArrowUp className="text-green-400 text-[10px]" />
            <span className="w-10 h-3 bg-green-300/40 rounded-md" />
          </div>
          <span className="text-[11px] text-white/60">→</span>
          <div className="flex items-center gap-1 bg-blue-500/10 border border-blue-400/30 px-2 py-[2px] rounded-full">
            <span className="w-10 h-3 bg-blue-300/40 rounded-md" />
            <span className="w-6 h-2 bg-white/20 rounded-md" />
          </div>
        </div>

        {/* Right Section - Sort Dropdown Skeleton */}
        <div className="w-[140px] h-8 bg-white/10 rounded-md" />

        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <div className="pl-8 pr-10 py-2 rounded-md bg-white/10 text-white text-xs border border-white/20 w-full h-8" />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4 pointer-events-none" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ffffff1a] text-white p-1 rounded-full">
            <Search size={14} />
          </div>
        </div>
      </div>

      {/* Product Skeleton Cards */}
      <div
        className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-1
          xl:grid-cols-2 
          2xl:grid-cols-3 
          gap-4 sm:gap-6 md:gap-6 lg:gap-8"
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#ffffff0a] border border-white/10 rounded-xl p-4 animate-pulse space-y-4"
          >
            <div className="w-full h-48 bg-white/10 rounded-lg" />
            <div className="h-4 w-3/4 bg-white/20 rounded-md" />
            <div className="h-3 w-full bg-white/10 rounded-md" />
            <div className="h-3 w-2/3 bg-white/10 rounded-md" />
            <div className="flex items-center justify-between">
              <div className="h-4 w-16 bg-white/20 rounded-md" />
              <div className="h-4 w-10 bg-white/20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
