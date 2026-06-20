import { serverFetch } from "../core/server";

export const getUsers = async (userId = "") => {
    return serverFetch(`/api/users?userId=${userId}`);
}
