'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { LEAD_FLOW_DATA, BOOKINGS_DATA } from '@/lib/mock-data';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1E] border border-[#2a2a2e] rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs font-semibold text-zinc-400 mb-1">{label}</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function EnforcementChart() {
  const [activeTab, setActiveTab] = useState<'flow' | 'bookings'>('flow');

  return (
    <div className="rounded-xl border border-[#1E1E22] bg-[#111113] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-white">Performance Overview</h3>
          <p className="text-xs text-zinc-500 mt-0.5">7-day rolling window</p>
        </div>
        <div className="flex gap-1 bg-[#0D0D0F] rounded-lg p-1 border border-[#1E1E22]">
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'flow' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Lead Flow
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'bookings' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Bookings
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        {activeTab === 'flow' ? (
          <AreaChart data={LEAD_FLOW_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="violationsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF2D2D" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF2D2D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E22" />
            <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="leads" name="Leads" stroke="#6366F1" fill="url(#leadsGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="violations" name="Violations" stroke="#FF2D2D" fill="url(#violationsGradient)" strokeWidth={2} />
          </AreaChart>
        ) : (
          <BarChart data={BOOKINGS_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E22" />
            <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="bookings" name="Bookings" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
