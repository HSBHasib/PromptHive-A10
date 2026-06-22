'use server'

import { serverMutation } from "../core/server"

export const addSubcription = async (data) => {
    return serverMutation(`/api/subcriptions`, data)
}
