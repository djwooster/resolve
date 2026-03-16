import { NextResponse } from 'next/server';
import { getContacts, getOpportunities, getAppointments, getPipelines } from '@/lib/ghl-client';
import { transformContacts, detectViolations, computeMetrics } from '@/lib/ghl-transforms';

export async function GET() {
  try {
    const [contactsResult, oppsResult, apptsResult, pipelinesResult] = await Promise.allSettled([
      getContacts(100),
      getOpportunities(),
      getAppointments(),
      getPipelines(),
    ]);

    const contacts = contactsResult.status === 'fulfilled' ? contactsResult.value.contacts : [];
    const opportunities = oppsResult.status === 'fulfilled' ? oppsResult.value.opportunities : [];
    const appointments = apptsResult.status === 'fulfilled' ? apptsResult.value.events : [];
    const stages = pipelinesResult.status === 'fulfilled'
      ? (pipelinesResult.value.pipelines?.[0]?.stages ?? [])
      : [];

    const leads = transformContacts(contacts, opportunities, appointments, stages);
    const violations = detectViolations(leads);
    const metrics = computeMetrics(leads, violations, appointments);

    return NextResponse.json({ metrics, leads, violations });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
