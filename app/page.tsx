'use client';

import { motion } from 'framer-motion';
import { Topbar } from '@/components/layout/topbar';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ViolationFeed } from '@/components/dashboard/violation-feed';
import { EnforcementChart } from '@/components/dashboard/enforcement-chart';
import { RulesSummary } from '@/components/dashboard/rules-summary';
import { DASHBOARD_METRICS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export default function DashboardPage() {
  const metrics = DASHBOARD_METRICS;

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar
        title="Dashboard"
        subtitle="Real-time revenue enforcement overview"
      />
      <div className="flex-1 p-8">
        {/* Critical Alert Banner */}
        {metrics.criticalViolations > 0 && (
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
                {metrics.criticalViolations} Critical Violations Active
              </span>
            </div>
            <span className="text-sm text-zinc-400">
              {formatCurrency(metrics.revenueAtRisk)} in revenue at risk — immediate action required
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
            value={metrics.activeViolations}
            subValue={`${metrics.criticalViolations} critical`}
            icon="🚨"
            variant="critical"
          />
          <MetricCard
            label="Leads at Risk"
            value={metrics.leadsAtRisk}
            subValue="Need immediate action"
            icon="⚠️"
            variant="warning"
          />
          <MetricCard
            label="Bookings Today"
            value={`${metrics.bookingsToday}/${metrics.bookingTarget}`}
            subValue={`${Math.round((metrics.bookingsToday / metrics.bookingTarget) * 100)}% of target`}
            trend="down"
            trendValue="-37%"
            icon="📅"
            variant="warning"
          />
          <MetricCard
            label="Avg Response Time"
            value={`${metrics.avgResponseTime}m`}
            subValue="Target: ≤ 3 minutes"
            trend="down"
            trendValue="↑ 4.2m over SLA"
            icon="⏱️"
            variant="critical"
          />
          <MetricCard
            label="Pipeline Value"
            value={formatCurrency(metrics.pipelineValue)}
            subValue="Active opportunities"
            trend="up"
            trendValue="+12%"
            icon="💰"
          />
          <MetricCard
            label="Total Leads"
            value={metrics.totalLeads}
            subValue="This month"
            trend="up"
            trendValue="+8"
            icon="👥"
          />
          <MetricCard
            label="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            subValue="Lead to booking"
            trend="down"
            trendValue="-3.2%"
            icon="📈"
            variant="warning"
          />
          <MetricCard
            label="Revenue at Risk"
            value={formatCurrency(metrics.revenueAtRisk)}
            subValue="From open violations"
            icon="💸"
            variant="critical"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <EnforcementChart />
            <ViolationFeed />
          </div>
          <div className="space-y-6">
            <RulesSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
