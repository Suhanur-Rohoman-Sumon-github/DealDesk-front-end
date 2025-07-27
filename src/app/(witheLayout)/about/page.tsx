"use client";
import OurTeam from "@/components/home/OurTeam";
import Title from "@/components/title/Title";
import Image from "next/image";
import { FaFaceSmile, FaLightbulb, FaUsers } from "react-icons/fa6";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ourStoryImages } from "@/data/data";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 pt-24 pb-12 relative">
      {/* Blurred Background Circles */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>
      <div className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>

      {/* Header Section */}
      <div className="relative text-center mb-10 sm:mb-16">
        <Title
          subTitle="Build the future of online transactions with our secure, seamless, and scalable marketplace solutions."
          title="About Us"
        />
      </div>

      {/* Company Mission */}
      <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center text-center md:text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-[#c9c8ca]">
            At BookNest, we strive to empower readers and authors by providing a
            seamless and secure digital marketplace for eBooks. Our mission is
            to create an intuitive platform that connects readers with quality
            content while supporting authors and publishers in reaching a global
            audience.
          </p>
        </div>
        <Image
          src="https://t4.ftcdn.net/jpg/00/96/54/53/360_F_96545306_cX6N4Fv2TTVRMKahA3aoCvxlUOGm2KkV.jpg"
          alt="Our Mission"
          className="rounded-lg shadow-lg mx-auto"
          width={500}
          height={300}
        />
      </div>

      {/* Our Story */}
      <div className="mt-12">
        <Title
          subTitle="Learn more about our journey and what sets us apart in the marketplace."
          title="Our Story"
        />

        <div className="text-center">
          <Image
            src="https://www.shutterstock.com/image-illustration/buy-sell-gold-stock-market-600nw-2394746603.jpg"
            alt="Our Story"
            className="rounded-lg shadow-lg mx-auto mb-6"
            width={500}
            height={300}
          />
        </div>

        <p className="text-sm sm:text-base text-[#c9c8ca] text-center max-w-3xl mx-auto">
          Founded in 2020, BookNest began with the vision of transforming how
          people discover and enjoy literature digitally. Combining cutting-edge
          technology with a reader-first approach, BookNest continues to grow as
          a trusted destination for book lovers everywhere.
        </p>

        {/* Swiper Carousel */}
        <div className="mt-8 sm:mt-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
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
            {ourStoryImages.map((item, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={item.image}
                  alt={`Our Story Image ${index + 1}`}
                  className="rounded-lg shadow-lg w-full h-56 sm:h-64 object-cover"
                  width={500}
                  height={300}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Our Values */}
      <div className="mt-12">
        <Title
          subTitle="Integrity, innovation, and collaboration are the driving forces behind everything we do."
          title="Our Values"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-6">
          {/* Value Card */}
          {[
            {
              icon: <FaLightbulb size={28} className="text-[#6ce1b3]" />,
              title: "Innovation",
              text: "We embrace new technologies and creative ideas to constantly improve the digital reading experience.",
            },
            {
              icon: <FaUsers size={28} className="text-[#6ce1b3]" />,
              title: "Collaboration",
              text: "We foster partnerships with authors, publishers, and readers to enrich our platform.",
            },
            {
              icon: <FaFaceSmile size={28} className="text-[#6ce1b3]" />,
              title: "Customer Satisfaction",
              text: "We prioritize users by offering reliable support and a user-friendly interface.",
            },
          ].map((value, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 sm:p-6 text-[#c9c8ca]"
            >
              {value.icon}
              <h3 className="text-lg sm:text-xl font-semibold text-white mt-3 mb-1">
                {value.title}
              </h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Team */}
      <div className="mt-12">
        <OurTeam />
      </div>
    </div>
  );
};

export default AboutUs;
