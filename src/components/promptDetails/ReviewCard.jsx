"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { addReview } from "@/lib/action/reviews";

const ReviewCard = ({ prompt, user, canAccessPrivate }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const userId = user?.id;
  const promptId = prompt?._id;

  const handleReview = async () => {
    if (!comment.trim()) {
      toast.error("Please write a review before submitting!");
      return;
    }

    const reviewData = { promptId, userId, rating, comment };

    try {
      const res = await addReview(reviewData);

      if (res.success) {
        toast.success("Review submitted successfully!");
        setComment("");
        setRating(5);
      } else {
        toast.error(res.message || "Failed to submit review.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="max-w-lg bg-white/50 p-5 rounded-2xl border border-stone-100 shadow-sm my-8">
      <h3 className="text-lg font-bold text-stone-700 mb-3">Leave a Review</h3>
      {!canAccessPrivate ? (
        <div className="p-4 border border-stone-200 rounded-lg text-stone-500 text-sm font-medium">
          This is a private prompt. Please upgrade to Pro to view reviews and
          copy this content.
        </div>
      ) : (
        <>
          <p className="uppercase text-[#57534D] text-xs font-semibold mb-1">
            rating
          </p>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={22}
                className={`cursor-pointer hover:scale-110 transition-all duration-200 ${star <= rating ? "text-yellow-400" : "text-stone-200"}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <div>
            <p className="uppercase text-[#57534D] text-xs font-semibold mb-0.5">
              comment
            </p>
            <textarea
              className="w-full bg-stone-50 text-sm border border-stone-200 p-3 rounded-lg text-stone-800 mb-4 h-24 focus:ring-1 focus:ring-[#867070] outline-none transition"
              placeholder="Share your thoughts about this prompt..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            onClick={handleReview}
            className="bg-[#867070]/90 text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#867070] transition"
          >
            Submit Review
          </button>
        </>
      )}
    </div>
  );
};

export default ReviewCard;
