import React from 'react'
import UpdatedPromptContent from './UpdatedPromptContent'
import { updatePrompt } from '@/lib/action/prompts'

const UpdatedPromptContainer = ({promptData, onUpdateSuccess}) => {
  return (
    <div>
      <UpdatedPromptContent promptData={promptData} onUpdateSuccess={onUpdateSuccess} updatePrompt={updatePrompt}/>
    </div>
  )
}

export default UpdatedPromptContainer
