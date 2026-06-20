import React from 'react'

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white/40 border border-[#867070]/20 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
      <div className="p-3 bg-[#867070]/10 text-[#867070] rounded-xl text-xl">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-[#867070]/80">{title}</p>
        <p className="text-xl font-bold text-[#403535] mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export default StatsCard
