"use client";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi"; // Icons for expanding/collapsing
import Title from "../title/Title";

const faqData = [
  {
    id: 1,
    question: "What services do you offer?",
    answer:
      "We offer web development, digital marketing, SEO, and custom software solutions.",
  },
  {
    id: 2,
    question: "How can I get started with your services?",
    answer:
      "Simply click on the 'Get Started' button, and we’ll guide you through the process.",
  },
  {
    id: 3,
    question: "Do you provide support after project completion?",
    answer:
      "Yes, we offer ongoing support and maintenance after the project is completed.",
  },
  {
    id: 4,
    question: "What is the cost of your services?",
    answer:
      "The cost varies based on the scope of the project. Contact us for a personalized quote.",
  },
  {
    id: 5,
    question: "How long will it take to complete a project?",
    answer:
      "Project timelines depend on the complexity of the work, but we always aim to deliver on time.",
  },
  {
    id: 6,
    question: "What is your refund policy?",
    answer:
      "We offer a refund policy for specific situations. Please contact our support team for details.",
  },
  {
    id: 7,
    question: "Can you handle large-scale projects?",
    answer:
      "Absolutely! We specialize in scalable solutions for businesses of all sizes.",
  },
  {
    id: 8,
    question: "How do you ensure the quality of your work?",
    answer:
      "We follow industry best practices, conduct regular reviews, and prioritize testing to ensure quality.",
  },
  {
    id: 9,
    question: "Do you work with international clients?",
    answer:
      "Yes, we have clients from all over the world and are experienced in managing remote projects.",
  },
  {
    id: 10,
    question: "Can I see examples of your previous work?",
    answer:
      "Definitely! Check out our portfolio for case studies and examples of our work.",
  },
];

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
