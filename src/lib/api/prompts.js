import { serverFetch } from "../core/server"

export const getPrompts = async (userId = "", page = 1) => {
    return serverFetch(`/api/prompts?userId=${userId}&page=${page}`);
}
