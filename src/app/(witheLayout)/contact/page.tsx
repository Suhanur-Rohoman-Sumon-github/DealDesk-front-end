"use client";
import Title from "@/components/title/Title";
import Image from "next/image";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log({
      name: formRef.current?.user_name?.value,
      email: formRef.current?.user_email?.value,
      message: formRef.current?.message?.value,
    });

    emailjs
      .sendForm(
        "service_zrde962", 
        "template_443wx88", 
        formRef.current!,
        "XI8r1w3wdqbemG3mS" 
      )
      .then(
        () => {
          setSuccess("Message sent successfully!");
          formRef.current?.reset();
        },
        (error) => {
          setSuccess("Something went wrong. Please try again.");
          console.error(error);
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <div>
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 right-20 w-80 h-80 rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>
      </div>
      <Title title="Contact Us" subTitle="We would love to hear from you!" />

      <div className="mt-16 py-12 px-6 bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-white/10 rounded-xl shadow-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Form */}
          <div>
            <h2 className="text-3xl font-semibold text-white mb-4 text-center lg:text-left">
              Contact Us
            </h2>
            <p className="text-[#c9c8ca] text-lg mb-6 text-center lg:text-left">
              Have a question or need support? Our team is ready to assist you.
              Reach out to us via the form below or email us at{" "}
              <span className="text-blue-500">support@dealdesk.com</span>.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white mb-1">Name</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/60"
                />
              </div>
              <div>
                <label className="block text-sm text-white mb-1">Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/60"
                />
              </div>
              <div>
                <label className="block text-sm text-white mb-1">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message..."
                  className="w-full px-4 py-2 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/60"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full button-primary"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              {success && (
                <p className="text-sm text-center mt-2 text-white">{success}</p>
              )}
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

export default ContactUs;
