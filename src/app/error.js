"use client";

import { HiRefresh } from "react-icons/hi";
import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const ErrorPage = ({ reset }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFE2E2] px-6 text-center">
      {/* Icon */}
      <div className="text-[80px] mb-2 animate-pulse">⚠️</div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold text-[#867070]">
          Something went wrong!
        </h2>
        <p className="text-[#867070] max-w-md mx-auto">
          We encountered an unexpected error while loading this page. Please try
          again or go back to the home page.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-3">
          <button
            onClick={() => reset()}
            className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#867070] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#6B5656] transition-all"
          >
            <HiRefresh className="text-lg" />
            Try Again
          </button>

          <button
          onClick={() => router.back()}
            className="inline-flex cursor-pointer items-center justify-center gap-2 border border-[#867070] text-[#867070] px-6 py-3 rounded-xl font-semibold hover:bg-[#86707010] transition-all"
          >
            <HiArrowLeft className="text-lg" />
            Back To Previous Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

