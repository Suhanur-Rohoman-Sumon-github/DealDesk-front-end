"use client";
import { useState } from "react";
import { FaArrowDown, FaMicrophone } from "react-icons/fa6";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import mentorTalking from "../../../public/assets/Talking Character.json";
import {
  FaBook,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaPenFancy,
} from "react-icons/fa";
import { VscStarFull } from "react-icons/vsc";
const Banner = () => {
  const [state, setState] = useState<"start" | "speaking" | "avatar">("start");

  const handleStart = () => setState("speaking");

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/ccNPfrvr/hero-bg-1.jpg')",
        }}
      />

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
      <div className="relative flex flex-col md:flex-row items-center justify-between text-center px-4 max-w-7xl w-full z-10 mt-24 md:mt-0 lg:px-8 gap-8">
        {/* Left Content */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center md:text-left leading-tight uppercase">
            Your Personal Mentor,{" "}
            <span className="text-[#8433c8]">Ready to Guide You</span>
          </h1>
          <p className="text-sm md:text-base text-secondary mt-3">
            Ask questions, get instant guidance, and practice conversations with
            your AI mentor. Learn at your own pace with interactive speaking
            sessions designed to boost your skills.
          </p>
        </div>

        {/* Right Content */}
        <div className="relative w-full md:w-1/2 max-w-md z-10 flex flex-col items-center">
          {state === "start" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/10 border border-white/30 p-6 md:p-8 rounded-xl shadow-xl backdrop-blur-md flex flex-col items-center gap-6 text-center mt-6 w-72 md:w-80"
            >
              {/* User Avatar Lottie */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="w-60 md:w-80">
                  <Lottie animationData={mentorTalking} loop={true} />
                </div>
              </motion.div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-full shadow-md text-sm md:text-base mt-2"
              >
                <FaMicrophone /> Start Talking
              </motion.button>
            </motion.div>
          )}

          {state === "speaking" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mrelative bg-white/10 border border-white/30 p-4 md:p-6 rounded-lg shadow-xl backdrop-blur-md flex flex-col items-center gap-4 text-center mt-6"
            >
              <div className="w-60 md:w-80">
                <Lottie animationData={mentorTalking} loop={true} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-10 bg-white shadow-lg px-4 py-2 rounded-2xl border border-gray-200"
              >
                <p className="text-gray-700 font-medium">
                  Hello! Im your mentor. Ready to practice your English?
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Down Arrow */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 hidden md:flex">
        <button className="group relative flex flex-col items-center justify-center">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#8633cd]/20 backdrop-blur-md border border-[#8633cd]/50 shadow-lg flex items-center justify-center animate-bounce transition-transform duration-300 group-hover:scale-110">
            <FaArrowDown className="text-[#8633cd] text-lg md:text-2xl drop-shadow-md" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Banner;
