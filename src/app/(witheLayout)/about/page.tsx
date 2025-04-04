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

const AboutUs = () => {
  const ourStoryImages = [
    {
      image:
        "https://media.licdn.com/dms/image/v2/D4E12AQHgMxo-g7BYsw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1658422953944?e=2147483647&v=beta&t=Z2tA86SPCvcG9ieACH8jr4SSL47dclFPchqYJIPI4gY",
    },
    {
      image:
        "https://coworker.imgix.net/photos/united-states/texas/tyler/61900-boxer-property/AdobeStock_291543490.jpeg?w=370&h=280&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle",
    },
    {
      image:
        "https://www.storytellingpeople.nl/images/image/3350e28a-459f-4ce1-80ca-d9657bee884d/storytelling-tips-leider-manager-ondernemer-presentatie?v=17",
    },
    {
      image:
        "https://www.corporatestory.nl/images/image/a1b10149-980d-4546-b2de-3b5af0f9a146/het-begint-met-waarom?v=19",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmDgnxUqsS2GCxE7NxpOnCeiFfyeUlSPEjlifL2WXMQ5EoWjhtg5ryQ8SgqTvhDojlR24&usqp=CAU",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 text-gray-800 py-32">
      {/* Header Section with Background Gradient */}
      <div className="relative text-center mb-12">
        <Title
          subTitle="Empowering businesses with cutting-edge web development and digital marketing solutions."
          title="About Us"
        />
      </div>

      {/* Company Mission */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-white text-center mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-[#c9c8ca]">
            At Deal Desk, we are passionate about delivering top-tier web
            development, digital marketing strategies, and creative solutions to
            help businesses thrive in the digital world. Our mission is to
            provide innovative, high-quality services tailored to your business
            needs.
          </p>
        </div>
        <Image
          src="https://media.licdn.com/dms/image/v2/D4E12AQHgMxo-g7BYsw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1658422953944?e=2147483647&v=beta&t=Z2tA86SPCvcG9ieACH8jr4SSL47dclFPchqYJIPI4gY"
          alt="Our Mission"
          className="rounded-lg shadow-lg"
          width={500}
          height={300}
        />
      </div>

      <div className="mt-12 py-12">
        {/* Section Title */}
        <Title
          subTitle="Discover who we are, what drives us, and how we help businesses thrive"
          title="Our Story"
        />

        <div className="text-center">
          <Image
            src="https://coworker.imgix.net/photos/united-states/texas/tyler/61900-boxer-property/AdobeStock_291543490.jpeg?w=370&h=280&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle"
            alt="Our Story"
            className="rounded-lg shadow-lg mx-auto mb-6"
            width={500}
            height={300}
          />
        </div>

        <p className="mt-4 text-[#c9c8ca] text-lg text-center max-w-3xl mx-auto">
          Founded in 2020, Deal Desk was created to offer exceptional web
          development and digital marketing services. Our team combines years of
          expertise and creativity to build tailored solutions that help
          businesses grow online.
        </p>

        {/* Swiper Carousel with Additional Images */}
        <div className="mt-10">
          <h3 className="text-2xl text-white text-center mb-6">
            Our Work Gallery
          </h3>
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
        <Title subTitle="What we stand for and believe in" title="Our Values" />

        {/* Icons + Text */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 ">
          <div className="flex flex-col  bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-[#c9c8ca]">
            <FaLightbulb size={28} p-4 className="text-[#6ce1b3] mb-3" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Creativity
            </h3>
            <p>
              We embrace innovation and think outside the box to craft unique
              solutions for every project.
            </p>
          </div>

          {/* Collaboration */}
          <div className="flex flex-col  bg-white/10  backdrop-blur-md border border-white/20 rounded-lg p-6 text-[#c9c8ca]">
            <FaUsers size={28} p-4 className="text-[#6ce1b3] mb-3" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Collaboration
            </h3>
            <p>
              Working together as a team—with clients and among
              ourselves—ensures the best possible results.
            </p>
          </div>

          {/* Customer First */}
          <div className="flex flex-col  bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 text-[#c9c8ca]">
            <FaFaceSmile size={28} p-4 className="text-[#6ce1b3] mb-3" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Customer First
            </h3>
            <p>
              Your satisfaction is at the heart of what we do. We tailor every
              experience to meet your goals.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <OurTeam />

      {/* Contact Us */}
      <div className="mt-16 py-12 px-6 bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-white/10 rounded-xl shadow-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text + Form */}
          <div>
            <h2 className="text-3xl font-semibold text-white mb-4 text-center lg:text-left">
              Contact Us
            </h2>
            <p className="text-[#c9c8ca] text-lg mb-6 text-center lg:text-left">
              Have a question or need support? Our team is ready to assist you.
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
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
              >
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
