"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { IoLogInOutline } from "react-icons/io5";
const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>(""); // State to track active link

  // Function to handle active link
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-50 backdrop-blur-md py-3 border-b bg-[#16142a]/70 border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 border-2 border-white/20 rounded-full px-4 py-2 bg-[#16142a]/90 backdrop-blur-md">
            <Image
              src={
                "https://centure.volkovdesign.com/img/dodgers/title--left.svg"
              }
              alt="Left Arrow"
              className="w-4 h-4 md:w-4 md:h-4"
              width={40}
              height={40}
            />
            <Link
              className=" font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] via-[#3B82F6] to-[#6EE7B7]"
              href="/"
              onClick={() => handleLinkClick("home")}
            >
              Deal^Desk
            </Link>
            <Image
              src={
                "https://centure.volkovdesign.com/img/dodgers/title--right.svg"
              }
              alt="Right Arrow"
              className="w-8 h-8 md:w-4 md:h-4"
              width={40}
              height={40}
            />
          </div>

          {/* Center Nav Links (Desktop) */}
          <div className="hidden md:flex space-x-8 text-white text-base font-medium">
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
          </div>

          {/* Login Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {" "}
            {/* Add space between items */}
            <Link
              href="/contact"
              onClick={() => handleLinkClick("contact")}
              className={`${
                activeLink === "contact" ? "text-gray-400" : "text-white"
              } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
            >
              Login
            </Link>
            <Link href="/login">
              <button className="px-8 py-2 text-[#ffffff] rounded-md bg-gradient-to-r gap-2 from-[#572c7c] to-[#9133df] flex items-center hover:from-[#9133df] hover:to-[#572c7c] transition duration-300">
                Join <IoLogInOutline className="text-2xl" />
              </button>
            </Link>
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
        <div className="md:hidden bg-[#16142a]/90 backdrop-blur-md shadow-lg px-4 py-3 space-y-3 border-t border-white/10">
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
