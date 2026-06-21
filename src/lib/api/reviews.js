import { serverFetch } from "../core/server";

export const getReviews = async (promptId) => {
    return serverFetch(`/api/reviews/${promptId}`);
}
