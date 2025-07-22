"use client";
import React from "react";
import {
  Briefcase,
  ClipboardCheck,
  Code,
  Globe,
  Phone,
  Rocket,
  ShieldCheck,
  Star,
} from "lucide-react";
import Title from "@/components/title/Title";
import ClientReviews from "@/components/home/ClientReviews";
import CallToAction from "@/components/home/CallToAction";
import OurServices from "@/components/marketplace/services/OurServices";

const OurServicesPage = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto text-white px-4 sm:px-6 relative pt-24">
      {/* Background Blurs */}
      <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>
      <div className="absolute top-40 -right-20 w-60 h-60 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 right-10 w-60 h-60 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>

      {/* Hero Section */}
      <section className="mb-10 sm:mb-16 text-center">
        <Title
          title="Our Services"
          subTitle="Explore the wide range of services we offer to help your business grow and thrive in the digital era."
        />
      </section>

      {/* Services Grid */}
      <OurServices />

      {/* Why Choose Us */}
      <section className="py-10 sm:py-16 max-w-6xl mx-auto text-center">
        <Title
          title="Why Choose DealDesk?"
          subTitle="We’re more than just a platform—we're your strategic partner in the buy and sell industry. Our team blends creativity, technology, and market insights to deliver solutions that grow your business."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 text-left">
          {[
            {
              icon: <Rocket size={28} />,
              title: "Extensive eBook Library",
              desc: "Access thousands of titles across genres and languages, from bestsellers to indie gems — all in one place.",
            },
            {
              icon: <Briefcase size={28} />,
              title: "Author Self-Publishing",
              desc: "Empower authors to publish their eBooks easily and reach a global audience with flexible pricing and royalty options.",
            },
            {
              icon: <Phone size={28} />,
              title: "Secure Payment Processing",
              desc: "We support multiple trusted payment gateways ensuring fast, safe, and hassle-free transactions for buyers and authors.",
            },
            {
              icon: <Code size={28} />,
              title: "Personalized Recommendations",
              desc: "Discover your next favorite read with AI-driven personalized suggestions based on your preferences and reading history.",
            },
            {
              icon: <ShieldCheck size={28} />,
              title: "Fraud Protection",
              desc: "Our platform incorporates fraud protection features to ensure that your transactions are safe and reliable.",
            },
            {
              icon: <ClipboardCheck size={28} />,
              title: "Seamless Reading Experience",
              desc: "Enjoy eBooks on any device — desktop, tablet, or mobile — with built-in features like bookmarks, notes, and adjustable fonts.",
            },
            {
              icon: <Globe size={28} />,
              title: "Marketing & Promotion Tools for Authors",
              desc: "Boost your book visibility with promotional campaigns, featured listings, and targeted ads tailored for authors.",
            },
            {
              icon: <Star size={28} />,
              title: "24/7 Customer Support",
              desc: "Dedicated support team ready to assist with purchases, downloads, account issues, or publishing inquiries anytime.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/10 backdrop-blur-md p-5 rounded-xl transition hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="text-[#6EE7B7] mb-3">{item.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 sm:py-16 max-w-6xl mx-auto text-center">
        <Title
          title="Categories We Offer"
          subTitle="Explore a wide range of categories to suit every interest, from personal growth to entertainment and beyond."
        />
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-gray-300 mt-6">
          {[
            "Self Development",
            "Business & Entrepreneurship",
            "Health & Fitness",
            "Recipes & Cooking",
            "Fiction & Literature",
            "Children’s Books",
            "Science & Technology",
            "History & Culture",
            "Travel & Adventure",
            "Spirituality & Mindfulness",
            "Finance & Investing",
            "Romance",
            "Thriller & Mystery",
            "Educational eBooks",
            "Audiobooks",
            "Podcasts",
            "Comics & Graphic Novels",
            "Language Learning",
          ].map((category) => (
            <span
              key={category}
              className="px-3 py-2 text-sm sm:text-base bg-white/10 rounded-full border border-white/10 hover:bg-white/20 transition"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <ClientReviews />
      </section>

      {/* Call to Action */}
      <section>
        <CallToAction />
      </section>
    </div>
  );
};

export default OurServicesPage;
