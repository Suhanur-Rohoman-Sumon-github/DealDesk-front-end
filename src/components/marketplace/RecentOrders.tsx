"use client";
import Image from "next/image";
import React from "react";

const recentOrders = [
  {
    id: 1,
    name: "Custom Keyboard",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    date: "Apr 16",
    price: "$129",
  },
  {
    id: 2,
    name: "RGB Wrist Rest",
    image:
      "https://images.unsplash.com/photo-1621261298485-254ddcd0c4ae?auto=format&fit=crop&w=800&q=80",
    date: "Apr 14",
    price: "$25",
  },
];

const RecentOrders = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl text-white">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">Recent Orders</h2>
        <button className="text-xs text-white/70 hover:underline">
          See all
        </button>
      </div>

      <div className="space-y-2 text-xs">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between bg-white/5 p-2 rounded-md border border-white/10"
          >
            <div className="flex items-center gap-2">
              <Image
                src={order.image}
                alt={order.name}
                width={32}
                height={32}
                className="rounded-md object-cover"
              />
              <div>
                <p className="font-medium">{order.name}</p>
                <p className="text-white/60 text-[11px]">{order.date}</p>
              </div>
            </div>
            <span className="font-semibold">{order.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
