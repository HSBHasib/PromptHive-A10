const { serverFetch } = require("../core/server")

export const getSubcriptions = async () => {
    return serverFetch(`/api/subcriptions`)
}
