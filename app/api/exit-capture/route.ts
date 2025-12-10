import { NextRequest, NextResponse } from 'next/server';
import { upsertContact, sendTransactional, triggerEvent } from '@/lib/loops';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        // 1. Add contact
        await upsertContact({
            email,
            source: 'exit_popup',
        });

        // 2. Send guide
        await sendTransactional({
            transactionalId: 'cmizjlrbd0h0c3i0ihghekk6a', // exit_intent_guide
            email,
            dataVariables: {},
        });

        // 3. Trigger nurture
        await triggerEvent(email, 'downloaded_guide');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Exit capture error:', error);
        // Don't leak error details
        return NextResponse.json({ success: true }, { status: 200 });
    }
}
