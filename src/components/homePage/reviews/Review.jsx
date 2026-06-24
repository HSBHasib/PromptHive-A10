import React from "react";
import ReviewCard from "./ReviewCard";
import { getReviews } from "@/lib/api/reviews";

const Review = async () => {
  const { reviews } = await getReviews();
  const reviewData = reviews.slice(0, 3);
  return (
    <div className="pt-10 pb-20 px-6 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#867070] tracking-tight md:text-4xl text-center w-full">
            What Our Users Say
          </h2>
        </div>

        {/* Review Cards */}
        {reviewData && reviewData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-stretch">
            {reviewData.map((review, idx) => (
              <ReviewCard key={review._id} review={review} idx={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6 bg-[#86707005] border border-dashed border-[#86707020] rounded-2xl w-full">
            <p className="text-[#867070] font-medium text-sm">
              No reviews yet. Be the first one to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
