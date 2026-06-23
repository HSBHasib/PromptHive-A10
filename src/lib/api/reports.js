import { protectedFetch } from "../core/server"

export const getReports = async () => {
    return protectedFetch(`/api/reports`)
}
