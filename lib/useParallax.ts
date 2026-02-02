'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from './gsap';

/**
 * Creates a parallax effect on an element during scroll
 * Perfect for hero background images to add cinematic depth
 */
export function useParallax(
  elementRef: React.RefObject<HTMLElement | null>,
  options: {
    speed?: number; // Parallax speed (0.1 = subtle, 0.5 = dramatic)
    direction?: 'up' | 'down';
  } = {}
) {
  const { speed = 0.3, direction = 'up' } = options;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const element = elementRef.current;
    if (!element) return;

    const yMovement = direction === 'up' ? -100 * speed : 100 * speed;

    const animation = gsap.to(element, {
      y: yMovement,
      ease: 'none',
      scrollTrigger: {
        trigger: element.parentElement || element,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element || trigger.trigger === element.parentElement) {
          trigger.kill();
        }
      });
    };
  }, [elementRef, speed, direction]);
}

/**
 * Creates a scale effect on scroll - great for hero sections
 * Element scales slightly as user scrolls past
 */
export function useScrollScale(
  elementRef: React.RefObject<HTMLElement | null>,
  options: {
    startScale?: number;
    endScale?: number;
  } = {}
) {
  const { startScale = 1, endScale = 1.1 } = options;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const element = elementRef.current;
    if (!element) return;

    gsap.set(element, { scale: startScale });

    const animation = gsap.to(element, {
      scale: endScale,
      ease: 'none',
      scrollTrigger: {
        trigger: element.parentElement || element,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, [elementRef, startScale, endScale]);
}

/**
 * Creates a cinematic fade-out as user scrolls past hero
 * Content fades and rises slightly
 */
export function useHeroFade(
  contentRef: React.RefObject<HTMLElement | null>,
  options: {
    fadeDistance?: number; // How far to scroll before fully faded (vh)
  } = {}
) {
  const { fadeDistance = 50 } = options;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const content = contentRef.current;
    if (!content) return;

    const animation = gsap.to(content, {
      opacity: 0,
      y: -50,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: content.parentElement || content,
        start: 'top top',
        end: `${fadeDistance}% top`,
        scrub: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, [contentRef, fadeDistance]);
}
