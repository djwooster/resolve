'use client';

import { motion } from 'framer-motion';
import { RULES } from '@/lib/mock-data';
import { cn, getSeverityBadge } from '@/lib/utils';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Violation } from '@/lib/types';

interface RulesSummaryProps {
  violations?: Violation[];
}

export function RulesSummary({ violations = [] }: RulesSummaryProps) {
  // Count live violations per rule, fall back to mock counts if empty
  const liveCountByRuleId = violations.reduce<Record<string, number>>((acc, v) => {
    acc[v.ruleId] = (acc[v.ruleId] ?? 0) + 1;
    return acc;
  }, {});

  const activeRules = RULES.map(r => ({
    ...r,
    violationCount: violations.length > 0 ? (liveCountByRuleId[r.id] ?? 0) : r.violationCount,
  })).filter(r => r.enabled && r.violationCount > 0).slice(0, 6);

  return (
    <div className="rounded-xl border border-[#1E1E22] bg-[#111113] overflow-hidden">
      <div className="px-6 py-5 border-b border-[#1E1E22] flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white">Rules Firing</h3>
          <p className="text-xs text-zinc-500 mt-0.5">Active enforcement rules</p>
        </div>
        <Link href="/rules" className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
          Manage <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="p-4 space-y-2">
        {activeRules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#0D0D0F] border border-[#1E1E22] hover:border-zinc-700 transition-colors cursor-pointer"
          >
            <span className="text-lg shrink-0">{rule.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{rule.name}</p>
              <p className="text-xs text-zinc-500 truncate">{rule.threshold}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={cn(
                'text-xs font-bold px-2 py-1 rounded border uppercase',
                getSeverityBadge(rule.severity)
              )}>
                {rule.violationCount}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
