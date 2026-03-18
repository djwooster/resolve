'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Topbar } from '@/components/layout/topbar';
import { RULES } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function RulesPage() {
  const [rules, setRules] = useState(RULES);
  const toggleRule = (id: string) => setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  const criticalRules = rules.filter(r => r.severity === 'CRITICAL');
  const warningRules = rules.filter(r => r.severity === 'WARNING');

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Rules Engine" subtitle="Configure enforcement rules and thresholds" />
      <div className="flex-1 p-8">

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Total Rules', value: rules.length },
            { label: 'Active Rules', value: rules.filter(r => r.enabled).length },
            { label: 'Violations Today', value: rules.reduce((acc, r) => acc + r.violationCount, 0) },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-[#0D0D0F] px-5 py-4">
              <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-2">{stat.label}</p>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {[
          { label: 'Critical Rules', sublabel: 'Immediate enforcement triggers', color: 'bg-red-500', rules: criticalRules },
          { label: 'Warning Rules', sublabel: 'Active monitoring triggers', color: 'bg-amber-500', rules: warningRules },
        ].map(section => (
          <div key={section.label} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-1.5 h-4 rounded-full ${section.color} inline-block`} />
              <p className="text-sm font-semibold text-white">{section.label}</p>
              <span className="text-xs text-zinc-600">— {section.sublabel}</span>
            </div>
            <div className="space-y-2">
              {section.rules.map((rule, index) => (
                <motion.div key={rule.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}
                  className={cn('rounded-xl border bg-[#0D0D0F] p-5 flex items-center gap-5', rule.enabled ? 'border-white/[0.08]' : 'border-white/[0.04] opacity-50')}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-white">Rule {rule.number} — {rule.name}</p>
                    </div>
                    <p className="text-xs text-zinc-500">{rule.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-zinc-600">
                        Threshold: <span className="text-zinc-400">{rule.threshold}</span>
                      </span>
                      <span className={cn('text-xs font-medium', rule.violationCount > 0 ? (rule.severity === 'CRITICAL' ? 'text-red-400' : 'text-amber-400') : 'text-emerald-400')}>
                        {rule.violationCount} violation{rule.violationCount !== 1 ? 's' : ''} today
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className={cn('text-xs font-medium uppercase tracking-widest',
                      rule.enabled ? (rule.severity === 'CRITICAL' ? 'text-red-400' : 'text-amber-400') : 'text-zinc-600'
                    )}>
                      {rule.enabled ? rule.status : 'DISABLED'}
                    </span>
                    <button onClick={() => toggleRule(rule.id)}
                      className={cn('relative w-10 h-5 rounded-full transition-colors border',
                        rule.enabled ? 'bg-white/[0.1] border-white/[0.15]' : 'bg-white/[0.04] border-white/[0.08]'
                      )}>
                      <motion.div
                        className={cn('absolute top-0.5 w-3.5 h-3.5 rounded-full', rule.enabled ? 'bg-white' : 'bg-zinc-600')}
                        animate={{ left: rule.enabled ? '22px' : '2px' }}
                        transition={{ duration: 0.15 }}
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
