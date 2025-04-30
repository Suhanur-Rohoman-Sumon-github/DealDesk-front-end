"use client";
import Title from "../title/Title";
import OurServices from "../marketplace/services/OurServices";

const PopularServices = () => {
  return (
    <div className="w-full px-5 max-w-7xl mx-auto py-12">
      <Title
        subTitle="Explore the range of services we offer to help you buy, sell, and thrive in the marketplace."
        title="Our Services"
      />
      <div className="absolute top-[1200px] right-0 w-80 h-80 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>

      <div className="absolute top-[1200px] left-0 w-80 h-80 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>
      <OurServices />
    </div>
  );
};

export default PopularServices;
