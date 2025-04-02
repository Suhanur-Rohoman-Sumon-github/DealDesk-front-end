"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">
            <Link href="/">TypoTech</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-gray-900"
            >
              Services
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
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
        <div className="md:hidden bg-white shadow-lg px-4 py-3 space-y-2">
          <Link
            href="/about"
            className="block text-gray-600 hover:text-gray-900"
          >
            About
          </Link>
          <Link
            href="/services"
            className="block text-gray-600 hover:text-gray-900"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="block text-gray-600 hover:text-gray-900"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
