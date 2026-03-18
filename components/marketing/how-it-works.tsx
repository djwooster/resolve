'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

const STEPS = [
  {
    number: '01',
    title: 'Connect Your CRM',
    body: 'Link Resolve to GoHighLevel, HubSpot, or Salesforce in one click. No engineering required — your data starts flowing immediately.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 10h6M10 7v6M3 10a7 7 0 1 0 14 0 7 7 0 0 0-14 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Set Your Rules',
    body: 'Define your response SLA (default: 5 minutes), follow-up cadence, and which reps get alerted for which lead types.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 6h12M4 10h8M4 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Enforce & Recover',
    body: 'Resolve monitors every lead in real time. The moment a threshold is crossed, your manager gets an alert — with the lead, the rep, and the revenue at stake.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3v3M10 14v3M3 10h3M14 10h3M5.6 5.6l2.1 2.1M12.3 12.3l2.1 2.1M5.6 14.4l2.1-2.1M12.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold mb-4">How It Works</p>
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tighter leading-[1.1]">
            <span className="text-white">Set it up in under</span>{' '}
            <span className="text-zinc-600">10 minutes.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="bg-[#0A0A0B] p-10"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="text-3xl font-bold text-zinc-800 font-mono tracking-tighter">{step.number}</span>
                <span className="text-zinc-600 mt-1">{step.icon}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
