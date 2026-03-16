'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn, getSeverityBadge } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Violation } from '@/lib/types';
import { CallButton } from '@/components/call/call-button';

interface ViolationFeedProps {
  violations: Violation[];
}

export function ViolationFeed({ violations }: ViolationFeedProps) {
  const activeViolations = violations.filter(v => !v.resolved).slice(0, 5);

  return (
    <div className="rounded-xl border border-[#1E1E22] bg-[#111113] overflow-hidden">
      <div className="px-6 py-5 border-b border-[#1E1E22] flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white">Active Violations</h3>
          <p className="text-xs text-zinc-500 mt-0.5">Real-time enforcement feed</p>
        </div>
        <Link href="/violations" className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      {activeViolations.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-zinc-500 text-sm">No active violations — all leads within SLA.</p>
        </div>
      )}
      <div className="divide-y divide-[#1A1A1E]">
        <AnimatePresence>
          {activeViolations.map((violation, index) => (
            <motion.div
              key={violation.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'px-6 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer',
                violation.severity === 'CRITICAL' ? 'border-l-2 border-l-red-500' : 'border-l-2 border-l-amber-500'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{violation.ruleIcon}</span>
                    <span className={cn(
                      'text-xs font-bold px-2 py-0.5 rounded border uppercase tracking-wide',
                      getSeverityBadge(violation.severity)
                    )}>
                      {violation.severity}
                    </span>
                    <span className="text-xs text-zinc-500">{violation.elapsed}</span>
                    {violation.escalated && (
                      <span className="text-xs text-orange-400 font-semibold">↑ Escalated</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-white truncate">{violation.ruleName}</p>
                  <p className="text-sm text-zinc-400 mt-0.5 truncate">
                    {violation.leadName} · {violation.leadSource}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <CallButton
                    phone={violation.leadPhone}
                    contactName={violation.leadName}
                    contactSource={violation.leadSource}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
