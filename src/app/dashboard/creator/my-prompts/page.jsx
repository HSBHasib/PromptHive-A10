import React from "react";
import PromptContent from "@/components/dashboard/promptContent/PromptContent";
import { getPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";

const CreatorPromptsData = async ({ searchParams }) => {
  const user = await getUserSession();
  const userId = user?.id;

  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page || "1";

  const queryObj = {
    userId: userId,
    page: currentPage,
    limit: "4",
  };

  const queryString = new URLSearchParams(queryObj).toString();

  const prompts = (await getPrompts(queryString)) || { data: [], total: 0 };
  const total = prompts?.data.length;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#867070]">My Prompts</h1>
        <p className="text-sm text-[#917C7C] mt-1">
          Manage and monitor all your submitted AI prompts.
        </p>
      </div>

      <PromptContent prompts={prompts} totalPrompts={total} currentPage={parseInt(currentPage)} />
    </div>
  );
};

export default CreatorPromptsData;

