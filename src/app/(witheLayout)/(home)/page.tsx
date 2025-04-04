import Banner from "@/components/home/Banner";
import CallToAction from "@/components/home/CallToAction";
import ClientReviews from "@/components/home/ClientReviews";
import AgencyStats from "@/components/home/CompanyState";
import FAQ from "@/components/home/FAQ";
import OurTeam from "@/components/home/OurTeam";
import PopularServices from "@/components/home/PopularServices";
import React from "react";

const page = () => {
  return (
    <div className=" ">
      <Banner />
      <AgencyStats />

      <PopularServices />
      <ClientReviews />
      <OurTeam />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default page;
