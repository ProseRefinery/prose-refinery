'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from './gsap';

interface HeroAnimationOptions {
  // CSS selectors for elements to animate
  preHeadlineSelector?: string;
  headlineSelector?: string;
  subHeadlineSelector?: string;
  ctaSelector?: string;
  // Timing
  staggerDelay?: number;
  duration?: number;
}

export function useHeroAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
  options: HeroAnimationOptions = {}
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const {
    preHeadlineSelector = '[data-hero-pre]',
    headlineSelector = '[data-hero-headline]',
    subHeadlineSelector = '[data-hero-sub]',
    ctaSelector = '[data-hero-cta]',
    staggerDelay = 0.15,
    duration = 1.2,
  } = options;

  useEffect(() => {
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const container = containerRef.current;
    if (!container) return;

    // Create the cinematic timeline
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
        duration,
      },
    });

    // Find elements
    const preHeadline = container.querySelector(preHeadlineSelector);
    const headline = container.querySelector(headlineSelector);
    const subHeadline = container.querySelector(subHeadlineSelector);
    const ctas = container.querySelectorAll(ctaSelector);

    // Set initial state (hidden, transformed)
    gsap.set([preHeadline, headline, subHeadline, ...Array.from(ctas)].filter(Boolean), {
      opacity: 0,
      y: 40,
    });

    // Build the cinematic entrance sequence
    // Pre-headline fades in first
    if (preHeadline) {
      tl.to(preHeadline, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      });
    }

    // Main headline with dramatic entrance
    if (headline) {
      tl.to(
        headline,
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
        },
        preHeadline ? '-=0.4' : 0
      );
    }

    // Sub-headlines stagger in
    if (subHeadline) {
      tl.to(
        subHeadline,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        '-=0.8'
      );
    }

    // CTAs enter with bounce
    if (ctas.length > 0) {
      tl.to(
        Array.from(ctas),
        {
          opacity: 1,
          y: 0,
          stagger: staggerDelay,
          duration: 0.8,
          ease: 'back.out(1.2)',
        },
        '-=0.5'
      );
    }

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [
    containerRef,
    preHeadlineSelector,
    headlineSelector,
    subHeadlineSelector,
    ctaSelector,
    staggerDelay,
    duration,
  ]);

  return timelineRef;
}

/**
 * Hook for scroll-triggered section reveals
 * Creates a cinematic fade-up effect as sections enter viewport
 */
export function useSectionReveal(
  sectionRef: React.RefObject<HTMLElement | null>,
  options: {
    triggerStart?: string;
    duration?: number;
    y?: number;
  } = {}
) {
  const { triggerStart = 'top 80%', duration = 1, y = 60 } = options;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const section = sectionRef.current;
    if (!section) return;

    // Set initial state
    gsap.set(section, {
      opacity: 0,
      y,
    });

    // Create ScrollTrigger animation
    const animation = gsap.to(section, {
      opacity: 1,
      y: 0,
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: triggerStart,
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [sectionRef, triggerStart, duration, y]);
}
