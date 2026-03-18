'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  variant?: 'default' | 'critical' | 'warning' | 'success';
  href?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  subValue,
  variant = 'default',
  href,
  className,
}: MetricCardProps) {
  const borderAccent = {
    default: '',
    critical: 'border-l-2 border-l-red-500/60',
    warning: 'border-l-2 border-l-amber-500/60',
    success: 'border-l-2 border-l-emerald-500/60',
  };

  const valueColor = {
    default: 'text-white',
    critical: 'text-red-400',
    warning: 'text-amber-400',
    success: 'text-emerald-400',
  };

  return (
    <motion.div
      className={cn(
        'rounded-xl border border-white/[0.06] bg-[#0D0D0F] p-5',
        borderAccent[variant],
        className
      )}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">{label}</p>
        {href && (
          <Link href={href} className="text-zinc-600 hover:text-zinc-300 transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
      <div className={cn('text-3xl font-semibold tracking-tight', valueColor[variant])}>
        {value}
      </div>
      {subValue && (
        <p className="text-xs text-zinc-600 mt-2">{subValue}</p>
      )}
    </motion.div>
  );
}
