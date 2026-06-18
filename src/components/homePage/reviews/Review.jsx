import React from "react";
import ReviewCard from "./ReviewCard";

const Review = () => {
  // Review Fake Data
  const fakeReviewsFromDB = [
    {
      _id: "r1",
      rating: 5,
      comment: "The quality of prompts here is leagues above anything else I've found. It's saved me dozens of hours on client work.",
      userName: "David Chen",
      userRole: "Creative Director",
      userAvatar: "https://unsplash.com",
      datePosted: "2 days ago"
    },
    {
      _id: "r2",
      rating: 5,
      comment: "Manually verifying prompts makes a huge difference. Every single one I've purchased has worked exactly as described.",
      userName: "Sophie Mueller",
      userRole: "SaaS Founder",
      userAvatar: "https://unsplash.com",
      datePosted: "1 week ago"
    },
    {
      _id: "r3",
      rating: 5,
      comment: "The creator community is amazing. I've learned so much about prompt engineering just by studying the featured works.",
      userName: "Marcus Thorne",
      userRole: "Data Analyst",
      userAvatar: "https://unsplash.com",
      datePosted: "3 days ago"
    }
  ];

  return (
    <div className="py-12 px-6 w-full select-none bg-[#F3E8E8]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Central Layout Text Header Block matching your exact font weights */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#867070] tracking-tight md:text-4xl text-center w-full">
            What Our Users Say
          </h2>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-stretch">
          {fakeReviewsFromDB.map((review, idx) => (
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
