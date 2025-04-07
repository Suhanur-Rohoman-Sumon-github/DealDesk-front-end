import Title from "../title/Title";

import { FaArrowRightLong } from "react-icons/fa6";
import PopularServicesCarosal from "./PopularServicesCarosal";

const PopularServices = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-12">
      <Title subTitle="Popular services" title="our services" />
      <PopularServicesCarosal />
      <button className="float-right mt-8 px-14 py-4 text-[#ffffff] rounded-md bg-gradient-to-r gap-2 from-[#572c7c] to-[#9133df]  flex items-center hover:from-[#9133df] hover:to-[#572c7c] transition duration-300">
        Vew all services <FaArrowRightLong />
      </button>
    </div>
  );
};

export default PopularServices;
