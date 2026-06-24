import React from 'react'
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFE2E2] px-6 text-center">
      {/* 404 Visual */}
      <h1 className="text-[120px] md:text-[180px] font-extrabold text-[#867070] opacity-20 tracking-tighter select-none">
        404
      </h1>
      
      {/* Content */}
      <div className="flex flex-col gap-4 -mt-10">
        <h2 className="text-3xl font-bold text-[#867070]">
          Oops! Page not found
        </h2>
        <p className="text-[#867070] max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>

        {/* Back Button */}
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#867070] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#6B5656] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <HiArrowLeft className="text-lg" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound

