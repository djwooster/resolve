'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Topbar } from '@/components/layout/topbar';
import { RULES } from '@/lib/mock-data';
import { cn, getSeverityBadge } from '@/lib/utils';

export default function RulesPage() {
  const [rules, setRules] = useState(RULES);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const criticalRules = rules.filter(r => r.severity === 'CRITICAL');
  const warningRules = rules.filter(r => r.severity === 'WARNING');

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Rules Engine" subtitle="Configure enforcement rules and thresholds" />
      <div className="flex-1 p-8">
        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Rules', value: rules.length, icon: '📋' },
            { label: 'Active Rules', value: rules.filter(r => r.enabled).length, icon: '✅' },
            { label: 'Total Violations Today', value: rules.reduce((acc, r) => acc + r.violationCount, 0), icon: '🚨' },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl border border-[#1E1E22] bg-[#111113] px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm font-medium">{stat.label}</span>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* CRITICAL Rules */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-4 rounded-full bg-red-500 inline-block" />
            <h2 className="text-lg font-bold text-white">Critical Rules</h2>
            <span className="text-xs text-zinc-500">— Immediate enforcement triggers</span>
          </div>
          <div className="space-y-3">
            {criticalRules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={cn(
                  'rounded-xl border bg-[#111113] p-5 flex items-center gap-5',
                  rule.enabled ? 'border-red-500/20' : 'border-[#1E1E22] opacity-50'
                )}
              >
                <span className="text-2xl shrink-0">{rule.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-base font-bold text-white">Rule {rule.number} — {rule.name}</p>
                    <span className={cn('text-xs font-bold px-2 py-0.5 rounded border uppercase', getSeverityBadge(rule.severity))}>
                      {rule.severity}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">{rule.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-zinc-500 font-medium">
                      Threshold: <span className="text-zinc-300 font-semibold">{rule.threshold}</span>
                    </span>
                    <span className={cn(
                      'text-xs font-semibold',
                      rule.violationCount > 0 ? 'text-red-400' : 'text-emerald-400'
                    )}>
                      {rule.violationCount} violation{rule.violationCount !== 1 ? 's' : ''} today
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 mb-1">Status</p>
                    <span className={cn(
                      'text-xs font-bold px-2 py-1 rounded border uppercase tracking-wide',
                      rule.enabled ? 'text-red-400 bg-red-400/10 border-red-400/20' : 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20'
                    )}>
                      {rule.enabled ? rule.status : 'DISABLED'}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={cn(
                      'relative w-12 h-6 rounded-full transition-colors border-2',
                      rule.enabled
                        ? 'bg-red-500/30 border-red-500/50'
                        : 'bg-zinc-700/30 border-zinc-600/50'
                    )}
                  >
                    <motion.div
                      className={cn(
                        'absolute top-0.5 w-4 h-4 rounded-full shadow-md',
                        rule.enabled ? 'bg-red-400' : 'bg-zinc-500'
                      )}
                      animate={{ left: rule.enabled ? '26px' : '2px' }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* WARNING Rules */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-4 rounded-full bg-amber-500 inline-block" />
            <h2 className="text-lg font-bold text-white">Warning Rules</h2>
            <span className="text-xs text-zinc-500">— Active monitoring triggers</span>
          </div>
          <div className="space-y-3">
            {warningRules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={cn(
                  'rounded-xl border bg-[#111113] p-5 flex items-center gap-5',
                  rule.enabled ? 'border-amber-500/20' : 'border-[#1E1E22] opacity-50'
                )}
              >
                <span className="text-2xl shrink-0">{rule.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-base font-bold text-white">Rule {rule.number} — {rule.name}</p>
                    <span className={cn('text-xs font-bold px-2 py-0.5 rounded border uppercase', getSeverityBadge(rule.severity))}>
                      {rule.severity}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">{rule.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-zinc-500 font-medium">
                      Threshold: <span className="text-zinc-300 font-semibold">{rule.threshold}</span>
                    </span>
                    <span className={cn(
                      'text-xs font-semibold',
                      rule.violationCount > 0 ? 'text-amber-400' : 'text-emerald-400'
                    )}>
                      {rule.violationCount} violation{rule.violationCount !== 1 ? 's' : ''} today
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 mb-1">Status</p>
                    <span className={cn(
                      'text-xs font-bold px-2 py-1 rounded border uppercase tracking-wide',
                      rule.enabled ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' : 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20'
                    )}>
                      {rule.enabled ? rule.status : 'DISABLED'}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={cn(
                      'relative w-12 h-6 rounded-full transition-colors border-2',
                      rule.enabled
                        ? 'bg-amber-500/30 border-amber-500/50'
                        : 'bg-zinc-700/30 border-zinc-600/50'
                    )}
                  >
                    <motion.div
                      className={cn(
                        'absolute top-0.5 w-4 h-4 rounded-full shadow-md',
                        rule.enabled ? 'bg-amber-400' : 'bg-zinc-500'
                      )}
                      animate={{ left: rule.enabled ? '26px' : '2px' }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
