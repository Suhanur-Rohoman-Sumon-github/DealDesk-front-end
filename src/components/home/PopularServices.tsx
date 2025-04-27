import { FaArrowRightLong } from "react-icons/fa6";
import Title from "../title/Title";

import PopularServicesCarosal from "./PopularServicesCarosal";
import Link from "next/link";

const PopularServices = () => {
  return (
    <div className="w-full px-5 max-w-7xl mx-auto py-12">
      <Title
        subTitle="Explore the range of services we offer to help you buy, sell, and thrive in the marketplace."
        title="Our Services"
      />
      <div className="absolute top-[1200px] right-0 w-80 h-80 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>

      <div className="absolute top-[1200px] left-0 w-80 h-80 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>
      <PopularServicesCarosal />
      <Link href={"/marketplaces"}>
        <button className="button-primary float-right">
          Visit marketplace <FaArrowRightLong />
        </button>
      </Link>
    </div>
  );
};

export default PopularServices;
