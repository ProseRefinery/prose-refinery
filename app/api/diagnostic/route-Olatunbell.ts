import { NextRequest, NextResponse } from 'next/server';
import { upsertContact, sendTransactional, triggerEvent } from '@/lib/loops';

// Zone-specific implications for personalized email copy
const ZONE_IMPLICATIONS: Record<string, string> = {
    'Plot Architecture': 'Consequences are not carrying forward, so scenes feel disconnected and momentum drops.',
    'Character Integrity': 'Pressure does not escalate, so stakes feel theoretical rather than lived.',
    'World-System Logic': 'Rules are not constraining choices, so conflict does not bite.',
    'Pacing & Pressure': 'Scenes are not turning, so tension resets instead of building.',
};

export async function POST(req: NextRequest) {
    try {
        const { email, result, answers, newsletter } = await req.json();

        // 1. Parse Result
        // Fallback if result is missing (shouldn't happen with new client)
        // result structure: { startTier, needTier, budgetTier, isConstrained, needScore }
        const tierNumber = result?.startTier || 2;
        const tierName = `Tier ${tierNumber}`;
        const zone = result?.zone || 'Plot Architecture';
        const riskLevel = result?.risk || 'Moderate';
        const zoneImplication = ZONE_IMPLICATIONS[zone] || ZONE_IMPLICATIONS['Plot Architecture'];

        // 2. Add contact to Loops with Enhanced Segmentation
        // Storing both Strings (Display/Compat) and Numbers (Filtering)
        await upsertContact({
            email,
            source: 'diagnostic',
            recommendedTier: tierName,
            quizCompleted: true,
            newsletter: newsletter || false,

            // New Hybrid Logic Fields
            diagnostic_start_tier_num: result?.startTier || 2,
            diagnostic_need_tier_num: result?.needTier || 2,
            diagnostic_budget_tier_num: result?.budgetTier || 2,

            diagnostic_need_tier: `Tier ${result?.needTier || 2}`,
            diagnostic_budget_tier: `Tier ${result?.budgetTier || 2}`,

            diagnostic_is_constrained: result?.isConstrained ? 'true' : 'false',
            diagnostic_need_score: result?.needScore || '0.00',

            // New: failure zone for segmentation
            diagnostic_failure_zone: zone,
            diagnostic_risk_level: riskLevel,
        });

        // 3. Determine CTA
        const ctaMap: Record<number, { text: string; url: string }> = {
            1: { text: 'Buy Now', url: 'https://proserefinery.com/services#tier1' },
            2: { text: 'Book Free Consultation', url: 'https://proserefinery.com/consultation' },
            3: { text: 'Book Free Consultation', url: 'https://proserefinery.com/consultation' },
            4: { text: 'Apply for Partnership', url: 'https://proserefinery.com/apply' },
        };

        const cta = ctaMap[tierNumber] || ctaMap[2];

        // 4. Send diagnostic results email with enhanced personalization
        await sendTransactional({
            transactionalId: 'cmizisawj06lk2c0i7i6yq6pu', // diagnostic_results
            email,
            dataVariables: {
                tierName,
                failureZone: zone,
                zoneImplication,
                riskLevel,
                reasoning: `Your primary failure zone is ${zone}. ${zoneImplication} We recommend starting with ${tierName}.`,
                ctaText: cta.text,
                ctaUrl: cta.url,
            },
        });

        // 5. Trigger nurture automation with rich data
        await triggerEvent(email, 'diagnostic_completed');

        // 6. Notify admin
        await sendTransactional({
            transactionalId: 'cmj3728wl04m60jxzgzulsct9',
            email: 'hello@proserefinery.com',
            dataVariables: {
                type: 'Diagnostic Completed',
                name: 'Anonymous',
                email: email,
                tier: tierName,
                title: 'N/A',
                genre: 'N/A',
                wordcount: answers?.wordcount ? `${answers.wordcount}` : 'N/A',
                pitch: `Need: T${result?.needTier} | Budget: T${result?.budgetTier} | Score: ${result?.needScore}`,
                concern: result?.isConstrained ? 'CONSTRAINED USER' : 'Aligned User'
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Diagnostic error:', error);
        // Return success even if email fails so UI doesn't break
        return NextResponse.json({ success: true, warning: 'Email processing failed' }, { status: 200 });
    }
}
