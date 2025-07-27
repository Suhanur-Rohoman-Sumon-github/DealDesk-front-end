"use client";

import { FaArrowRightLong, FaArrowDown,  } from "react-icons/fa6";
import TypeWriter from "./TypeWriter";
import Link from "next/link";
import { FaBook, FaChalkboardTeacher,  FaGraduationCap, FaPenFancy, FaQuestionCircle } from "react-icons/fa";
import { VscStarFull } from "react-icons/vsc";

const Banner = () => {
  return (
    <div className="relative h-[90vh] md:h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/ccNPfrvr/hero-bg-1.jpg')",
        }}
      />

      {/* Floating Icons */}
      <div>
        {/* Top Floating Icon */}
        {/* Top Floating Icon - Book */}
        <div className="absolute top-20 left-10 md:top-[190px] md:left-[870px] animate-floating-slow w-8 h-8 md:w-10 md:h-10 bg-indigo-500/70 backdrop-blur-md rounded-full flex items-center justify-center text-white text-lg md:text-xl shadow-xl z-10">
          <FaBook />
        </div>

        {/* Right Floating Icon - Graduation Cap */}
        <div className="absolute top-20 right-8 md:top-[190px] md:right-[11%] animate-floating-fast w-8 h-8 md:w-10 md:h-10 bg-blue-600/70 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl z-10">
          <FaGraduationCap />
        </div>

        {/* Bottom Floating Icon - Chalkboard Teacher */}
        <div className="absolute bottom-32 right-4 md:bottom-[20%] md:right-[5%] animate-floating-slow w-8 h-8 md:w-10 md:h-10 bg-cyan-500/70 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg z-10">
          <FaChalkboardTeacher />
        </div>

        {/* Bottom Floating Icon - Pen */}
        <div className="absolute bottom-16 right-1/4 md:bottom-[10%] md:right-[25%] animate-floating-medium w-8 h-8 md:w-10 md:h-10 bg-pink-600/70 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-md z-10">
          <FaPenFancy />
        </div>
      </div>

      {/* Star Icons */}
      <div>
        <VscStarFull className="text-[#59dee7] text-sm md:text-xl animate-pulse absolute top-40 left-6 md:top-96 md:left-24" />
        <VscStarFull className="text-[#b32c7d] text-sm md:text-xl animate-pulse absolute bottom-12 left-20 md:bottom-24 md:left-[300px]" />
        <VscStarFull className="text-[#fe778d] text-sm md:text-xl animate-pulse absolute top-12 right-20 md:top-24 md:right-[300px]" />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col md:flex-row items-center justify-between text-center px-4 max-w-7xl w-full z-10 text-[#ffffff]  mt-[400px] md:mt-0  lg:px-8">
        {/* Left Content */}
        <div className="max-w-xl lg:text-left sm:text-center md:text-left mb-8 md:mb-0">
          <TypeWriter />
          <p className="text-sm md:text-base text-secondary mt-2">
            Explore a world of eBooks, audiobooks, and study guides. Download
            and enjoy your favorite titles instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center md:justify-start sm:justify-center gap-4 mt-4">
            <Link href={"/marketplaces"}>
              <button className="button-primary w-full sm:w-auto">
                Start Reading <FaArrowRightLong />
              </button>
            </Link>
            <Link href={"/marketplaces"}>
              <button className="button-secondary w-full sm:w-auto">
                Browse Library <FaArrowRightLong />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative w-full md:w-1/2 max-w-lg z-10 mt-6 md:mt-0">
          {/* Glowing Background */}
          <div className="absolute -top-5 -right-5 w-48 h-48 md:w-[400px] md:h-[400px] rounded-full bg-[#ffffff10] blur-2xl md:blur-3xl animate-rotate-slow pointer-events-none z-0" />

          {/* Card Content */}
          <div className="relative bg-white/10 border border-white/30 p-4 md:p-6 rounded-lg shadow-xl backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#7365ff] flex items-center justify-center text-white text-lg md:text-xl shadow-lg animate-bounce-slow">
                <FaQuestionCircle />
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-white">
                Why Choose <span className="text-[#FFFFFF]">ReadVerse?</span>
              </h2>
            </div>
            <ul className="mt-3 space-y-1 text-sm md:text-base text-[#c9c8ca]">
              <li>✅ Thousands of eBooks across all genres </li>
              <li>✅ Instant downloads with lifetime access</li>
              <li>✅ Mobile-friendly and offline reading support </li>
              <li>✅ Affordable bundles & student discounts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Animated Down Arrow */}
      <div className="absolute bottom-4 md:bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <button className="group relative flex flex-col items-center justify-center">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#8633cd]/20 backdrop-blur-md border border-[#8633cd]/50 shadow-lg flex items-center justify-center animate-bounce transition-transform duration-300 group-hover:scale-110">
            <FaArrowDown className="text-[#8633cd] text-xl md:text-2xl drop-shadow-md" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Banner;
