"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { IoLogInOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
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

  console.log(user);

  const handleLogout = () => {
    logout();
  };

  // Updated mock data with book categories
  const mockData = [
    { category: "Fiction & Literature", buyer: "Rahim from Dhaka" },
    { category: "Science & Technology", buyer: "Aarav from Mumbai" },
    { category: "Self Development", buyer: "Yuki from Tokyo" },
    { category: "History & Culture", buyer: "Tamal from Chittagong" },
    { category: "Health & Fitness", buyer: "Priya from Delhi" },
    { category: "Business & Entrepreneurship", buyer: "Haruto from Osaka" },
    { category: "Children’s Books", buyer: "Fatima from Sylhet" },
    { category: "Travel & Adventure", buyer: "Anika from Kolkata" },
    { category: "Romance", buyer: "Kenji from Kyoto" },
    { category: "Thriller & Mystery", buyer: "Sneha from Chennai" },
    { category: "Educational eBooks", buyer: "Akira from Yokohama" },
    { category: "Comics & Graphic Novels", buyer: "Hasan from Barisal" },
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
      <div className="md:flex hidden lg:hidden flex-wrap items-center gap-2 whitespace-nowrap animate-fade-in-down justify-center bg-[#04091d]/90 text-white py-1 px-2 border-b border-white/10 fixed top-[56px] left-0 right-0 z-40">
        {visibleItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs">
            <span>{item.category}</span>
            <div className="text-xs bg-white/10 text-white px-2 py-0.5 rounded-full font-medium">
              {item.buyer} just purchased
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
            {visibleItems.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <div
                  className="text-white px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: "#5f2e89" }}
                >
                  {item.buyer} just purchased
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Nav Links, User, Mobile Toggle */}
          {isLoading ? (
            <div className="flex items-center justify-center h-14">
              {/* Loading state if needed */}
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
                    href={`${
                      user.role === "admin" ? "/admin/dashboard" : "/dashboard"
                    }`}
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
