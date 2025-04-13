"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import Image from "next/image";
import { IoLogInOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";

const MarketplaceNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-sm fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#16142a]/90 border-white/20 py-1">
      <div className="max-w-full mx-auto px-4 flex items-center justify-between h-12 gap-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 border border-white/20 px-2 py-1 rounded-full bg-[#16142a]/95">
          <Image
            src="https://centure.volkovdesign.com/img/dodgers/title--left.svg"
            alt="Left"
            width={20}
            height={20}
            className="object-contain"
          />
          <Link
            href="/marketplace"
            className="font-semibold text-xs leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] via-[#3B82F6] to-[#6EE7B7]"
          >
            DealDesk
          </Link>
          <Image
            src="https://centure.volkovdesign.com/img/dodgers/title--right.svg"
            alt="Right"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>

        {/* Glass Search Bar (Center) */}
        <div className="relative w-full max-w-sm">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-10  rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60  backdrop-blur-md text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 h-4 w-4 pointer-events-none" />
          <button
            type="button"
            className="absolute right-2 top-1 bg-[#ffffff1a] hover:bg-[#ffffff2a] text-white p-1 rounded-full transition"
          >
            <Search size={16} />
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-3 text-xs text-white font-medium">
          <Link href="/" className="hover:text-gray-400 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-400 transition">
            About
          </Link>
          <Link href="/services" className="hover:text-gray-400 transition">
            Services
          </Link>
          <Link href="/contact" className="hover:text-gray-400 transition">
            Contact
          </Link>
          <Link href="/login" className="hover:text-gray-400 transition">
            Login
          </Link>
          <Link href="/signup">
            <button className="text-white bg-gradient-to-r from-[#572c7c] to-[#9133df] hover:from-[#9133df] hover:to-[#572c7c] text-xs px-4 py-1 rounded flex items-center gap-1 transition">
              Join <IoLogInOutline size={16} />
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#16142a]/95 backdrop-blur-md border-t border-white/10 px-4 py-2 space-y-2 text-sm">
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
