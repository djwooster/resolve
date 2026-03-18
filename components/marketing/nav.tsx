'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      animate={{
        borderBottomColor: scrolled ? 'rgba(255,255,255,0.06)' : 'transparent',
        backgroundColor: scrolled ? 'rgba(10,10,11,0.85)' : 'transparent',
      }}
      style={{ backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottomWidth: '1px', borderBottomStyle: 'solid' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" fill="#FF2D2D" stroke="#FF2D2D" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-white font-bold text-[15px] tracking-tight">Resolve</span>
        </Link>

        {/* Center nav — desktop only */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-150"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="hidden md:block text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="#waitlist"
            className="text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-1.5 rounded-full transition-colors"
            onClick={(e) => { e.preventDefault(); handleNavClick('#waitlist'); }}
          >
            Get Early Access
          </Link>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden flex flex-col gap-1.5 p-1"
                aria-label="Open navigation menu"
              >
                <span className="w-5 h-px bg-white block" />
                <span className="w-5 h-px bg-white block" />
                <span className="w-3 h-px bg-white block" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0D0D0F] border-l border-white/[0.06] w-72">
              <div className="flex flex-col gap-8 pt-8">
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="text-left text-lg font-medium text-zinc-300 hover:text-white px-2 py-3 rounded-lg hover:bg-white/[0.04] transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 px-2">
                  <Link
                    href="/dashboard"
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="#waitlist"
                    className="text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2.5 rounded-full transition-colors text-center"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#waitlist'); setOpen(false); }}
                  >
                    Get Early Access
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
