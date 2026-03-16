'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  Settings,
  BookOpen,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { href: '/violations', icon: AlertTriangle, label: 'Violations', badge: 8 },
  { href: '/leads', icon: Users, label: 'Leads', badge: null },
  { href: '/rules', icon: BookOpen, label: 'Rules', badge: null },
  { href: '/settings', icon: Settings, label: 'Settings', badge: null },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0D0D0F] border-r border-[#1E1E22] flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-[#1E1E22]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-900/30">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Resolve</h1>
            <p style={{ fontSize: '11px' }} className="text-zinc-500 font-medium uppercase tracking-widest">Revenue Enforcement</p>
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="px-6 py-4 border-b border-[#1E1E22]">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Live Monitoring</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  'flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors',
                  isActive
                    ? 'bg-white/[0.08] text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                )}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn('w-5 h-5', isActive ? 'text-white' : '')} />
                  <span className={cn('text-sm font-medium', isActive ? 'text-white' : '')}>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-xs font-bold rounded bg-red-500/20 text-red-400 border border-red-500/30 min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* GHL Connection Status */}
      <div className="px-4 pb-6">
        <div className="rounded-lg bg-[#111113] border border-[#1E1E22] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">GHL Connected</span>
          </div>
          <p className="text-xs text-zinc-500">Austin, TX · Last sync 2m ago</p>
        </div>
      </div>
    </aside>
  );
}
