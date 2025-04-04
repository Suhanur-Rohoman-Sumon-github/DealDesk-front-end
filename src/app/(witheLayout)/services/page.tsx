import React from "react";
import { Briefcase, Code, Phone, Rocket } from "lucide-react";
import Title from "@/components/title/Title";
import ClientReviews from "@/components/home/ClientReviews";
import CallToAction from "@/components/home/CallToAction";

const services = [
  {
    icon: <Briefcase size={30} />,
    title: "Business Strategy",
    description:
      "We help you craft winning strategies for your business with market insights and innovation.",
  },
  {
    icon: <Code size={30} />,
    title: "Web Development",
    description:
      "From design to deployment, we build scalable and responsive web solutions tailored for you.",
  },
  {
    icon: <Phone size={30} />,
    title: "App Development",
    description:
      "We design high-performing mobile apps that engage users and drive growth across all platforms.",
  },
  {
    icon: <Rocket size={30} />,
    title: "Digital Marketing",
    description:
      "Boost your brand's reach and engagement with our data-driven marketing solutions.",
  },
];

const OurServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#16142a] text-white px-6 py-32">
      {/* Hero Section */}
      <section className="mb-20">
        <Title
          title="Our Services"
          subTitle="Explore the wide range of services we offer to help your business grow and thrive in the digital era."
        />
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:shadow-xl transition hover:scale-[1.03] duration-300"
          >
            <div className="mb-4 text-[#6EE7B7]">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-300 text-sm">{service.description}</p>
          </div>
        ))}
      </section>

      <section className="py-20 max-w-6xl mx-auto text-center">
        <Title
          title="Why Choose Deal-Desk?"
          subTitle="We’re more than a service provider—we're your strategic partner. Our
          team blends creativity, technology, and business acumen to deliver
          solutions that scale with your ambitions."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {[
            {
              icon: <Rocket size={28} />,
              title: "Innovative Approach",
              desc: "We bring fresh ideas and cutting-edge technology to every project.",
            },
            {
              icon: <Briefcase size={28} />,
              title: "Experienced Team",
              desc: "Our experts have years of experience across industries and technologies.",
            },
            {
              icon: <Phone size={28} />,
              title: "24/7 Support",
              desc: "We’re always here to help you, anytime you need us.",
            },
            {
              icon: <Code size={28} />,
              title: "Custom Solutions",
              desc: "Every solution is tailored to your unique business goals.",
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
      <section className="py-20 max-w-6xl mx-auto text-center">
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
      <section className="py-20">
        <ClientReviews />
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <CallToAction />
      </section>
    </div>
  );
};

export default OurServicesPage;
