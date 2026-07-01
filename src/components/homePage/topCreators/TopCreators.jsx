import React from "react";
import TopCreatorContent from "./TopCreatorContent";
import { getTopCreator } from "@/lib/api/topCreators";

const TopCreators = async () => {
  const topCreators = await getTopCreator();  
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
        {topCreators && topCreators.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
            {topCreators.map((creator, idx) => (
              <TopCreatorContent key={idx} creator={creator} idx={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-[#86707005] border-2 border-dashed border-[#86707020] rounded-3xl">
            <div className="flex flex-col items-center gap-3">
              <span className="text-4xl">🌱</span>
              <h3 className="text-xl font-bold text-[#867070]">
                No Creators Found Yet
              </h3>
              <p className="text-sm text-[#86707080] max-w-sm">
                Currently, there are no top creators available with active
                prompts. Be the first one to create and share your amazing
                prompts!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCreators;
