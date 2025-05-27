"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMychanelQuery } from "@/hooks/User.hook";

const AccountStatusPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes
  const [isApproved, setIsApproved] = useState<boolean>(false);

  // Grab email from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    setEmail(emailParam);
  }, []);

  const { data, isLoading } = useGetMychanelQuery(email || "");

  console.log(data, "My Chanel Data");

  // Watch for approval state
  useEffect(() => {
    if (data && data.isPending === false) {
      setIsApproved(true);
    }
  }, [data]);

  // Timer
  useEffect(() => {
    if (isApproved || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isApproved]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!email || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#04091d] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#04091d] text-white px-4">
      <div className="max-w-md w-full p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">
          {isApproved ? "Account Approved ✅" : "Account Status: Pending..."}
        </h1>

        {!isApproved && (
          <>
            <p className="text-lg mb-6">
              Please wait while we verify your account.
            </p>
            <div className="text-4xl font-mono mb-8">
              {formatTime(timeLeft)}
            </div>
          </>
        )}

        {isApproved && (
          <div className="space-y-6">
            <div className="bg-white/20 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Community Channel</h2>
              <a
                href="https://t.me/+okCFY5-LKnc2MTY1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline hover:text-blue-400"
              >
                #Deal Desk Community 🌱
              </a>
            </div>

            <div className="bg-white/20 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Personal Channel</h2>
              <a
                href={data?.myChanel || "N/A"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline hover:text-blue-400"
              >
                My Report chanel 🌱
              </a>
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
