import React from "react";
import PromptContent from "@/components/dashboard/promptContent/PromptContent";
import { getPrompts } from "@/lib/api/prompts";
import { getUsers } from "@/lib/api/users";

const UserPromptsData = async ({ searchParams }) => {
  // Get All Users Data
  const {data: users} = await getUsers();
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page || "1";

  const queryObj = {
    page: currentPage,
    limit: "8",
  };

  const queryString = new URLSearchParams(queryObj).toString();

  const prompts = (await getPrompts(queryString)) || { data: [], total: 0 };
  const total = prompts?.data.length;

  return (
    <div className="p-4 w-full max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#867070]">Prompt Template Submissions Moderation
</h1>
        <p className="text-sm text-[#917C7C] mt-1">
          Approve templates, reject with feedback, or tag featured highlights.
        </p>
      </div>

      <PromptContent users={users} prompts={prompts} totalPrompts={total} currentPage={parseInt(currentPage)} isAdmin={true} />
    </div>
  );
};

export default UserPromptsData;


