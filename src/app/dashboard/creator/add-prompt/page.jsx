import AddPromptContent from '@/components/dashboard/user/addPromptContent/AddPromptContent'
import { getUserSession } from '@/lib/core/session'
import React from 'react'

const AddPromptPage = async () => {
  const user = await getUserSession();
  return (
    <div>
      <AddPromptContent user={user} />
    </div>
  )
}

export default AddPromptPage
