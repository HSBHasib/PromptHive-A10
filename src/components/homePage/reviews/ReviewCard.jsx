"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";

const ReviewCard = ({ review, idx }) => {
  const { rating, comment, userName, userRole, userAvatar, datePosted } = review || {};

  // Generated dynamic star ranking vector layout matrix
  const starsArray = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 22,
        mass: 1,
        delay: idx * 0.08
      }}
      className="bg-[#86707012] rounded-3xl p-8 flex flex-col justify-between h-full min-h-65 shadow-sm relative transition-all duration-300 hover:bg-[#86707019]"
    >
      <div>
        {/* Star Rating Presentation Block matching top layout line parameters perfectly */}
        <div 
          className="flex gap-0.5 mb-5 text-[#867070]" 
          aria-label={`User rated platform with a high performance score of ${rating} stars`}
        >
          {starsArray.map((starIndex) => (
            <HiStar 
              key={starIndex} 
              size={18} 
              className={starIndex <= rating ? "text-[#867070] fill-amber-500" : "text-[#86707030]"} 
            />
          ))}
        </div>

        {/* User feedback narrative content text matching image typographic spacing rules */}
        <p className="text-sm italic text-[#867070] font-medium leading-relaxed tracking-wide mb-8">
          "{comment}"
        </p>
      </div>

      {/* Profile Info Row Footer Block */}
      <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-[#86707020]">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Circular avatar contour shadow view */}
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#86707025] flex-shrink-0 bg-[#86707010]">
            <Image
              src={userAvatar}
              alt={`${userName || "User"}'s Verified Profile Identification Thumbnail`}
              fill
              className="object-cover"
              sizes="(max-w-7xl) 10vw"
            />
          </div>
          
          {/* User profile designations and text layers */}
          <div className="flex flex-col min-w-0">
            <h3 className="text-sm font-semibold text-[#867070] truncate leading-tight tracking-tight">
              {userName}
            </h3>
            <span className="text-[11px] font-semibold text-[#867070] truncate mt-0.5">
              {userRole}
            </span>
          </div>
        </div>

        {/* Date relative marker label tag layout mapping image text exactly */}
        <span 
          className="text-[11px] font-medium text-[#867070] whitespace-nowrap flex-shrink-0"
          aria-label={`Feedback statement submitted timestamp marker is ${datePosted}`}
        >
          {datePosted}
        </span>
      </div>

    </motion.div>
  );
};

export default ReviewCard;
