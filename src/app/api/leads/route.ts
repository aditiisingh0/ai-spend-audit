import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, companyName, role, teamSize, monthlySpend, monthlySaving, annualSaving, useCase, toolsUsed } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    if (body.website) {
      return NextResponse.json({ success: true });
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

    const isHighSavings = (monthlySaving || 0) > 500;

    await resend.emails.send({
      from: 'AI Spend Audit <onboarding@resend.dev>',
      to: email,
      subject: `Your AI Spend Audit — $${monthlySaving || 0}/mo in potential savings found`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; color: #0f172a;">
          <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">Your AI Spend Audit is ready</h1>
          <p style="color: #64748b; margin: 0 0 32px;">Here is a summary of what we found.</p>

          <div style="background: #2563eb; border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 24px;">
            <p style="color: #bfdbfe; font-size: 14px; margin: 0 0 8px;">Total Potential Savings</p>
            <p style="color: white; font-size: 48px; font-weight: 700; margin: 0 0 4px;">$${monthlySaving || 0}<span style="font-size: 20px; font-weight: 400;">/mo</span></p>
            <p style="color: #bfdbfe; font-size: 14px; margin: 0;">$${annualSaving || 0} saved per year</p>
          </div>

          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
            <p style="font-size: 14px; color: #64748b; margin: 0 0 4px;">Tools audited</p>
            <p style="font-size: 15px; color: #0f172a; margin: 0; font-weight: 500;">${toolsUsed || 'Your AI stack'}</p>
          </div>

          ${isHighSavings ? `
          <div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="font-weight: 600; color: #92400e; margin: 0 0 8px;">You qualify for Credex savings</p>
            <p style="color: #78350f; font-size: 14px; margin: 0 0 16px;">With $${monthlySaving}/mo in identified savings, Credex can help you get discounted AI credits.</p>
            <a href="https://credex.rocks" style="background: #f59e0b; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Book a Free Consultation</a>
          </div>
          ` : ''}

          <p style="color: #94a3b8; font-size: 13px; text-align: center; margin: 32px 0 0;">
            Built by <a href="https://credex.rocks" style="color: #2563eb;">Credex</a> — discounted AI credits for startups
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Lead capture error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}