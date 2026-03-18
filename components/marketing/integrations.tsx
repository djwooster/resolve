'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

const INTEGRATIONS = [
  {
    logo: { text: 'GHL' },
    name: 'GoHighLevel',
    badge: 'Available Now',
    body: 'The #1 choice for agencies managing service-based businesses. Real-time webhooks for every lead event.',
    priority: true,
  },
  {
    logo: { text: 'HS' },
    name: 'HubSpot',
    badge: 'Available Now',
    body: 'Mid-market B2B teams. Full timeline event tracking via the HubSpot Engagements API.',
    priority: false,
  },
  {
    logo: { text: 'SF' },
    name: 'Salesforce',
    badge: 'Coming Soon',
    body: 'Enterprise teams. Platform Events API with support for custom objects and field-level security.',
    priority: false,
  },
];

export function Integrations() {
  return (
    <section id="integrations" className="py-16 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-4">Integrations</p>
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tighter leading-[1.1]">
            <span className="text-white">Works where your team</span>{' '}
            <span className="text-zinc-600">already lives.</span>
          </h2>
          <p className="text-zinc-500 max-w-lg mt-6 leading-relaxed text-sm">
            Connect your CRM in one click. Resolve reads your lead data in real time —
            no manual imports, no CSV uploads, no waiting.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {INTEGRATIONS.map((integration) => (
            <motion.div
              key={integration.name}
              variants={fadeUp}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl border bg-[#0D0D0F] p-8 flex flex-col gap-5 ${
                integration.priority ? 'border-white/[0.1]' : 'border-white/[0.05]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center">
                  <span className="text-sm font-bold font-mono text-zinc-300">{integration.logo.text}</span>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-white/[0.08] text-zinc-500">
                  {integration.badge}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">{integration.name}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{integration.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-xs text-zinc-600 mt-8"
        >
          More integrations coming — Slack, Zapier, and custom webhooks.
        </motion.p>
      </div>
    </section>
  );
}
