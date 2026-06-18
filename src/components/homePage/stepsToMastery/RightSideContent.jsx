"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  HiOutlineCommandLine,
  HiOutlineSparkles,
  HiOutlineDocumentCheck,
  HiOutlineClipboard,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const RightSideContent = ({ data }) => {
  const [activeTab, setActiveTab] = useState("raw");
  const [copied, setCopied] = useState(false);

  // Text Copy Func
  const handleCopyText = async () => {
    try {
      if (data?.codeSnippet) {
        await navigator.clipboard.writeText(data.codeSnippet);
        toast.success("Prompt copied successful!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      toast.error("Failed to copy Prompt content");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="lg:col-span-7 bg-[#86707008] border border-[#86707015] rounded-3xl p-6 shadow-sm flex flex-col gap-4 relative w-full h-115 justify-between"
      >
        {/* Tab Switchers Layout */}
        <div className="flex justify-between items-center bg-[#86707010] p-1.5 rounded-xl border border-[#86707015] z-10">
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setActiveTab("raw")}
              className={`font-semibold text-xs bg-[#867070] px-4 h-8 rounded-lg transition-all ${
                activeTab === "raw"
                  ? "text-white shadow-sm"
                  : "bg-transparent text-[#867070] hover:bg-[#86707015]"
              }`}
            >
              Input Raw Text
            </Button>
            <Button
              size="sm"
              onClick={() => setActiveTab("optimized")}
              className={`font-semibold bg-[#867070] text-xs px-4 h-8 rounded-lg transition-all ${
                activeTab === "optimized"
                  ? "text-white shadow-sm"
                  : "bg-transparent text-[#867070] hover:bg-[#86707015]"
              }`}
            >
              Engineered Prompt Structure
            </Button>
          </div>
        </div>

        {/* Main Content Visualization Window  */}
        <div className="flex-1 relative w-full h-full rounded-2xl overflow-hidden border border-[#86707015] bg-[#86707005] mt-2">
          <AnimatePresence mode="wait">
            {activeTab === "raw" ? (
              /* TAB 1: RAW CODE INPUT SIMULATOR VIEW */
              <motion.div
                key="rawView"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full p-5 text-xs text-[#867070] leading-relaxed flex flex-col justify-between"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-[#867070] font-bold tracking-wider capitalize text-[13px]">
                    <HiOutlineCommandLine size={20} /> Console Input Prompt
                    Context
                  </div>
                  <p className="italic text-[#867070] bg-white/40 p-4 rounded-xl border border-[#86707010]  text-sm mt-1">
                    "/imagine prompt: A futuristic city with flying cars, neon
                    lights, rainy atmosphere, hyper-realistic, 8k resolution,
                    cinematic lighting --ar 16:9 --v 6.0"
                  </p>
                </div>

                {/* Faked skeletal terminal guidelines structure */}
                <div className="flex flex-col gap-2 opacity-40">
                  <div className="w-1/2 h-5 bg-[#86707060] rounded-lg" />
                  <div className="w-2/3 h-5 bg-[#86707060] rounded-lg" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="optimizedView"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full grid grid-cols-1 sm:grid-cols-2"
              >
                {/* JSON Code Area Segment */}
                <div className="p-5 text-[11px] font-medium text-[#867070] leading-relaxed bg-[#86707010]/30 overflow-y-auto whitespace-pre border-r border-[#86707015] relative group/json">
                  {/* Top Bar Header Area Containment Including Interactive Copy Action Button */}
                  <div className="flex items-center justify-between mb-3 w-full">
                    <div className="text-[11px] font-bold text-[#867070] tracking-wider uppercase flex items-center gap-1">
                      <HiOutlineSparkles size={17} /> structured_prompt.json
                    </div>

                    {/* Minimalist Micro Copy Trigger Interface Action */}
                    <button
                      type="button"
                      onClick={handleCopyText}
                      className="flex items-center gap-1 text-[10px] font-medium text-[#867070] hover:text-[#867070] bg-[#86707015] hover:bg-[#86707025] px-2 py-1 rounded-md transition-all active:scale-95 border border-[#86707010] cursor-pointer"
                      title="Copy json configuration to clipboard"
                    >
                      {copied ? (
                        <>
                          <HiOutlineDocumentCheck
                            size={13}
                            className="text-emerald-600"
                          />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <HiOutlineClipboard size={13} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Actual Text Body Context Stream Area */}
                  <div className="w-full font-mono text-[10.5px]">
                    {data.codeSnippet}
                  </div>
                </div>

                {/* Generated Production Output Image View */}
                <div className="relative w-full h-full bg-[#86707020]">
                  <Image
                    src={data.demoImage}
                    alt="Engineed Output Showcase"
                    fill
                    className="object-cover"
                    sizes="(max-w-7xl) 50vw"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default RightSideContent;
