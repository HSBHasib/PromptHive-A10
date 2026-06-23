import React from "react";
import ReviewCard from "./ReviewCard";
import { getReviews } from "@/lib/api/reviews";

const Review = async () => {
    const {reviews} = await getReviews();
    const reviewData = reviews.slice(0, 3);
  return (
    <div className="pt-10 pb-20 px-6 w-full select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Central Layout Text Header Block matching your exact font weights */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#867070] tracking-tight md:text-4xl text-center w-full">
            What Our Users Say
          </h2>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-stretch">
          {reviewData.map((review, idx) => (
            <ReviewCard 
              key={review._id}
              review={review}
              idx={idx}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Review;
