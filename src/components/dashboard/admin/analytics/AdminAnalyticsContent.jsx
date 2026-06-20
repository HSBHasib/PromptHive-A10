import React from 'react'
import StatsCard from './StatsCard'
import EngineBarChart from './EngineBarChart'
import DistributionPieChart from './DistributionPieChart'
import { HiOutlineUsers, HiOutlineDocumentText, HiOutlineChatBubbleLeftRight, HiOutlineDocumentDuplicate, HiOutlineCurrencyDollar } from 'react-icons/hi2'

const AdminAnalyticsContent = ({ stats, promptsData }) => {
  return (
    <div className="bg-transparent space-y-6 w-full max-w-[1600px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatsCard title="Total Users" value={stats.totalUsers} icon={<HiOutlineUsers />} />
        <StatsCard title="Total Prompts" value={stats.totalPrompts} icon={<HiOutlineDocumentText />} />
        <StatsCard title="Total Reviews" value={stats.totalReviews} icon={<HiOutlineChatBubbleLeftRight />} />
        <StatsCard title="Total Copies" value={stats.totalCopies} icon={<HiOutlineDocumentDuplicate />} />
        <StatsCard title="Total Revenue" value={`$${stats.totalRevenue?.toFixed(2)}`} icon={<HiOutlineCurrencyDollar />} />
      </div>

      {/* 🎯 Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Engine Density Bar Chart */}
        <div className="p-6 bg-white/40 border border-[#867070]/20 rounded-2xl shadow-sm">
          <h2 className="text-lg font-bold text-[#403535] mb-6 flex items-center gap-2">
            AI Prompts Density vs Total Copies
          </h2>
          <EngineBarChart data={promptsData} />
        </div>

        {/* Right Side: Distribution Pie Chart */}
        <div className="p-6 bg-white/40 border border-[#867070]/20 rounded-2xl shadow-sm">
          <h2 className="text-lg font-bold text-[#403535] mb-6 flex items-center gap-2">
            Prompt Distribution Share
          </h2>
          <DistributionPieChart data={promptsData} />
        </div>
      </div>
    </div>
  )
}

export default AdminAnalyticsContent
