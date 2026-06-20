import AdminAnalyticsContent from '@/components/dashboard/admin/analytics/AdminAnalyticsContent'
import { getPrompts } from '@/lib/api/prompts'
import React from 'react'

const AdminAnalytics = async () => {
  const { total: totalPrompts, totalCopies, data: allPrompts } = await getPrompts();
  
  const totalUsers = 19; 
  const totalReviews = 8; 
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
