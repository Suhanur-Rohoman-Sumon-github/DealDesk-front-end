"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaXmark } from "react-icons/fa6";
import { useGetMyOrderQuery } from "@/hooks/Order.hooks";
import { useUser } from "@/context/userProvider";
import LiveChatSkeleton from "../skeleton/LiveChatSkeleton";
import { Order } from "@/types";
import Link from "next/link";
import { ClockIcon } from "lucide-react";

const userNotifications = [
  {
    username: "user12",
    text: "made a recent purchase",
    image:
      "https://www.go2bank.com/retail_debit_card_today/_jcr_content/root/responsivegrid/layout_container/col2Tile1/content_card/image.coreimg.svg/1708077696133/need-a-card-hero.svg",
  },
  {
    username: "user8",
    text: "just grabbed a new custom keyboard!",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ56Rcp_cI2hTMRf51_qWNpPwcZ6zfwQvM53w&s",
  },
  {
    username: "user5",
    text: "added a cable set to their cart!",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt1xbRRSDONJl1zUOUVFt0ON5l3h4up8LIVg&s",
  },
  {
    username: "user3",
    text: "is loving the new RGB wrist rest!",
    image:
      "https://www.gobank.com/assets/img/home/gobank-meet-go2bank-517x517.png",
  },
  {
    username: "user19",
    text: "is loving the new RGB wrist rest!",
    image:
      "https://www.gobank.com/assets/img/home/gobank-meet-go2bank-517x517.png",
  },
  {
    username: "user19",
    text: "is loving the new RGB wrist rest!",
    image:
      "https://www.gobank.com/assets/img/home/gobank-meet-go2bank-517x517.png",
  },
  {
    username: "user19",
    text: "is loving the new RGB wrist rest!",
    image:
      "https://www.gobank.com/assets/img/home/gobank-meet-go2bank-517x517.png",
  },
  {
    username: "user19",
    text: "is loving the new RGB wrist rest!",
    image:
      "https://www.gobank.com/assets/img/home/gobank-meet-go2bank-517x517.png",
  },
  {
    username: "user19",
    text: "is loving the new RGB wrist rest!",
    image:
      "https://www.gobank.com/assets/img/home/gobank-meet-go2bank-517x517.png",
  },
];

const LiveChat = () => {
  const { user } = useUser();
  const LOCAL_STORAGE_KEY = "liveChatOrders";
  const [orders, setOrders] = useState(0);
  const [notifications, setNotifications] = useState<typeof userNotifications>(
    []
  );
  const [toggleLiveOrders, setToggleLiveOrders] = useState(false);

  useEffect(() => {
    setNotifications([
      userNotifications[Math.floor(Math.random() * userNotifications.length)],
    ]);

    const interval = setInterval(() => {
      const randomNotification =
        userNotifications[Math.floor(Math.random() * userNotifications.length)];
      setNotifications((prev) => {
        const updated = [randomNotification, ...prev];
        return updated.slice(0, 4); // Keep only the top 3 notifications
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const initial = stored ? parseInt(stored, 10) : 42;
      setOrders(initial);
      if (!stored) {
        localStorage.setItem(LOCAL_STORAGE_KEY, initial.toString());
      }
    }

    const interval = setInterval(() => {
      const randomIncrement = Math.floor(Math.random() * 5) + 1;
      setOrders((prev) => {
        const updated = prev + randomIncrement;
        localStorage.setItem(LOCAL_STORAGE_KEY, updated.toString());
        return updated;
      });
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const { data: recentOrders, isLoading } = useGetMyOrderQuery(user?.id || "");

  if (isLoading) return <LiveChatSkeleton />;

  return (
    <>
      {/* toggle button for mobile device */}
      <div
        onClick={() => setToggleLiveOrders(!toggleLiveOrders)}
        className="z-10 cursor-pointer absolute top-[50px] mt-12 right-5 text-white lg:hidden items-center gap-2 flex space-x-1 border-2 border-white/20 rounded-full px-4 py-2 bg-[#04091d]/90 backdrop-blur-md"
      >
        <button
          type="button"
          className="font-bold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] via-[#3B82F6] to-[#6EE7B7]"
        >
          Live Activities
        </button>
      </div>

      {/* live order content */}
      <div
        className={`transition-all duration-300 right-0 ${
          toggleLiveOrders ? "inline-block" : "hidden"
        } lg:inline-block fixed lg:fixed h-[calc(100vh-50px)] -mt-3 z-50 space-y-3 p-4 backdrop-blur-md bg-white/5 border border-white/10 shadow-lg text-white top-[70px] overflow-hidden w-full md:w-[300px] lg:w-[300px]`}
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
              {`Start : ${new Date().getHours()} H${
                new Date().getHours() !== 1 ? "" : ""
              }`}
            </span>
          </div>
          <span className="flex items-center gap-1 py-0.5 text-xs rounded-full font-semibold text-white">
            Orders complete: {orders}
          </span>
        </div>

        {/* Notification Cards */}
        <div className="w-full  rounded-lg shadow p-4 space-y-3 ">
          {notifications.map((user, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-2  relative "
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
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 py-4">
                  <div className="text-sm ">
                    <span className="font-semibold">@{user.username}</span>{" "}
                    {user.text}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                    <ClockIcon className="h-3 w-3" /> Just now
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LiveChat;
