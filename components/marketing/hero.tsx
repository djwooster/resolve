'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, fadeIn } from '@/lib/motion';

const LEADS = [
  { name: 'Marcus Rivera', elapsed: '14 min', initials: 'MR' },
  { name: 'Sarah Chen', elapsed: '1h 2m', initials: 'SC' },
  { name: 'James Okafor', elapsed: '3h 45m', initials: 'JO' },
];

function DashboardMockup() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0D0D0F] overflow-hidden shadow-2xl shadow-black/60">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <span className="ml-3 text-xs text-zinc-600 font-mono">resolve — live enforcement</span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-white/40"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Revenue at Risk · Right Now</span>
            </div>
            <span className="text-4xl font-semibold text-white tracking-tight">$24,800</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-600 mb-1">Violations</p>
            <p className="text-2xl font-semibold text-white">8</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold mb-3">Leads Awaiting Response</p>
          {LEADS.map((lead) => (
            <div key={lead.name} className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/[0.05] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/[0.07] flex items-center justify-center">
                  <span className="text-xs font-semibold text-zinc-400">{lead.initials}</span>
                </div>
                <span className="text-sm font-medium text-zinc-300">{lead.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium tabular-nums text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                  {lead.elapsed}
                </span>
                <span className="text-xs text-zinc-600 uppercase tracking-widest">No contact</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-14">

      <div className="max-w-7xl mx-auto px-6 py-16 lg:min-h-[calc(100vh-3.5rem)] flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: text content */}
          <div className="lg:-translate-y-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.05 }}
              className="mb-8"
            >
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                Revenue Enforcement · Now in Early Access
              </span>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-tighter leading-[1.0]">
                <motion.span variants={fadeUp} className="block text-white">
                  Stop losing revenue
                </motion.span>
                <motion.span variants={fadeUp} className="block text-zinc-600">
                  to slow follow-up.
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="text-base text-zinc-500 leading-relaxed mb-10"
            >
              Resolve monitors every lead in your CRM in real time — flagging missed
              calls, slow responses, and broken follow-up before the opportunity is gone.
            </motion.p>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.45 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#waitlist"
                id="waitlist"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors"
              >
                Get Early Access
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => { e.preventDefault(); document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
              >
                See how it works
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right: mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:translate-y-8"
          >
            <DashboardMockup />
          </motion.div>

        </div>
      </div>

    </section>
  );
}
