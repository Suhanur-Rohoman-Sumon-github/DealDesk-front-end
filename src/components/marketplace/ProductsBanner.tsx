/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaArrowUp } from "react-icons/fa";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, FC, FormEvent } from "react";

interface Props {
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: any;
  onSearchSubmit: () => void;
}

const ProductsBanner: FC<Props> = ({
  sortOption,
  setSortOption,
  searchTerm,
  setSearchTerm,
}) => {
  const handleSubmit = (e: FormEvent) => {
    console.log(e);
    e.preventDefault();
  };

  console.log(searchTerm);

  return (
    <div className="flex flex-col md:flex-row fixed z-50 top-14 w-[950px]   justify-between gap-3 text-white mb-4 bg-white/5 border border-white/10 backdrop-blur-md py-2 px-4 md:h-14 mx-auto">
      {/* 🏆 Left Section - Top Voted Product */}
      <div className="flex items-center justify-between gap-3 text-xs md:text-sm text-white ">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-green-500/10 border border-green-400/30 px-2 py-[2px] rounded-full">
            <FaArrowUp className="text-green-400 text-[10px]" />
            <span className="font-semibold text-green-300">Nova</span>
          </div>
          <span className="text-[11px] text-white/60">→</span>
          <div className="flex items-center gap-1 bg-blue-500/10 border border-blue-400/30 px-2 py-[2px] rounded-full">
            <span className="font-semibold text-blue-300">Orbit</span>
            <span className="text-[10px] text-white/50">(62%)</span>
          </div>
        </div>
      </div>

      {/* 🔽 Sorting Dropdown */}
      <Select value={sortOption} onValueChange={(val) => setSortOption(val)}>
        <SelectTrigger className="w-[140px] text-xs bg-[#ffffff1a] text-white border border-white/30 rounded px-2 py-1 focus:outline-none">
          <SelectValue placeholder="Sort by Price:">Sort by Price:</SelectValue>
        </SelectTrigger>
        <SelectContent className="text-xs bg-[#1a1a1a] text-white border border-white/20">
          <SelectItem value="low-to-high">Low to High</SelectItem>
          <SelectItem value="high-to-low">High to Low</SelectItem>
        </SelectContent>
      </Select>

      {/* 🔍 Search Input */}
      <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="pl-8 pr-10 rounded-md bg-[#ffffff1a] text-white placeholder-white/60 text-xs border border-white/20"
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 h-4 w-4 pointer-events-none" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ffffff1a] hover:bg-[#ffffff2a] text-white p-1 rounded-full transition"
        >
          <Search size={14} />
        </button>
      </form>
    </div>
  );
};

export default ProductsBanner;
