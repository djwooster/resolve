export type Severity = 'CRITICAL' | 'WARNING' | 'ALERT' | 'INFO';
export type RuleStatus = 'ENFORCED' | 'ACTIVE' | 'MONITORING' | 'DISABLED';
export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Appointment Set' | 'Appointment Confirmed' | 'No Show' | 'Won' | 'Lost';

export interface Rule {
  id: string;
  number: number;
  name: string;
  description: string;
  severity: Severity;
  status: RuleStatus;
  icon: string;
  threshold: string;
  violationCount: number;
  enabled: boolean;
}

export interface Violation {
  id: string;
  ruleId: string;
  ruleName: string;
  ruleIcon: string;
  severity: Severity;
  status: RuleStatus;
  leadName: string;
  leadPhone: string;
  leadSource: string;
  location: string;
  detectedAt: Date;
  elapsed: string;
  revenueImpact: string;
  enforcement: string;
  resolved: boolean;
  escalated: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  stage: LeadStage;
  location: string;
  createdAt: Date;
  lastContact: Date | null;
  contactAttempts: number;
  appointmentDate: Date | null;
  value: number;
  tags: string[];
  violations: string[];
  dayNumber?: number;
}

export interface DashboardMetrics {
  totalLeads: number;
  activeViolations: number;
  criticalViolations: number;
  leadsAtRisk: number;
  bookingsToday: number;
  bookingTarget: number;
  conversionRate: number;
  avgResponseTime: number;
  revenueAtRisk: number;
  pipelineValue: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  violations?: number;
  bookings?: number;
  leads?: number;
}
