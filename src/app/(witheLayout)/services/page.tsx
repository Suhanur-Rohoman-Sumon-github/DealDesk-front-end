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
import { FaBullhorn } from "react-icons/fa";
import Link from "next/link";

const services = [
  {
    icon: <Rocket size={28} />,
    title: "Chime Bank Integration",
    desc: "We offer seamless integration with Chime Bank, making transactions faster and more secure for your business.",
  },
  {
    icon: <Briefcase size={28} />,
    title: "Go2 Bank Integration",
    desc: "Expand your payment options with Go2 Bank integration, providing flexible solutions for your buy-sell business.",
  },
  {
    icon: <Phone size={28} />,
    title: "USA DL Verification",
    desc: "Ensure the validity of your customer's identity with USA DL verification, streamlining the buying and selling process.",
  },
  {
    icon: <Code size={28} />,
    title: "Number Panel",
    desc: "Our Number Panel service offers reliable and secure phone number management for verification and customer support.",
  },
  {
    icon: <Phone size={28} />,
    title: "SSN Panel",
    desc: "We offer SSN Panel services for secure identity verification, ensuring a safe and trustworthy transaction experience.",
  },
  {
    icon: <Globe size={28} />, // Updated icon for web development
    title: "Web Development",
    desc: "Our web development services offer scalable and responsive websites to make your buy-sell business thrive online.",
  },
  {
    icon: <FaBullhorn size={28} />, // Updated icon for digital marketing
    title: "Digital Marketing",
    desc: "Boost your visibility and sales with our targeted digital marketing campaigns that drive results.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Proxy Services",
    desc: "Enhance security and privacy for both buyers and sellers with our Proxy services, protecting data and maintaining anonymity.",
  },
];

const OurServicesPage = () => {
  return (
    <div className="min-h-screen  text-white px-6 py-32">
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>
      <div className="absolute top-40 -right-40 w-80 h-80 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 right-20 w-80 h-80 rounded-full bg-[#8c33d6] opacity-20 blur-3xl"></div>
      {/* Hero Section */}
      <section className="mb-20">
        <Title
          title="Our Services"
          subTitle="Explore the wide range of services we offer to help your business grow and thrive in the digital era."
        />
      </section>

      {/* Services Grid */}
      <section className="  lg:py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-xl transition hover:scale-[1.03] duration-300"
          >
            <div className="mb-4 text-[#6EE7B7]">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-300 text-sm">{service.desc}</p>
          </div>
        ))}
        <Link className="float-right" href={"/marketplaces"}>
          <button className="button-primary ">Visit More</button>
        </Link>
      </section>

      <section className="py-20 max-w-6xl mx-auto text-center">
        <Title
          title="Why Choose DealDesk?"
          subTitle="We’re more than just a platform—we're your strategic partner in the buy and sell industry. Our team blends creativity, technology, and market insights to deliver solutions that grow your business."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {[
            {
              icon: <Rocket size={28} />,
              title: "Fast Transactions",
              desc: "Our platform ensures fast and seamless transactions, allowing you to buy and sell with ease.",
            },
            {
              icon: <Briefcase size={28} />,
              title: "Secure Payments",
              desc: "We prioritize the security of your payments and ensure safe transactions for both buyers and sellers.",
            },
            {
              icon: <Phone size={28} />,
              title: "24/7 Customer Support",
              desc: "Our dedicated customer support team is available around the clock to assist you with any concerns or questions.",
            },
            {
              icon: <Code size={28} />,
              title: "Custom Solutions",
              desc: "We offer tailored solutions that meet your specific business needs, making sure you have the tools for success.",
            },
            {
              icon: <ShieldCheck size={28} />,
              title: "Fraud Protection",
              desc: "Our platform incorporates fraud protection features to ensure that your transactions are safe and reliable.",
            },
            {
              icon: <ClipboardCheck size={28} />,
              title: "Reliable Tracking",
              desc: "Easily track your transactions, orders, and status updates with our user-friendly dashboard.",
            },
            {
              icon: <Globe size={28} />,
              title: "Global Reach",
              desc: "Expand your business globally with our platform, connecting buyers and sellers from all over the world.",
            },
            {
              icon: <Star size={28} />,
              title: "Trusted by Many",
              desc: "Join a growing community of businesses and individuals who trust BuySell for their buying and selling needs.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/10 backdrop-blur-md p-6 rounded-xl transition hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="text-[#6EE7B7] mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies We Use */}
      <section className=" lg:py-20 max-w-6xl mx-auto text-center">
        <Title
          title="  Technologies We Use"
          subTitle=" We leverage the best technologies to build robust and scalable
          solutions for your business. Here are the tools and technologies that
          power our projects."
        />
        <div className="flex flex-wrap justify-center gap-4 text-gray-300">
          {[
            "React",
            "Next.js",
            "Node.js",
            "Express",
            "MongoDB",
            "Tailwind CSS",
            "Firebase",
            "Stripe",
            "TypeScript",
            "Zod",
            "Redux Toolkit",
            "React Query",
            "PostgreSQL",
            "Prisma",
            "Docker",
            "Vercel",
            "GitHub Actions",
            "Cloudinary",
            "Jest",
            "Figma",
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-white/10 rounded-full border border-white/10 hover:bg-white/20 transition"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className=" ">
        <ClientReviews />
      </section>

      {/* Call to Action */}
      <section className="">
        <CallToAction />
      </section>
    </div>
  );
};

export default OurServicesPage;
