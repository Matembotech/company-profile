"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How customized are the automation systems you build?",
    answer:
      "Every system we build is 100% tailored to your specific workflows and business needs. We don't believe in one-size-fits-all solutions; we dive deep into your processes to ensure the automation delivers maximum value.",
  },
  {
    question: "How long does a full system take to build?",
    answer:
      "Timeline varies depending on complexity. A standard automation agent can take 2-4 weeks, while a more comprehensive full-scale digital transformation system might take 2-4 months from initial discovery to final deployment.",
  },
  {
    question: "Can you support us after the system goes live?",
    answer:
      "Absolutely. We offer ongoing maintenance and optimization packages to ensure your systems remain efficient, secure, and up-to-date with the latest technological advancements.",
  },
  {
    question: "What if we do not know what we need yet?",
    answer:
      "That's perfectly fine! We offer discovery workshops where our experts analyze your current operations and identify the highest-impact opportunities for AI and automation.",
  },
  {
    question: "Do you work with any specific industries?",
    answer:
      "While we have extensive experience in logistics, e-commerce, and healthcare, our core expertise in AI and automation is applicable across virtually any sector looking to improve efficiency.",
  },
  {
    question: "How do you ensure data security?",
    answer:
      "Security is built into our development lifecycle from day one. We implement enterprise-grade encryption, secure API integrations, and follow industry best practices like SOC2 and GDPR compliance where applicable.",
  },
  {
    question: "Can I integrate AI agents into my existing software?",
    answer:
      "Yes, our agents are designed to be highly interoperable. We specialize in building custom APIs and connectors that allow our AI solutions to talk seamlessly with your current ERP, CRM, or custom-built software.",
  },
];

export default function FAQ() {
  // ✅ Fix 1: Type must allow null so toggling closed works
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto">
      {/* Left Side: Image */}
      <div className="relative lg:w-1/2 w-full min-h-[280px] sm:min-h-[350px] lg:min-h-[400px]">
        <Image
          src="/faqimages.jpg"
          alt="FAQ illustration"
          fill
          className="object-cover rounded-2xl opacity-40 hover:opacity-100 transition duration-1000 cursor-pointer"
        />
        <div className="absolute top-3 left-3 mt-6 sm:mt-10">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">Need Help?</h1>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">Start Here...</h1>
        </div>
      </div>

      {/* Right Side: Accordion */}
      <div className="lg:w-1/2 w-full flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0F9BD0]">
          Common Questions
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden bg-[#1E2939] shadow-sm">
              {/*Fix 2: Button with visible text styles */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-white font-medium text-sm sm:text-base"
              >
                <span className="text-white">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 flex-shrink-0 text-white" />
                ) : (
                  <Plus className="w-5 h-5 flex-shrink-0 text-white" />
                )}
              </button>

              {/*Fix 3: Answer visible when open */}
              {openIndex === index && (
                <div className="px-5 pb-5 text-white  text-sm leading-relaxed bg-[#1E2939]">
                  <hr className="w-[100%] border-white border-t-1 rounded-full mb-2 " />
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
