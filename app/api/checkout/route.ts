import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover' as any,
});

export async function POST(req: NextRequest) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('CRITICAL: STRIPE_SECRET_KEY is missing in environment variables.');
            return NextResponse.json({ error: 'Server configuration error: Missing Stripe Key' }, { status: 500 });
        }

        const body = await req.json();
        const { priceId } = body;

        console.log(`[Checkout] Attempting checkout for Price ID: ${priceId}`);

        if (!priceId) {
            console.error('[Checkout] Error: Price ID is missing in request body.');
            return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.nextUrl.origin}/services`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json(
            { error: err.message || 'An error occurred during checkout.' },
            { status: 500 }
        );
    }
}
