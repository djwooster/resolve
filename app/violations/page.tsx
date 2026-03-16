'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Topbar } from '@/components/layout/topbar';
import { useResolveData } from '@/lib/use-resolve-data';
import { cn, getSeverityBadge } from '@/lib/utils';
import { Phone, CheckCircle, ArrowUpRight, Clock } from 'lucide-react';
import type { Violation } from '@/lib/types';

function ViolationCard({ violation }: { violation: Violation }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-xl border bg-[#111113] overflow-hidden card-hover',
        violation.severity === 'CRITICAL' ? 'border-red-500/30' : 'border-amber-500/30',
        violation.severity === 'CRITICAL' ? 'critical-glow' : 'warning-glow'
      )}
    >
      {/* Top bar accent */}
      <div className={cn(
        'h-1 w-full',
        violation.severity === 'CRITICAL' ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-amber-600 to-amber-400'
      )} />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{violation.ruleIcon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-xs font-bold px-2 py-0.5 rounded border uppercase tracking-widest',
                    getSeverityBadge(violation.severity)
                  )}>
                    {violation.severity}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">— {violation.ruleName}</span>
                  {violation.escalated && (
                    <span className="text-xs font-bold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded border border-orange-400/30">
                      ↑ ESCALATED
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Detected {violation.elapsed}
                </p>
              </div>
            </div>

            {/* Lead info */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg bg-[#0D0D0F] border border-[#1E1E22] p-3">
                <p className="text-xs text-zinc-500 mb-1">Lead</p>
                <p className="text-sm font-bold text-white">{violation.leadName}</p>
                <p className="text-xs text-zinc-400">{violation.leadPhone}</p>
              </div>
              <div className="rounded-lg bg-[#0D0D0F] border border-[#1E1E22] p-3">
                <p className="text-xs text-zinc-500 mb-1">Source</p>
                <p className="text-sm font-bold text-white">{violation.leadSource}</p>
                <p className="text-xs text-zinc-400">{violation.location}</p>
              </div>
            </div>

            {/* Enforcement details */}
            <div className="rounded-lg bg-[#0D0D0F] border border-[#1A1A1E] p-4 mb-4">
              <div className="mb-2">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Revenue Impact</p>
                <p className="text-sm text-zinc-300">{violation.revenueImpact}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Enforcement</p>
                <p className="text-sm font-semibold text-white">{violation.enforcement}</p>
              </div>
            </div>

            {/* Resolve Status */}
            <div className="flex items-center justify-between">
              <span className={cn(
                'text-xs font-bold uppercase tracking-widest px-3 py-1 rounded border',
                violation.severity === 'CRITICAL'
                  ? 'text-red-400 bg-red-400/10 border-red-400/30'
                  : 'text-amber-400 bg-amber-400/10 border-amber-400/30'
              )}>
                Resolve Status: {violation.status}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 shrink-0 min-w-[140px]">
            <button className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-white text-black text-sm font-bold hover:bg-zinc-100 transition-colors">
              <Phone className="w-4 h-4" />
              Call Lead
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#1A1A1E] border border-[#2a2a2e] text-zinc-300 text-sm font-semibold hover:bg-[#222226] hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
              Escalate
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/20 transition-colors">
              <CheckCircle className="w-4 h-4" />
              Handled
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ViolationsPage() {
  const [filter, setFilter] = useState<'all' | 'CRITICAL' | 'WARNING'>('all');
  const { violations } = useResolveData();

  const filtered = violations.filter(v =>
    !v.resolved && (filter === 'all' || v.severity === filter)
  );

  const criticalCount = violations.filter(v => !v.resolved && v.severity === 'CRITICAL').length;
  const warningCount = violations.filter(v => !v.resolved && v.severity === 'WARNING').length;

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Violations" subtitle="Active enforcement violations requiring action" />
      <div className="flex-1 p-8">
        {/* Filter tabs */}
        <div className="flex items-center gap-3 mb-6">
          {[
            { key: 'all', label: `All (${criticalCount + warningCount})` },
            { key: 'CRITICAL', label: `Critical (${criticalCount})` },
            { key: 'WARNING', label: `Warning (${warningCount})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as 'all' | 'CRITICAL' | 'WARNING')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-semibold transition-colors border',
                filter === tab.key
                  ? 'bg-white/10 text-white border-white/20'
                  : 'text-zinc-400 border-[#1E1E22] hover:text-white hover:border-zinc-600'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Violations Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(violation => (
              <ViolationCard key={violation.id} violation={violation} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Active Violations</h3>
            <p className="text-zinc-500 text-sm">All leads are within enforcement standards.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
