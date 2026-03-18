'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  Settings,
  BookOpen,
  Activity,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { href: '/violations', icon: AlertTriangle, label: 'Violations', badge: 8 },
  { href: '/leads', icon: Users, label: 'Leads', badge: null },
  { href: '/rules', icon: BookOpen, label: 'Rules', badge: null },
  { href: '/settings', icon: Settings, label: 'Settings', badge: null },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0D0D0F] border-r border-white/[0.06] flex flex-col z-50">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" fill="#FF2D2D" stroke="#FF2D2D" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm font-semibold tracking-tight text-white">Resolve</p>
        </div>
      </div>

{/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                'flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors',
                isActive
                  ? 'bg-white/[0.07] text-white'
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'
              )}>
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" strokeWidth={isActive ? 2 : 1.5} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs font-semibold text-red-400 tabular-nums">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* GHL status */}
      <div className="px-4 pb-5">
        <div className="rounded-lg border border-white/[0.06] bg-[#0A0A0B] px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">GHL Connected</span>
          </div>
          <p className="text-xs text-zinc-600">Austin, TX · Last sync 2m ago</p>
        </div>
      </div>
    </aside>
  );
}
