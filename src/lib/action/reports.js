import { serverMutation } from "../core/server"

// Add Reports on mongoDB
export const addReport = async (reportData) => {
    return serverMutation(`/api/reports`, reportData);
}

// Delete Reports Data From MongoDB
export const deleteReport = async (id) => {
    return serverMutation(`/api/reports/${id}`, null, 'DELETE');
}
