import { NextRequest, NextResponse } from 'next/server';
import { upsertContact, sendTransactional, triggerEvent } from '@/lib/loops';

export async function POST(req: NextRequest) {
    try {
        const { action, email, templateId } = await req.json();

        // Debug Env
        // Debug Env
        const key = process.env.LOOPS_API_KEY || process.env.NEXT_PUBLIC_LOOPS_API_KEY;
        const envStatus = {
            exists: !!key,
            type: typeof key,
            length: key?.length,
            prefix: key ? key.substring(0, 5) + '...' : 'N/A',
            isNextPublic: !!process.env.NEXT_PUBLIC_LOOPS_API_KEY
        };

        let result;

        if (action === 'test-contact') {
            result = await upsertContact({
                email,
                firstName: 'Test',
                source: 'debug_page',
                recommendedTier: 'Tier 1',
                debugTimestamp: new Date().toISOString()
            });
        }
        else if (action === 'test-email') {
            result = await sendTransactional({
                transactionalId: templateId,
                email,
                dataVariables: {
                    firstName: 'Test User',
                    tierName: 'Tier 1 (Debug)',
                    reasoning: 'Debug reasoning...',
                    ctaText: 'Debug CTA',
                    ctaUrl: 'https://example.com'
                }
            });
        }
        else if (action === 'test-event') {
            result = await triggerEvent(email, 'diagnostic_completed');
        }
        else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            action,
            envStatus,
            result,
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message || 'Unknown error'
        }, { status: 500 });
    }
}
