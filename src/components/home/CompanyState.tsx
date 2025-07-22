"use client";
import { useState, useEffect, useRef } from "react";
import { stats } from "@/data/data";
import Image from "next/image";
import leftDecor from "../../../public/assets/stats--purple.svg";
import rightDecor from "../../../public/assets/stats--purple.svg";

const AgencyStats = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat, index) => {
              const end = stat.value;
              const duration = 2000;
              const increment = Math.ceil(end / (duration / 50));

              const timer = setInterval(() => {
                setCounts((prevCounts) => {
                  const newCounts = [...prevCounts];
                  if (newCounts[index] < end) {
                    newCounts[index] += increment;
                  } else {
                    newCounts[index] = end;
                    clearInterval(timer);
                  }
                  return newCounts;
                });
              }, 50);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="w-full p-5 flex justify-center relative overflow-hidden">
      {/* Left Decorative Image */}

      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full z-10"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative bg-white/5 p-8 rounded-md backdrop-blur-3xl border border-white/20 shadow-lg text-center overflow-hidden"
          >
            {/* Left Decorative Image inside card */}
            <Image
              src={leftDecor}
              alt="Left Decoration"
              width={15}
              height={15}
              className="absolute left-4 top-4 "
            />

            {/* Right Decorative Image inside card */}
            <Image
              src={rightDecor}
              alt="Right Decoration"
              width={15}
              height={15}
              className="absolute right-4  top-4 "
            />

            {/* Stats Text */}
            <h3 className="text-4xl font-bold text-white relative z-10">
              {counts[index] > 0
                ? counts[index].toLocaleString()
                : stat.value.toLocaleString()}

              {stat.suffix}
            </h3>
            <p className="text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyStats;
