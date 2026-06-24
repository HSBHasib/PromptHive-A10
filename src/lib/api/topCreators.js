import { serverFetch } from "../core/server"

export const getTopCreator = async () => {
    return serverFetch(`/api/top-creators`)
}
