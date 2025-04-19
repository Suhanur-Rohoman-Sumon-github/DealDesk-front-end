import React from "react";

const Loading = () => {
  return (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-[#f85606] `}
      ></div>
    </div>
  );
};

export default Loading;
