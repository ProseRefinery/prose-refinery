'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { GlowTiltCard } from './GlowTiltCard';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function LeadModal({ isOpen, onClose, onSubmit }: LeadModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus the email input when modal opens
    const timer = setTimeout(() => {
      emailInputRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      // Close on ESC
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap - cycle between email input and close button
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'input, button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    try {
      // Save email to localStorage
      localStorage.setItem('aiye_lead_email', email);

      // Call the onSubmit callback
      onSubmit(email);

      // Reset form
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-lg"
          >
            <GlowTiltCard maxTilt={4}>
              <div
                ref={modalRef}
                className="relative bg-[#0a0a0a] rounded-xl p-8 sm:p-10 overflow-hidden"
              >
            {/* Ambient Gold Glow Background */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none" />

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 text-[#a0a0a0] hover:text-[#D4AF37] transition-colors
                focus:outline-none focus:ring-1 focus:ring-[#D4AF37] rounded-full p-2 z-10"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10 text-center mb-8">
              <p className="text-xs tracking-[0.2em] text-[#D4AF37] uppercase mb-4 font-semibold">
                The Gateway
              </p>
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mb-3"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Enter the World
              </h2>
              <p
                className="text-[#a0a0a0] text-sm sm:text-base leading-relaxed"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                Join the Disciples. Unlock the full first chapter of <span className="text-[#f0f0f0] italic">Children of Àiyé</span> immediately.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={isSubmitting}
                  className="w-full px-5 py-4 bg-[#111] border border-[#333] rounded-lg text-white
                    placeholder-[#555] transition-all duration-300
                    focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]
                    disabled:opacity-50 disabled:cursor-not-allowed text-center sm:text-left"
                />
              </div>

              <MagneticButton
                type="submit"
                variant="gold"
                disabled={isSubmitting || !email.trim()}
                loading={isSubmitting}
                className="w-full px-6 py-4 rounded-lg font-bold text-base tracking-wide"
              >
                UNLOCK CHAPTER 1
              </MagneticButton>
            </form>

            {/* Privacy Notice */}
            <p className="relative z-10 mt-6 text-[10px] text-[#555] text-center uppercase tracking-wider">
              No Spam. Only Myths. Unsubscribe Anytime.
            </p>
              </div>
            </GlowTiltCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
