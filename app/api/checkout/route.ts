import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia', // Use latest stable API version or match what is installed
});

export async function POST(req: Request) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('CRITICAL: STRIPE_SECRET_KEY is missing in environment variables.');
            return NextResponse.json({ error: 'Server configuration error: Missing Stripe Key' }, { status: 500 });
        }

        const body = await req.json();
        const { priceId, successUrl = '/success', cancelUrl = '/cancel' } = body;

        console.log(`[Checkout] Attempting checkout for Price ID: ${priceId}`);

        if (!priceId) {
            console.error('[Checkout] Error: Price ID is missing in request body.');
            return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}${successUrl}`,
            cancel_url: `${req.headers.get('origin')}${cancelUrl}`,
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
