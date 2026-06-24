import React from "react";
import PromptContent from "@/components/dashboard/promptContent/PromptContent";
import { getPrompts } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { getReviews } from "@/lib/api/reviews";
import Link from "next/link";

const UserPromptsData = async ({ searchParams }) => {
  const user = await getUserSession();
  const userId = user?.id;
  const userRole = user?.role || "user";
  const isAdmin = false;

  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page || "1";

  const queryObj = {
    userId: userId,
    page: currentPage,
    limit: "8",
  };

  const queryString = new URLSearchParams(queryObj).toString();

  const prompts = (await getPrompts(queryString)) || {
    data: [],
    total: 0,
  };
  const total = prompts.total;
  const { totalReview, reviews } = await getReviews({ userId: user?.id });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#867070]">My Prompts</h1>
        <p className="text-sm text-[#917C7C] mt-1">
          Manage and monitor all your submitted AI prompts.
        </p>
      </div>
      {total > 0 ? (
        <PromptContent
          prompts={prompts}
          totalPrompts={total}
          currentPage={parseInt(currentPage)}
          isAdmin={isAdmin}
          userRole={userRole}
          reviews={reviews}
          totalReview={totalReview}
        />
      ) : (
        <div className="text-center py-20 bg-white/30 rounded-2xl border border-dashed border-stone-200">
          <h3 className="text-xl font-bold text-[#867070] mb-2">
            No Prompts Found!
          </h3>
          <p className="text-sm font-medium text-[#917C7C] mb-6">
            You haven't created any prompts yet. Start sharing your amazing AI
            prompts with the community!
          </p>
          <Link
            href={`/dashboard/${userRole}/add-prompt`}
            className="px-6 py-3 bg-[#867070] text-white rounded-xl font-bold hover:bg-[#6B5656] transition-all"
          >
            Create Your First Prompt
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserPromptsData;
