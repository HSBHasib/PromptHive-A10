import { serverFetch } from "../core/server"

export const getReports = async () => {
    return serverFetch(`/api/reports`)
}
