import Banner from "@/components/home/Banner";
import AgencyStats from "@/components/home/CompanyState";
import React from "react";

const page = () => {
  return (
    <div className=" bg-no-repeat  ">
      <Banner />
      <AgencyStats />
      <div
        className="bg-no-repeat bg-cover bg-center bg-[#16142a]"
        style={{
          backgroundImage: "url('https://centure.volkovdesign.com/img/bg.png)",
        }}
      >
        <Banner />
        <Banner />
      </div>
    </div>
  );
};

export default page;
