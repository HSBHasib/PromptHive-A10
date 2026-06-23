import React from "react";
import Link from "next/link";
import { LuLock } from "react-icons/lu";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3e7e7]/80 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#867070]/20 shadow-sm text-center">
        <div className="w-16 h-16 bg-[#f3e7e7] text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <LuLock size={32} className="animate-bounce" />
        </div>
        <h1 className="text-[28px] font-bold text-[#403535] mb-2">
          Unauthorized
        </h1>
        <p className="text-[#867070] mb-8">
          You need to be logged in to access this page. Please sign in to your
          account.
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/"
            className="bg-[#f3e7e7] text-[#867070] cursor-pointer px-6 py-3 rounded-xl font-semibold hover:bg-[#e6d8d8] transition-all"
          >
            Home
          </Link>
          <Link
            href="/auth/login"
            className="inline-block bg-[#867070] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#6e5d5d] transition-all"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
