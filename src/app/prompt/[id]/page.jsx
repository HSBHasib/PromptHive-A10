import PromptDetailsContent from "@/components/promptDetails/PromptDetailsContent";
import { getBookmarks } from "@/lib/api/bookMarks";
import { getPrompts } from "@/lib/api/prompts";
import { getUsers } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const PromptDetails = async ({ params }) => {
  const { id } = await params;
  const { data: allPrompts } = await getPrompts();
  const { data: allUsers } = await getUsers();
  const user = await getUserSession();
  const currentUserId = user?.id;

  const singlePrompt = allPrompts.find((p) => p._id === id);
  const creator = allUsers.find((u) => u._id === singlePrompt?.userId);
  const { data: userBookmarks } = await getBookmarks(currentUserId);
  
  const isAlreadyBookmarked =
  userBookmarks?.some((b) => b.promptId === id) || false;  
  return (
    <div>
      <PromptDetailsContent
        prompt={singlePrompt}
        creator={creator}
        user={user}
        initialBookmarkStatus={isAlreadyBookmarked}
      />
    </div>
  );
};

export default PromptDetails;
