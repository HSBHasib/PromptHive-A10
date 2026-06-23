import React from "react";
import TopCreatorContent from "./TopCreatorContent";
import { getPrompts } from "@/lib/api/prompts";
import { getUsers } from "@/lib/api/users";

const TopCreators = async () => {
  const { data: prompts, totalPrompts, totalCopies } = await getPrompts();
  const { data: users } = await getUsers();

  const fakeCreatorsFromDB = []

  return (
    <div className="pb-15 px-6 w-full select-none">
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
          {fakeCreatorsFromDB.map((creator, idx) => (
            <TopCreatorContent key={creator._id} creator={creator} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCreators;
