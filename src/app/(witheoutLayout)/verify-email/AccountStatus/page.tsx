"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AccountStatusPage = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds
  const [isApproved, setIsApproved] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsApproved(true);
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#04091d] text-white px-4">
      <div className="max-w-md w-full p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">
          {isApproved ? "Account Approved ✅" : "Account Status: Pending..."}
        </h1>

        {!isApproved && (
          <p className="text-lg mb-6">
            Please wait while we verify your account.
          </p>
        )}

        {!isApproved && (
          <div className="text-4xl font-mono mb-8">{formatTime(timeLeft)}</div>
        )}

        {isApproved && (
          <div className="space-y-6">
            <div className="bg-white/20 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Community Channel</h2>
              <p>#gardening-lovers 🌱</p>
            </div>

            <div className="bg-white/20 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Personal Channel</h2>
              <p>@your-username</p>
            </div>

            <div className="bg-white/20 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Profile</h2>
              <p>Name: Tanmoy Parvez</p>
              <p>Email: youremail@example.com</p>
              <p>Member Since: 2025</p>
            </div>

            <button
              onClick={() => router.push("/")}
              className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition-all"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountStatusPage;
