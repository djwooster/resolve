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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function DashboardPage() {
  const { metrics, leads, violations, loading, error, refresh, lastUpdated } = useResolveData();

  if (loading && !metrics) {
    return (
      <div className="flex flex-col min-h-screen">
        <Topbar title="Dashboard" subtitle="Connecting to GoHighLevel..." />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw className="w-8 h-8 text-zinc-500" />
            </motion.div>
            <p className="text-zinc-500 text-sm">Loading live data from GoHighLevel...</p>
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
          <div className="rounded-xl border border-red-500/30 bg-red-500/8 p-8 max-w-md text-center">
            <p className="text-red-400 font-bold text-lg mb-2">GHL Connection Error</p>
            <p className="text-zinc-400 text-sm mb-4">{error}</p>
            <button
              onClick={refresh}
              className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-zinc-100 transition-colors"
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
        subtitle={lastUpdated ? `Live · Updated ${lastUpdated.toLocaleTimeString()}` : 'Real-time revenue enforcement overview'}
      />
      <div className="flex-1 p-8">
        {/* Critical Alert Banner */}
        {m.criticalViolations > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-500/40 bg-red-500/[0.08] px-6 py-4 flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-red-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-bold text-red-400 uppercase tracking-wide">
                {m.criticalViolations} Critical Violation{m.criticalViolations !== 1 ? 's' : ''} Active
              </span>
            </div>
            <span className="text-sm text-zinc-400">
              {formatCurrency(m.revenueAtRisk)} in revenue at risk — immediate action required
            </span>
          </motion.div>
        )}

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <MetricCard
            label="Active Violations"
            value={m.activeViolations}
            subValue={`${m.criticalViolations} critical`}
            icon="🚨"
            variant={m.criticalViolations > 0 ? 'critical' : 'default'}
          />
          <MetricCard
            label="Leads at Risk"
            value={m.leadsAtRisk}
            subValue="Need immediate action"
            icon="⚠️"
            variant={m.leadsAtRisk > 0 ? 'warning' : 'default'}
          />
          <MetricCard
            label="Bookings Today"
            value={`${m.bookingsToday}/${m.bookingTarget}`}
            subValue={`${Math.round((m.bookingsToday / m.bookingTarget) * 100)}% of target`}
            icon="📅"
            variant={m.bookingsToday < m.bookingTarget * 0.5 ? 'warning' : 'success'}
          />
          <MetricCard
            label="Avg Response Time"
            value={`${m.avgResponseTime}m`}
            subValue="Target: ≤ 3 minutes"
            icon="⏱️"
            variant={m.avgResponseTime > 3 ? 'critical' : 'success'}
          />
          <MetricCard
            label="Pipeline Value"
            value={formatCurrency(m.pipelineValue)}
            subValue="Active opportunities"
            icon="💰"
          />
          <MetricCard
            label="Total Leads"
            value={m.totalLeads}
            subValue="Monitored contacts"
            icon="👥"
          />
          <MetricCard
            label="Conversion Rate"
            value={`${m.conversionRate}%`}
            subValue="Lead to booking"
            icon="📈"
            variant={m.conversionRate < 20 ? 'warning' : 'default'}
          />
          <MetricCard
            label="Revenue at Risk"
            value={formatCurrency(m.revenueAtRisk)}
            subValue="From open violations"
            icon="💸"
            variant={m.revenueAtRisk > 0 ? 'critical' : 'default'}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <EnforcementChart />
            <ViolationFeed violations={violations} />
          </div>
          <div className="space-y-6">
            <RulesSummary violations={violations} />
          </div>
        </div>
      </div>
    </div>
  );
}
