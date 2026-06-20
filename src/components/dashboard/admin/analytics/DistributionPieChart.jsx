"use client";
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const DistributionPieChart = ({ data }) => {
  const engines = ["ChatGPT", "Claude", "Gemini", "Midjourney", "Stable Diffusion"];
  
  const BRAND_COLORS = ['#403535', '#867070', '#A28C8C', '#CBB4B4', '#E4D5D5'];

  const chartData = engines.map(engine => {
    return {
      name: engine,
      value: data.filter(p => p.aiTool?.toLowerCase() === engine.toLowerCase()).length
    }
  }).filter(item => item.value > 0);

  return (
    <div className="h-64 w-full flex flex-col justify-between">
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e1e2', color: '#403535' }} />
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={75}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-semibold text-[#635252]">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: BRAND_COLORS[index % BRAND_COLORS.length] }}></span>
            <span>{item.name} ({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DistributionPieChart
