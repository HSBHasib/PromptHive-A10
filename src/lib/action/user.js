import { serverMutation } from "../core/server";

export const updateUser = async (id, updatedFields) => {
    console.log("updated data on api pass - ", id, updatedFields)
    return serverMutation(`/api/users/${id}`, updatedFields, "PATCH");
}
