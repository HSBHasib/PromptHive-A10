"use client";

import { toggleBookmark } from "@/lib/action/bookMarks";
import { updateCopyCount } from "@/lib/action/prompts";
import { addReport } from "@/lib/action/reports";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  LuCopy,
  LuBookmark,
  LuTriangleAlert,
  LuLock,
  LuCheck,
} from "react-icons/lu";
import ReportModal from "./ReportModal";

const PromptContent = ({ prompt, user, initialBookmarkStatus }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarkStatus);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const isPrivate = prompt.visibility === "private";
  const isPremiumUser = false;
  const shouldBlur = isPrivate && !isPremiumUser;

  // User Id
  const userId = user?.id;

  // BookMark Func
  const handleBookmark = async () => {
    try {
      const res = await toggleBookmark({ promptId: prompt._id, userId });

      if (res.status === "added") {
        setIsBookmarked(true);
        toast.success("Bookmark added!");
      } else {
        setIsBookmarked(false);
        toast.success("Bookmark removed!");
      }
    } catch (error) {
      toast.error("Failed to update bookmark");
    }
  };

  // Copy Func
  const handleCopy = async () => {
    navigator.clipboard.writeText(prompt.content);

    setIsCopied(true);
    toast.success("Prompt copied to clipboard!");

    try {
      await updateCopyCount(prompt._id, {});
    } catch (error) {
      console.error("Failed to update copy count", error);
    }

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <>
      <div className="bg-white/40 p-8 rounded-2xl shadow-sm border border-stone-200">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-bold text-stone-900">{prompt.title}</h1>
          <div className="flex gap-2">
            <button
              className={`p-2 transition cursor-pointer rounded-lg bg-[#F5EBEB]/80 hover:bg-[#F5EBEB] border ${
                isBookmarked ? "text-[#867070]" : "text-stone-500"
              }`}
              title="Bookmark"
              onClick={handleBookmark}
            >
              <LuBookmark
                className={isBookmarked ? "fill-current" : ""}
                size={18}
              />
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="p-2 transition cursor-pointer rounded-lg bg-[#F5EBEB]/80 hover:bg-[#F5EBEB] border"
            >
              <LuTriangleAlert className="text-stone-500" size={20} />
            </button>
          </div>
        </div>

        <p className="text-stone-600 text-sm mb-6">{prompt.description}</p>

        {/* Content */}
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-base font-bold text-stone-600 capitalize tracking-wider flex items-center gap-2">
            {shouldBlur && <LuLock size={14} />} Prompt Content
          </h4>
          {!shouldBlur && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 cursor-pointer text-xs font-semibold text-rose-600 hover:bg-rose-200/80 bg-rose-100 px-3 py-1.5 rounded-lg transition"
            >
              {isCopied ? <LuCheck size={14} /> : <LuCopy size={14} />}
              {isCopied ? "Copied" : "Copy"}
            </button>
          )}
        </div>

        <div className="relative rounded-xl border border-stone-200 overflow-hidden">
          <div
            className={`bg-stone-50 p-4 h-40 ${shouldBlur ? "blur-md select-none pointer-events-none" : ""}`}
          >
            <p className="text-stone-800 whitespace-pre-wrap text-sm">
              {prompt.content}
            </p>
          </div>

          {shouldBlur && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/10 backdrop-blur-[2px]">
              <div className="bg-white/60 p-4 rounded-xl shadow-lg border border-stone-100 text-center mx-4">
                <LuLock className="mx-auto mb-2 text-[#867070]" size={20} />
                <p className="text-sm font-semibold mb-2">Premium Content</p>
                <button className="bg-[#867070]/90 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#867070] cursor-pointer transition">
                  Subscribe to Premium
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Usage Instructions */}
        <div className="border-t border-stone-200 pt-6 mt-8">
          <h4 className="text-base font-bold text-stone-900 mb-1">
            Usage Instructions
          </h4>
          <p className="text-stone-600 text-sm">
            For best results, configure your parameters on{" "}
            <strong>{prompt.aiTool}</strong> with low temperature (0.3 - 0.5) to
            avoid hallucinations. Replace bracketed tags in the template with
            your target topic details.
          </p>
        </div>
      </div>
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        promptId={prompt._id}
        userId={user?.id}
      />
    </>
  );
};

export default PromptContent;
