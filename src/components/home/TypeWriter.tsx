"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypeWriter = () => {
  return (
    <div>
      <h1 className="text-primary text-[#ffffff]">
        <span className="font-bold uppercase text-[#ffffff]">
          <span className="text-[#8b33d6]">Transform</span> Your Buy & Sell
          Experience With
        </span>
        <br />
        <span className="  text-3xl uppercase text-[#ffffff]">
          <Typewriter
            words={[
              "Safe & Secure",
              "Smart & Scalable",
              "Seamless & Reliable",
              "Fast & Future-Ready",
              "Custom-Built Solutions",
              "User-Centered Design",
              "High-Performance Tech",
              "Marketplace Innovation",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={120}
            deleteSpeed={80}
            delaySpeed={1000}
          />
        </span>
      </h1>
    </div>
  );
};

export default TypeWriter;
