'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
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
    <div className="rounded-xl border border-white/[0.06] bg-[#0D0D0F] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-0.5">Active Violations</p>
          <p className="text-sm font-semibold text-white">Real-time enforcement feed</p>
        </div>
        <Link href="/violations" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {activeViolations.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-zinc-600 text-sm">No active violations — all leads within SLA.</p>
        </div>
      )}

      <div className="divide-y divide-white/[0.04]">
        <AnimatePresence>
          {activeViolations.map((violation, index) => (
            <motion.div
              key={violation.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'px-6 py-4 hover:bg-white/[0.02] transition-colors',
                violation.severity === 'CRITICAL'
                  ? 'border-l-2 border-l-red-500/60'
                  : 'border-l-2 border-l-amber-500/60'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      'w-1.5 h-1.5 rounded-full shrink-0',
                      violation.severity === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-500'
                    )} />
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                      {violation.severity}
                    </span>
                    <span className="text-xs text-zinc-600">·</span>
                    <span className="text-xs text-zinc-600">{violation.elapsed}</span>
                    {violation.escalated && (
                      <span className="text-xs text-blue-400 font-medium">Escalated</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-white truncate">{violation.ruleName}</p>
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">
                    {violation.leadName} · {violation.leadSource}
                  </p>
                </div>
                <div className="shrink-0">
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
