"use server"

const { serverMutation } = require("../core/server")

// Insert Prompt Data on MongoDB
export const createPrompt = async (promptData) => {
  return serverMutation(`/api/prompts`, promptData)
}

// Update Prompt Data on MongoDB
export const updatePrompt = async (promptId, updatedData) => {
  return serverMutation(`/api/my-prompt/${promptId}`, updatedData, 'PATCH')
}