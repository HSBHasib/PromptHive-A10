"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";

const TopCreatorContent = ({ creator, idx }) => {
  const {image, name, copyCount, averageRating } = creator || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        delay: idx * 0.08
      }}
      className="flex flex-col items-center text-center p-4 bg-[#F0E4E4] hover:bg-[#E5D7D795] border border-transparent hover:border-[#86707015] rounded-3xl transition-all duration-300 group"
    >
      {/* Image */}
      <div 
        className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 border-2 border-[#86707040] group-hover:border-[#867070] transition-colors duration-300 overflow-hidden flex items-center justify-center bg-white/20 mb-4 shadow-sm"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src={image || "/"}
            alt={`${name || "Creator"} Avatar Picture View`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-w-7xl) 20vw"
            priority={idx < 4}
          />
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col min-w-0 w-full mb-3">
        <h3 className="text-base font-bold text-[#867070] truncate tracking-tight leading-snug">
          {name}
        </h3>
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-1.5 w-full max-w-[150px]">
        <button 
          type="button"
          className="flex items-center justify-center gap-1 bg-[#86707020] text-[#867070] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase py-1 px-3 rounded-full border border-[#86707010] shadow-sm transition-colors group-hover:bg-[#867070] group-hover:text-white cursor-default"
        >
          <FaStar className="text-amber-500" /> Rating: {averageRating}
        </button>
        
        <button
          type="button"
          className="bg-white/50 text-[#867070] text-[9px] sm:text-[10px] font-bold py-0.5 px-3 rounded-md border border-[#86707015] flex items-center justify-center gap-1 cursor-default"
          aria-label={`Prompt repository total aggregated copy extraction volume counts are ${copyCount}`}
        >
          <HiOutlineDocumentDuplicate size={12} className="text-[#867070]" />
          <span>{copyCount >= 1000 ? `${(totalCopies / 1000).toFixed(1)}k` : copyCount} Copies</span>
        </button>
      </div>

    </motion.div>
  );
};

export default TopCreatorContent;

