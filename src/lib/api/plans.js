import { protectedFetch } from "../core/server"

// Get Plans Data 
export const getPlan = async (plan) => {
    return protectedFetch(`/api/plans?plan=${plan}`)
}


