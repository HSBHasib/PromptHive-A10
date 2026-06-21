import { serverMutation } from "../core/server"

export const addReport = async (reportData) => {
    return serverMutation(`/api/reports`, reportData);
}