import { NextResponse } from 'next/server';
import { getContacts } from '@/lib/ghl-client';

export async function GET() {
  try {
    const data = await getContacts(100);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
