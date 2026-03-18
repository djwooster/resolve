'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

const TESTIMONIALS = [
  {
    quote: 'We connected Resolve on a Friday. By Monday morning we had already recovered two leads that had been sitting for over 4 hours. One of them turned into a $6,200 job.',
    name: 'Marcus T.',
    title: 'Owner, HVAC company · 12-person team',
    initials: 'MT',
  },
  {
    quote: 'I used to spend 30 minutes every morning manually auditing the CRM. Resolve sends me a digest at 7am and I know exactly what needs attention before my team even starts their day.',
    name: 'Sarah L.',
    title: 'Sales Manager, Mortgage brokerage',
    initials: 'SL',
  },
  {
    quote: 'Our GHL clients were already paying us for CRM management. Resolve let us show them a dollar figure on what we were protecting. It completely changed the value conversation.',
    name: 'James R.',
    title: 'GoHighLevel Agency Owner · 23 clients',
    initials: 'JR',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-4">Early Results</p>
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tighter leading-[1.1]">
            <span className="text-white">Teams stop losing leads</span>{' '}
            <span className="text-zinc-600">they didn't know they were losing.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.06] bg-[#0D0D0F] p-8 flex flex-col gap-6 border-l-2 border-l-white/[0.12]"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1l1.5 4H13L9.5 7.5l1.5 4L7 9.5 3 11.5l1.5-4L1 5h4.5L7 1z" fill="currentColor" className="text-amber-400" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-sm text-zinc-400 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-zinc-400">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-zinc-600">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
