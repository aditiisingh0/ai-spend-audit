import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, companyName, role, teamSize, monthlySpend, monthlySaving, annualSaving, useCase, toolsUsed } = body;

    // Basic validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Honeypot check — bots fill this field
    if (body.website) {
      return NextResponse.json({ success: true }); // Silently ignore bots
    }

    const { error } = await supabase.from('leads').insert({
      email,
      company_name: companyName || null,
      role: role || null,
      team_size: teamSize || null,
      monthly_spend: monthlySpend || null,
      monthly_saving: monthlySaving || null,
      annual_saving: annualSaving || null,
      use_case: useCase || null,
      tools_used: toolsUsed || null,
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Lead capture error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}