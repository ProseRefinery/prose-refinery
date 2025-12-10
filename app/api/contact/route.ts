import { NextRequest, NextResponse } from 'next/server';
import { upsertContact, sendTransactional, triggerEvent } from '@/lib/loops';

export async function POST(req: NextRequest) {
  try {
    const { name, email, tier, title, genre, wordcount, pitch, concern } = await req.json();

    // 1. Add/update contact
    await upsertContact({
      email,
      firstName: name.split(' ')[0],
      source: 'contact_form',
      recommendedTier: tier,
      manuscriptTitle: title,
      genre,
    });

    // 2. Send confirmation to user
    await sendTransactional({
      transactionalId: 'cmizjcvhm1ew9400i8gugjqh9', // contact_confirmation
      email,
      dataVariables: {
        firstName: name.split(' ')[0],
        manuscriptTitle: title || 'your manuscript',
      },
    });

    // 3. Trigger event for automation
    await triggerEvent(email, 'contact_submitted');

    // 4. Notify yourself via Loops
    await sendTransactional({
      transactionalId: 'cmizjozwy1agq2x0iz2qa6sca', // admin_notification
      email: 'hello@proserefinery.com',
      dataVariables: {
        type: 'Contact Form',
        name,
        email,
        tier,
        title,
        genre,
        wordcount,
        pitch,
        concern,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
