"use client";
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const EngineBarChart = ({ data }) => {
  const engines = ["ChatGPT", "Gemini", "Claude", "Midjourney", "Stable Diffusion"];
  
  const chartData = engines.map(engine => {
    const filtered = data.filter(p => p.aiTool?.toLowerCase() === engine.toLowerCase());
    return {
      name: engine,
      Prompts: filtered.length,
      Copies: filtered.reduce((acc, curr) => acc + Number(curr.copyCount || 0), 0)
    }
  });

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#86707030" />
          <XAxis dataKey="name" stroke="#867070" fontSize={12} tickLine={false} />
          <YAxis stroke="#867070" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e1e2', color: '#403535' }} />
          <Legend verticalAlign="bottom" height={36} iconType="square" iconSize={10} wrapperStyle={{ fontSize: '12px' }} />
          
          <Bar dataKey="Copies" fill="#867070" name="Copies" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="Prompts" fill="#403535" name="Prompts" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EngineBarChart
