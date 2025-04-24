"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypeWriter = () => {
  return (
    <div>
      <h1 className="text-2xl md:w-full sm:w-10/12 mx-auto sm:text-4xl lg:text-4xl xl:text-5xl md:text-3xl text-[#ffffff] ">
        <span className="font-bold">
          Transform Your Buy & Sell Experience With
        </span>
        <br />
        <span className="  ">
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
