import { protectedFetch } from "../core/server"

// Get Plans Data 
export const getPlans = async (plan) => {
    return protectedFetch(`/api/plans?plan=${plan}`)
}


