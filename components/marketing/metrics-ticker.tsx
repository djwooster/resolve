'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatProps {
  value: string;
  label: string;
}

function AnimatedStat({ value, label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/^(\d+(?:\.\d+)?)/);
    if (!numericMatch) {
      const timer = setTimeout(() => setDisplayed(value), 200);
      return () => clearTimeout(timer);
    }

    const target = parseFloat(numericMatch[1]);
    const suffix = value.slice(numericMatch[0].length);
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayed(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 px-8 py-12">
      <span className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-white tracking-tighter tabular-nums">
        {isInView ? displayed : '0'}
      </span>
      <p className="text-xs text-zinc-500 text-center max-w-[180px] leading-snug">{label}</p>
    </div>
  );
}

export function MetricsTicker() {
  const STATS = [
    { value: '100×', label: 'More likely to convert if contacted in the first 5 minutes' },
    { value: '78%', label: 'Of deals go to the first responder' },
    { value: '$1.6T', label: 'Lost annually to poor lead follow-up' },
  ];

  return (
    <section className="border-t border-b border-white/[0.04] bg-[#0D0D0F]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.04]">
          {STATS.map((stat) => (
            <AnimatedStat key={stat.value} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
