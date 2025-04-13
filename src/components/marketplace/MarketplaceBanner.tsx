"use client";

import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import clsx from "clsx";

const mockData = [
  { category: "Mechanical Keyboards", trend: "up", change: "+12%" },
  { category: "Gaming Mice", trend: "down", change: "-5%" },
  { category: "Keycaps", trend: "up", change: "+8%" },
  { category: "Desk Mats", trend: "down", change: "-2%" },
  { category: "Switches", trend: "up", change: "+15%" },
  { category: "Wrist Rests", trend: "up", change: "+6%" },
  { category: "Custom Cables", trend: "down", change: "-3%" },
  { category: "Stabilizers", trend: "up", change: "+10%" },
  { category: "Lube Kits", trend: "up", change: "+7%" },
  { category: "Artisan Keycaps", trend: "down", change: "-4%" },
  { category: "Keyboard Bags", trend: "up", change: "+9%" },
  { category: "Sound Dampeners", trend: "down", change: "-1%" },
];

const MarketplaceBanner = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const itemsToShow = 7;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % mockData.length);
    }, 3500);

    const clockInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, []);

  const visibleItems = mockData
    .slice(visibleIndex, visibleIndex + itemsToShow)
    .concat(
      visibleIndex + itemsToShow > mockData.length
        ? mockData.slice(0, (visibleIndex + itemsToShow) % mockData.length)
        : []
    );

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="w-full fixed top-14 left-0 z-50 bg-[#1f1b37] border-b border-white/10 py-2 px-4 text-white text-sm font-medium overflow-hidden">
      <div className="max-w-8xl mx-auto flex justify-between items-center animate-fade-in-down">
        {/* Market ticker */}
        <div className="flex items-center space-x-6 overflow-hidden">
          {visibleItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="whitespace-nowrap">{item.category}</span>
              <div
                className={clsx(
                  "flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-semibold",
                  item.trend === "up"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-red-600/20 text-red-400"
                )}
              >
                {item.trend === "up" ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                )}
                <span>{item.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Digital Clock */}
        <div className="flex items-center space-x-2 px-4 py-1.5 rounded-lg backdrop-blur-md text-white bg-white/10 border border-white/20 shadow-md font-mono text-sm">
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-semibold">Live</span>
          </div>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceBanner;
