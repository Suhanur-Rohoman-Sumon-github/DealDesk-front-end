import { FaArrowRightLong } from "react-icons/fa6";
import TypeWriter from "./TypeWriter";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative  h-[800px]  flex items-center justify-center text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0  bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/ccNPfrvr/hero-bg-1.jpg')",
        }}
      ></div>

      {/* Content */}
      <div className="relative flex flex-col md:flex-row items-center justify-between text-center px-4 max-w-7xl w-full">
        {/* Left Section */}
        <div className="max-w-3xl lg:text-left  sm:text-center md:text-left md:w-1/2 mb-8 md:mb-0">
          <TypeWriter />
          <p className=" lg:text-xl md:w-full sm:w-10/12 mx-auto  text-[#c9c8ca] py-4 leading-relaxed">
            Build modern, scalable, and high-performance websites that captivate
            your audience and drive business growth.
          </p>
          <div className="flex items-center md:justify-start sm:justify-center">
            <Link href={"/marketplaces"}>
              <button className=" button-primary">
                Get Started <FaArrowRightLong />
              </button>
            </Link>
            <Link href={"/marketplaces"}>
              <button className="button-secondary mt-4 ml-4">
                Visit Marketplace
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="max-w-lg md:ms-5 lg:ms-0 text-left bg-white/10 border border-white/30 p-6 rounded-lg shadow-xl md:w-1/2 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-[#ffffff]">Why Choose Us?</h2>
          <ul className="mt-4 space-y-2 text-[#c9c8ca]">
            <li>✅ Custom-built, scalable solutions</li>
            <li>✅ Cutting-edge technology & modern design</li>
            <li>✅ Speed, security, and seamless performance</li>
            <li>✅ Dedicated support & expert guidance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
