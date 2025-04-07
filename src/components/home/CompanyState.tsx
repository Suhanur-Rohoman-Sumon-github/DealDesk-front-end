"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { stats } from "@/data/data";

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
    <div className="w-full flex justify-center -mt-8">
      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative p-8 rounded-md backdrop-blur-3xl bg-white/10 border border-white/20 shadow-lg text-center"
          >
            {/* Left Image */}
            <Image
              src={stat.leftImage}
              alt="Left Decoration"
              width={20}
              height={20}
              className="absolute left-2 top-2 transform "
            />

            {/* Stats */}
            <h3 className="text-4xl font-bold text-white">
              {counts[index].toLocaleString()}
              {stat.suffix}
            </h3>
            <p className="text-lg text-gray-300 mt-2">{stat.label}</p>

            {/* Right Image */}
            <Image
              src={stat.rightImage}
              alt="Right Decoration"
              width={20}
              height={20}
              className="absolute  top-2 transform  right-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyStats;
