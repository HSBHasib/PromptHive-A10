import AllUsersContent from '@/components/dashboard/admin/allUser/AllUsersContent'
import { getUserSession } from '@/lib/core/session'
import React from 'react'

const AllUsers = async () => {
  const user = await getUserSession()
  return (
    <div>
      <AllUsersContent user={user} />
    </div>
  )
}

export default AllUsers

