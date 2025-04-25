"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypeWriter = () => {
  return (
    <div>
      <h1 className="text-primary text-[#ffffff]">
        <span className="font-bold uppercase text-[#ffffff]">
          We Are the <span className="text-[#FFFF]">First Ever</span> in the
          Global Market — Why?
        </span>
        <br />
        <span className="  text-3xl uppercase text-[#ffffff]">
          <Typewriter
            words={[
              "Secure Transactions",
              "Verified Sellers",
              "24/7 Support",
              "Fast Delivery",
              "No Hidden Fees",
              "Modern Tech",
              "Top-Rated Platform",
              "Trust Comes First",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={60}
            delaySpeed={1200}
          />
        </span>
      </h1>
    </div>
  );
};

export default TypeWriter;
