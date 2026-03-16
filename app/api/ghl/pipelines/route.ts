import { NextResponse } from 'next/server';
import { getPipelines } from '@/lib/ghl-client';

export async function GET() {
  try {
    const data = await getPipelines();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
