import { serverFetch } from "../core/server"

// Get 6 Trending Prompts Data 
export const getTrendingPrompts = async () => {
    return serverFetch(`/api/trending-prompts`);
}


// Get Prompts Based on user 
export const getPrompts = async (userId = "", page = 1) => {
    return serverFetch(`/api/prompts?userId=${userId}&page=${page}`);
}

