import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { upsertContact, triggerEvent } from '@/lib/loops';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia' as any, // Use latest or matching package version
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    if (!webhookSecret) {
        console.error('Missing STRIPE_WEBHOOK_SECRET');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_details?.email;
        const metadata = session.metadata || {};
        const productKey = metadata.product_key;
        const isPreview = metadata.is_preview === 'true';

        if (email) {
            console.log(`Processing purchase for: ${email}. Product: ${productKey || 'Unknown'}`);

            // Logic: 
            // - Tier 3 Preview -> "Preview Lead" (Not full Client yet)
            // - Anything else -> "Client"

            const userGroup = isPreview ? 'Preview Lead' : 'Client';
            const eventName = isPreview ? 'tier3_preview_purchased' : 'purchase_successful';

            // 1. Upsert Contact
            const contactResult = await upsertContact({
                email,
                userGroup: userGroup, // 'Client' or 'Preview Lead'
                status: 'Active',
                source: 'Payment (Stripe)',
                purchased_product: productKey || 'unknown', // Custom field in Loops
                customer_value: String(session.amount_total ? session.amount_total / 100 : 0)
            });

            if (contactResult.error) {
                console.error('Failed to update Loops contact:', contactResult.error);
            }

            // 2. Trigger Event
            // 'tier3_preview_purchased' -> Triggers specific onboarding
            // 'purchase_successful' -> Generic onboarding
            const eventResult = await triggerEvent(email, eventName);

            if (eventResult.error) {
                console.error(`Failed to trigger Loops event (${eventName}):`, eventResult.error);
            }

            // 3. Send Transactional Email (Tier 3 Preview)
            // User provided specific ID for this: cmj37e3n605wa0jvdew8dkajm
            if (isPreview) {
                const emailResult = await sendTransactional({
                    transactionalId: 'cmj37e3n605wa0jvdew8dkajm',
                    email,
                    dataVariables: {
                        product: productKey || 'Tier 3 Preview',
                        value: String(session.amount_total ? session.amount_total / 100 : 0)
                    }
                });

                if (emailResult.error) {
                    console.error('Failed to send Tier 3 Preview transactional email:', emailResult.error);
                }
            }
        }
    }

    return NextResponse.json({ received: true });
}
