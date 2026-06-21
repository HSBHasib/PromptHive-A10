import MyReviewsContent from "@/components/dashboard/user/myReviewsContent/MyReviewsContent";
import { getPrompts } from "@/lib/api/prompts";
import { getReviews } from "@/lib/api/reviews";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const MyReviews = async () => {
  const user = await getUserSession();
  if (!user) return <p>Please login to see your reviews.</p>;

  const { reviews } = await getReviews({ userId: user?.id });
  const { data: prompts } = await getPrompts();

  const formattedReviews = reviews.map((review) => {
    const prompt = prompts.find((p) => p._id === review.promptId);
    return {
      ...review,
      title: prompt?.title || "Unknown Prompt",
      aiTool: prompt?.aiTool || "N/A",
    };
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
       <h2 className="text-2xl font-bold mb-6 text-[#867070]">My Reviews</h2>
       <MyReviewsContent reviews={formattedReviews} />
    </div>
  );
};

export default MyReviews;
