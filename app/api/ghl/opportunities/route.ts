import { NextResponse } from 'next/server';
import { getOpportunities } from '@/lib/ghl-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pipelineId = searchParams.get('pipeline_id') ?? undefined;
    const data = await getOpportunities(pipelineId);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
