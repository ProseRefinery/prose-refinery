import { Resend } from 'resend';

// Initialize Resend with API key (or default for build time safety)
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export const EmailTemplates = {
    // Admin notification: When someone applies or contacts you
    adminNotification: (subject: string, data: Record<string, any>) => ({
        subject: `[Prose Refinery] ${subject}`,
        html: `
            <h1>New Submission: ${subject}</h1>
            <div style="font-family: sans-serif; padding: 20px; background: #f4f4f5; border-radius: 8px;">
                ${Object.entries(data).map(([key, value]) => `
                    <p style="margin-bottom: 10px;">
                        <strong style="text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}:</strong><br/>
                        ${value?.toString() || 'N/A'}
                    </p>
                `).join('')}
            </div>
            <p>Time: ${new Date().toLocaleString()}</p>
        `
    }),

    // User confirmation: Diagnostic results or general receipt
    userConfirmation: (title: string, message: string) => ({
        subject: `[Prose Refinery] ${title}`,
        html: `
            <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
                <h1 style="color: #10b981; margin-bottom: 24px;">Prose Refinery</h1>
                <h2 style="font-size: 24px; margin-bottom: 16px;">${title}</h2>
                <div style="line-height: 1.6; margin-bottom: 32px;">
                    ${message}
                </div>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
                <p style="font-size: 14px; color: #666;">
                    Prose Refinery Ltd.<br/>
                    Structural Editing for Speculative Fiction
                </p>
            </div>
        `
    })
};

export const sendEmail = async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn('[Email] Mock sending (no key):', { to, subject });
        return { success: true, id: 'mock-id' };
    }

    try {
        const data = await resend.emails.send({
            from: 'Prose Refinery <hello@proserefinery.com>', // Verify this domain in Resend
            to,
            subject,
            html,
        });
        return { success: true, data };
    } catch (error) {
        console.error('[Email] Failed to send:', error);
        return { success: false, error };
    }
};
