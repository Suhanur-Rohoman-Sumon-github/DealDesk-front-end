"use client";
import Image from "next/image";

const CallToAction = () => {
  return (
    <div className="relative flex items-center justify-center h-[300px] max-w-7xl mx-auto my-32">
      {/* Background Image */}
      <Image
        src="https://i.ibb.co.com/fYwg4dCv/download-5.png"
        alt="Call to Action"
        className="absolute inset-0 h-[100px] w-[200px] object-cover rounded-lg"
        fill
      />

      {/* Glass Effect Container */}
      <div className="relative  backdrop-blur-lg  p-10 rounded-lg text-center ">
        <h2 className="text-3xl font-bold text-white">
          Let’s Get Started With Us
        </h2>
        <p className="text-lg text-white/80 mt-3">
          Unlock endless possibilities by joining our platform. Let’s build
          something amazing together!
        </p>

        {/* Button */}
        <button className="mt-6 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-indigo-500 rounded-lg shadow-md hover:from-indigo-500 hover:to-purple-600 transition-all">
          Let’s Go 🚀
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
