'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: string;
  variant?: 'default' | 'critical' | 'warning' | 'success';
  className?: string;
}

export function MetricCard({
  label,
  value,
  subValue,
  trend,
  trendValue,
  icon,
  variant = 'default',
  className,
}: MetricCardProps) {
  const variantStyles = {
    default: 'border-[#1E1E22]',
    critical: 'border-red-500/30 bg-red-500/5 critical-glow',
    warning: 'border-amber-500/30 bg-amber-500/5 warning-glow',
    success: 'border-emerald-500/30 bg-emerald-500/5',
  };

  const valueStyles = {
    default: 'text-white',
    critical: 'text-red-400',
    warning: 'text-amber-400',
    success: 'text-emerald-400',
  };

  return (
    <motion.div
      className={cn(
        'rounded-xl border bg-[#111113] p-6 card-hover',
        variantStyles[variant],
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-zinc-400">{label}</p>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className={cn('text-4xl font-bold tracking-tight', valueStyles[variant])}>
        {value}
      </div>
      {(subValue || trendValue) && (
        <div className="mt-2 flex items-center gap-2">
          {subValue && <p className="text-sm text-zinc-500">{subValue}</p>}
          {trendValue && (
            <span className={cn(
              'text-xs font-semibold px-1.5 py-0.5 rounded',
              trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' :
              trend === 'down' ? 'text-red-400 bg-red-400/10' :
              'text-zinc-400 bg-zinc-400/10'
            )}>
              {trendValue}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
