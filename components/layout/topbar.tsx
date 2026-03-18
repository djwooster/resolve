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
    <header className="h-14 border-b border-white/[0.06] flex items-center justify-between px-8 bg-[#0A0A0B] sticky top-0 z-40">
      <div className="flex items-baseline gap-3">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-zinc-600">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border border-white/[0.06] rounded-lg px-3 py-1.5">
          <span className="text-xs text-zinc-600">Revenue at Risk</span>
          <span className="text-xs font-semibold text-red-400 tabular-nums">{formatCurrency(DASHBOARD_METRICS.revenueAtRisk)}</span>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-zinc-600 hover:text-zinc-300 transition-colors" aria-label="Refresh">
          <RefreshCw className="w-4 h-4" />
        </button>
        <button className="relative p-1.5 rounded-lg hover:bg-white/[0.05] text-zinc-600 hover:text-zinc-300 transition-colors" aria-label="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}
