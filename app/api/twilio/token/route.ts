import { NextResponse } from 'next/server';
import { generateAccessToken } from '@/lib/twilio-server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const identity = searchParams.get('identity') ?? 'agent';
    const token = await generateAccessToken(identity);
    return NextResponse.json({ token, identity });
  } catch (err: any) {
    console.error('[Twilio Token]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
