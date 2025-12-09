import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, EmailTemplates } from '@/lib/email';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, tier, answers } = body;

        // Map tier ID to name
        const tierNames: Record<number, string> = {
            1: 'Tier 1: Entry Diagnostics',
            2: 'Tier 2: Focused Audits',
            3: 'Tier 3: Full Manuscript Refinement',
            4: 'Tier 4: Editorial Partnership'
        };
        const recommendation = tierNames[tier] || 'Custom Consultation';

        // 1. Send Results + Free Guide Link to User
        // Note: We point to a web version of the guide for now
        const guideUrl = `${req.nextUrl.origin}/resources/7-structural-mistakes`;

        await sendEmail({
            to: email,
            subject: 'Your Diagnostic Results + Free Guide',
            html: EmailTemplates.userConfirmation(
                'Your Editorial Recommendation',
                `<p>Based on your diagnostic, we recommend: <strong>${recommendation}</strong></p>
                <p>This tier matches your manuscript's current stage and your stated goals.</p>
                
                <p><strong>View Your Full Report:</strong></p>
                <p><a href="${req.nextUrl.origin}/diagnostic/results?tier=${tier}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 10px 0;">See Full Recommendation</a></p>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                
                <p><strong>Your Free Gift:</strong></p>
                <p><a href="${guideUrl}" style="color: #10b981; text-decoration: underline;">Read: 7 Structural Mistakes That Kill Fantasy Manuscripts</a></p>`
            ).html
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Diagnostic API Error:', error);
        return NextResponse.json({ error: 'Failed to process diagnostic' }, { status: 500 });
    }
}
