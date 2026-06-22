import MyReviewsContent from "@/components/dashboard/user/myReviewsContent/MyReviewsContent";
import { getPrompts } from "@/lib/api/prompts";
import { getReviews } from "@/lib/api/reviews";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import React from "react";

const MyReviews = async () => {
  const user = await getUserSession();
  const { reviews } = await getReviews({ userId: user?.id });
  const { data: prompts } = await getPrompts();

  const formattedReviews = (reviews || []).map((review) => {
    const prompt = prompts.find((p) => p._id === review.promptId);
    return {
      ...review,
      title: prompt?.title || "Unknown Prompt",
      aiTool: prompt?.aiTool || "N/A",
    };
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-1 text-[#867070]">
        My Product Reviews
      </h2>
      <p className="text-sm text-[#917C7C] mb-6">
        Feedback and ratings you've posted on the marketplace.
      </p>

      {formattedReviews.length > 0 ? (
        <MyReviewsContent reviews={formattedReviews} />
      ) : (
        <div className="text-center py-20 bg-white/30 rounded-2xl border border-dashed border-stone-200">
          <h3 className="text-xl font-bold text-[#867070] mb-2">
            No reviews yet!
          </h3>
          <p className="text-sm font-medium text-[#917C7C] mb-6">
            Explore our library and share your experience by reviewing your
            favorite templates.
          </p>
          <Link
            href="/all-prompts"
            className="px-6 py-2 bg-[#867070] text-white rounded-lg font-medium hover:bg-[#6e5d5d] transition"
          >
            Browse All Prompts
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
