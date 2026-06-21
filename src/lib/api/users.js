import { serverFetch } from "../core/server";

export const getUsers = async (params = "") => {
    return serverFetch(`/api/users${params}`);
}


