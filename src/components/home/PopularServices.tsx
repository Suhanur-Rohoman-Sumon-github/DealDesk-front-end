"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Title from "../title/Title";
import ServiceCard from "./ServiceCard";

const services = [
  {
    name: "E-Commerce development",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-DNDjDo4BcJ8v7tLleCjGJXsfu-e0YbiEFw&s",
  },
  {
    name: "Digital Marketing",
    image:
      "https://0qw52hln.cdn.imgeng.in/content/cms/images/blog/benefits-of-a-digital-marketing-agency.jpg",
  },
  {
    name: "Buy & Sell",
    image:
      "https://static.vecteezy.com/system/resources/previews/007/749/082/non_2x/buy-sell-forex-trade-sign-free-vector.jpg",
  },
  {
    name: "SEO & Growth",
    image:
      "https://searchengineland.com/wp-content/seloads/2014/08/seo-idea-lightbulbs-ss-1920.jpg",
  },
  {
    name: "Custom Software",
    image:
      "https://ideamaker.agency/wp-content/uploads/2023/12/10-Best-Examples-of-Custom-Software.png",
  },
];

const PopularServices = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-12">
      <Title subTitle="Popular services" title="our services" />

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

export default PopularServices;
