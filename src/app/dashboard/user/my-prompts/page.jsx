import React from "react";
import PromptContent from "@/components/dashboard/promptContent/PromptContent";
import { getPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { getReviews } from "@/lib/api/reviews";

const UserPromptsData = async ({ searchParams }) => {
  const user = await getUserSession();
  const userId = user?.id;
  const userRole = user?.role;
  const isAdmin = false;

  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page || "1";

  const queryObj = {
    userId: userId,
    page: currentPage,
    limit: "8",
  };

  const queryString = new URLSearchParams(queryObj).toString();

  const prompts = (await getPrompts(queryString)) || { data: [], total: 0 };
  const total = prompts?.data.length;

  const {totalReview, reviews} = await getReviews({ userId: user?.id });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#867070]">My Prompts</h1>
        <p className="text-sm text-[#917C7C] mt-1">
          Manage and monitor all your submitted AI prompts.
        </p>
      </div>

      <PromptContent prompts={prompts} totalPrompts={total} currentPage={parseInt(currentPage)} isAdmin={isAdmin} userRole={userRole} reviews={reviews} totalReview={totalReview} />
    </div>
  );
};

export default UserPromptsData;