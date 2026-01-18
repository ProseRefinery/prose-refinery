'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface StickyCTAProps {
  bookTitle?: string;
  onReadChapter?: () => void;
  purchaseUrl?: string;
  price?: string;
  mobileOnly?: boolean; // Hide desktop layout, only show on mobile
}

export default function StickyCTA({
  bookTitle = 'AIYÉ',
  onReadChapter,
  purchaseUrl = '#',
  price = '£12.99',
  mobileOnly = false,
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('threat-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show CTA when sentinel is NOT intersecting (scrolled past it)
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-[#D4AF37]/30"
        >
          {/* Desktop Layout - Hidden when mobileOnly */}
          {!mobileOnly && (
          <div className="hidden md:flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
            <span className="text-white font-serif text-lg tracking-wide">
              {bookTitle}
            </span>
            <div className="flex items-center gap-4">
              <MagneticButton
                variant="gold-outline"
                onClick={onReadChapter}
                className="px-6 py-2 rounded-lg"
              >
                Read Chapter 1 Free
              </MagneticButton>
              <MagneticButton
                variant="gold"
                href={purchaseUrl}
                className="px-6 py-2 rounded-lg"
              >
                ENTER AIYÉ — {price}
              </MagneticButton>
            </div>
          </div>
          )}

          {/* Mobile Layout */}
          <div className="md:hidden p-4">
            <MagneticButton
              variant="gold"
              href={purchaseUrl}
              className="w-full px-6 py-3 rounded-lg"
            >
              ENTER AIYÉ — {price}
            </MagneticButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
