import React from 'react'
import ProfileContent from '@/components/dashboard/profileContent/ProfileContent'
import { getUserSession } from '@/lib/core/session'
import { getPrompts } from '@/lib/api/prompts'

const CreatorProfilePage = async () => {
  const user = await getUserSession()
  const { data } = await getPrompts(`userId=${user?.id}`);
  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className="text-2xl font-bold text-[#867070] mb-1">
        Creator Profile
      </h1>
      <p className="text-sm text-[#917C7C] mb-6">
        Manage your plan, credentials, and published prompt details.
      </p>
      <ProfileContent user={user} prompts={data} />
    </div>
  )
}

export default CreatorProfilePage
