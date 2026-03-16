import { NextResponse } from 'next/server';

/**
 * Inbound webhook from GoHighLevel workflows.
 * GHL posts here when: new lead, call outcome, stage change, appointment update.
 *
 * Setup in GHL:
 *   Automations → Workflows → your workflow → Action: Webhook
 *   URL: https://your-domain.com/api/webhook/ghl
 *   Method: POST
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const eventType = body.type ?? body.event ?? 'unknown';
    const contactId = body.contact_id ?? body.contactId ?? body.id;
    const locationId = body.location_id ?? body.locationId;

    console.log(`[GHL Webhook] event=${eventType} contact=${contactId} location=${locationId}`);

    // Future: push to a real-time store (Redis/Pusher/Supabase) for live UI updates
    // For now, the UI polls /api/ghl/metrics every 30s

    return NextResponse.json({ received: true, event: eventType });
  } catch (err: any) {
    console.error('[GHL Webhook] parse error:', err.message);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Resolve webhook endpoint active' });
}
