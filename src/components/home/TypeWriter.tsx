"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypeWriter = () => {
  return (
    <div>
      <h1 className="text-5xl text-[#ffffff]">
        <span className="font-bold">Transform Your Online Presence with</span>{" "}
        <br />
        <span>
          <Typewriter
            words={[
              "Web Solutions",
              "Digital Marketing",
              "Buy & Sell",
              "SEO & Growth",
              "E-Commerce Dev",
              "Custom Software",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={150}
            deleteSpeed={100}
            delaySpeed={1500}
          />
        </span>
      </h1>
    </div>
  );
};

export default TypeWriter;
