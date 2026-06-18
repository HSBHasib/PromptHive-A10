"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChevronDown, HiOutlineQuestionMarkCircle } from "react-icons/hi2";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ Data
  const faqData = [
    {
      question: "How do I use the copied prompts on ChatGPT or Midjourney?",
      answer: "It's simple! Click the 'Copy' button on any prompt card or engineered snippet box to copy it directly to your clipboard. Then, paste it into your target AI tool (like ChatGPT, Claude, or Midjourney console). For optimized engineering prompts, make sure to replace placeholder text with your actual context variables."
    },
    {
      question: "What is the difference between Public and Premium Prompts?",
      answer: "Public prompts are free community assets accessible to any visitor immediately. Premium prompts are high-performance engineering packages created by verified elite prompt engineers. To unlock premium prompt files, content copying, and ratings, users buy a secure one-time $5 premium access subscription via Stripe pipelines."
    },
    {
      question: "Can free users upload unlimited prompts to the marketplace?",
      answer: "To ensure platform moderation standard bounds and maintain top-tier resource quality, free registered users can add up to 3 prompts. All newly submitted prompts are automatically marked as pending for admin verification screening before going live on the public marketplace grids."
    },
    {
      question: "How does the prompt moderation screening system work?",
      answer: "Every submitted prompt goes through our internal administrative compliance check layer. Admins review data tags, execution levels, safety rules, and context output formats. Admins approve clean products or reject elements that do not follow copyright guidelines, keeping PromptHive secure and recruiter-friendly."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-15 px-6 w-full select-none bg-[#F3E8E8]">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

         {/* Heading */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#867070] tracking-tight md:text-4xl w-full">
            Frequently Asked Questions
          </h2>
          <p className="text-sm font-medium text-[#867070] max-w-lg mx-auto">
            Got questions about prompt engineering, billing tiers, or platform features? We've got you covered.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="flex flex-col gap-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 22,
                  mass: 1,
                  delay: idx * 0.06
                }}
                className="bg-[#F0E4E4] border border-[#86707015] rounded-2xl overflow-hidden transition-colors duration-200"
              >
                {/* Questions */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left transition-colors hover:bg-[#86707010] cursor-pointer"
                  aria-expanded={isOpen}
                  aria-label={`Toggle description details layout window for question: ${faq.question}`}
                >
                  <div className="flex items-center gap-3 text-[#867070]">
                    <HiOutlineQuestionMarkCircle size={20} className="flex-shrink-0 opacity-80" />
                    <span className="text-sm sm:text-base font-semibold tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Rotating Chevron Icon using CSS Transitions */}
                  <HiOutlineChevronDown 
                    size={18} 
                    className={`text-[#86707085] flex-shrink-0 transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-180 text-[#867070]" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Answers */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm font-medium text-[#867070] leading-relaxed border-t border-[#86707010] pt-4 pl-11 bg-[#86707003]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default FAQSection;
