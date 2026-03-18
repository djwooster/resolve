'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

const PLANS = [
  {
    name: 'Starter',
    price: '$79',
    period: '/mo',
    description: 'For small teams getting started with lead enforcement.',
    featured: false,
    cta: 'Start Free Trial',
    features: [
      '1 CRM connection',
      'Up to 5 reps',
      'Email alerts',
      'Speed-to-lead dashboard',
      'Daily digest',
    ],
  },
  {
    name: 'Growth',
    price: '$149',
    period: '/mo',
    description: 'For growing teams who need full enforcement coverage.',
    featured: true,
    cta: 'Start Free Trial',
    features: [
      '2 CRM connections',
      'Up to 25 reps',
      'Email + SMS + Slack alerts',
      'Rep leaderboard',
      'Configurable SLA rules',
      'Weekly ROI report',
    ],
  },
  {
    name: 'Agency',
    price: 'Custom',
    period: '',
    description: 'For agencies managing multiple locations and clients.',
    featured: false,
    cta: 'Talk to Sales',
    features: [
      'Unlimited locations',
      'All CRM integrations',
      'White-label option',
      'API access + webhooks',
      'Dedicated onboarding',
      'Volume pricing per location',
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-4">Pricing</p>
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tighter leading-[1.1]">
            <span className="text-white">Simple pricing.</span>{' '}
            <span className="text-zinc-600">No per-seat nonsense.</span>
          </h2>
          <p className="text-zinc-500 max-w-md mt-6 text-sm">
            Priced per location — not per rep. Add your whole team for free.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`relative rounded-2xl p-8 flex flex-col gap-6 ${
                plan.featured
                  ? 'bg-white text-black border-2 border-white'
                  : 'bg-[#0D0D0F] border border-white/[0.08]'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-semibold text-white bg-zinc-900 border border-white/[0.12] px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <p className={`text-xs font-medium uppercase tracking-widest mb-4 ${plan.featured ? 'text-black/40' : 'text-zinc-600'}`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-3xl font-semibold tracking-tighter ${plan.featured ? 'text-black' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.featured ? 'text-black/40' : 'text-zinc-600'}`}>{plan.period}</span>
                  )}
                </div>
                <p className={`text-sm leading-relaxed ${plan.featured ? 'text-black/50' : 'text-zinc-500'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8l3.5 3.5L13 4.5"
                        stroke={plan.featured ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.3)'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={plan.featured ? 'text-black/70' : 'text-zinc-400'}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                onClick={(e) => { e.preventDefault(); document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`block text-center text-sm font-semibold px-6 py-2.5 rounded-full transition-colors ${
                  plan.featured
                    ? 'bg-black text-white hover:bg-zinc-800'
                    : 'bg-white/[0.06] text-white hover:bg-white/10 border border-white/[0.08]'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-xs text-zinc-600 text-center mt-8"
        >
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
