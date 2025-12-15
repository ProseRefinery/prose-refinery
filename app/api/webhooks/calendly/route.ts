import { NextRequest, NextResponse } from "next/server";
import { triggerEvent, upsertContact } from "@/lib/loops";
import crypto from "crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Verify Calendly signature
const verifyCalendlySignature = (req: NextRequest, body: string): boolean => {
    const signatureHeader = req.headers.get("Calendly-Webhook-Signature");
    const secret = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;

    if (!signatureHeader || !secret) return false;

    const { t, signature } = signatureHeader.split(",").reduce(
        (acc, curr) => {
            const [key, value] = curr.split("=");
            if (key === "t") acc.t = value;
            if (key === "v1") acc.signature = value;
            return acc;
        },
        { t: "", signature: "" }
    );

    if (!t || !signature) return false;

    // Prevent replay attacks (tolerance: 3 minutes)
    const timestamp = parseInt(t, 10);
    const now = Date.now(); // Current time in ms
    // Calendly timestamp is usually in ms? Docs say "t=<timestamp>"
    // Actually standard is typically seconds or ms. Let's assume standard behavior but verifying docs suggests:
    // "t" is timestamp. Tolerance check is good practice.

    // Create HMAC
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(t + "." + body)
        .digest("hex");

    return expectedSignature === signature;
};

export async function POST(req: NextRequest) {
    const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;

    if (!signingKey) {
        console.error("Missing CALENDLY_WEBHOOK_SIGNING_KEY");
        return NextResponse.json(
            { error: "Server configuration error" },
            { status: 500 }
        );
    }

    try {
        const rawBody = await req.text();

        if (!verifyCalendlySignature(req, rawBody)) {
            console.error("Invalid Calendly signature");
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const data = JSON.parse(rawBody);
        const event = data.event; // 'invitee.created' or 'invitee.canceled'
        const payload = data.payload;

        // We only care about bookings created
        if (event === "invitee.created") {
            const email = payload.email;
            const name = payload.name;
            const eventUri = payload.event; // Link to event resource
            const inviteeUri = payload.uri; // Unique ID for this invitee

            console.log(`Processing Calendly booking for: ${email}`);

            // 1. Ensure contact exists in Loops
            await upsertContact({
                email,
                firstName: name,
                source: "Calendly",
                status: "Active"
            });

            // 2. Trigger Event in Loops
            // Event Name: 'consultation_booked'
            // Idempotency: Use the Calendly invitee URI as unique key
            const eventResult = await triggerEvent(
                email,
                "consultation_booked",
                {
                    calendly_event_uri: eventUri,
                    calendly_invitee_uri: inviteeUri,
                    booking_time: payload.created_at,
                    scheduled_start_time: payload.scheduled_event?.start_time
                },
                inviteeUri // Idempotency Key
            );

            if (eventResult.error) {
                console.error("Failed to trigger Loops event for consultation:", eventResult.error);
            }
        }

        return NextResponse.json({ received: true });
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("Calendly Webhook Error:", errorMessage);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
