"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { IoLogInOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/context/userProvider";
import { logout } from "@/services/authServices";
import Image from "next/image";
const MainNavbar = () => {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>(""); // State to track active link

  // Function to handle active link
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-50 backdrop-blur-md py-1 border-b  border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="">
            <Link className="" href="/" onClick={() => handleLinkClick("home")}>
              <Image
                src={
                  "https://i.ibb.co.com/rGrLVCZs/Chat-GPT-Image-Apr-24-2025-02-07-44-PM-removebg-preview.png"
                }
                alt="logo"
                height={80}
                width={80}
              />
            </Link>
          </div>

          {/* Center Nav Links (Desktop) */}
          <div className="hidden md:flex md:space-x-3 lg:space-x-8 text-white md:text-[14px] text-base lg:text-base font-medium">
            <Link
              href="/"
              onClick={() => handleLinkClick("home")}
              className={`${
                activeLink === "home" ? "text-gray-400" : "text-white"
              } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => handleLinkClick("about")}
              className={`${
                activeLink === "about" ? "text-gray-400" : "text-white"
              } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
            >
              About
            </Link>
            <Link
              href="/services"
              onClick={() => handleLinkClick("services")}
              className={`${
                activeLink === "services" ? "text-gray-400" : "text-white"
              } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
            >
              Services
            </Link>

            <Link
              href="/pricing"
              onClick={() => handleLinkClick("pricing")}
              className={`${
                activeLink === "pricing" ? "text-gray-400" : "text-white"
              } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              onClick={() => handleLinkClick("contact")}
              className={`${
                activeLink === "contact" ? "text-gray-400" : "text-white"
              } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
            >
              Contact
            </Link>
            <Link
              href="/marketplaces"
              onClick={() => handleLinkClick("marketplaces")}
              className={`${
                activeLink === "marketplaces" ? "text-gray-400" : "text-white"
              } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
            >
              Marketplace
            </Link>
          </div>

          {/* Login Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-screen"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profilePicture || "/avatar.png"} />
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
              <>
                <Link
                  href="/login"
                  onClick={() => handleLinkClick("contact")}
                  className={`${
                    activeLink === "contact" ? "text-gray-400" : "text-white"
                  } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
                >
                  Login
                </Link>
                <Link href="/signup">
                  <button className="px-8 py-2 text-[#ffffff] rounded-md bg-gradient-to-r gap-2 from-[#572c7c] to-[#9133df] flex items-center hover:from-[#9133df] hover:to-[#572c7c] transition duration-300">
                    Join <IoLogInOutline className="text-2xl" />
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-5 items-center justify-center bg-[#04091d]/90 backdrop-blur-md shadow-lg px-4 py-3 space-y-3 border-t border-white/10">
          <Link
            href="/"
            onClick={() => handleLinkClick("home")}
            className={`${
              activeLink === "home" ? "text-gray-400" : "text-white"
            } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => handleLinkClick("about")}
            className={`${
              activeLink === "about" ? "text-gray-400" : "text-white"
            } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={() => handleLinkClick("services")}
            className={`${
              activeLink === "services" ? "text-gray-400" : "text-white"
            } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
          >
            Services
          </Link>
          <Link
            href="/contact"
            onClick={() => handleLinkClick("contact")}
            className={`${
              activeLink === "contact" ? "text-gray-400" : "text-white"
            } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="block text-white font-semibold pt-2 hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
