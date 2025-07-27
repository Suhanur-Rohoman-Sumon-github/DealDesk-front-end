"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
import { usePathname } from "next/navigation";

const MainNavbar = () => {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
    { name: "Library", href: "/marketplaces" },
  ];

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-50 backdrop-blur-md py-1 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://i.ibb.co.com/rGrLVCZs/Chat-GPT-Image-Apr-24-2025-02-07-44-PM-removebg-preview.png"
              alt="logo"
              height={50}
              width={50}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 text-white font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  pathname === link.href ? "text-gray-400" : "text-white"
                } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? null : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profilePicture || "/avatar.png"}
                      alt={user?.name}
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
              <>
                <Link
                  href="/login"
                  className="hover:bg-gradient-to-r hover:text-gray-500  text-white hover:bg-clip-text transition"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <button className="px-6 py-2 text-[#ffffff] rounded-md bg-gradient-to-r gap-2 from-[#572c7c] to-[#9133df] flex items-center hover:from-[#9133df] hover:to-[#572c7c] transition duration-300">
                    Join <IoLogInOutline className="text-xl" />
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
        <div className="md:hidden flex flex-col gap-3 bg-[#04091d]/90 backdrop-blur-md shadow-lg px-4 py-4 space-y-3 border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                pathname === link.href ? "text-gray-400" : "text-white"
              } hover:bg-gradient-to-r hover:text-gray-500 hover:bg-clip-text transition`}
            >
              {link.name}
            </Link>
          ))}

          {/* User Actions (Mobile) */}
          {isLoading ? null : user ? (
            <button
              onClick={handleLogout}
              className="w-full py-2 text-center text-white rounded-md bg-gradient-to-r from-red-500 to-pink-500"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="block w-full py-2 text-center text-white rounded-md bg-gradient-to-r from-[#572c7c] to-[#9133df] hover:from-[#9133df] hover:to-[#572c7c] transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block w-full py-2 text-center text-white rounded-md border border-white/20"
              >
                Join
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
