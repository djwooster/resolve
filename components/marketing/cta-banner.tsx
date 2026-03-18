'use client';

import { motion } from 'framer-motion';

export function CtaBanner() {
  return (
    <section className="py-16 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/[0.08] bg-[#0D0D0F] px-12 py-20 text-center"
        >
          <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tighter leading-[1.1] mb-6">
            <span className="text-white">Don't find out next week</span>
            <br />
            <span className="text-zinc-600">which leads you lost.</span>
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto mb-10 leading-relaxed">
            Resolve tells you in real time — and gives your team a chance to fix it
            before the opportunity is gone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#waitlist"
              onClick={(e) => { e.preventDefault(); document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-100 transition-colors"
            >
              Get Early Access
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => { e.preventDefault(); document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              See a demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
