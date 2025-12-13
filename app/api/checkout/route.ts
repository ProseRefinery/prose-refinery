import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { STRIPE_PRICES } from '@/lib/constants';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
    })
    : null;

export async function POST(req: NextRequest) {
    try {
        if (!process.env.STRIPE_SECRET_KEY || !stripe) {
            console.error('CRITICAL: STRIPE_SECRET_KEY is missing in environment variables.');
            return NextResponse.json({ error: 'Server configuration error: Missing Stripe Key' }, { status: 500 });
        }

        const body = await req.json();
        const { priceId } = body;

        console.log(`[Checkout v2.2] Attempting checkout for Price ID: ${priceId}`);

        if (!priceId) {
            console.error('[Checkout] Error: Price ID is missing in request body.');
            return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
        }

        // Reverse lookup to identify the product/tier
        const productKey = Object.keys(STRIPE_PRICES).find(
            (key) => STRIPE_PRICES[key as keyof typeof STRIPE_PRICES] === priceId
        );

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: {
                product_key: productKey || 'unknown',
                // Add explicit logic for Tier 3 Preview identification
                is_preview: productKey === 'tier3_preview' ? 'true' : 'false'
            },
            success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.nextUrl.origin}/services`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err: unknown) {
        console.error('Stripe Checkout Error:', err);
        const errorMessage = err instanceof Error ? err.message : 'An error occurred during checkout.';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
