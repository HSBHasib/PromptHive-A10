import { serverFetch } from "../core/server"

// Get Plans Data
export const getPlan = async (plan) => {
    return serverFetch(`/api/plans?plan=${plan}`)
}

