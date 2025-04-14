"use client";
import React, { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    if (feedback.trim() !== "") {
      // Simulate sending feedback (you can replace this with your API call)
      console.log("Feedback submitted:", feedback);
      setIsSubmitted(true);
    } else {
      alert("Please provide some feedback.");
    }
  };

  return (
    <div className="fixed top-[360px] right-0 p-4 w-80 backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-2">
        We Value Your Feedback
      </h3>
      <p className="text-sm text-white/80 mb-3">
        Tell us how we can improve our service or product.
      </p>
      {isSubmitted ? (
        <div className="text-center text-green-500">
          <p>Thank you for your feedback!</p>
        </div>
      ) : (
        <>
          <textarea
            value={feedback}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 text-sm border border-white/30 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 placeholder-white/60 text-white"
            placeholder="Write your feedback here..."
          />
          <button
            onClick={handleSubmit}
            className="w-full button-primary -mt-2"
          >
            Submit Feedback
          </button>
        </>
      )}
    </div>
  );
};

export default FeedbackForm;
