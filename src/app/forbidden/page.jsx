'use client'

import React from 'react';
import Link from 'next/link';
import { LuShieldAlert } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

const ForbiddenPage = () => {
    const router = useRouter()
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3e7e7]/70 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#867070]/20 shadow-sm text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <LuShieldAlert size={32} className='animate-bounce' />
        </div>
        <h1 className="text-3xl font-bold text-[#403535] mb-2">Access Forbidden</h1>
        <p className="text-[#867070] mb-8">
          You don't have permission to view this page. If you think this is a mistake, contact the administrator.
        </p>
        <div className="flex gap-3 justify-center">
          <Link 
            href="/" 
            className="bg-[#867070] text-white cursor-pointer px-6 py-3 rounded-xl font-semibold hover:bg-[#6e5d5d] transition-all"
          >
            Go Home
          </Link>
          <button 
            onClick={() => router.back()}
            className="bg-[#f3e7e7] text-[#867070] cursor-pointer px-6 py-3 rounded-xl font-semibold hover:bg-[#e6d8d8] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
