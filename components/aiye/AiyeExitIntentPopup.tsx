'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function AiyeExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already shown (Persistent across sessions)
    const isBlocked = typeof window !== 'undefined' && localStorage.getItem('aiyeExitPopupShown');

    if (isBlocked) {
      console.log('Aiye Exit Intent: Blocked by localStorage');
      return;
    }

    // Desktop: Mouse Leave (Exit Intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('aiyeExitPopupShown')) {
        setShow(true);
        localStorage.setItem('aiyeExitPopupShown', 'true');
      }
    };

    // Mobile: Timer Fallback - 45 seconds
    const timer = setTimeout(() => {
      if (!localStorage.getItem('aiyeExitPopupShown')) {
        setShow(true);
        localStorage.setItem('aiyeExitPopupShown', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);

    try {
      // Save to localStorage
      localStorage.setItem('aiye_lead_email', email);

      // Send to API
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'aiye-exit-intent' }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to submit', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadChapter = () => {
    setShow(false);
    window.location.href = '/children-of-aiye/chapter-1';
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
      <div
        className="relative bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-xl p-8 sm:p-10 max-w-md w-full shadow-2xl"
        style={{
          boxShadow: '0 0 60px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(212, 175, 55, 0.1)'
        }}
      >
        {/* Ambient glow */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none" />

        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-[#666] hover:text-[#D4AF37] transition-colors z-10"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-4 relative z-10">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h3
              className="text-xl font-bold text-[#f0f0f0] mb-3"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              The Archive Remembers
            </h3>
            <p
              className="text-[#a0a0a0] mb-6"
              style={{ fontFamily: 'Merriweather, Georgia, serif' }}
            >
              Chapter 1 is waiting. Check your inbox.
            </p>
            <MagneticButton
              variant="gold"
              onClick={handleReadChapter}
              className="px-6 py-3 rounded-lg"
            >
              Read Now
            </MagneticButton>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="text-center mb-6">
              <p className="text-xs tracking-[0.2em] text-[#D4AF37] uppercase mb-3 font-semibold">
                Before You Go
              </p>
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mb-4"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Your gods are waiting.
              </h3>
              <p
                className="text-[#a0a0a0] text-sm sm:text-base leading-relaxed"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                One chapter. Free. See if this is home.
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-5 py-4 bg-[#111] border border-[#333] rounded-lg text-white text-center
                  placeholder-[#555] transition-all duration-300
                  focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              />
              <MagneticButton
                variant="gold"
                onClick={handleSubmit}
                disabled={loading || !email.trim()}
                loading={loading}
                className="w-full px-6 py-4 rounded-lg font-bold"
              >
                UNLOCK CHAPTER 1
              </MagneticButton>
            </div>

            <p className="text-[10px] text-[#555] mt-4 text-center uppercase tracking-wider">
              No spam. Only myths. Unsubscribe anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
