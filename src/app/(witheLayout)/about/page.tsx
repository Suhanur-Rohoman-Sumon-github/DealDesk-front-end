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
    <div className="max-w-7xl mx-auto px-6 text-gray-800 py-32">
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
      <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>

      {/* Header Section with Background Gradient */}
      <div className="relative text-center mb-12">
        <Title
          subTitle="Build the future of online transactions with our secure, seamless, and scalable marketplace solutions."
          title="About Us"
        />
      </div>

      {/* Company Mission */}
      <div className="grid md:text-start text-center md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-white text-center mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-[#c9c8ca]">
            At Deal Desk, we are revolutionizing the way people buy and sell
            online. Our mission is to provide a secure, seamless, and
            user-friendly marketplace for both buyers and sellers. We aim to
            build scalable solutions that meet the evolving needs of the digital
            economy.
          </p>
        </div>
        <Image
          src="https://media.licdn.com/dms/image/v2/D4E12AQHgMxo-g7BYsw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1658422953944?e=2147483647&v=beta&t=Z2tA86SPCvcG9ieACH8jr4SSL47dclFPchqYJIPI4gY"
          alt="Our Mission"
          className="rounded-lg shadow-lg md:mx-0 mx-auto"
          width={500}
          height={300}
        />
      </div>

      <div className="mt-12 py-12">
        {/* Section Title */}
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

        <p className="mt-4 text-[#c9c8ca] text-lg text-center max-w-3xl mx-auto">
          Deal Desk was founded in 2020 with the goal of creating an efficient,
          secure, and intuitive marketplace for users to buy and sell. We
          combine innovative technologies with a user-first approach to offer a
          platform that supports both small and large-scale transactions
          seamlessly.
        </p>

        {/* Swiper Carousel with Additional Images */}
        <div className="mt-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full"
          >
            {ourStoryImages.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <Image
                    width={500}
                    height={300}
                    src={item.image}
                    alt={`Our Story Image ${index + 1}`}
                    className="rounded-lg shadow-lg w-full h-64 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Our Values */}
      <div className="mt-12 py-12">
        {/* Section Title */}
        <Title
          subTitle="Integrity, innovation, and collaboration are the driving forces behind everything we do."
          title="Our Values"
        />

        {/* Icons + Text */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-[#c9c8ca]">
            <FaLightbulb size={28} p-4 className="text-[#6ce1b3] mb-3" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Innovation
            </h3>
            <p>
              We foster a culture of creativity and continuously strive to push
              the boundaries of whats possible in the digital marketplace.
            </p>
          </div>

          <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-[#c9c8ca]">
            <FaUsers size={28} p-4 className="text-[#6ce1b3] mb-3" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Collaboration
            </h3>
            <p>
              By working together with our clients and partners, we ensure that
              every solution is tailored to meet the specific needs of our
              community.
            </p>
          </div>

          <div className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-[#c9c8ca]">
            <FaFaceSmile size={28} p-4 className="text-[#6ce1b3] mb-3" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Customer Satisfaction
            </h3>
            <p>
              Our commitment to delivering the best customer experience is
              reflected in every interaction, ensuring long-term trust and
              satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <OurTeam />

      {/* Contact Us */}
      <div className="mt-16 py-12 px-6 bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-white/10 rounded-xl shadow-xl">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text + Form */}
          <div>
            <h2 className="text-3xl font-semibold text-white mb-4 text-center lg:text-left">
              Contact Us
            </h2>
            <p className="text-[#c9c8ca] text-lg mb-6 text-center lg:text-left">
              Have a question or need assistance? Our team is ready to help.
              Reach out to us via the form below or email us at{" "}
              <span className="text-blue-500">support@dealdesk.com</span>.
            </p>

            {/* Contact Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-white mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/60"
                />
              </div>
              <div>
                <label className="block text-sm text-white mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/60"
                />
              </div>
              <div>
                <label className="block text-sm text-white mb-1">Message</label>
                <textarea
                  rows={5}
                  placeholder="Your message..."
                  className="w-full px-4 py-2 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/60"
                ></textarea>
              </div>
              <button type="submit" className="w-full button-primary">
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <Image
              width={500}
              height={300}
              src="https://www.dhs.gov/sites/default/files/styles/large_card/public/2022-03/21_1103-News-Page-Pictography-Media-Contacts.jpg.webp?itok=zEAGJXKX"
              alt="Contact Illustration"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
