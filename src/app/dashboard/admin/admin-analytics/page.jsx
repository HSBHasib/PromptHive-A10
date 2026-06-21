import AdminAnalyticsContent from '@/components/dashboard/admin/analytics/AdminAnalyticsContent'
import { getPrompts } from '@/lib/api/prompts'
import { getReviews } from '@/lib/api/reviews';
import { getUsers } from '@/lib/api/users';
import React from 'react'

const AdminAnalytics = async () => {
  const { total: totalPrompts, totalCopies, data: allPrompts } = await getPrompts();
  const {totalReview: totalReviews}  = await getReviews();
  const {total: totalUsers} = await getUsers();
  
  const totalRevenue = 45.00;

  return (
    <div>
      <AdminAnalyticsContent 
        stats={{ totalUsers, totalPrompts, totalReviews, totalCopies, totalRevenue }} 
        promptsData={allPrompts || []}
      />
    </div>
  )
}

export default AdminAnalytics
