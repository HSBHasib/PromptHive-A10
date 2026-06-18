"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiOutlineBolt, HiOutlineCheckCircle, HiOutlineShieldCheck } from "react-icons/hi2";

const WhyChooseUs = () => {
  // Card Data
  const featuresData = [
    {
      id: "f1",
      icon: HiOutlineBolt,
      title: "Optimized Outputs",
      description: "Every prompt is battle-tested to ensure you get the highest quality results and unmatched efficiency every single time.",
    },
    {
      id: "f2",
      icon: HiOutlineShieldCheck,
      title: "Secure Platform",
      description: "Industry-standard JWT authentication and secure backend workflows built cleanly to protect both prompt creators and active platform buyers.",
    },
    {
      id: "f3",
      icon: HiOutlineCheckCircle,
      title: "Prompt Verification",
      description: "Our admin moderation system systematically screens, reviews, and validates every single submission before it unlocks onto the public marketplace grid.",
    }
  ];

  return (
    <div className="bg-[#F5EBEB] py-5 px-6 w-full select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full text-center"
        >
          <h2 className="text-3xl font-bold text-[#867070] tracking-tight md:text-3xl">
            Why Choose PromptHive?
          </h2>
          <div className="w-16 h-1 bg-[#867070]/30 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: idx * 0.10, 
                  duration: 0, 
                  ease: "easeOut" 
                }}
                whileHover={{ y: -5 }}
                className="bg-[#ECDFDF90] rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 group h-full"
              >
                <div className="p-4 bg-[#86707015] rounded-2xl text-[#867070] mb-4 group-hover:bg-[#86707025] transition-colors duration-200">
                  <IconComponent className="w-6 h-6 stroke-[1.75]" />
                </div>

                <h3 className="text-xl font-bold text-[#867070] tracking-tight mb-3">
                  {item.title}
                </h3>

                <p className="text-[13px] text-[#867070] leading-relaxed max-w-sm font-medium">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;

