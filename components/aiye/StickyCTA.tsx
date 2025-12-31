'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyCTAProps {
  bookTitle?: string;
  onReadChapter?: () => void;
  purchaseUrl?: string;
  price?: string;
}

export default function StickyCTA({
  bookTitle = 'AIYÉ',
  onReadChapter,
  purchaseUrl = '#',
  price = '£12.99',
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
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
            <span className="text-white font-serif text-lg tracking-wide">
              {bookTitle}
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={onReadChapter}
                className="px-6 py-2 text-[#D4AF37] border border-[#D4AF37] rounded-lg font-medium
                  transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#E5C158]
                  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
              >
                Read Chapter 1 Free
              </button>
              <a
                href={purchaseUrl}
                className="px-6 py-2 bg-[#D4AF37] text-slate-900 rounded-lg font-bold
                  transition-all duration-300 hover:bg-[#E5C158] hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                ENTER AIYE — {price}
              </a>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden p-4">
            <a
              href={purchaseUrl}
              className="block w-full text-center px-6 py-3 bg-[#D4AF37] text-slate-900 rounded-lg font-bold
                transition-all duration-300 hover:bg-[#E5C158] active:scale-95
                focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            >
              ENTER AIYE — {price}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
