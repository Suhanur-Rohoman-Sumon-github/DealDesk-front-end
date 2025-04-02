"use client";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div className="relative w-full h-[800px] flex flex-col md:flex-row items-center justify-between text-center pt-8 px-4">
      {/* Left Section */}
      <div className="max-w-3xl text-left md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-5xl text-[#ffffff]">
          <span className="font-bold">Transform Your Online Presence with</span>{" "}
          <br />
          <span className="">
            <Typewriter
              words={[
                "Web Solutions",
                "Digital Marketing",
                "Buy & Sell",
                "SEO & Growth",
                "E-Commerce Dev",
                "Custom Software",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={150}
              deleteSpeed={100}
              delaySpeed={1500}
            />
          </span>
        </h1>
        <p className="text-xl text-[#c9c8ca] py-4 leading-relaxed">
          Build modern, scalable, and high-performance websites that captivate
          your audience and drive business growth.
        </p>
        <button className="relative px-14 py-4 text-[#ffffff] rounded-md bg-gradient-to-r from-[#572c7c] to-[#9133df] mt-4">
          Get Started
        </button>
        <button className="relative px-14 py-4  rounded-md border border-[#5f5d72] text-[#ffffff] bg-transparent mt-4 ml-4 hover:border-[#9133df] transition duration-300">
          visit marketplace
        </button>
      </div>

      {/* Right Section */}
      <div className="max-w-lg text-left bg-white/5 border border-white/30 p-6 rounded-lg shadow-xl md:w-1/2">
        <h2 className="text-3xl font-bold text-[#ffffff]">Why Choose Us?</h2>
        <ul className="mt-4 space-y-2 text-[#c9c8ca]">
          <li>✅ Custom-built, scalable solutions</li>
          <li>✅ Cutting-edge technology & modern design</li>
          <li>✅ Speed, security, and seamless performance</li>
          <li>✅ Dedicated support & expert guidance</li>
        </ul>
      </div>
    </div>
  );
};

export default Banner;
