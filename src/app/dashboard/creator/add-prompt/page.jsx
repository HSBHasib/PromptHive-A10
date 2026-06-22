import AddPromptContent from '@/components/dashboard/user/addPromptContent/AddPromptContent'
import { getPlan } from '@/lib/api/plans';
import { getPrompts } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session'
import React from 'react'

const AddPromptPage = async () => {
  const user = await getUserSession();
  const plan = await getPlan(user?.plan);
  const { total } = await getPrompts(`userId=${user?.id}`);

  return (
    <div>
      <AddPromptContent user={user} planArr={plan} currentPrompts={total || 0} />
    </div>
  )
}

export default AddPromptPage
