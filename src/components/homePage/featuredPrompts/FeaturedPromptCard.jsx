"use client";

import React from "react";
import { Button, Avatar } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineStar,
  HiOutlineLockClosed,
} from "react-icons/hi2";

const FeaturedPromptCard = ({ prompt, user, isUserLoggedIn, idx }) => {
  const {
    title,
    description,
    aiTool,
    category,
    difficulty,
    copyCount,
    averageRating,
    thumbnail,
    visibility,
    status,
    userId,
    _id,
  } = prompt || {};

  // Filter User Data based on Prompt UserId
  const filterUser = user.filter((u) => u?._id === userId);

  // If user not loggedIn
  const targetDetailsRoute = isUserLoggedIn ? `/prompt/${_id}` : "/auth/login";

  // Check Visibily is private
  const isPremium = visibility === "private";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        delay: idx * 0.08,
      }}
      className="bg-[#86707008] hover:bg-[#86707012] border border-[#86707015] hover:border-[#86707030] rounded-3xl p-5 flex flex-col justify-between min-h-85 shadow-sm hover:shadow-md transition-all duration-300 group h-full"
    >
      <>
        {/* Top Portion Details */}
        <div>
          {/* Prompt Image */}
          {thumbnail && (
            <div className="w-full h-44 relative rounded-2xl overflow-hidden mb-4 border border-[#86707015]">
              <Image
                src={thumbnail}
                alt={title || "Prompt Thumbnail"}
                width={500}
                height={240}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                priority={idx < 3}
              />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 w-full">
            {/* AiTool and Category */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#867070] bg-[#86707015] tracking-wider uppercase px-3 py-1 rounded-full">
                {aiTool}
              </span>
              <span className="text-[10px] font-medium text-[#867080] border border-[#86707050] px-2 py-0.5 rounded-md capitalize">
                {category}
              </span>
            </div>

            {/* Check visibity and show data based on data */}
            <div className="flex items-center gap-2">
              {isPremium ? (
                <span className="bg-[#86707015] text-amber-700 border text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <HiOutlineLockClosed className="text-xs" /> PREMIUM
                </span>
              ) : (
                <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-[11px] font-bold px-2 py-0.5 rounded-md">
                  FREE
                </span>
              )}

              <span className="text-xs text-[#867070] flex items-center gap-1 font-medium bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded-md border border-[#86707010]">
                <HiOutlineDocumentDuplicate className="text-sm text-[#867070]" />
                {copyCount >= 1000
                  ? `${(copyCount / 1000).toFixed(1)}k`
                  : copyCount || 0}
              </span>
            </div>
          </div>

          {/* Prompt Title */}
          <h3 className="text-lg font-bold text-[#867070] tracking-tight group-hover:text-[#6B5656] transition-colors leading-snug line-clamp-2">
            {title}
          </h3>

          {/* Prompt Description */}
          <p className="text-xs text-[#867070] leading-relaxed mt-2 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Bottom Portion Details */}
        <div className="mt-6 pt-4 border-t border-[#86707010] flex flex-col gap-4">
          {/* Rating and Difficulty Level */}
          <div className="flex items-center justify-between text-xs text-[#86707085] font-medium">
            <div className="flex items-center gap-1 text-amber-600 bg-amber-500/5 px-2 py-0.5 rounded-md border border-amber-500/10">
              <HiOutlineStar className="text-sm fill-amber-500 text-amber-500" />
              <span key={idx} className="font-bold text-[#867070]">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#867070]">
              <span className="text-[11px]">Difficulty:</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                {difficulty}
              </span>
            </div>
          </div>

          {/* User Profile Details and button to access prompts details page */}
          <div className="flex items-center justify-between gap-2 w-full">
            {filterUser?.map((creator, idx) => (
              <div key={idx} className="flex items-center gap-2.5 min-w-0">
                <Avatar className="w-9 h-9 rounded-full border border-[#86707030] bg-[#86707010] flex-shrink-0 text-[11px] font-bold text-[#867070]">
                  {creator?.image && (
                    <Avatar.Image
                      src={creator.image}
                      alt={creator.name || "User Avatar"}
                      className="object-cover w-full h-full"
                    />
                  )}
                  <Avatar.Fallback>
                    {creator?.name ? creator.name.charAt(0).toUpperCase() : "U"}
                  </Avatar.Fallback>
                </Avatar>
                <span className="text-xs font-bold text-[#867070] truncate max-w-[90px] sm:max-w-[110px]">
                  @{creator?.name}
                </span>
              </div>
            ))}

            <Button className="bg-[#867070] hover:bg-[#705C5C] text-white font-bold text-xs h-9 px-4 rounded-xl transition-all duration-200 shadow-sm active:scale-95">
              <Link href={targetDetailsRoute}>View Details</Link>
            </Button>
          </div>
        </div>
      </>
    </motion.div>
  );
};

export default FeaturedPromptCard;
