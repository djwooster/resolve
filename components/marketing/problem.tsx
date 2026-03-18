'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { slideFromLeft, slideFromRight } from '@/lib/motion';

function formatDollars(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function CostCalculator() {
  const [leads, setLeads] = useState(200);
  const [dealValue, setDealValue] = useState(2500);
  const atRisk = Math.round(leads * 0.15 * dealValue);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0D0D0F] p-8">
      <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-6">Revenue at Risk Calculator</p>

      <div className="space-y-5 mb-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-zinc-400" htmlFor="leads-input">Monthly leads</label>
            <span className="text-sm font-bold text-white tabular-nums">{leads.toLocaleString()}</span>
          </div>
          <input
            id="leads-input"
            type="range"
            min={10}
            max={2000}
            step={10}
            value={leads}
            onChange={(e) => setLeads(Number(e.target.value))}
            className="w-full accent-white cursor-pointer"
          />
          <div className="flex justify-between text-xs text-zinc-700 mt-1">
            <span>10</span><span>2,000</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-zinc-400" htmlFor="deal-value-input">Average deal value</label>
            <span className="text-sm font-bold text-white tabular-nums">{formatDollars(dealValue)}</span>
          </div>
          <input
            id="deal-value-input"
            type="range"
            min={500}
            max={25000}
            step={500}
            value={dealValue}
            onChange={(e) => setDealValue(Number(e.target.value))}
            className="w-full accent-white cursor-pointer"
          />
          <div className="flex justify-between text-xs text-zinc-700 mt-1">
            <span>$500</span><span>$25,000</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Estimated revenue at risk / month</p>
        <p className="text-4xl font-bold text-red-400 tracking-tight tabular-nums">{formatDollars(atRisk)}</p>
      </div>

      <p className="text-xs text-zinc-600 mt-4 leading-relaxed">
        Resolve recovers an average of 15–20% of at-risk leads in the first 30 days.
        That's{' '}
        <span className="text-emerald-400 font-medium">
          {formatDollars(Math.round(atRisk * 0.175))}
        </span>{' '}
        back in your pipeline.
      </p>
    </div>
  );
}

export function Problem() {
  return (
    <section id="problem" className="py-16 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left: copy */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-6">The Problem</p>
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tighter leading-[1.1] text-white mb-8">
            Your leads are going cold.{' '}
            <span className="text-zinc-600">Right now.</span>
          </h2>
          <div className="space-y-5 text-zinc-500 leading-relaxed text-sm">
            <p>
              The average sales team takes <span className="text-zinc-300 font-medium">47 hours</span> to follow up on a new lead.
              The optimal window is <span className="text-zinc-300 font-medium">5 minutes</span>. That gap is where revenue disappears.
            </p>
            <p>
              Most CRMs track what happened. Resolve enforces what should happen —
              alerting your team the moment a lead crosses your response threshold,
              before the window closes.
            </p>
          </div>
        </motion.div>

        {/* Right: calculator */}
        <motion.div
          variants={slideFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <CostCalculator />
        </motion.div>
      </div>
    </section>
  );
}
