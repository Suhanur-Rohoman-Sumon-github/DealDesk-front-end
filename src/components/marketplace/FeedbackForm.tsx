"use client";
import React, { useState } from "react";
import { FaSmile, FaMeh, FaFrown, FaGrinStars, FaAngry } from "react-icons/fa";

const FeedbackForm = () => {
  const [rating, setRating] = useState<number | null>(null);

  const handleRate = (value: number) => {
    setRating(value);
    console.log("User rated:", value); // Replace with API call if needed
  };

  const icons = [
    {
      icon: <FaAngry className="text-[#e63946]" />, 
      label: "Very Bad",
    },
    {
      icon: <FaFrown className="text-[#f4a261]" />, 
      label: "Bad",
    },
    {
      icon: <FaMeh className="text-[#f6bd60]" />, 
      label: "Okay",
    },
    {
      icon: <FaSmile className="text-[#43aa8b]" />, 
      label: "Good",
    },
    {
      icon: <FaGrinStars className="text-[#4cc9f0]" />, 
      label: "Excellent",
    },
  ];

  return (
    <div className="fixed right-4 bottom-4 w-64 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-md">
      <h3 className="text-sm font-semibold text-white text-center mb-3">
        Rate Your Experience
      </h3>

      {rating ? (
        <div className="text-center text-green-400 text-sm">
          <p>
            Thanks for rating us {rating} star{rating > 1 ? "s" : ""}! 🌟
          </p>
        </div>
      ) : (
        <div className="flex justify-between items-center px-1">
          {icons.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleRate(idx + 1)}
              title={item.label}
              className="text-2xl hover:scale-110 hover:drop-shadow-md transition-transform duration-200"
            >
              {item.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
