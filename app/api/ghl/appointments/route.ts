import { NextResponse } from 'next/server';
import { getAppointments } from '@/lib/ghl-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startTime = searchParams.get('startTime') ?? undefined;
    const endTime = searchParams.get('endTime') ?? undefined;
    const data = await getAppointments(startTime, endTime);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
