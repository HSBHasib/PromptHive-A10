"use client";

import { Button, SearchField } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const BannerContent = ({ searchQuery, setSearchQuery, handleSearchSubmit }) => {
  // Trending tags as per specification requirements
  const trendingTags = ["#ChatGPT", "#Midjourney", "#Claude", "#Gemini"];

  return (
    <div className="bg-[#F5EBEB] relative max-h-screen flex items-center justify-center px-4 py-10 overflow-hidden select-none">
      {/* Decorative Wave Background Graphic */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-70">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          fill="none"
          xmlns="http://w3.org"
        >
          <path
            fill="#867070"
            fillOpacity="0.08"
            d="M0,160L60,176C120,192,240,224,360,224C480,224,600,192,720,165.3C840,139,960,117,1080,122.7C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,0,320Z"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Main Header */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#867070] tracking-tight  max-w-3xl">
            Discover, Monetize, and <br className="hidden sm:inline" />
            Optimize Elite AI Prompts
          </h1>

          {/* Sub Heading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-6 text-sm sm:text-base text-[#867070] max-w-2xl px-2"
          >
            The premium marketplace for high-performance prompts. Engineered for
            ChatGPT, Midjourney, Claude, and Gemini. Build your community
            profile setup efficiently.
          </motion.p>

          {/* Search Bar Container */}
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-8 w-full max-w-2xl px-4"
          >
            <div className="bg-[#86707015] backdrop-blur-md border border-[#86707025] focus-within:ring-2 focus-within:ring-[#86707030] rounded-xl p-2 flex items-center shadow-lg hover:shadow-xl transition-all duration-300">
              <SearchField
                className="bg-transparent w-full"
                fullWidth
                name="search"
              >
                <SearchField.Group className="bg-transparent border-none shadow-none text-[#867070] focus-within:ring-0">
                  <SearchField.SearchIcon className="text-[#867070]" />

                  <SearchField.Input
                    placeholder="Search by title, tag or Ai tools.... "
                    className="bg-transparent text-[#867070] placeholder-[#86707075] border-none outline-none focus:outline-none focus:ring-0 w-full  text-sm sm:text-base pr-2"
                  />

                  <SearchField.ClearButton className="text-[#86707080] hover:text-[#867070] transition-colors" />
                </SearchField.Group>
              </SearchField>

              <Button
                type="submit"
                className="bg-[#867070] hover:bg-[#705C5C] text-white font-medium px-6 sm:px-8 h-11 rounded-xl text-sm sm:text-base transition-all duration-200 shadow-md ml-2 flex-shrink-0 active:scale-98"
              >
                Search
              </Button>
            </div>
          </motion.form>

          {/* Trending Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 px-4"
          >
            {trendingTags.map((tag, idx) => (
              <Link
                href={`/all-prompts?search=${tag.replace("#", "")}`}
                key={idx}
                className="bg-[#86707015] hover:bg-[#86707025] text-[#867070] font-semibold text-xs sm:text-sm px-3 py-1 rounded-lg border border-[#86707010] transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {tag}
              </Link>
            ))}
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="mt-18"
          >
            <Link
              href="/all-prompts"
              className="bg-[#867070] hover:bg-[#705C5C] text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Explore All Prompts
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BannerContent;
