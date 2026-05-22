import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { summary, useCase, toolsData } = body;

    const { data, error } = await supabase
      .from('audits')
      .insert({
        use_case: useCase,
        total_monthly_spend: summary.totalMonthlySpend,
        total_monthly_saving: summary.totalMonthlySaving,
        total_annual_saving: summary.totalAnnualSaving,
        results: summary.results,
        tools_data: toolsData,
      })
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error('Audit save error:', err);
    return NextResponse.json({ error: 'Failed to save audit' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('audits')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error('Audit fetch error:', err);
    return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
  }
}