"use client";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Title from "../title/Title";
import { faqData } from "@/data/data";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-16">
      <div className="text-center mb-10">
        <Title
          subTitle="  Get answers to the most common questions from our clients and
          partners."
          title="Frequently Asked Questions"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
        {faqData.map((faq) => (
          <div key={faq.id} className="rounded-lg shadow-md  overflow-hidden">
            <div
              className="flex justify-between items-center p-5 cursor-pointer backdrop-blur-3xl bg-white/2  border-white/30 text-white border transition-colors duration-300"
              onClick={() => toggleAnswer(faq.id)}
            >
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <span className="text-xl">
                {openIndex === faq.id ? <FiMinus /> : <FiPlus />}
              </span>
            </div>

            {openIndex === faq.id && (
              <div className="p-5 text-white border border-white/30 text-sm">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
