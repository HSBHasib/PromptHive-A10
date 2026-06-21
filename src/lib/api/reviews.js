import { serverFetch } from "../core/server";

export const getReviews = async (params = {}) => {
    const { promptId, userId } = params;
    
    let url = "/api/reviews";
    if (promptId) url += `?promptId=${promptId}`;
    else if (userId) url += `?userId=${userId}`;
    
    return serverFetch(url);
}
