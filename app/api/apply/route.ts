import { NextRequest, NextResponse } from 'next/server';
import { upsertContact, sendTransactional, triggerEvent } from '@/lib/loops';

export async function POST(req: NextRequest) {
  try {
    const { name, email, title, genre, wordcount, pitch, whyTier4, timeline, referral } = await req.json();

    // 1. Add contact with Tier 4 flag
    await upsertContact({
      email,
      firstName: name.split(' ')[0],
      source: 'tier4_application',
      recommendedTier: 'Tier 4',
      manuscriptTitle: title,
      genre,
    });

    // 2. Send confirmation
    await sendTransactional({
      transactionalId: 'cmizjj9tu1d7r490iczanyloc', // application_confirmation
      email,
      dataVariables: {
        firstName: name.split(' ')[0],
        manuscriptTitle: title || 'your project',
      },
    });

    // 3. Trigger event
    await triggerEvent(email, 'tier4_applied');

    // 4. Notify yourself
    await sendTransactional({
      transactionalId: 'cmizjozwy1agq2x0iz2qa6sca', // admin_notification
      email: 'hello@proserefinery.com', // Admin email
      dataVariables: {
        type: 'Tier 4 Application',
        name,
        email,
        title,
        genre,
        wordcount,
        pitch,
        whyTier4,
        timeline,
        referral,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
