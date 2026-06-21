import Image from 'next/image';
import React from 'react';
import { LuBox, LuEye, LuBookmark, LuCopy, LuStar, LuGauge, LuTag } from "react-icons/lu";

const PromptDetails = ({ prompt, creator, reviews = [] }) => {
  // Calculate AVG Rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  return (
    <div className="bg-white/40 p-6 rounded-2xl shadow-sm border border-stone-200 mb-6">
      <h3 className="text-lg font-bold text-stone-700 mb-6">Prompt Details</h3>
      
      {/* Creator Info */}
      <div className="flex items-center gap-3 mb-6 p-3 bg-stone-50/90 rounded-xl">
        <Image src={creator?.image} alt={creator?.name} width="300" height="300" className="w-12 h-12 rounded-full object-cover border-2 border-[#867070]" />
        <div>
          <p className="text-sm font-bold text-stone-700">{creator?.name}</p>
          <p className="text-xs text-stone-500">{creator?.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Rating */}
        <div className="flex justify-between items-center ">
          <span className="text-stone-500 flex items-center gap-2"><LuStar size={16}/> Rating</span>
          <span className="font-bold text-stone-700">{avgRating} / 5.0</span>
        </div>

        {/* Difficulty */}
        <div className="flex justify-between items-center ">
          <span className="text-stone-500 flex items-center gap-2"><LuGauge size={16}/> Difficulty</span>
          <span className="text-sm font-bold capitalize py-1 rounded bg-stone-100 text-stone-600">{prompt.difficulty || "Beginner"}</span>
        </div>

        {/* Category */}
        <div className="flex justify-between items-center">
          <span className="text-stone-500 flex items-center gap-2"><LuTag size={16}/> Category</span>
          <span className="font-semibold capitalize text-stone-700">{prompt.category}</span>
        </div>

        {/* Visibility */}
        <div className="flex justify-between items-center">
          <span className="text-stone-500 flex items-center gap-2"><LuEye size={16}/> Visibility</span>
          <span className="font-semibold capitalize text-stone-700">{prompt.visibility}</span>
        </div>

        {/* AI Tool */}
        <div className="flex justify-between items-center">
          <span className="text-stone-500 flex items-center gap-2"><LuBox size={16}/> AI Tool</span>
          <span className="font-semibold text-stone-700">{prompt.aiTool}</span>
        </div>

        <hr className="my-2 border-stone-100" />

        {/* Stats */}
        <div className="flex justify-between pt-2">
           <div className="flex items-center gap-1 text-stone-600 font-medium">
             <LuBookmark size={16}/> {prompt.bookMark || 0}
           </div>
           <div className="flex items-center gap-1 text-stone-600 font-medium">
             <LuCopy size={16}/> {prompt.copyCount || 0}
           </div>
        </div>
      </div>
    </div>
  );
}

export default PromptDetails;
