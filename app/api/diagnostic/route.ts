import { NextRequest, NextResponse } from 'next/server';
import { upsertContact, sendTransactional, triggerEvent } from '@/lib/loops';

export async function POST(req: NextRequest) {
    try {
        const { email, tier, answers, newsletter } = await req.json();

        // Parse tier string if it comes as "Tier 2" etc, or object
        const tierNumber = tier?.id || 2; // Default to 2
        const tierName = tier?.name || `Tier ${tierNumber}`;
        const reasoning = tier?.description ? [tier.description] : [];

        // 1. Add contact to Loops
        await upsertContact({
            email,
            source: 'diagnostic',
            recommendedTier: `Tier ${tierNumber}`,
            quizCompleted: true,
            // Map other quiz answers if needed
            newsletter: newsletter || false
        });

        // 2. Determine CTA based on tier
        // Using string keys to match guide, or numbers
        const ctaMap: Record<number, { text: string; url: string }> = {
            1: { text: 'Buy Now', url: 'https://proserefinery.com/services#tier1' },
            2: { text: 'Book Free Consultation', url: 'https://proserefinery.com/consultation' },
            3: { text: 'Book Free Consultation', url: 'https://proserefinery.com/consultation' },
            4: { text: 'Apply for Partnership', url: 'https://proserefinery.com/apply' },
        };

        const cta = ctaMap[tierNumber] || ctaMap[2];

        // 3. Send diagnostic results email
        await sendTransactional({
            transactionalId: 'cmizisawj06lk2c0i7i6yq6pu', // diagnostic_results
            email,
            dataVariables: {
                tierName,
                reasoning: reasoning.join('\n'),
                ctaText: cta.text,
                ctaUrl: cta.url,
            },
        });

        // 4. Trigger nurture automation
        await triggerEvent(email, 'diagnostic_completed');

        // 5. Notify admin (You) - Optional but good for monitoring
        await sendTransactional({
            transactionalId: 'cmizjozwy1agq2x0iz2qa6sca', // admin_notification
            email: 'hello@proserefinery.com',
            dataVariables: {
                type: 'Diagnostic Completed',
                name: 'Anonymous',
                email: email,
                tier: tierName,
                title: 'N/A',
                genre: 'N/A',
                wordcount: 'N/A',
                pitch: 'Diagnostic Result',
                concern: `Calculated Tier: ${tierNumber}`
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Diagnostic error:', error);
        // Return success even if email fails so UI doesn't break
        return NextResponse.json({ success: true, warning: 'Email processing failed' }, { status: 200 });
    }
}
