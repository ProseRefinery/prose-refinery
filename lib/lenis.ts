'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger if available
    if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
      lenis.on('scroll', (window as any).ScrollTrigger.update);
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
