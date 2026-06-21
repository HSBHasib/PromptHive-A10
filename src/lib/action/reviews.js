import { serverMutation } from "../core/server"

export const addReview = (reviewData) => {
    return serverMutation(`/api/reviews`, reviewData)
}