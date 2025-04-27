"use client";

import { FaArrowRightLong, FaArrowDown, FaDollarSign } from "react-icons/fa6";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import TypeWriter from "./TypeWriter";
import Link from "next/link";
import { FaEthereum, FaQuestionCircle } from "react-icons/fa";
import { SiBitcoin } from "react-icons/si";
import { VscStarFull } from "react-icons/vsc";
const Banner = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}

      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/ccNPfrvr/hero-bg-1.jpg')",
        }}
      />

      <div>
        <div className="absolute top-[190px] left-[870px] transform -translate-x-1/2 animate-floating-slow w-10 h-10 bg-pink-500/70 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl shadow-xl z-10">
          <SiBitcoin />
        </div>

        {/* Top-Left */}

        {/* Top-Right */}
        <div className="absolute top-[190px] right-[11%] animate-floating-fast w-10 h-10 bg-[#4562fe] backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl z-10">
          <FaEthereum />
        </div>

        {/* Mid-Left */}

        {/* Mid-Right */}
        <div className="absolute bottom-[20%] right-[5%] animate-floating-slow w-10 h-10 bg-[#0dd8e3] backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg z-10">
          <FaDollarSign />
        </div>

        {/* Bottom-Right */}
        <div className="absolute bottom-[10%] right-[25%] animate-floating-medium w-10 h-10 bg-[#b32c7d] backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-md z-10">
          <LiaHandHoldingUsdSolid />
        </div>
      </div>
      <div>
        <VscStarFull className="text-[#59dee7] text-xl animate-pulse pulse 3s ease-in-out infinit absolute top-96 left-24 transition " />
        <VscStarFull className="text-[#b32c7d] text-xl animate-pulse absolute bottom-24 left-[300px]" />
        <VscStarFull className="text-[#b32c7d] text-xl animate-pulse absolute top-24 left-80" />

        <VscStarFull className="text-[#fe778d] text-xl animate-pulse absolute top-24 right-[300px]" />
        <VscStarFull className="text-[#fe778d] text-xl animate-pulse absolute bottom-28 right-[300px]" />
        <VscStarFull className="text-[#fe778d] text-xl animate-pulse absolute bottom-72 right-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col md:flex-row items-center justify-between text-center px-4 max-w-7xl w-full z-10 text-[#ffffff]">
        {/* Left Content */}
        <div className="max-w-3xl lg:text-left sm:text-center md:text-left md:w-1/2 mb-8 md:mb-0">
          <TypeWriter />
          <p className="text-secondary">
            Create powerful, scalable, and secure marketplace experiences that
            attract users, build trust, and accelerate your business success.
          </p>
          <div className="flex items-center md:justify-start sm:justify-center flex-wrap gap-4">
            <Link href={"/marketplaces"}>
              <button className="button-primary">
                Get Started <FaArrowRightLong />
              </button>
            </Link>
            <Link className="mt-4" href={"/marketplaces"}>
              <button className="button-secondary ">
                Visit Marketplace <FaArrowRightLong />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Card with Rotating Background */}
        <div className="relative md:w-1/2 max-w-lg md:ms-5 lg:ms-0 text-left z-10">
          {/* Rotating glowing background */}
          <div className="absolute -top-10 -right-10 w-[400px] h-[400px] rounded-full bg-[#ffffff10] blur-3xl animate-rotate-slow pointer-events-none z-0" />

          {/* Foreground Content */}
          <div className="relative bg-white/10 border border-white/30 p-6 rounded-lg shadow-xl backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              {/* Animated Icon */}
              <div className="w-10 h-10 rounded-full bg-[#7365ff] flex items-center justify-center text-white text-xl shadow-lg animate-bounce-slow">
                <FaQuestionCircle />
              </div>

              {/* Heading */}
              <h2 className="text-3xl font-bold text-white upp">
                Why Choose <span className="text-[#FFFFFF]">Deal Desk?</span>
              </h2>
            </div>

            <ul className="mt-4 space-y-2 text-[#c9c8ca]">
              <li>
                ✅ The first-ever marketplace built for the Buy & Sell industry
              </li>
              <li>✅ Safe, secure, and trustworthy platform for all users</li>
              <li>✅ Fast performance with scalable infrastructure</li>
              <li>✅ 24/7 expert support & seamless user experience</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Animated Down Arrow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <button className="group relative flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#8633cd]/20 backdrop-blur-md border border-[#8633cd]/50 shadow-lg flex items-center justify-center animate-bounce transition-transform duration-300 group-hover:scale-110">
            <FaArrowDown className="text-[#8633cd] text-2xl drop-shadow-md" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Banner;
