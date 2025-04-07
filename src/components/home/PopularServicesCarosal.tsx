"use client";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ServiceCard from "./ServiceCard";
import { services } from "@/data/data";

const PopularServicesCarosal = () => {
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <ServiceCard name={service.name} image={service.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularServicesCarosal;
