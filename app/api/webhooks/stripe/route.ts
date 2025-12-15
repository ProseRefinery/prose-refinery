import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { upsertContact, triggerEvent, sendTransactional } from '@/lib/loops';

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Helper to get Stripe client safely at runtime
function getStripe(): Stripe {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");

    return new Stripe(key, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        apiVersion: "2024-12-18.acacia" as any, // Preserving existing version preference
    });
}

export async function POST(req: NextRequest) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // Fail fast if config is missing
    if (!webhookSecret) {
        console.error('Missing STRIPE_WEBHOOK_SECRET');
        return NextResponse.json(
            { error: "Missing STRIPE_WEBHOOK_SECRET" },
            { status: 500 }
        );
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
        return NextResponse.json(
            { error: "Missing stripe-signature header" },
            { status: 400 }
        );
    }

    // IMPORTANT: must be raw body for signature verification
    const rawBody = await req.text();

    let event: Stripe.Event;
    try {
        const stripe = getStripe();
        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown invalid signature';
        console.error(`Webhook Error: ${errorMessage}`);
        return NextResponse.json(
            { error: `Webhook Error: ${errorMessage}` },
            { status: 400 }
        );
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_details?.email;
        const metadata = session.metadata || {};
        const productKey = metadata.product_key;
        const isPreview = metadata.is_preview === 'true';

        // Use Stripe event ID for idempotency in downstream calls
        const idempotencyKey = event.id;

        if (email) {
            console.log(`Processing purchase for: ${email}. Product: ${productKey || 'Unknown'}. Event: ${idempotencyKey}`);

            // Logic: 
            // - Tier 3 Preview -> "Preview Lead" (Not full Client yet)
            // - Anything else -> "Client"

            const userGroup = isPreview ? 'Preview Lead' : 'Client';
            const eventName = isPreview ? 'tier3_preview_purchased' : 'purchase_successful';

            // 1. Upsert Contact
            const contactResult = await upsertContact({
                email,
                userGroup: userGroup,
                status: 'Active',
                source: 'Payment (Stripe)',
                purchased_product: productKey || 'unknown',
                customer_value: String(session.amount_total ? session.amount_total / 100 : 0)
            });

            if (contactResult.error) {
                console.error('Failed to update Loops contact:', contactResult.error);
            }

            // 2. Trigger Event with Idempotency Key
            const eventResult = await triggerEvent(
                email,
                eventName,
                {
                    product: productKey,
                    value: session.amount_total ? session.amount_total / 100 : 0
                },
                idempotencyKey
            );

            if (eventResult.error) {
                console.error(`Failed to trigger Loops event (${eventName}):`, eventResult.error);
            }

            // 3. Send Transactional Email (Tier 3 Preview)
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
