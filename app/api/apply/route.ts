import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, EmailTemplates } from '@/lib/email';
import { COMPANY } from '@/lib/constants';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, title, genre, wordcount, pitch, whyTier4, timeline, referral } = body;

        // 1. Admin Notification
        await sendEmail({
            to: COMPANY.email,
            subject: `New Tier 4 Application: ${title}`,
            html: EmailTemplates.adminNotification('Editorial Partnership Application', {
                Name: name,
                Email: email,
                Manuscript: title,
                Genre: genre,
                WordCount: wordcount,
                Pitch: pitch,
                WhyTier4: whyTier4,
                Timeline: timeline,
                Referral: referral
            }).html
        });

        // 2. User Confirmation
        await sendEmail({
            to: email,
            subject: 'Application Received: Editorial Partnership',
            html: EmailTemplates.userConfirmation(
                'Application Received',
                `<p>Hi ${name},</p>
                <p>Thank you for applying for the Editorial Partnership (Tier 4). We have received your details for <em>${title}</em>.</p>
                <p>We review applications within 5 business days. If we believe we are the right fit for your project, we will invite you to a consultation call.</p>
                <p>Best,<br>The Prose Refinery Team</p>`
            ).html
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Apply API Error:', error);
        return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }
}
