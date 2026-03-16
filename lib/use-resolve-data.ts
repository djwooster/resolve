'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Lead, Violation, DashboardMetrics } from './types';

interface ResolveData {
  metrics: DashboardMetrics | null;
  leads: Lead[];
  violations: Violation[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  lastUpdated: Date | null;
}

// Fallback to mock data if GHL returns nothing yet
const EMPTY_METRICS: DashboardMetrics = {
  totalLeads: 0,
  activeViolations: 0,
  criticalViolations: 0,
  leadsAtRisk: 0,
  bookingsToday: 0,
  bookingTarget: 8,
  conversionRate: 0,
  avgResponseTime: 0,
  revenueAtRisk: 0,
  pipelineValue: 0,
};

export function useResolveData(pollInterval = 30_000): ResolveData {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/ghl/metrics', { cache: 'no-store' });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Dates come back as strings from JSON — re-hydrate them
      const hydratedLeads: Lead[] = (data.leads ?? []).map((l: any) => ({
        ...l,
        createdAt: new Date(l.createdAt),
        lastContact: l.lastContact ? new Date(l.lastContact) : null,
        appointmentDate: l.appointmentDate ? new Date(l.appointmentDate) : null,
      }));

      const hydratedViolations: Violation[] = (data.violations ?? []).map((v: any) => ({
        ...v,
        detectedAt: new Date(v.detectedAt),
      }));

      setMetrics(data.metrics ?? EMPTY_METRICS);
      setLeads(hydratedLeads);
      setViolations(hydratedViolations);
      setError(null);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, pollInterval);
    return () => clearInterval(interval);
  }, [fetchData, pollInterval]);

  return { metrics, leads, violations, loading, error, refresh: fetchData, lastUpdated };
}
