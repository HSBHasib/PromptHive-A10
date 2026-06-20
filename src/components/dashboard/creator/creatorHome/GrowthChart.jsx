"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const GrowthChart = ({ data }) => {
  const hasGrowthData = data && data.length > 0;

  if (!hasGrowthData) {
    return (
      <div className="h-64 w-full flex flex-col items-center justify-center text-sm font-semibold text-[#86707080] bg-white rounded-2xl border border-dashed border-[#86707030] p-6 text-center">
        <p>No growth metrics available. Start by creating your first prompt!</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#86707030" />
          <XAxis dataKey="title" stroke="#867070" fontSize={12} tickLine={false} />
          <YAxis stroke="#867070" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e1e2', color: '#403535' }} 
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
          
          <Area 
            type="monotone" 
            dataKey="copyCount" 
            name="Total Copies" 
            stroke="#403535" 
            fill="#403535" 
            fillOpacity={0.2} 
            strokeWidth={2}
          />
          
          <Area 
            type="monotone" 
            dataKey="bookMark" 
            name="Total Bookmarks" 
            stroke="#A5A58D" 
            fill="#A5A58D" 
            fillOpacity={0.15} 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;

