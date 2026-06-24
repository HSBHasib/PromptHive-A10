import React from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import FeaturedPromptCard from "./FeaturedPromptCard";
import Link from "next/link";
import { getTrendingPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { getUsers } from "@/lib/api/users";

const FeaturedPrompts = async () => {
  const userSession = await getUserSession();

  const trendingPrompts = (await getTrendingPrompts()) || [];
  const { data: user } = await getUsers();

  return (
    <div className="bg-[#EFE2E2] my-13 py-14 px-6 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-row flex-wrap gap-2 items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-3xl font-bold text-[#867070] tracking-tight">
              Featured Prompts
            </h2>
            <p className="text-sm text-[#867070]">
              Hand-picked high-quality prompts from our creator community.
            </p>
          </div>
          <Link
            href="/all-prompts"
            className="group flex items-center gap-2 text-sm font-semibold px-4 py-1.5 text-[#867070] hover:text-[#6B5656] hover:bg-[#86707010] rounded-lg transition-all max-[580px]:border border-[#6B565640]"
          >
            View All
            <HiArrowUpRight className="text-base transition-transform duration-200 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Featured Data in form of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingPrompts.map((prompt, idx) => (
            <FeaturedPromptCard
              key={prompt._id}
              prompt={prompt}
              user={user}
              isUserLoggedIn={!!userSession}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPrompts;

