'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Mail, Download } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/effects/Reveal';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { SuccessConfetti } from '@/components/effects/SuccessConfetti';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SuccessConfetti trigger={showConfetti} />

      <div className="w-full max-w-2xl text-center">
        <Reveal delay={0}>
          <div className="flex justify-center mb-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
            >
              <Check size={48} strokeWidth={3} style={{ color: '#D4AF37' }} />
            </div>
          </div>
        </Reveal>

        <ClipReveal delay={100}>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#f0f0f0', fontFamily: 'Cinzel, serif' }}
          >
            Welcome to Aiyé
          </h1>
        </ClipReveal>

        <Reveal delay={200}>
          <p
            className="text-lg sm:text-xl mb-8"
            style={{ color: '#c0c0c0', fontFamily: 'Merriweather, Georgia, serif' }}
          >
            Your purchase is complete. The old gods are waiting.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div
            className="rounded-xl p-6 sm:p-8 mb-8"
            style={{
              backgroundColor: '#111111',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <Mail size={24} style={{ color: '#D4AF37' }} />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-bold mb-2" style={{ color: '#f0f0f0' }}>
                  Check your email
                </h2>
                <p className="text-sm" style={{ color: '#c0c0c0' }}>
                  We've sent your download link to your email. The EPUB file is ready to download immediately.
                </p>
                <p className="text-xs mt-2" style={{ color: '#888888' }}>
                  Don't see it? Check your spam folder or contact{' '}
                  <a
                    href="mailto:support@proserefinery.com"
                    className="underline hover:text-amber-500 transition-colors"
                    style={{ color: '#D4AF37' }}
                  >
                    support@proserefinery.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div
            className="rounded-xl p-6 sm:p-8 mb-8"
            style={{ backgroundColor: '#111111', border: '1px solid #222222' }}
          >
            <h3
              className="text-sm uppercase tracking-wider mb-6"
              style={{ color: '#D4AF37', fontFamily: 'Arial, sans-serif' }}
            >
              What's Next
            </h3>

            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#1a1a1a' }}
                >
                  <Download className="w-5 h-5" style={{ color: '#D4AF37' }} />
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#f0f0f0' }}>Download your EPUB</p>
                  <p className="text-sm" style={{ color: '#888888' }}>Click the link in your email to download the file</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#1a1a1a' }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#f0f0f0' }}>Open in your e-reader</p>
                  <p className="text-sm" style={{ color: '#888888' }}>Works on Kindle, Apple Books, Kobo, and any EPUB reader</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#1a1a1a' }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium" style={{ color: '#f0f0f0' }}>Watch for bonuses</p>
                  <p className="text-sm" style={{ color: '#888888' }}>Original soundtrack & PDF arriving free when ready</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <blockquote
            className="text-lg sm:text-xl italic mb-8"
            style={{ color: '#c0c0c0', fontFamily: 'Merriweather, Georgia, serif' }}
          >
            "May the thunder remember your name."
          </blockquote>
        </Reveal>

        <Reveal delay={600}>
          <MagneticButton
            variant="gold-outline"
            href="/children-of-aiye"
            className="px-8 py-4 rounded-lg text-base"
          >
            Return to Book Page
          </MagneticButton>
        </Reveal>

        {sessionId && (
          <Reveal delay={700}>
            <p className="mt-8 text-xs" style={{ color: '#666666' }}>
              Order reference: {sessionId.slice(-12).toUpperCase()}
            </p>
          </Reveal>
        )}
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <Suspense fallback={<div className="animate-pulse bg-slate-800 rounded-lg w-full max-w-2xl h-96" />}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
