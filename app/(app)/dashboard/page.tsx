'use client';

import { motion } from 'framer-motion';
import { Topbar } from '@/components/layout/topbar';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ViolationFeed } from '@/components/dashboard/violation-feed';
import { EnforcementChart } from '@/components/dashboard/enforcement-chart';
import { RulesSummary } from '@/components/dashboard/rules-summary';
import { useResolveData } from '@/lib/use-resolve-data';
import { formatCurrency } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const { metrics, violations, loading, error, refresh, lastUpdated } = useResolveData();

  if (loading && !metrics) {
    return (
      <div className="flex flex-col min-h-screen">
        <Topbar title="Dashboard" subtitle="Connecting to GoHighLevel..." />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw className="w-5 h-5 text-zinc-600" />
            </motion.div>
            <p className="text-zinc-600 text-xs uppercase tracking-widest">Loading live data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Topbar title="Dashboard" subtitle="Connection error" />
        <div className="flex-1 flex items-center justify-center">
          <div className="rounded-xl border border-white/[0.06] bg-[#0D0D0F] p-8 max-w-md text-center">
            <p className="text-red-400 font-semibold mb-2">GHL Connection Error</p>
            <p className="text-zinc-500 text-sm mb-5">{error}</p>
            <button
              onClick={refresh}
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const m = metrics!;

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar
        title="Dashboard"
        subtitle={lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Real-time enforcement overview'}
      />
      <div className="flex-1 p-8">

        {/* Critical alert banner */}
        {m.criticalViolations > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-500/20 bg-red-500/[0.04] px-5 py-3.5 flex items-center gap-3"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-red-400">
              {m.criticalViolations} critical violation{m.criticalViolations !== 1 ? 's' : ''} active
            </span>
            <span className="text-sm text-zinc-600">—</span>
            <span className="text-sm text-zinc-500">
              {formatCurrency(m.revenueAtRisk)} in revenue at risk
            </span>
          </motion.div>
        )}

        {/* Metrics grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          <MetricCard label="Active Violations" value={m.activeViolations} subValue={`${m.criticalViolations} critical`} variant={m.criticalViolations > 0 ? 'critical' : 'default'} />
          <MetricCard label="Leads at Risk" value={m.leadsAtRisk} subValue="Need immediate action" variant={m.leadsAtRisk > 0 ? 'warning' : 'default'} />
          <MetricCard label="Bookings Today" value={`${m.bookingsToday}/${m.bookingTarget}`} subValue={`${Math.round((m.bookingsToday / m.bookingTarget) * 100)}% of target`} variant={m.bookingsToday < m.bookingTarget * 0.5 ? 'warning' : 'success'} />
          <MetricCard label="Avg Response Time" value={`${m.avgResponseTime}m`} subValue="Target: ≤ 3 min" variant={m.avgResponseTime > 3 ? 'critical' : 'success'} />
          <MetricCard label="Pipeline Value" value={formatCurrency(m.pipelineValue)} subValue="Active opportunities" />
          <MetricCard label="Total Leads" value={m.totalLeads} subValue="Monitored contacts" />
          <MetricCard label="Conversion Rate" value={`${m.conversionRate}%`} subValue="Lead to booking" variant={m.conversionRate < 20 ? 'warning' : 'default'} />
          <MetricCard label="Revenue at Risk" value={formatCurrency(m.revenueAtRisk)} subValue="From open violations" variant={m.revenueAtRisk > 0 ? 'critical' : 'default'} />
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <EnforcementChart />
            <ViolationFeed violations={violations} />
          </div>
          <div>
            <RulesSummary violations={violations} />
          </div>
        </div>

      </div>
    </div>
  );
}
