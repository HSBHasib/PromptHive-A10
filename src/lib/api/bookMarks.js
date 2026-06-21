import { serverFetch } from "../core/server";

// Get BookMarks Data
export const getBookmarks = async (userId = null) => {
  const path = userId ? `/api/bookmarks?userId=${userId}` : `/api/bookmarks`;
  return await serverFetch(path);
};

