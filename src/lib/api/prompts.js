import { serverFetch } from "../core/server"

// Get 6 Trending Prompts Data 
export const getTrendingPrompts = async () => {
    return serverFetch(`/api/trending-prompts`);
}

// Get Prompts Based on multiple things
export const getPrompts = async (queryString = "") => {
  return serverFetch(`/api/prompts${queryString ? `?${queryString}` : ""}`);
};


