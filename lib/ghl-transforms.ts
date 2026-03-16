/**
 * Transforms raw GHL API responses into the shape the Resolve UI expects.
 * Keeps all GHL-specific logic in one place.
 */

import { differenceInMinutes, differenceInHours, formatDistanceToNow } from 'date-fns';
import type { Lead, Violation, DashboardMetrics } from './types';
import type {
  GHLContact,
  GHLOpportunity,
  GHLPipeline,
  GHLAppointment,
} from './ghl-client';

// ─── Stage name mapping (GHL stage names → Resolve LeadStage type) ───────────

const STAGE_MAP: Record<string, Lead['stage']> = {
  'new lead': 'New',
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  'appointment set': 'Appointment Set',
  'appt set': 'Appointment Set',
  'appointment confirmed': 'Appointment Confirmed',
  confirmed: 'Appointment Confirmed',
  'no show': 'No Show',
  noshow: 'No Show',
  won: 'Won',
  closed: 'Won',
  lost: 'Lost',
  disqualified: 'Lost',
};

function mapStage(stageName: string): Lead['stage'] {
  return STAGE_MAP[stageName.toLowerCase()] ?? 'New';
}

function elapsed(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
}

// ─── Contacts → Leads ────────────────────────────────────────────────────────

export function transformContacts(
  contacts: GHLContact[],
  opportunities: GHLOpportunity[],
  appointments: GHLAppointment[],
  stages: GHLPipeline['stages']
): Lead[] {
  // Build lookup maps
  const oppByContact = new Map<string, GHLOpportunity>();
  for (const opp of opportunities) {
    // GHL v2 uses contactId at the top level
    const cid = (opp as any).contactId ?? opp.contact?.id;
    if (cid) oppByContact.set(cid, opp);
  }

  const apptByContact = new Map<string, GHLAppointment>();
  for (const appt of appointments) {
    apptByContact.set(appt.contactId, appt);
  }

  const stageById = new Map(stages.map(s => [s.id, s.name]));

  return contacts.map((c, i) => {
    const opp = oppByContact.get(c.id);
    const appt = apptByContact.get(c.id);
    const stageName = opp ? (stageById.get(opp.pipelineStageId) ?? 'New') : 'New';
    const dateAdded = new Date(c.dateAdded);
    const lastActivity = c.lastActivity ? new Date(c.lastActivity) : null;
    const dayNumber = Math.max(
      1,
      Math.floor((Date.now() - dateAdded.getTime()) / (1000 * 60 * 60 * 24)) + 1
    );

    return {
      id: c.id,
      name: c.fullName ?? (`${c.firstName ?? ''} ${c.lastName ?? ''}`.trim() || 'Unknown'),
      phone: c.phone ?? '',
      email: c.email ?? '',
      source: c.source ?? 'Unknown',
      stage: mapStage(stageName),
      location: c.locationId,
      createdAt: dateAdded,
      lastContact: lastActivity,
      contactAttempts: 0, // enriched separately via conversations
      appointmentDate: appt ? new Date(appt.startTime) : null,
      value: opp?.monetaryValue ?? 0,
      tags: c.tags ?? [],
      violations: [], // populated by violation engine below
      dayNumber,
    };
  });
}

// ─── Violation Engine ─────────────────────────────────────────────────────────

export function detectViolations(leads: Lead[]): Violation[] {
  const violations: Violation[] = [];
  const now = new Date();

  for (const lead of leads) {
    const minutesSinceCreated = differenceInMinutes(now, lead.createdAt);
    const hoursSinceCreated = differenceInHours(now, lead.createdAt);
    const minutesSinceContact = lead.lastContact
      ? differenceInMinutes(now, lead.lastContact)
      : Infinity;
    const hoursSinceContact = lead.lastContact
      ? differenceInHours(now, lead.lastContact)
      : Infinity;

    // RULE 1 — Speed-to-Lead ≤ 3 minutes
    if (
      lead.contactAttempts === 0 &&
      minutesSinceCreated > 3 &&
      minutesSinceCreated < 1440 && // only flag within 24h of creation
      lead.stage === 'New'
    ) {
      violations.push(makeViolation('rule-1', '🚀', 'Speed-to-Lead', 'CRITICAL', 'ENFORCED', lead, now, {
        revenueImpact: 'Delayed contact significantly reduces booking probability.',
        enforcement: 'Immediate outreach required.',
      }));
    }

    // RULE 3 — Missed Inbound Call (no contact attempt, inbound source)
    const inboundSources = ['inbound call', 'phone', 'call', 'inbound'];
    const isInbound = inboundSources.some(s => (lead.source ?? '').toLowerCase().includes(s));
    if (isInbound && lead.contactAttempts === 0 && minutesSinceCreated > 15) {
      violations.push(makeViolation('rule-3', '📞', 'Missed Inbound Call', 'CRITICAL', 'ENFORCED', lead, now, {
        revenueImpact: 'Inbound leads represent highest booking intent.',
        enforcement: 'Immediate follow-up required.',
      }));
    }

    // RULE 4 — Lead Abandonment (24–48hrs, no contact)
    if (hoursSinceCreated >= 24 && hoursSinceCreated < 72 && lead.contactAttempts === 0) {
      violations.push(makeViolation('rule-4', '🛑', 'Lead Abandonment Risk', 'CRITICAL', 'ENFORCED', lead, now, {
        revenueImpact: 'High risk of revenue loss — critical window passed.',
        enforcement: 'Immediate call required.',
      }));
    }

    // RULE 2 — Daily Follow-Up Gap (contacted but < 2 attempts today for leads in follow-up)
    if (
      lead.stage !== 'Won' &&
      lead.stage !== 'Lost' &&
      lead.dayNumber! > 1 &&
      lead.contactAttempts < 2 &&
      hoursSinceContact > 12
    ) {
      violations.push(makeViolation('rule-2', '⚠️', 'Daily Follow-Up Gap', 'WARNING', 'ACTIVE', lead, now, {
        revenueImpact: 'Lead value decreases without continued outreach.',
        enforcement: 'Resume follow-up sequence.',
      }));
    }

    // RULE 9 — No-Show Not Recovered
    if (lead.stage === 'No Show' && lead.appointmentDate) {
      const minutesSinceNoShow = differenceInMinutes(now, lead.appointmentDate);
      if (minutesSinceNoShow >= 30 && minutesSinceNoShow < 1440) {
        violations.push(makeViolation('rule-9', '🚫', 'No-Show Not Recovered', 'CRITICAL', 'ENFORCED', lead, now, {
          revenueImpact: 'This is recoverable revenue. Immediate action required.',
          enforcement: 'Recovery call required now.',
        }));
      }
    }

    // RULE 8 — Unconfirmed Appointment (tomorrow, no confirmation)
    if (lead.stage === 'Appointment Set' && lead.appointmentDate) {
      const hoursUntilAppt = differenceInHours(lead.appointmentDate, now);
      if (hoursUntilAppt >= 16 && hoursUntilAppt <= 28) {
        violations.push(makeViolation('rule-8', '🔔', 'Unconfirmed Appointment', 'WARNING', 'ACTIVE', lead, now, {
          revenueImpact: 'Unconfirmed appointments have higher no-show rates.',
          enforcement: 'Confirm appointment before cutoff.',
        }));
      }
    }

    // RULE 10 — Pipeline Stall (no stage movement in 48hrs)
    if (
      lead.stage !== 'Won' &&
      lead.stage !== 'Lost' &&
      lead.stage !== 'New' &&
      hoursSinceContact > 48
    ) {
      violations.push(makeViolation('rule-10', '⏳', 'Pipeline Stall', 'WARNING', 'ACTIVE', lead, now, {
        revenueImpact: 'Pipeline velocity slowing. Deal at risk.',
        enforcement: 'Move forward or update lead status.',
      }));
    }
  }

  return violations;
}

function makeViolation(
  ruleId: string,
  ruleIcon: string,
  ruleName: string,
  severity: Violation['severity'],
  status: Violation['status'],
  lead: Lead,
  now: Date,
  copy: { revenueImpact: string; enforcement: string }
): Violation {
  return {
    id: `${ruleId}-${lead.id}`,
    ruleId,
    ruleName,
    ruleIcon,
    severity,
    status,
    leadName: lead.name,
    leadPhone: lead.phone,
    leadSource: lead.source,
    location: typeof lead.location === 'string' ? lead.location : 'Unknown',
    detectedAt: now,
    elapsed: formatDistanceToNow(now, { addSuffix: true }),
    revenueImpact: copy.revenueImpact,
    enforcement: copy.enforcement,
    resolved: false,
    escalated: false,
  };
}

// ─── Dashboard Metrics ────────────────────────────────────────────────────────

export function computeMetrics(
  leads: Lead[],
  violations: Violation[],
  appointments: GHLAppointment[]
): DashboardMetrics {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookingsToday = appointments.filter(a => {
    const d = new Date(a.startTime);
    return d >= today && a.appointmentStatus !== 'cancelled';
  }).length;

  const critical = violations.filter(v => v.severity === 'CRITICAL' && !v.resolved);
  const leadsAtRisk = new Set(critical.map(v => v.leadName)).size;

  const avgResponseTime =
    leads.filter(l => l.contactAttempts > 0 && l.lastContact).length > 0
      ? leads
          .filter(l => l.contactAttempts > 0 && l.lastContact)
          .reduce((acc, l) => {
            return acc + differenceInMinutes(l.lastContact!, l.createdAt);
          }, 0) /
        leads.filter(l => l.contactAttempts > 0 && l.lastContact).length
      : 0;

  const totalValue = leads.reduce((acc, l) => acc + l.value, 0);
  const atRiskValue = leads
    .filter(l => violations.some(v => v.leadName === l.name))
    .reduce((acc, l) => acc + l.value, 0);

  const won = leads.filter(l => l.stage === 'Won').length;
  const conversionRate = leads.length > 0 ? (won / leads.length) * 100 : 0;

  return {
    totalLeads: leads.length,
    activeViolations: violations.filter(v => !v.resolved).length,
    criticalViolations: critical.length,
    leadsAtRisk,
    bookingsToday,
    bookingTarget: 8,
    conversionRate: parseFloat(conversionRate.toFixed(1)),
    avgResponseTime: parseFloat((avgResponseTime).toFixed(1)),
    revenueAtRisk: atRiskValue,
    pipelineValue: totalValue,
  };
}
