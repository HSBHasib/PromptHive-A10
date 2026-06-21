import React from "react";
import { LuStar, LuMessageSquare } from "react-icons/lu";

const PromptReview = ({ reviews = [], totalReview }) => {
  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-stone-700 mb-2 flex items-center gap-2">
        <LuMessageSquare className="text-rose-600" size={20} />
        Community Reviews ({totalReview})
      </h3>
      <p className="text-xs font-medium text-stone-700 mb-4 italic">
        Note: 'We Only Show 3 recent reviews'
      </p>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white/40 p-5 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-stone-800">
                  {review.userName || "Anonymous"}
                </span>
                <div className="flex bg-amber-50 px-2 py-0.5 rounded-full items-center gap-1">
                  <LuStar size={10} className="text-amber-500 fill-current" />
                  <span className="text-[10px] font-bold text-amber-700">
                    {review.rating}
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                "{review.comment}"
              </p>
              <p className="text-[10px] text-stone-400 mt-4 font-medium">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
          <LuMessageSquare className="mx-auto text-stone-300 mb-2" size={24} />
          <p className="text-sm text-stone-500">
            No reviews yet. Be the first!
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptReview;

