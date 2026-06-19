"use server"

const { serverMutation } = require("../core/server")

export const createPrompt = async (promptData) => {
  return serverMutation(`/api/prompts`, promptData)
}