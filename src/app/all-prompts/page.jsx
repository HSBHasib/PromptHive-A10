import React from "react";
import { getPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { getUsers } from "@/lib/api/users";
import AllPromptsContent from "@/components/allPrompts/AllPromptsContent";
import { getReviews } from "@/lib/api/reviews";

const AllPromptsPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;

  const querySearch = new URLSearchParams(resolvedParams);
  const queryString = querySearch.toString();

  const response = await getPrompts(queryString);
  const { data: users } = (await getUsers()) || [];
  const userSession = await getUserSession();
  const { reviews } = await getReviews();
  
  const promptsWithRatings = response?.data.map((prompt) => {
    const promptReviews = reviews.filter((r) => r.promptId.trim() === prompt._id.trim());
    
    const totalRating = promptReviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0);
    const avgRating = promptReviews.length > 0 
    ? (totalRating / promptReviews.length).toFixed(1) 
    : 0;

    return {
        ...prompt,
        averageRating: parseFloat(avgRating),
        totalReviews: promptReviews.length,
    };
});

  
  const prompts = {
    prompts: promptsWithRatings,
    totalItems: response?.total || 0,
    totalPages: response?.total ? Math.ceil(response.total / 9) : 1,
  };

  const filters = {
    page: parseInt(resolvedParams.page) || 1,
    search: resolvedParams.search || "",
    category: resolvedParams.category || "",
    aiTool: resolvedParams.aiTool || "",
    difficulty: resolvedParams.difficulty || "",
  };

  return (
    <div className="bg-[#EFE2E2] min-h-screen py-14 px-6 w-full select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-bold text-[#867070] tracking-tight">
            All Creative Prompts
          </h1>
          <p className="text-sm text-[#867070]">
            Explore, copy, and craft using our master collective directory of
            advanced AI prompts.
          </p>
        </div>

        {/* Content & Pagination Hub */}
        <AllPromptsContent
          prompts={prompts}
          users={users}
          isUserLoggedIn={!!userSession}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default AllPromptsPage;
