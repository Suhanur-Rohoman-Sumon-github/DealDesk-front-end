"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaXmark } from "react-icons/fa6";
import { useGetMyOrderQuery } from "@/hooks/Order.hooks";
import { useUser } from "@/context/userProvider";
import LiveChatSkeleton from "../skeleton/LiveChatSkeleton";
import { Order } from "@/types";

const LiveChat = () => {
  const { user } = useUser();
  const [toggleLiveOrders, setToggleLiveOrders] = useState(true);

  // Dummy notifications and orders count — replace with real-time logic if needed
  const notifications = [
    {
      image: "/keyboard.jpg",
      username: "john_doe",
      text: "Just bought a custom keyboard!",
    },
  ];
  const orders = notifications.length;

  const { data: recentOrders, isLoading } = useGetMyOrderQuery(user?.id || "");

  if (isLoading) return <LiveChatSkeleton />;

  return (
    <>
      {/* Live order panel */}
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
            <span className="px-2 py-0.5 text-xs rounded-full font-semibold text-white">
              Start : {new Date().getHours()} H
            </span>
          </div>
          <span className="text-xs font-semibold text-white">
            Orders complete: {orders}
          </span>
        </div>

        {/* Notification Cards */}
        {notifications.map((user, index) => (
          <div
            key={index}
            className="animate-slide-in flex flex-col items-center text-center p-4 rounded-xl bg-white/10 shadow-md"
          >
            <div className="w-50 h-25 rounded-md overflow-hidden mb-3">
              <Image
                src={user.image}
                alt={`product-${index}`}
                width={400}
                height={100}
                className="w-[900px] h-full object-cover"
              />
            </div>
            <div className="text-sm font-semibold">@{user.username}</div>
            <div className="text-xs text-white/80 mt-1">{user.text}</div>
          </div>
        ))}

        {/* Recent Orders */}
        <div className="mt-auto text-xs bg-white/5 rounded-md p-2 border border-white/10">
          <div className="font-semibold text-white mb-1">
            Your Recent Orders
          </div>
          <div className="space-y-1">
            {recentOrders?.length > 0 ? (
              recentOrders.slice(0, 2).map((order: Order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-white/10 pb-1 last:border-none"
                >
                  <span className="truncate">{order.products.title}</span>
                  <span className="font-semibold">{order.products.price}</span>
                  <Button variant="link" className="text-xs text-white/70">
                    View
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-white/70">No recent orders</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveChat;
