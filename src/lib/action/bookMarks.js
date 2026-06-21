import { serverMutation } from "../core/server";

// Pass BookMarks Data
export const toggleBookmark = async (data) => {
  return serverMutation(`/api/bookmarks`, data);
};

