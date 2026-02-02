'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Make ScrollTrigger globally available for Lenis sync
  (window as any).ScrollTrigger = ScrollTrigger;
}

export { gsap, ScrollTrigger };
