'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Topbar } from '@/components/layout/topbar';
import { useResolveData } from '@/lib/use-resolve-data';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock } from 'lucide-react';
import { CallButton } from '@/components/call/call-button';
import type { Violation } from '@/lib/types';

function ViolationCard({ violation }: { violation: Violation }) {
  const isCritical = violation.severity === 'CRITICAL';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-xl border border-white/[0.06] bg-[#0D0D0F] overflow-hidden',
        isCritical ? 'border-l-2 border-l-red-500/60' : 'border-l-2 border-l-amber-500/60'
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', isCritical ? 'bg-red-500' : 'bg-amber-500')} />
                <span className={cn('text-xs font-medium uppercase tracking-widest', isCritical ? 'text-red-400' : 'text-amber-400')}>
                  {violation.severity}
                </span>
                <span className="text-zinc-600 text-xs">·</span>
                <span className="text-xs text-zinc-500">{violation.ruleName}</span>
                {violation.escalated && <span className="text-xs font-medium text-blue-400">· Escalated</span>}
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-600 shrink-0">
                <Clock className="w-3 h-3" />
                <span>{violation.elapsed}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="rounded-lg bg-[#0A0A0B] border border-white/[0.06] p-3">
                <p className="text-xs text-zinc-600 mb-1">Lead</p>
                <p className="text-sm font-medium text-white">{violation.leadName}</p>
                <p className="text-xs text-zinc-500">{violation.leadPhone}</p>
              </div>
              <div className="rounded-lg bg-[#0A0A0B] border border-white/[0.06] p-3">
                <p className="text-xs text-zinc-600 mb-1">Source</p>
                <p className="text-sm font-medium text-white">{violation.leadSource}</p>
                <p className="text-xs text-zinc-500">{violation.location}</p>
              </div>
            </div>
            <div className="rounded-lg bg-[#0A0A0B] border border-white/[0.06] p-4 mb-4">
              <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1">Revenue Impact</p>
              <p className="text-sm text-zinc-300">{violation.revenueImpact}</p>
            </div>
            <span className={cn('text-xs font-medium uppercase tracking-widest', isCritical ? 'text-red-400' : 'text-amber-400')}>
              {violation.status}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-5 pt-5 border-t border-white/[0.06]">
          <CallButton phone={violation.leadPhone} contactName={violation.leadName} contactSource={violation.leadSource} variant="primary" size="md" className="flex-1 justify-center" />
<button className="flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-400 text-xs font-medium hover:bg-emerald-500/[0.08] transition-colors">
            <CheckCircle className="w-3.5 h-3.5" /> Mark as Resolved
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ViolationsPage() {
  const [filter, setFilter] = useState<'all' | 'CRITICAL' | 'WARNING'>('all');
  const { violations } = useResolveData();
  const filtered = violations.filter(v => !v.resolved && (filter === 'all' || v.severity === filter));
  const criticalCount = violations.filter(v => !v.resolved && v.severity === 'CRITICAL').length;
  const warningCount = violations.filter(v => !v.resolved && v.severity === 'WARNING').length;

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Violations" subtitle="Active enforcement violations requiring action" />
      <div className="flex-1 p-8">
        <div className="flex items-center gap-2 mb-6">
          {[
            { key: 'all', label: `All (${criticalCount + warningCount})` },
            { key: 'CRITICAL', label: `Critical (${criticalCount})` },
            { key: 'WARNING', label: `Warning (${warningCount})` },
          ].map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key as 'all' | 'CRITICAL' | 'WARNING')}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border',
                filter === tab.key ? 'bg-white/[0.08] text-white border-white/[0.1]' : 'text-zinc-500 border-white/[0.06] hover:text-zinc-200'
              )}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(violation => <ViolationCard key={violation.id} violation={violation} />)}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-white mb-1">No Active Violations</p>
            <p className="text-xs text-zinc-600">All leads are within enforcement standards.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
