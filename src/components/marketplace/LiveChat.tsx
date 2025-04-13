"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const messages = [
  { username: "User1", text: "Just got my new keyboard, loving it!" },
  { username: "User2", text: "Anyone know where I can buy custom cables?" },
  { username: "User3", text: "These switches are awesome, highly recommend!" },
  {
    username: "User4",
    text: "Just received my order, everything looks great!",
  },
  { username: "User5", text: "Can anyone suggest a good wrist rest?" },
  { username: "User6", text: "Loving the gaming mice collection!" },
  { username: "User7", text: "Any discounts on mechanical keyboards?" },
  { username: "User8", text: "The RGB lighting is amazing!" },
  { username: "User9", text: "Best place for custom keycaps?" },
  { username: "User10", text: "Switch lubing guide, anyone?" },
];

// Example random user images (Replace these with actual user images or dynamic URLs)
const userImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
];

// Generate a random image for the user
const getRandomUserImage = () => {
  return userImages[Math.floor(Math.random() * userImages.length)];
};

// Fun colorful icon (for chat)
const getRandomColorfulIcon = () => {
  const icons = ["🔥", "💡", "✨", "🚀", "🎮", "🎧"];
  return icons[Math.floor(Math.random() * icons.length)];
};

const LiveChat = () => {
  const [chatMessages, setChatMessages] = useState<typeof messages>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // On first load, show 7 messages
    const initialMessages = Array.from({ length: 7 }, () => {
      return messages[Math.floor(Math.random() * messages.length)];
    });
    setChatMessages(initialMessages);
    setHasInitialized(true);
  }, []);

  useEffect(() => {
    if (!hasInitialized) return;

    const interval = setInterval(() => {
      const newMsg = messages[Math.floor(Math.random() * messages.length)];
      setChatMessages((prev) => {
        const updated = [newMsg, ...prev];
        return updated.slice(0, 7); // Keep only 7
      });
    }, 6000); // Every 6 seconds

    return () => clearInterval(interval);
  }, [hasInitialized]);

  return (
    <div className="fixed h-[calc(100vh-200px)]  -mt-1 z-50 w-full max-w-[350px] sm:max-w-[300px] md:max-w-[250px] lg:max-w-[300px] space-y-3 p-4 backdrop-blur-md bg-white/5 border border-white/10 shadow-lg text-white  top-[110px] right-0  overflow-hidden">
      {chatMessages.map((msg, index) => (
        <div
          key={index}
          className="flex items-start space-x-3 p-3 rounded-lg bg-white/10 border border-white/10 shadow-sm"
        >
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                width={32}
                height={32}
                src={getRandomUserImage()}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">
              @{msg.username}
            </span>
            <span className="text-xs text-white/80">{msg.text}</span>
          </div>
          {/* Adding a colorful icon somewhere */}
          <div className="flex-shrink-0 text-2xl text-yellow-400">
            {getRandomColorfulIcon()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveChat;
