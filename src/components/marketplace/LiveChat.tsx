"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { FaXmark } from "react-icons/fa6";

import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const userNotifications = [
  { text: "New release: 'Mastering React' eBook now available.", tag: "React" },
  { text: "50% discount on 'JavaScript Essentials' eBook.", tag: "JavaScript" },
  {
    text: "Exclusive interview with bestselling author Jane Doe.",
    tag: "Author",
  },
  {
    text: "Top 10 eBooks in the Self-Help category updated.",
    tag: "Self-Help",
  },
  {
    text: "Download your free sample chapter of 'Advanced TypeScript'.",
    tag: "TypeScript",
  },
  {
    text: "New audiobook version available for 'Digital Marketing 101'.",
    tag: "Audiobook",
  },
  { text: "Explore curated eBook bundles for summer reading.", tag: "Bundles" },
  {
    text: "Ecommerce guides collection now with updated case studies.",
    tag: "Ecommerce",
  },
];

const sellValues = [
  5, 8, 6, 12, 9, 15, 11, 18, 10, 14, 7, 13, 9, 15, 11, 17, 8, 14, 10, 16, 12,
  9, 7, 5,
];

const initialGraphData = sellValues.map((sell, index) => ({
  name: `${24 - index} min ago`,
  sell,
}));

const LiveChat = () => {
  const LOCAL_STORAGE_KEY = "liveChatOrders";
  const LOCAL_STORAGE_DATE_KEY = "liveChatOrdersDate";
  const [orders, setOrders] = useState(0);
  const [notifications, setNotifications] = useState<typeof userNotifications>(
    []
  );
  const [graphData, setGraphData] = useState(initialGraphData);
  const [toggleLiveOrders, setToggleLiveOrders] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(LOCAL_STORAGE_DATE_KEY);

    if (storedDate !== today) {
      localStorage.setItem(LOCAL_STORAGE_DATE_KEY, today);
      localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    }

    const storedOrders = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initial = storedOrders ? parseInt(storedOrders, 10) : 0;
    setOrders(initial);

    const interval = setInterval(() => {
      const randomChange = Math.floor(Math.random() * 6); // Random between 0 and 5
      setOrders((prev) => {
        const updated = Math.max(prev + randomChange, 0);
        localStorage.setItem(LOCAL_STORAGE_KEY, updated.toString());

        setGraphData((prevGraph) => {
          const updatedGraph = [...prevGraph];
          const randomIndex = Math.floor(Math.random() * updatedGraph.length);

          updatedGraph[randomIndex] = {
            ...updatedGraph[randomIndex],
            sell: Math.max(updatedGraph[randomIndex].sell + randomChange, 0),
          };

          return updatedGraph;
        });

        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setNotifications([
      userNotifications[Math.floor(Math.random() * userNotifications.length)],
    ]);

    const interval = setInterval(() => {
      const randomNotification =
        userNotifications[Math.floor(Math.random() * userNotifications.length)];
      setNotifications((prev) => {
        const updated = [randomNotification, ...prev];
        return updated.slice(0, 2);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* toggle button for mobile device */}

      {/* live order content */}
      <div
        className={`transition-all duration-300 right-0 ${
          toggleLiveOrders ? "inline-block" : "hidden"
        } lg:inline-block fixed h-[calc(100vh-50px)] -mt-3 z-50 space-y-3 p-4 backdrop-blur-md bg-white/5 border border-white/10 shadow-lg text-white top-[70px] overflow-hidden w-full md:w-[300px] lg:w-[300px]`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-xs text-red-500">
            <button
              onClick={() => setToggleLiveOrders(false)}
              className="lg:hidden cursor-pointer text-white p-2 rounded-full bg-white/10 transition-all duration-300"
            >
              <FaXmark />
            </button>
            <span className="animate-pulse font-bold">🔴 LIVE</span>
            <span className="flex items-center px-2 py-0.5 text-xs rounded-full font-semibold text-white">
              {`Start : ${new Date().getHours()} H`}
            </span>
          </div>
          <span className="flex items-center gap-1 py-0.5 text-xs rounded-full font-semibold text-white">
            Orders complete: {orders}
          </span>
        </div>

        {/* Notification Cards */}
        <div className="w-full p-4 space-y-3">
          {notifications.map((user, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-2 relative"
            >
              {/* Bubble with text */}
              <div className="relative animation-class">
                <svg
                  viewBox="0 0 200 100"
                  className="w-full h-auto"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M10,0 h180 a10,10 0 0 1 10,10 v60 a10,10 0 0 1 -10,10 h-140 l-20,20 v-20 h-10 a10,10 0 0 1 -10,-10 v-60 a10,10 0 0 1 10,-10 z"
                    fill="#5f2e89"
                  />
                </svg>

                {/* Text inside bubble */}
                <div className="absolute -top-4 left-0 w-full h-full flex flex-col justify-center px-6 py-4">
                  <div className="text-sm">{user.text}</div>
                  <div className="text-xs text-[#ccc]">{user.tag}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Chart */}
          <div className="mt-4 bg-white/5 rounded-md p-2 border border-white/10">
            <div className="font-semibold text-white mb-2">
              Todays Market Trend
            </div>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#ccc", fontSize: 10 }}
                    axisLine={{ stroke: "#5f2e89" }}
                    tickLine={{ stroke: "#5f2e89" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#5f2e89",
                      borderColor: "transparent",
                      borderRadius: "8px",
                    }}
                    cursor={{ stroke: "#5f2e89", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sell"
                    stroke="#9333EA"
                    strokeWidth={2}
                    dot={false}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <Link href="/dashboard" className="w-full">
              <button className="button-primary w-full">my dashboard</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveChat;
