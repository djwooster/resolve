'use client';

import { motion } from 'framer-motion';
import { RULES } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Violation } from '@/lib/types';

interface RulesSummaryProps {
  violations?: Violation[];
}

export function RulesSummary({ violations = [] }: RulesSummaryProps) {
  const liveCountByRuleId = violations.reduce<Record<string, number>>((acc, v) => {
    acc[v.ruleId] = (acc[v.ruleId] ?? 0) + 1;
    return acc;
  }, {});

  const activeRules = RULES.map(r => ({
    ...r,
    violationCount: violations.length > 0 ? (liveCountByRuleId[r.id] ?? 0) : r.violationCount,
  })).filter(r => r.enabled && r.violationCount > 0).slice(0, 6);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0D0D0F] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-0.5">Rules Firing</p>
          <p className="text-sm font-semibold text-white">Active enforcement</p>
        </div>
        <Link href="/rules" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
          Manage <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="p-3 space-y-1">
        {activeRules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <span className={cn(
              'w-1.5 h-1.5 rounded-full shrink-0',
              rule.severity === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-500'
            )} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">{rule.name}</p>
              <p className="text-xs text-zinc-600 truncate">{rule.threshold}</p>
            </div>
            <span className={cn(
              'text-xs font-semibold tabular-nums shrink-0',
              rule.severity === 'CRITICAL' ? 'text-red-400' : 'text-amber-400'
            )}>
              {rule.violationCount}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
