'use client'

import React from 'react'
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import Link from "next/link";

const LeftSideContent = ({data}) => {
  return (
    <>
     {/* LEFT Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="lg:col-span-5 flex flex-col gap-3"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-widest text-[#867070] uppercase">
              {data.tagline}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#867070] tracking-tight leading-tight">
              {data.title}
            </h2>
          </div>

          <p className="text-sm text-[#867070] leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-col gap-4 mt-2">
            {data.features.map((feature, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <HiOutlineCheckCircle className="text-[#867070] text-xl mt-0.5 flex-shrink-0 stroke-[2]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#867070]">
                    {feature.label}
                  </span>
                  <span className="text-xs text-[#867070] leading-normal mt-0.5">
                    {feature.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button className="bg-[#867070] hover:bg-[#705C5C] text-white font-bold text-sm h-11 px-8 rounded-xl transition-all duration-200 shadow-sm active:scale-95 mt-4 self-start">
            <Link href="/all-prompts">{data.ctaText}</Link>
          </Button>
        </motion.div> 
    </>
  )
}

export default LeftSideContent
