import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
import { upsertContact, triggerEvent, sendTransactional } from '@/lib/loops';

// Resend client for ebook delivery emails
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Blob URL for the ebook download
const EBOOK_DOWNLOAD_URL = 'https://f0e5knulzhuf6ooz.public.blob.vercel-storage.com/downloads/children-of-aiye-vol1-premium.epub';

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
        const isEbook = metadata.is_ebook === 'true' || productKey === 'children_of_aiye_ebook';

        // Use Stripe event ID for idempotency in downstream calls
        const idempotencyKey = event.id;

        if (email) {
            console.log(`Processing purchase for: ${email}. Product: ${productKey || 'Unknown'}. Event: ${idempotencyKey}`);

            // Handle ebook purchase - send delivery email via Resend
            if (isEbook && resend) {
                await handleEbookPurchase(session, email);
            }

            // Logic: 
            // - Tier 3 Preview -> "Preview Lead" (Not full Client yet)
            // - Anything else -> "Client"

            const userGroup = isPreview ? 'Preview Lead' : 'Client';
            const eventName = isPreview ? 'tier3_preview_purchased' : 'purchase_successful';

            // 1. Upsert Contact (Loops handles deduping contacts by email, so explicit idempotency key might not be needed for contact creation itself, but good for tracking)
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

            // 2. Trigger Event with Idempotency Key
            // 'tier3_preview_purchased' -> Triggers specific onboarding
            // 'purchase_successful' -> Generic onboarding
            const eventResult = await triggerEvent(
                email,
                eventName,
                {
                    product: productKey,
                    value: session.amount_total ? session.amount_total / 100 : 0
                }
            );

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

// Handle ebook purchase - send delivery email
async function handleEbookPurchase(session: Stripe.Checkout.Session, email: string) {
    const orderId = session.id.slice(-12).toUpperCase();
    const purchaseDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    console.log(`[Webhook] Processing ebook purchase for ${email}`);

    try {
        const { data, error } = await resend!.emails.send({
            from: 'Prose Refinery <hello@proserefinery.com>',
            to: email,
            subject: 'Your copy of Children of Aiyé is ready',
            html: generateEbookPurchaseEmail({
                downloadUrl: EBOOK_DOWNLOAD_URL,
                orderId,
                purchaseDate,
            }),
        });

        if (error) {
            console.error('[Webhook] Failed to send ebook email:', error);
        } else {
            console.log(`[Webhook] Ebook email sent successfully to ${email}, ID: ${data?.id}`);
        }
    } catch (error) {
        console.error('[Webhook] Error sending ebook email:', error);
    }
}

// Generate ebook purchase email HTML
function generateEbookPurchaseEmail(params: {
    downloadUrl: string;
    orderId: string;
    purchaseDate: string;
}): string {
    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <title>Your copy of Children of Aiyé is ready</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <style type="text/css">body, table, td, p, a { font-family: Georgia, 'Times New Roman', serif !important; }</style>
  <![endif]-->
  <style>
    html, body { margin: 0 !important; padding: 0 !important; background-color: #020817; }
    * { box-sizing: border-box; }
    table { border-spacing: 0 !important; border-collapse: collapse !important; }
    body, td, p { font-family: Georgia, 'Times New Roman', Times, serif; }
    h1, h2, h3 { font-family: Georgia, 'Times New Roman', Times, serif; color: #ffffff; font-weight: bold; margin: 0; }
    p { color: #e2e8f0; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0; }
    a { color: #fbbf24; text-decoration: underline; }
    .btn-download { display: inline-block; padding: 18px 40px; font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; color: #fbbf24 !important; text-decoration: none; letter-spacing: 1px; text-transform: uppercase; border: 2px solid #fbbf24; border-radius: 6px; background-color: transparent; }
    @media screen and (max-width: 600px) {
      .wrapper { width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .header-text { font-size: 26px !important; }
      .btn-download { padding: 16px 30px !important; }
    }
  </style>
</head>
<body width="100%" style="margin: 0; padding: 0; background-color: #020817;">
  <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #020817;">
    Download your Premium Illustrated Edition now — 20 chapters, 21 artworks, instant access.
  </div>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #020817;">
    <tr>
      <td align="center" valign="top" style="padding: 40px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%;" class="wrapper">
          <tr>
            <td align="center" style="padding-bottom: 25px;">
              <p style="margin: 0; font-size: 10px; letter-spacing: 4px; color: #9ca3af; font-family: Arial, sans-serif;">PROSE REFINERY PRESS</p>
            </td>
          </tr>
          <tr>
            <td>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a; border-radius: 2px;">
                <tr>
                  <td align="center" style="padding: 40px 30px; border-bottom: 2px solid #fbbf24; background-color: #1e293b;" class="mobile-padding">
                    <p aria-hidden="true" style="margin: 0 0 15px 0; font-size: 14px; color: #fbbf24; letter-spacing: 5px;">&#9650; &#9660; &#9650;</p>
                    <h1 class="header-text" style="font-size: 28px; letter-spacing: 1px; color: #ffffff; line-height: 1.2; margin: 0;">Your Book is Ready</h1>
                    <p style="margin: 12px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #9ca3af; font-family: Arial, sans-serif;">Children of Aiyé &bull; Volume I</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 40px;" class="mobile-padding">
                    <p style="color: #ffffff; margin-bottom: 25px; font-size: 18px;">Thank you for your purchase.</p>
                    <p style="color: #e2e8f0;">Your copy of <strong style="color: #ffffff;">Children of Aiyé: Volume I — The Divine Fall</strong> (Premium Illustrated Edition) is ready for download.</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 35px 0;">
                      <tr>
                        <td align="center">
                          <!--[if mso]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${params.downloadUrl}" style="height:54px;v-text-anchor:middle;width:240px;" arcsize="10%" strokecolor="#fbbf24" strokeweight="2px" fillcolor="#0f172a">
                            <w:anchorlock/><center style="color:#fbbf24;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;letter-spacing:1px;">DOWNLOAD YOUR EBOOK</center>
                          </v:roundrect>
                          <![endif]-->
                          <!--[if !mso]><!-->
                          <a href="${params.downloadUrl}" class="btn-download">Download Your Ebook</a>
                          <!--<![endif]-->
                        </td>
                      </tr>
                    </table>
                    <p style="text-align: center; font-size: 13px; color: #9ca3af; margin-bottom: 35px;">This download link expires in 7 days. Save your file after downloading.</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr><td style="border-top: 1px solid #334155; padding-top: 30px;"></td></tr>
                    </table>
                    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #fbbf24; margin-bottom: 20px; font-family: Arial, sans-serif;">What You've Unlocked</h2>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 25px;">
                      <tr><td style="padding: 8px 0; color: #e2e8f0; font-size: 15px;">&#10003;&nbsp;&nbsp;Complete novel (20 chapters)</td></tr>
                      <tr><td style="padding: 8px 0; color: #e2e8f0; font-size: 15px;">&#10003;&nbsp;&nbsp;21 cinematic chapter artworks</td></tr>
                      <tr><td style="padding: 8px 0; color: #e2e8f0; font-size: 15px;">&#10003;&nbsp;&nbsp;Full glossary of Yoruba terms</td></tr>
                      <tr><td style="padding: 8px 0; color: #e2e8f0; font-size: 15px;">&#10003;&nbsp;&nbsp;EPUB format (all e-readers)</td></tr>
                    </table>
                    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #fbbf24; margin-bottom: 15px; font-family: Arial, sans-serif;">Coming Free to You</h2>
                    <p style="color: #9ca3af; font-size: 14px; margin-bottom: 8px;">&#9834;&nbsp;&nbsp;Original Afrobeats soundtrack — when released</p>
                    <p style="color: #9ca3af; font-size: 14px; margin-bottom: 25px;">&#128214;&nbsp;&nbsp;Typeset PDF edition — when released</p>
                    <p style="color: #e2e8f0; font-size: 14px; font-style: italic;">We'll email you automatically when these are ready. No action needed.</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr><td style="border-top: 1px solid #334155; margin-top: 30px; padding-top: 30px;"></td></tr>
                    </table>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 25px; background-color: #1e293b; border-radius: 4px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; font-family: Arial, sans-serif;">Order Reference</p>
                          <p style="margin: 0 0 15px 0; font-size: 14px; color: #ffffff; font-family: monospace;">${params.orderId}</p>
                          <p style="margin: 0 0 5px 0; font-size: 13px; color: #9ca3af;">Amount: <span style="color: #ffffff;">£12.99</span></p>
                          <p style="margin: 0; font-size: 13px; color: #9ca3af;">Date: <span style="color: #ffffff;">${params.purchaseDate}</span></p>
                        </td>
                      </tr>
                    </table>
                    <p style="margin-top: 30px; color: #9ca3af; font-size: 14px;">Questions or issues? Reply to this email or contact <a href="mailto:support@proserefinery.com" style="color: #fbbf24;">support@proserefinery.com</a></p>
                    <p style="color: #e2e8f0; margin-top: 30px;">May the thunder remember your name.</p>
                    <p style="color: #ffffff; font-size: 18px; font-style: italic; margin: 20px 0 5px 0;">Ola</p>
                    <p style="font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Prose Refinery Press</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 25px 40px; border-top: 1px solid #1e293b;" class="mobile-padding">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="font-size: 12px; color: #9ca3af;"><a href="https://proserefinery.com/children-of-aiye" style="color: #fbbf24; text-decoration: none;">proserefinery.com/children-of-aiye</a></td>
                        <td align="right" style="font-size: 12px; color: #9ca3af;"><a href="https://instagram.com/proserefinery" style="color: #9ca3af; text-decoration: none;">@proserefinery</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 30px 20px;">
              <p aria-hidden="true" style="margin: 0 0 15px 0; font-size: 10px; color: #475569; letter-spacing: 5px;">&#9650; &#9660; &#9650;</p>
              <p style="margin: 0; font-size: 11px; color: #6b7280; font-family: Arial, sans-serif;">&#169; 2025 Prose Refinery Ltd. London, UK.</p>
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #6b7280; font-family: Arial, sans-serif;">You received this because you purchased from proserefinery.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
