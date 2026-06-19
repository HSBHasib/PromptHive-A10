import React from 'react';
import PromptContent from '@/components/dashboard/promptContent/PromptContent';
import { getPrompts } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';

const UserPromptsData = async ({ searchParams }) => {
  const user = await getUserSession();
  
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page || "1";

  const prompts = await getPrompts(user?.id, currentPage) || []; 

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#867070]">My Prompts</h1>
        <p className="text-sm text-[#917C7C] mt-1">Manage and monitor all your submitted AI prompts.</p>
      </div>

      <PromptContent prompts={prompts} currentPage={parseInt(currentPage)} />
    </div>
  );
};

export default UserPromptsData;

