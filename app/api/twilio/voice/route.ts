import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { phoneNumber } from '@/lib/twilio-server';

const VoiceResponse = twilio.twiml.VoiceResponse;

/**
 * TwiML webhook — Twilio POSTs here when a browser client initiates a call.
 * Returns XML telling Twilio to dial the lead's number using our Twilio number as caller ID.
 */
export async function POST(request: Request) {
  const body = await request.formData();
  const to = body.get('To') as string;

  const twiml = new VoiceResponse();

  if (to) {
    const dial = twiml.dial({ callerId: phoneNumber, timeout: 30 } as any);
    // Sanitize: only allow E.164 phone numbers
    if (/^\+?[1-9]\d{6,14}$/.test(to.replace(/[\s\-().]/g, ''))) {
      dial.number({} as any, to);
    } else {
      twiml.say('Invalid phone number.');
    }
  } else {
    twiml.say('No destination number provided.');
  }

  return new NextResponse(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  });
}

// Health check
export async function GET() {
  return NextResponse.json({ status: 'Resolve Twilio voice endpoint active' });
}
