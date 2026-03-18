'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Topbar } from '@/components/layout/topbar';
import { useResolveData } from '@/lib/use-resolve-data';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { CallButton } from '@/components/call/call-button';
import { format } from 'date-fns';
import type { LeadStage } from '@/lib/types';

const STAGE_COLORS: Record<LeadStage, string> = {
  'New': 'text-white border-white/[0.12]',
  'Contacted': 'text-zinc-300 border-white/[0.08]',
  'Qualified': 'text-zinc-300 border-white/[0.08]',
  'Appointment Set': 'text-amber-400 border-amber-500/20',
  'Appointment Confirmed': 'text-emerald-400 border-emerald-500/20',
  'No Show': 'text-red-400 border-red-500/20',
  'Won': 'text-emerald-400 border-emerald-500/20',
  'Lost': 'text-zinc-600 border-white/[0.06]',
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function LeadsPage() {
  const [stageFilter, setStageFilter] = useState<string>('all');
  const { leads } = useResolveData();
  const stages = ['all', ...Array.from(new Set(leads.map(l => l.stage)))];
  const filtered = stageFilter === 'all' ? leads : leads.filter(l => l.stage === stageFilter);

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Lead Pipeline" subtitle="All monitored leads with enforcement status" />
      <div className="flex-1 p-8">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {stages.map(stage => (
            <button key={stage} onClick={() => setStageFilter(stage)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border capitalize',
                stageFilter === stage ? 'bg-white/[0.08] text-white border-white/[0.1]' : 'text-zinc-500 border-white/[0.06] hover:text-zinc-200'
              )}>
              {stage === 'all' ? `All (${leads.length})` : stage}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-[#0D0D0F] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['Lead', 'Stage', 'Source', 'Day #', 'Attempts', 'Last Contact', 'Value', 'Violations', 'Action'].map(col => (
                    <th key={col} className="px-4 py-3 text-left text-xs font-medium text-zinc-600 uppercase tracking-widest">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((lead, index) => (
                  <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.02 }}
                    className={cn('hover:bg-white/[0.02] transition-colors', lead.violations.length > 0 ? 'border-l-2 border-l-red-500/40' : '')}>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-zinc-600">{lead.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('text-xs font-medium px-2 py-0.5 rounded border', STAGE_COLORS[lead.stage])}>
                        {lead.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3"><p className="text-sm text-zinc-400">{lead.source}</p></td>
                    <td className="px-4 py-3"><span className="text-sm text-zinc-400">Day {lead.dayNumber}</span></td>
                    <td className="px-4 py-3">
                      <span className={cn('text-sm font-medium', lead.contactAttempts === 0 ? 'text-red-400' : 'text-zinc-300')}>
                        {lead.contactAttempts}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-zinc-500">
                        {lead.lastContact ? format(lead.lastContact, 'MMM d, h:mm a') : <span className="text-red-400 font-medium">Never</span>}
                      </p>
                    </td>
                    <td className="px-4 py-3"><p className="text-sm font-medium text-white">{formatCurrency(lead.value)}</p></td>
                    <td className="px-4 py-3">
                      {lead.violations.length > 0 ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-red-400">
                          <AlertTriangle className="w-3 h-3" />{lead.violations.length}
                        </span>
                      ) : (
                        <span className="text-xs text-emerald-400 font-medium">Clean</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <CallButton phone={lead.phone} contactName={lead.name} contactSource={lead.source} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
