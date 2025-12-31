'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

interface ReaderProgressProps {
  className?: string;
}

export default function ReaderProgress({ className = '' }: ReaderProgressProps) {
  const { scrollYProgress } = useScroll();

  // Apply spring physics for smoother animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-[#D4AF37] ${className}`}
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
