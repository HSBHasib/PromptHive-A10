"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const CopiesChart = ({ data }) => {
  const hasAnalytics = data && data.length > 0;

  if (!hasAnalytics) {
    return (
      <div className="h-64 w-full flex flex-col items-center justify-center text-sm font-semibold text-[#86707080] bg-white/40 rounded-2xl border border-dashed border-[#86707030] p-6 text-center">
        <p>No copies or bookmarks recorded yet for your templates.</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#86707030" />
          <XAxis dataKey="title" stroke="#867070" fontSize={12} tickLine={false} />
          <YAxis stroke="#867070" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e1e2', color: '#403535' }} 
          />
          <Legend verticalAlign="bottom" height={36} iconType="square" iconSize={10} wrapperStyle={{ fontSize: '12px' }} />
          
          <Bar dataKey="copyCount" name="Copies" fill="#867070" radius={[4, 4, 0, 0]} barSize={16} />
          
          <Bar dataKey="bookMark" name="Bookmarks" fill="#D4A373" radius={[4, 4, 0, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CopiesChart;

