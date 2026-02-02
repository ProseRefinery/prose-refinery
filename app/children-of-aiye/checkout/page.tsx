'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Check, ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/effects/Reveal';
import { STRIPE_PRICES } from '@/lib/constants';

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: STRIPE_PRICES.children_of_aiye_ebook,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="w-full max-w-lg">
        {/* Main Card */}
        <Reveal delay={0}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: '#111111',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}
          >
            {/* Cover Image Header */}
            <div className="relative h-48 sm:h-56">
              <Image
                src="/children-of-aiye/cover-premium.jpg"
                alt="Children of Aiyé - Premium Illustrated Edition"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 -mt-8 relative">
              {/* Badge */}
              <div className="flex justify-center mb-4">
                <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full">
                  Premium Illustrated Edition
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-xl sm:text-2xl font-bold text-center mb-2"
                style={{ color: '#f0f0f0', fontFamily: 'Cinzel, serif' }}
              >
                Children of Aiyé
              </h1>
              <p
                className="text-sm text-center mb-6"
                style={{ color: '#888888' }}
              >
                Volume I: The Divine Fall
              </p>

              {/* Price */}
              <div className="text-center mb-6">
                <span
                  className="text-4xl sm:text-5xl font-bold"
                  style={{ color: '#D4AF37', fontFamily: 'Cinzel, serif' }}
                >
                  £12.99
                </span>
              </div>

              {/* What's Included */}
              <div className="mb-6 space-y-3">
                {[
                  'Complete novel (20 chapters)',
                  '21 cinematic chapter artworks',
                  'Full glossary of Yoruba terms',
                  'EPUB format (all e-readers)',
                  'Free future soundtrack & PDF upgrades',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span className="text-sm" style={{ color: '#c0c0c0' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400 text-center">{error}</p>
                </div>
              )}

              {/* Checkout Button */}
              <MagneticButton
                variant="gold"
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full px-6 py-4 rounded-lg text-base font-bold"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Connecting to Stripe...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Buy Now <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </MagneticButton>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" style={{ color: '#666666' }} />
                <span className="text-xs" style={{ color: '#666666' }}>
                  Secure checkout powered by Stripe
                </span>
              </div>

              {/* Guarantee */}
              <p
                className="mt-4 text-center text-xs"
                style={{ color: '#888888' }}
              >
                14-day satisfaction guarantee. Not for you? Full refund.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/children-of-aiye"
            className="text-sm transition-colors duration-200 hover:text-amber-500"
            style={{ color: '#888888' }}
          >
            &larr; Return to book page
          </Link>
        </div>
      </div>
    </div>
  );
}
