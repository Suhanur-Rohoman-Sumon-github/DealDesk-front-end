"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaXmark } from "react-icons/fa6";
import { useGetMyOrderQuery } from "@/hooks/Order.hooks";
import { useUser } from "@/context/userProvider";
import LiveChatSkeleton from "../skeleton/LiveChatSkeleton";
import AnalogClock from "./AnalogClock";

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
    username: "user19",
    text: "is loving the new RGB wrist rest!",
    image:
      "https://www.gobank.com/assets/img/home/gobank-meet-go2bank-517x517.png",
  },
];

// const recentOrders = [
//   {
//     id: 1,
//     name: "Custom Keyboard",
//     price: "$129",
//   },
//   {
//     id: 2,
//     name: "RGB Wrist Rest",
//     price: "$25",
//   },
// ];

const LiveChat = () => {
  const { user } = useUser();
  console.log(user);
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

    const recentOrdersData = recentOrders?.data || [];
    console.log(recentOrdersData);

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

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initial = stored ? parseInt(stored, 10) : 42;
    setOrders(initial);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_KEY, initial.toString());
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
  console.log(recentOrders);
  console.log(user?.id);

  if (isLoading) return <LiveChatSkeleton />;

  return (
    <>
      {/* toggle button for mobile device */}
      <div
        onClick={() => setToggleLiveOrders(!toggleLiveOrders)}
        className="z-10 cursor-pointer absolute top-[50px] mt-12 right-5 text-white lg:hidden items-center gap-2 flex space-x-1 border-2 border-white/20 rounded-full px-4 py-2 bg-[#16142a]/90 backdrop-blur-md"
      >
        <button
          type="button"
          className="font-bold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] via-[#3B82F6] to-[#6EE7B7]"
        >
          Live Activites
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
            <span className="flex items-center  px-2 py-0.5 text-xs rounded-full font-semibold text-white">
              {`Start : ${new Date().getHours()} H${
                new Date().getHours() !== 1 ? "" : ""
              }`}
            </span>
          </div>
          <span className="flex items-center gap-1  py-0.5 text-xs rounded-full font-semibold text-white">
            Orders complete: {orders}
          </span>
        </div>

        {/* Notification Cards */}
        {notifications.map((user, index) => (
          <div
            key={index}
            className="animate-slide-in flex flex-col items-center text-center p-4 rounded-xl bg-white/10 shadow-md transition duration-500"
          >
            <div className="w-50 h-25 rounded-md overflow-hidden mb-3 ">
              <Image
                src={user.image}
                alt={`product-${index}`}
                width={400}
                height={100}
                className="w-[900px] h-full object-cover"
              />
            </div>
            <div className="text-sm font-semibold text-white">
              @{user.username}
            </div>
            <div className="text-xs text-white/80 mt-1">{user.text}</div>
          </div>
        ))}

        {/* Recent Orders Table */}
        <div className="mt-auto text-xs bg-white/5 rounded-md p-2 border border-white/10">
          <div className="font-semibold text-white mb-1">
            Your Recent Orders
          </div>
          <div className="space-y-1">
            {recentOrders?.length > 0 ? (
              recentOrders.slice(0, 2).map((order) => (
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
