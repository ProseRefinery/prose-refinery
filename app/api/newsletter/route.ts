import { NextRequest, NextResponse } from 'next/server';
import { upsertContact } from '@/lib/loops';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const result = await upsertContact({
            email,
            source: 'newsletter_footer',
            newsletter: true,
            userGroup: 'Newsletter Subscriber' // Explicit segment
        });

        if (result.error) {
            console.error('Newsletter API Error:', result.error);
            // Return success to UI to avoid discouraging user, but log error
            return NextResponse.json({ success: true, warning: 'CRM sync failed' });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Newsletter API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
