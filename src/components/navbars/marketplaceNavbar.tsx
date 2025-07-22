"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Search, ArrowUp, ArrowDown } from "lucide-react";
import { IoLogInOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUser } from "@/context/userProvider";
import { logout } from "@/services/authServices";
import Image from "next/image";

const MarketplaceNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const { user, isLoading } = useUser();

  const handleLogout = () => {
    logout();
  };

  // Updated mock data with book categories
  const mockData = [
    { category: "Fiction & Literature", trend: "up", change: "+12%" },
    { category: "Science & Technology", trend: "down", change: "-5%" },
    { category: "Self Development", trend: "up", change: "+8%" },
    { category: "History & Culture", trend: "down", change: "-2%" },
    { category: "Health & Fitness", trend: "up", change: "+15%" },
    { category: "Business & Entrepreneurship", trend: "up", change: "+6%" },
    { category: "Children’s Books", trend: "down", change: "-3%" },
    { category: "Travel & Adventure", trend: "up", change: "+10%" },
    { category: "Romance", trend: "up", change: "+7%" },
    { category: "Thriller & Mystery", trend: "down", change: "-4%" },
    { category: "Educational eBooks", trend: "up", change: "+9%" },
    { category: "Comics & Graphic Novels", trend: "down", change: "-1%" },
  ];

  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth > 1440 ? 4 : 3);
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize); // update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <>
      {/* Live Ticker for small devices */}
      <div className="flex lg:hidden flex-wrap items-center gap-2 whitespace-nowrap animate-fade-in-down justify-center bg-[#04091d]/90 text-white py-1 px-2 border-b border-white/10 fixed top-[56px] left-0 right-0 z-40">
        {visibleItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs">
            <span>{item.category}</span>
            <div
              className={clsx(
                "flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold",
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

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-lg">
        <div className="flex items-center justify-between mx-auto px-4 py-3 lg:py-0  gap-4 lg:h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="https://i.ibb.co.com/rGrLVCZs/Chat-GPT-Image-Apr-24-2025-02-07-44-PM-removebg-preview.png"
                alt="logo"
                width={80}
                height={80}
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* Live Ticker for large devices */}
          <div className="hidden lg:flex flex-wrap items-center gap-4 whitespace-nowrap animate-fade-in-down text-white justify-center flex-1 px-4">
            {visibleItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <span>{item.category}</span>
                <div
                  className={clsx(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold",
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

          {/* Right side - Nav Links, User, Mobile Toggle */}
          {isLoading ? (
            <div className="flex items-center justify-center h-14">
              {/* Loading state if needed */}
              <span className="text-white">Loading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Nav Links for desktop */}
              <div className="hidden sm:flex space-x-4 text-white text-sm font-medium">
                <Link href="/" className="hover:text-purple-400 transition">
                  Home
                </Link>
                {user && (
                  <Link
                    href="/dashboard"
                    className="hover:text-purple-400 transition"
                  >
                    Dashboard
                  </Link>
                )}
                {!user && (
                  <Link
                    href="/login"
                    className="hover:text-purple-400 transition"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* User avatar / Join button */}
              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.profilePicture || "/avatar.png"}
                        />
                        <AvatarFallback>
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 mt-2">
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/signup">
                    <button className="px-6 py-2 text-white rounded-md bg-gradient-to-r from-[#572c7c] to-[#9133df] hover:from-[#9133df] hover:to-[#572c7c] flex items-center gap-2 transition duration-300">
                      Join <IoLogInOutline className="text-2xl" />
                    </button>
                  </Link>
                )}
              </div>

              {/* Mobile menu toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div className="md:hidden bg-[#04091d]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 space-y-2 text-sm">
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
            {user && (
              <Link
                href="/dashboard"
                className="block text-white hover:text-gray-400"
              >
                Dashboard
              </Link>
            )}
            {!user && (
              <Link
                href="/login"
                className="block text-white hover:text-gray-400"
              >
                Login
              </Link>
            )}
            <Link
              href="/about"
              className="block text-white hover:text-gray-400"
            >
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
            <Link href="/signup">
              <button className="w-full text-left text-white bg-gradient-to-r from-[#572c7c] to-[#9133df] hover:from-[#9133df] hover:to-[#572c7c] text-sm px-4 py-1 rounded flex items-center gap-1 transition">
                Join <IoLogInOutline size={18} />
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Padding div so content doesn't go under fixed navbar + ticker on mobile */}
      <div className="pt-[112px] lg:pt-14" />
    </>
  );
};

export default MarketplaceNavbar;
