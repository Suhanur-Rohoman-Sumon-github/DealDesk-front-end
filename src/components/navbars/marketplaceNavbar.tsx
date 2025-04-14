"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, ArrowUp, ArrowDown, Home } from "lucide-react";
import { IoLogInOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

const MarketplaceNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const mockData = [
    { category: "Mechanical Keyboards", trend: "up", change: "+12%" },
    { category: "Gaming Mice", trend: "down", change: "-5%" },
    { category: "Keycaps", trend: "up", change: "+8%" },
    { category: "Desk Mats", trend: "down", change: "-2%" },
    { category: "Switches", trend: "up", change: "+15%" },
    { category: "Wrist Rests", trend: "up", change: "+6%" },
    { category: "Custom Cables", trend: "down", change: "-3%" },
    { category: "Stabilizers", trend: "up", change: "+10%" },
    { category: "Lube Kits", trend: "up", change: "+7%" },
    { category: "Artisan Keycaps", trend: "down", change: "-4%" },
    { category: "Keyboard Bags", trend: "up", change: "+9%" },
    { category: "Sound Dampeners", trend: "down", change: "-1%" },
  ];

  const itemsToShow = 5; // Show fewer items for a cleaner look

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % mockData.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const visibleItems = mockData
    .slice(visibleIndex, visibleIndex + itemsToShow)
    .concat(
      visibleIndex + itemsToShow > mockData.length
        ? mockData.slice(0, (visibleIndex + itemsToShow) % mockData.length)
        : []
    );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#16142a]/90 border-white/20 backdrop-blur-md shadow-sm">
      <div className="w-full bg-[#1f1b37] border-b border-white/10 py-1 px-4 text-white text-sm font-medium">
        <div className="flex items-center justify-between mx-auto px-4 gap-4 h-14">
          {/* Left Side: Home Button */}
          <div className="flex items-center gap-4">
            <h1>thi is deal desk</h1>
          </div>

          {/* Center: Live Data Ticker */}
          <div className="hidden sm:flex flex-wrap items-center gap-4 whitespace-nowrap animate-fade-in-down justify-center">
            <Link
              href="/"
              className="text-white hover:text-purple-400 transition flex items-center gap-1 bg-[#16142a]/90 border-white/20 backdrop-blur-md  p-2 rounded-full border border-white/20 hover:bg-[#16142a]/80"
            >
              <Home size={20} />
              <p>back to home</p>
            </Link>
            {visibleItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-xs">{item.category}</span>
                <div
                  className={clsx(
                    "flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-semibold",
                    item.trend === "up"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  )}
                >
                  {item.trend === "up" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  )}
                  <span>{item.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Dashboard & Avatar */}
          <div className="flex items-center gap-4">
            <Image
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" // Replace with dynamic image later
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full object-cover border border-white/20"
            />

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#16142a]/95 backdrop-blur-md border-t border-white/10 px-4 py-2 space-y-2 text-sm mt-28">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none backdrop-blur-md text-sm"
            />
          </div>

          <Link href="/" className="block text-white hover:text-gray-400">
            Home
          </Link>
          <Link
            href="/dashboard"
            className="block text-white hover:text-gray-400"
          >
            Dashboard
          </Link>
          <Link href="/about" className="block text-white hover:text-gray-400">
            About
          </Link>
          <Link
            href="/services"
            className="block text-white hover:text-gray-400"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="block text-white hover:text-gray-400"
          >
            Contact
          </Link>
          <Link href="/login" className="block text-white hover:text-gray-400">
            Login
          </Link>
          <Link href="/signup">
            <button className="w-full text-left text-white bg-gradient-to-r from-[#572c7c] to-[#9133df] hover:from-[#9133df] hover:to-[#572c7c] text-sm px-4 py-1 rounded flex items-center gap-1 transition">
              Join <IoLogInOutline size={18} />
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default MarketplaceNavbar;
