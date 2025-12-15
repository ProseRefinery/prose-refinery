'use client';

import { CheckoutButton } from '@/components/ui/checkout-button';
import { STRIPE_PRICES } from '@/lib/constants';

export default function DebugPage() {
    return (
        <div className="min-h-screen pt-32 px-4 text-center">
            <h1 className="text-2xl text-white mb-8">Stripe Debug Page</h1>
            <p className="text-slate-400 mb-8">
                Price ID: {STRIPE_PRICES.tier1_hook}
            </p>
            <CheckoutButton
                priceId={STRIPE_PRICES.tier1_hook}
                className="bg-emerald-500 text-white px-8 py-4 rounded"
            >
                Test Buy Now (Fresh)
            </CheckoutButton>
        </div>
    );
}
