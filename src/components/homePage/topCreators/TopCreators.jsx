import React from "react";
import TopCreatorContent from "./TopCreatorContent";
import { getTrendingPrompts } from "@/lib/api/prompts";
import { getUsers } from "@/lib/api/users";

const TopCreators = async () => {
  const prompts = await getTrendingPrompts();
  const users = await getUsers();

  const topCreators = prompts
    .map((prompt) => {
      const creatorUser = users.data.find((u) => u._id === prompt.userId);
      return {
        ...prompt,
        ...creatorUser, 
      };
    })
    .slice(0, 4); 


  return (
    <div className="pb-15 px-6 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Heading*/}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#867070] tracking-tight md:text-4xl">
            Top Prompt Creators
          </h2>
          <p className="text-sm font-medium text-[#867070]">
            Follow the masters of AI engineering and explore their top
            performing scripts.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
          {topCreators.map((creator, idx) => (
            <TopCreatorContent key={creator._id} creator={creator} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCreators;
