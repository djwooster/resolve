'use client';

import { Bell, RefreshCw } from 'lucide-react';
import { DASHBOARD_METRICS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="h-16 border-b border-[#1E1E22] flex items-center justify-between px-8 bg-[#0A0A0B]/80 backdrop-blur-sm sticky top-0 z-40">
      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-500 bg-[#111113] border border-[#1E1E22] rounded-lg px-3 py-2">
          <span className="text-xs font-medium text-zinc-400">Revenue at Risk</span>
          <span className="font-bold text-red-400">{formatCurrency(DASHBOARD_METRICS.revenueAtRisk)}</span>
        </div>
        <button className="p-2 rounded-lg hover:bg-white/[0.05] text-zinc-400 hover:text-white transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-white/[0.05] text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}
