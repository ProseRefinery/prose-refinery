import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, EmailTemplates } from '@/lib/email';
import { COMPANY } from '@/lib/constants';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // 1. Send notification to admin (You)
        await sendEmail({
            to: COMPANY.email,
            subject: `New Contact: ${subject || 'Inquiry'}`,
            html: EmailTemplates.adminNotification(`Contact Form: ${subject || 'General'}`, {
                Name: name,
                Email: email,
                Message: message
            }).html
        });

        // 2. Send confirmation to user
        await sendEmail({
            to: email,
            subject: 'We received your message',
            html: EmailTemplates.userConfirmation(
                'Thanks for reaching out',
                `<p>Hi ${name},</p><p>We've received your message and will get back to you within 24 hours.</p><p>Best,<br>Prose Refinery Team</p>`
            ).html
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
