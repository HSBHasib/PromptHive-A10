const { protectedFetch } = require("../core/server")

export const getSubcriptions = async () => {
    return protectedFetch(`/api/subcriptions`)
}
