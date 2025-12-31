'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function CheckoutPage() {
  const [email, setEmail] = useState('');

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center"
          style={{
            backgroundColor: '#111111',
            border: '1px solid #222222'
          }}
        >
          {/* Lock Icon */}
          <div className="flex justify-center mb-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
            >
              <Lock
                size={40}
                style={{ color: '#d4af37' }}
              />
            </div>
          </div>

          {/* Headline */}
          <h1
            className="text-2xl md:text-3xl font-serif mb-4"
            style={{ color: '#f0f0f0' }}
          >
            Payment Gateway Opening Soon
          </h1>

          {/* Subtext */}
          <p
            className="text-base mb-8 leading-relaxed"
            style={{ color: '#888888' }}
          >
            We&apos;re putting the finishing touches on our secure checkout. Leave your email to be notified the moment it&apos;s live.
          </p>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg text-base transition-all duration-200 outline-none"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333333',
                color: '#f0f0f0',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#d4af37';
                e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#333333';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Disabled Button */}
          <MagneticButton
            variant="gold"
            disabled
            className="w-full px-6 py-4 rounded-lg"
          >
            Connecting Payment...
          </MagneticButton>

          {/* Support Text */}
          <p
            className="mt-8 text-sm"
            style={{ color: '#666666' }}
          >
            Questions? Email{' '}
            <a
              href="mailto:support@proserefinery.com"
              className="underline transition-colors duration-200 hover:text-amber-500"
              style={{ color: '#888888' }}
            >
              support@proserefinery.com
            </a>
          </p>
        </div>

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
