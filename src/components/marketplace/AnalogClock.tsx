"use client";
import React, { useEffect, useState } from "react";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds() * 6;
  const minutes = time.getMinutes() * 6;
  const hours = (time.getHours() % 12) * 30 + time.getMinutes() / 2;

  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="relative w-10 h-10 rounded-full bg-white/10 mx-auto ">
      {/* Outer Kata (Decorative Border) */}
      <div className="absolute inset-0 border-2 border-white/20 rounded-full shadow-inner shadow-black/30" />

      {/* Clock Numbers */}
      {numbers.map((num) => {
        const angle = ((num - 3) * 30 * Math.PI) / 180;
        const radius = 17; // reduced radius for smaller clock
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return (
          <div
            key={num}
            className="absolute text-[5px] left-[1px] text-white font-semibold select-none"
            style={{
              top: `calc(50% + ${y}px - 3px)`,
              left: `calc(50% + ${x}px - 3px)`,
            }}
          >
            {num}
          </div>
        );
      })}

      {/* Hour Hand */}
      <div
        className="absolute w-[1.5px] h-[28%] bg-white top-[22%] left-1/2 origin-bottom"
        style={{ transform: `rotate(${hours}deg)` }}
      />
      {/* Minute Hand */}
      <div
        className="absolute w-[1.5px] h-[38%] bg-blue-400 top-[12%] left-1/2 origin-bottom"
        style={{ transform: `rotate(${minutes}deg)` }}
      />
      {/* Second Hand */}
      <div
        className="absolute w-[1px] h-[45%] bg-red-400 top-[5%] left-1/2 origin-bottom"
        style={{ transform: `rotate(${seconds}deg)` }}
      />

      {/* Center Dot */}
      <div className="absolute w-[5px] h-[5px] bg-white rounded-full top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10" />

      {/* Center “12” Badge */}
      <div className="absolute text-[7px] text-white font-bold top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        12
      </div>
    </div>
  );
};

export default AnalogClock;
