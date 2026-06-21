import { serverMutation } from "../core/server";

// Update User Data on MongoDB
export const updateUser = async (userId, updatedFields) => {
    return serverMutation(`/api/users/${userId}`, updatedFields, "PATCH");
}

// Delete User From MongoDB
export const deleteUser = async (userId) => {
    return serverMutation(`/api/users/${userId}`, null, "DELETE")
}
