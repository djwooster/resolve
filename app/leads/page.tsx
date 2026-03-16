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
  'New': 'text-indigo-400 bg-indigo-400/10 border-indigo-400/30',
  'Contacted': 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  'Qualified': 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  'Appointment Set': 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  'Appointment Confirmed': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  'No Show': 'text-red-400 bg-red-400/10 border-red-400/30',
  'Won': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  'Lost': 'text-zinc-400 bg-zinc-400/10 border-zinc-400/30',
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
        {/* Stage filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {stages.map(stage => (
            <button
              key={stage}
              onClick={() => setStageFilter(stage)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border capitalize',
                stageFilter === stage
                  ? 'bg-white/10 text-white border-white/20'
                  : 'text-zinc-400 border-[#1E1E22] hover:text-white hover:border-zinc-600'
              )}
            >
              {stage === 'all' ? `All (${leads.length})` : stage}
            </button>
          ))}
        </div>

        {/* Leads table */}
        <div className="rounded-xl border border-[#1E1E22] bg-[#111113] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E1E22]">
                  {['Lead', 'Stage', 'Source', 'Day #', 'Attempts', 'Last Contact', 'Value', 'Violations', 'Action'].map(col => (
                    <th key={col} className="px-4 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1E]">
                {filtered.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className={cn(
                      'hover:bg-white/[0.02] transition-colors',
                      lead.violations.length > 0 ? 'border-l-2 border-l-red-500/50' : ''
                    )}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-bold text-white">{lead.name}</p>
                        <p className="text-xs text-zinc-500">{lead.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        'text-xs font-semibold px-2 py-1 rounded border',
                        STAGE_COLORS[lead.stage]
                      )}>
                        {lead.stage}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-zinc-300">{lead.source}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold text-zinc-300">Day {lead.dayNumber}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        'text-sm font-bold',
                        lead.contactAttempts === 0 ? 'text-red-400' : 'text-white'
                      )}>
                        {lead.contactAttempts}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-zinc-400">
                        {lead.lastContact
                          ? format(lead.lastContact, 'MMM d, h:mm a')
                          : <span className="text-red-400 font-semibold">Never</span>
                        }
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-bold text-white">{formatCurrency(lead.value)}</p>
                    </td>
                    <td className="px-4 py-4">
                      {lead.violations.length > 0 ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-red-400">
                          <AlertTriangle className="w-3 h-3" />
                          {lead.violations.length}
                        </span>
                      ) : (
                        <span className="text-xs text-emerald-400 font-semibold">Clean</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <CallButton
                        phone={lead.phone}
                        contactName={lead.name}
                        contactSource={lead.source}
                      />
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
