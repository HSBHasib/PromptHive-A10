import React from "react";
import PromptDetailsContent from "@/components/promptDetails/PromptDetailsContent";
import { getBookmarks } from "@/lib/api/bookMarks";
import { getPrompts } from "@/lib/api/prompts";
import { getUsers } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import { FaArrowLeftLong } from "react-icons/fa6";
import RouterBack from "@/components/reUseAbleComponent/Router";
import { getReviews } from "@/lib/api/reviews";

const PromptDetails = async ({ params }) => {
  const { id } = await params;
  const { data: allPrompts } = await getPrompts();
  const { data: allUsers } = await getUsers();
  const user = await getUserSession();
  const currentUserId = user?.id;

  const singlePrompt = allPrompts.find((p) => p._id === id);
  const creator = allUsers.find((u) => u._id === singlePrompt?.userId);
  const { data: userBookmarks } = await getBookmarks(currentUserId);
  const {reviews, totalReview} = await getReviews({ promptId: singlePrompt?._id });



  const isAlreadyBookmarked =
    userBookmarks?.some((b) => b.promptId === id) || false;
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Back Button */}
      <RouterBack className="py-4 text-sm font-medium flex items-center gap-1.5 text-stone-600 cursor-pointer hover:text-black/80 hover:font-semibold">
        <FaArrowLeftLong /> Back to Previous Page
      </RouterBack>

      {/* Main Content */}
      <PromptDetailsContent
        prompt={singlePrompt}
        creator={creator}
        user={user}
        initialBookmarkStatus={isAlreadyBookmarked}
        reviews={reviews}
        totalReview={totalReview}
      />
    </div>
  );
};

export default PromptDetails;
