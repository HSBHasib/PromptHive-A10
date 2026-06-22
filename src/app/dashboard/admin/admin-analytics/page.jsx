import AdminAnalyticsContent from "@/components/dashboard/admin/analytics/AdminAnalyticsContent";
import { getPrompts } from "@/lib/api/prompts";
import { getReviews } from "@/lib/api/reviews";
import { getSubcriptions } from "@/lib/api/subcriptions";
import { getUsers } from "@/lib/api/users";
import React from "react";

const AdminAnalytics = async () => {
  // Prompts Data
  const {
    total: totalPrompts,
    totalCopies,
    data: allPrompts,
  } = await getPrompts();

  // Review Data
  const { totalReview: totalReviews } = await getReviews();

  // Total Users
  const { total: totalUsers } = await getUsers();

  // Total Revenue
  const subcriptions = await getSubcriptions();
  const totalRevenue = subcriptions.reduce((acc, curr) => {
    return acc + (Number(curr.amountCharged) || 0);
  }, 0);

  return (
    <div>
      <AdminAnalyticsContent
        stats={{
          totalUsers,
          totalPrompts,
          totalReviews,
          totalCopies,
          totalRevenue,
        }}
        promptsData={allPrompts || []}
      />
    </div>
  );
};

export default AdminAnalytics;
