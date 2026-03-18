import Link from 'next/link';

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" fill="#FF2D2D" stroke="#FF2D2D" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span className="text-white font-bold text-[15px] tracking-tight">Resolve</span>
            </div>
            <p className="text-sm text-zinc-600">Revenue enforcement for sales teams.</p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer navigation">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-zinc-600 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/[0.04] pt-8">
          <p className="text-xs text-zinc-700 max-w-2xl leading-relaxed">
            © 2026 Resolve. Built for sales managers who don't accept lost leads as a cost of doing business.
          </p>
        </div>
      </div>
    </footer>
  );
}
