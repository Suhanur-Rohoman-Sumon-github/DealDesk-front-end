"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-50 backdrop-blur-md py-3  border-b bg-white/10 border border-white/20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-[#ffffff]">
            <Link href="/">TypoTech</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/about" className="text-[#ffffff] ">
              About
            </Link>
            <Link href="/services" className="text-[#ffffff] ">
              Services
            </Link>
            <Link href="/contact" className="text-[#ffffff] ">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-md shadow-lg px-4 py-3 space-y-2 border border-white/20">
          <Link href="/about" className="block text-[#ffffff] ">
            About
          </Link>
          <Link href="/services" className="block text-[#ffffff] ">
            Services
          </Link>
          <Link href="/contact" className="block text-[#ffffff] ">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
