'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQ({ items, className = '' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`border rounded-lg overflow-hidden transition-colors duration-300 ${
              isOpen
                ? 'border-[#D4AF37]/50 bg-slate-800/50'
                : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
            }`}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left
                focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-inset"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span
                className={`font-medium transition-colors duration-300 ${
                  isOpen ? 'text-[#D4AF37]' : 'text-white'
                }`}
              >
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`flex-shrink-0 ml-4 transition-colors duration-300 ${
                  isOpen ? 'text-[#D4AF37]' : 'text-slate-400'
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0">
                    <div className="border-t border-slate-700/50 pt-4">
                      <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
