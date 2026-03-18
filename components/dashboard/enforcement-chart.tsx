'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { LEAD_FLOW_DATA, BOOKINGS_DATA } from '@/lib/mock-data';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0D0D0F] border border-white/[0.08] rounded-lg px-3 py-2">
        <p className="text-xs text-zinc-500 mb-1">{label}</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-xs font-semibold" style={{ color: entry.color }}>
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
    <div className="rounded-xl border border-white/[0.06] bg-[#0D0D0F] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-0.5">Performance Overview</p>
          <p className="text-sm font-semibold text-white">7-day rolling window</p>
        </div>
        <div className="flex gap-0.5 bg-[#0A0A0B] rounded-lg p-1 border border-white/[0.06]">
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'flow' ? 'bg-white/[0.08] text-white' : 'text-zinc-600 hover:text-zinc-300'
            }`}
          >
            Lead Flow
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'bookings' ? 'bg-white/[0.08] text-white' : 'text-zinc-600 hover:text-zinc-300'
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
                <stop offset="5%" stopColor="rgba(255,255,255,0.15)" stopOpacity={1} />
                <stop offset="95%" stopColor="rgba(255,255,255,0)" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="violationsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(239,68,68,0.2)" stopOpacity={1} />
                <stop offset="95%" stopColor="rgba(239,68,68,0)" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="name" tick={{ fill: '#52525b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#52525b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="leads" name="Leads" stroke="rgba(255,255,255,0.3)" fill="url(#leadsGradient)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="violations" name="Violations" stroke="rgba(239,68,68,0.7)" fill="url(#violationsGradient)" strokeWidth={1.5} />
          </AreaChart>
        ) : (
          <BarChart data={BOOKINGS_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="name" tick={{ fill: '#52525b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#52525b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="bookings" name="Bookings" fill="rgba(16,185,129,0.7)" radius={[3, 3, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
