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

  const mockData = [
    { category: "Go2 bank", trend: "up", change: "+12%" },
    { category: "Chime Bank", trend: "down", change: "-5%" },
    { category: "Paypal Account", trend: "up", change: "+8%" },
    { category: "Google Voice", trend: "down", change: "-2%" },
    { category: "Text now", trend: "up", change: "+15%" },
    { category: "Cash App", trend: "up", change: "+6%" },
    { category: "Ip and Proxies", trend: "down", change: "-3%" },
    { category: "Gmail Account", trend: "up", change: "+10%" },
    { category: "SSN panel", trend: "up", change: "+7%" },
    { category: "USA Dl", trend: "down", change: "-4%" },
    { category: "Number Panel", trend: "up", change: "+9%" },
    { category: "USA Token Store", trend: "down", change: "-1%" },
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
  // Show fewer items for a cleaner look

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
      {" "}
      {/* Center: Live Data Ticker for sm devaice */}
      <div className="flex lg:hidden flex-wrap items-center md:gap-2 lg:gap-4 whitespace-nowrap animate-fade-in-down justify-center">
        {visibleItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-xs text-white">{item.category}</span>
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
      {/* Navbar */}
      <nav className="fixed py-3 lg:py-0 top-0 left-0 w-full z-50 backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
        <div className="flex items-center justify-between mx-auto px-4 gap-4  lg:h-14">
          {/* Left Side: Logo or Site Name */}
          <div className="">
            <Link className="" href="/">
              <Image
                src={
                  "https://i.ibb.co.com/rGrLVCZs/Chat-GPT-Image-Apr-24-2025-02-07-44-PM-removebg-preview.png"
                }
                alt="logo"
                height={800}
                width={80}
              />
            </Link>
          </div>

          {/* Center: Live Data Ticker */}
          <div className="hidden lg:flex flex-wrap items-center md:gap-2 lg:gap-4 whitespace-nowrap animate-fade-in-down justify-center">
            {visibleItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-xs text-white">{item.category}</span>
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

          {/* Right Side: Nav Links + Avatar + Mobile Menu Toggle */}
          {isLoading ? (
            <div className="flex items-center justify-center h-screen"></div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Add nav links here */}
              <Link
                href="/"
                className="text-white hidden sm:block hover:text-purple-400 text-sm font-medium"
              >
                Home
              </Link>

              {user ? (
                <Link
                  href="/dashboard"
                  className="text-white hover:text-purple-400 text-sm font-medium"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-white hidden sm:block hover:text-purple-400 text-sm font-medium"
                >
                  Login
                </Link>
              )}

              {/* User Avatar */}
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
                      <DropdownMenuItem
                        onClick={() => (location.href = "/profile")}
                      >
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href="/signup">
                      <button className="px-8 py-2 text-[#ffffff] rounded-md bg-gradient-to-r gap-2 from-[#572c7c] to-[#9133df] flex items-center hover:from-[#9133df] hover:to-[#572c7c] transition duration-300">
                        Join <IoLogInOutline className="text-2xl" />
                      </button>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white"
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#04091d]/95 backdrop-blur-md border-t border-white/10 px-4 py-2 space-y-2 text-sm mt-5">
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
            <Link
              href="/login"
              className="block text-white hover:text-gray-400"
            >
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
    </>
  );
};

export default MarketplaceNavbar;
