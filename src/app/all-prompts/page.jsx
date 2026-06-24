import React from "react";
import { getPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { getUsers } from "@/lib/api/users";
import AllPromptsContent from "@/components/allPrompts/AllPromptsContent";

const AllPromptsPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const querySearch = new URLSearchParams(resolvedParams);
  const queryString = querySearch.toString();
  
  const userSession = await getUserSession();
  const response = await getPrompts(queryString);
  const { data: users } = (await getUsers()) || [];
  
  const prompts = {
    prompts: response?.data || [],
    totalItems: response?.total || 0,
    totalPages: response?.total ? Math.ceil(response.total / 9) : 1, 
  };

  const filters = {
    page: parseInt(resolvedParams.page) || 1,
    search: resolvedParams.search || "",
    category: resolvedParams.category || "",
    aiTool: resolvedParams.aiTool || "",
    difficulty: resolvedParams.difficulty || "",
    sort: resolvedParams.sort || "latest",
  };

  return (
    <div className="bg-[#EFE2E2] min-h-screen pb-14 pt-8 px-6 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-bold text-[#867070] tracking-tight">All Creative Prompts</h1>
          <p className="text-sm text-[#867070]">Explore, copy, and craft using our master collective directory.</p>
        </div>

        {/* All Prompts Content */}
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