/**
 * GoHighLevel API v2 client
 * All requests are server-side only — never expose API key to the browser.
 */

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

function headers() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: GHL_VERSION,
    'Content-Type': 'application/json',
  };
}

async function ghlFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${GHL_BASE}${path}`, {
    ...options,
    headers: { ...headers(), ...(options?.headers ?? {}) },
    next: { revalidate: 30 }, // 30s cache on server components
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL API error ${res.status}: ${text}`);
  }

  return res.json();
}

// ─── Contacts ────────────────────────────────────────────────────────────────

export interface GHLContact {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  source?: string;
  locationId: string;
  tags?: string[];
  dateAdded: string;
  lastActivity?: string;
  customFields?: { id: string; value: string }[];
  assignedTo?: string;
}

export interface GHLContactsResponse {
  contacts: GHLContact[];
  count: number;
  total?: number;
}

export async function getContacts(limit = 100): Promise<GHLContactsResponse> {
  const locationId = process.env.GHL_LOCATION_ID;
  return ghlFetch<GHLContactsResponse>(
    `/contacts/?locationId=${locationId}&limit=${limit}`
  );
}

export async function getContact(id: string): Promise<{ contact: GHLContact }> {
  return ghlFetch<{ contact: GHLContact }>(`/contacts/${id}`);
}

// ─── Opportunities (Pipeline) ─────────────────────────────────────────────────

export interface GHLOpportunity {
  id: string;
  name: string;
  pipelineId: string;
  pipelineStageId: string;
  status: string;
  monetaryValue?: number;
  assignedTo?: string;
  contact: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    source?: string;
  };
  createdAt: string;
  updatedAt: string;
  lastStatusChangeAt?: string;
  lastStageChangeAt?: string;
}

export interface GHLOpportunitiesResponse {
  opportunities: GHLOpportunity[];
  meta: { total: number; nextPageUrl?: string; startAfter?: number };
}

export async function getOpportunities(pipelineId?: string): Promise<GHLOpportunitiesResponse> {
  const locationId = process.env.GHL_LOCATION_ID;
  const pipeline = pipelineId ?? process.env.GHL_PIPELINE_ID;
  const params = new URLSearchParams({ location_id: locationId! });
  if (pipeline) params.set('pipeline_id', pipeline);
  params.set('limit', '100');

  return ghlFetch<GHLOpportunitiesResponse>(`/opportunities/search?${params}`);
}

// ─── Pipelines ────────────────────────────────────────────────────────────────

export interface GHLPipelineStage {
  id: string;
  name: string;
  order: number;
}

export interface GHLPipeline {
  id: string;
  name: string;
  stages: GHLPipelineStage[];
}

export interface GHLPipelinesResponse {
  pipelines: GHLPipeline[];
}

export async function getPipelines(): Promise<GHLPipelinesResponse> {
  const locationId = process.env.GHL_LOCATION_ID;
  return ghlFetch<GHLPipelinesResponse>(`/opportunities/pipelines?locationId=${locationId}`);
}

// ─── Appointments / Calendar ──────────────────────────────────────────────────

export interface GHLAppointment {
  id: string;
  calendarId: string;
  contactId: string;
  groupId?: string;
  appointmentStatus: string; // confirmed, cancelled, showed, noshow, invalid
  title: string;
  startTime: string;
  endTime: string;
  address?: string;
  assignedUserId?: string;
  notes?: string;
}

export interface GHLAppointmentsResponse {
  events: GHLAppointment[];
}

interface GHLCalendar {
  id: string;
  name: string;
  locationId: string;
}

async function getCalendars(): Promise<GHLCalendar[]> {
  const locationId = process.env.GHL_LOCATION_ID;
  const res = await ghlFetch<{ calendars: GHLCalendar[] }>(`/calendars/?locationId=${locationId}`);
  return res.calendars ?? [];
}

export async function getAppointments(
  startTime?: string,
  endTime?: string
): Promise<GHLAppointmentsResponse> {
  const startMs = startTime
    ? new Date(startTime).getTime()
    : Date.now() - 7 * 24 * 60 * 60 * 1000;
  const endMs = endTime
    ? new Date(endTime).getTime()
    : Date.now() + 7 * 24 * 60 * 60 * 1000;

  // GHL v2 requires a calendarId — fetch all calendars then batch query
  const calendars = await getCalendars();
  if (calendars.length === 0) return { events: [] };

  const params = new URLSearchParams({
    startTime: String(startMs),
    endTime: String(endMs),
  });

  // Fan out across all calendars, collect results
  const results = await Promise.allSettled(
    calendars.map(cal =>
      ghlFetch<GHLAppointmentsResponse>(
        `/calendars/events/appointments?calendarId=${cal.id}&${params}`
      )
    )
  );

  const events: GHLAppointment[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') {
      events.push(...(r.value.events ?? []));
    }
  }

  return { events };
}

// ─── Conversations / Activity (for call logs) ─────────────────────────────────

export interface GHLConversation {
  id: string;
  contactId: string;
  locationId: string;
  lastMessageBody?: string;
  lastMessageType?: string;
  lastMessageDate?: string;
  unreadCount: number;
  type: string;
}

export interface GHLConversationsResponse {
  conversations: GHLConversation[];
  total: number;
}

export async function getConversations(): Promise<GHLConversationsResponse> {
  const locationId = process.env.GHL_LOCATION_ID;
  return ghlFetch<GHLConversationsResponse>(
    `/conversations/search?locationId=${locationId}&limit=100`
  );
}
