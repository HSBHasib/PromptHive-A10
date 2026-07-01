import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuGem, LuCheck } from "react-icons/lu";

const ProfileContent = ({ user, prompts }) => {
  const isCreator = user?.role === "creator";

  const approvedPromptsCount =
    prompts?.filter((p) => p.status === "approved").length || 0;

  const isPro = user?.plan === "pro";

  return (
    <div className="w-full p-6 bg-[#f3e7e7] border border-[#867070]/10 rounded-2xl shadow-sm">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#867070]/20 bg-[#e2e1e2] flex items-center justify-center shrink-0">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user?.name || "User"}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-2xl font-bold text-[#867070]">
              {user?.name?.charAt(0) || "U"}
            </span>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#403535]">
            {user?.name || "User"}
          </h2>
          <p className="text-sm text-[#867070]">{user?.email}</p>
          <div className="flex gap-2 mt-2">
            <span className="px-3 py-1 bg-[#867070]/10 text-[#867070] text-xs font-bold rounded-full capitalize">
              Role: {user?.role || "User"}
            </span>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full ${
                isPro
                  ? "bg-amber-100 text-amber-700"
                  : "bg-[#867070] text-white"
              }`}
            >
              Plan: {isPro ? "PRO LIFETIME" : "FREE"}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-5 bg-[#EEEDEE] border border-[#867070]/15 rounded-xl">
          <p className="text-xs font-bold text-[#867070] uppercase tracking-wider mb-1">
            Prompts Published
          </p>
          <h3 className="text-3xl font-bold text-[#403535]">
            {approvedPromptsCount}
          </h3>
        </div>
        <div className="p-5 bg-[#EEEDEE] border border-[#867070]/15 rounded-xl">
          <p className="text-xs font-bold text-[#867070] uppercase tracking-wider mb-1">
            Account Status
          </p>
          <div className="flex items-center gap-2 text-emerald-600 font-bold">
            <span className="bg-[#867070]/10 p-1 rounded-full">
              <LuCheck />
            </span>
            Verified Member
          </div>
        </div>
      </div>

      {/* Conditional Plan Section */}
      {isCreator ? (
        <div className="p-4 bg-emerald-100/50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800">
          <LuCheck size={20} />
          <span className="font-bold text-sm">
            Your are a creator, Lifetime All Access - Enjoy complete access to
            all Prompt Marketplace items!
          </span>
        </div>
      ) : !isPro ? (
        <div className="p-6 bg-[#867070] rounded-xl flex items-center justify-between shadow-lg">
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <LuGem className="text-amber-300" /> Upgrade to Pro Lifetime
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Unlock access to all private prompt templates and community
              reviews.
            </p>
          </div>
          <button className="bg-white cursor-pointer text-[#867070] px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
            <Link href="/payments" target="_blank">
              Upgrade Now ($5)
            </Link>
          </button>
        </div>
      ) : (
        <div className="p-4 bg-emerald-100/50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800">
          <LuCheck size={20} />
          <span className="font-bold text-sm">
            Lifetime Premium Active - Enjoy complete access to all Prompt
            Marketplace items!
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
