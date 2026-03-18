'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

function MiniDashboard() {
  const leads = [
    { name: 'Marcus R.', elapsed: '14 min' },
    { name: 'Sarah C.', elapsed: '1h 2m' },
  ];
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0A0A0B] p-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white/30"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs text-zinc-600 uppercase tracking-widest">Revenue at Risk</span>
      </div>
      <p className="text-2xl font-bold text-white tracking-tight">$24,800</p>
      <div className="mt-3 space-y-1.5">
        {leads.map((l) => (
          <div key={l.name} className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">{l.name}</span>
            <span className="text-zinc-400 font-medium tabular-nums">{l.elapsed}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ROICard() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0A0A0B] p-4 mt-6">
      <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3">Weekly ROI · Mon Mar 17</p>
      <p className="text-2xl font-bold text-white tracking-tight">$12,400</p>
      <p className="text-xs text-zinc-600 mt-1">recovered this week</p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Flagged', value: '34' },
          { label: 'Recovered', value: '11' },
          { label: 'SLA %', value: '94%' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-white/[0.03] border border-white/[0.04] px-3 py-2 text-center">
            <p className="text-sm font-bold text-white">{s.value}</p>
            <p className="text-xs text-zinc-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  {
    span: 'col-span-1 md:col-span-2',
    label: 'Live Dashboard',
    title: 'Revenue at Risk — updated in real time.',
    body: 'Not a lagging weekly report. A live number your team can act on today. Every missed call, every slow response, every open violation — visible the moment it happens.',
    visual: <MiniDashboard />,
  },
  {
    span: 'col-span-1',
    label: 'Speed-to-Lead',
    title: 'Every lead starts a timer.',
    body: 'The moment a lead hits your CRM, the clock starts. Cross your SLA threshold and your manager knows immediately.',
    visual: null,
  },
  {
    span: 'col-span-1',
    label: 'Rep Leaderboard',
    title: 'Built-in accountability.',
    body: 'Rank every rep by average response time. Healthy competition, automatically.',
    visual: null,
  },
  {
    span: 'col-span-1',
    label: 'Configurable Alerts',
    title: 'Email, SMS, and Slack.',
    body: 'Different thresholds for different lead sources, stages, or rep tiers. Alerts go exactly where they need to go.',
    visual: null,
  },
  {
    span: 'col-span-1',
    label: 'Daily Digest',
    title: 'Start every day with clarity.',
    body: "A 7am email showing what slipped overnight, today's rescue list, and your team's SLA compliance score.",
    visual: null,
  },
  {
    span: 'col-span-1 md:col-span-2',
    label: 'Weekly ROI Report',
    title: 'Show the dollar value of enforcement.',
    body: 'Auto-generated every Monday: leads flagged, leads recovered, and the estimated revenue Resolve saved your business this week.',
    visual: <ROICard />,
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-4">Features</p>
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tighter leading-[1.1]">
            <span className="text-white">Built for managers.</span>{' '}
            <span className="text-zinc-600">Felt by the whole team.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className={`${f.span} bg-[#0A0A0B] p-10`}
            >
              <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-4">{f.label}</p>
              <h3 className="text-base font-semibold text-white mb-3 leading-snug">{f.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{f.body}</p>
              {f.visual}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
