'use client';

import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const submitButtonRef = useRef<HTMLButtonElement>(null);

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

      // Focus trap
      if (e.key === 'Tab') {
        const focusableElements = [
          emailInputRef.current,
          submitButtonRef.current,
          closeButtonRef.current,
        ].filter(Boolean) as HTMLElement[];

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-slate-900 border border-[#D4AF37]/30 rounded-2xl p-8 shadow-2xl"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 rounded-lg p-1"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="text-center mb-6">
              <h2
                id="modal-title"
                className="text-2xl md:text-3xl font-serif text-white mb-2"
              >
                Read Chapter 1 Free
              </h2>
              <p className="text-slate-400">
                Enter your email to unlock the first chapter of AIYE.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white
                    placeholder-slate-500 transition-all duration-300
                    focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <button
                ref={submitButtonRef}
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="w-full px-6 py-3 bg-[#D4AF37] text-slate-900 rounded-lg font-bold
                  transition-all duration-300 hover:bg-[#E5C158] active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-offset-2 focus:ring-offset-slate-900
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D4AF37] disabled:active:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Get Free Chapter'
                )}
              </button>
            </form>

            {/* Privacy Notice */}
            <p className="mt-4 text-xs text-slate-500 text-center">
              We respect your privacy. Your email will only be used to send you the free
              chapter and occasional updates about AIYE. You can unsubscribe at any time.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
