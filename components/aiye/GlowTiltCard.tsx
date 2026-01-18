'use client';

import { useState, useRef, useEffect, ReactNode, MouseEvent } from 'react';

interface GlowTiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: 'gold' | 'emerald' | 'purple' | 'red';
}

/**
 * GlowTiltCard - Combines BeamCard's rotating glow border with TiltCard's 3D perspective
 * Specifically designed for Children of Aiyé landing page
 *
 * Desktop: Beam effect on hover
 * Mobile: Beam effect on scroll into view
 */
export function GlowTiltCard({
  children,
  className = '',
  maxTilt = 8,
  glowColor = 'gold'
}: GlowTiltCardProps) {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver for mobile scroll-triggered effect
  // Uses a narrow center zone so only ~1 card glows at a time
  useEffect(() => {
    if (!isMobile || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        // Create a narrow 20% tall "active zone" in the center of the viewport
        // Top 40% and bottom 40% are excluded, leaving middle 20%
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0.1 // Trigger when 10% of card enters the center zone
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isMobile]);

  // Show effect: hover on desktop, in-view on mobile
  const showEffect = isMobile ? isInView : isHovered;

  const colors = {
    gold: {
      primary: 'rgb(212 175 55)',      // #D4AF37
      secondary: 'rgb(229 193 88)',    // #E5C158
      glow: 'rgba(212, 175, 55, 0.3)',
      radial: 'rgba(212, 175, 55, 0.15)'
    },
    emerald: {
      primary: 'rgb(16 185 129)',
      secondary: 'rgb(52 211 153)',
      glow: 'rgba(16, 185, 129, 0.3)',
      radial: 'rgba(16, 185, 129, 0.15)'
    },
    purple: {
      primary: 'rgb(168 85 247)',
      secondary: 'rgb(192 132 252)',
      glow: 'rgba(168, 85, 247, 0.3)',
      radial: 'rgba(168, 85, 247, 0.15)'
    },
    red: {
      primary: 'rgb(239 68 68)',
      secondary: 'rgb(248 113 113)',
      glow: 'rgba(239, 68, 68, 0.3)',
      radial: 'rgba(239, 68, 68, 0.15)'
    }
  };

  const colorScheme = colors[glowColor];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * maxTilt;

    // Track glow position
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;

    setTransform({ rotateX, rotateY });
    setGlowPos({ x: glowX, y: glowY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setGlowPos({ x: 50, y: 50 });
    setIsHovered(false);
  };

  // Scale up when effect triggers (hover on desktop, scroll into active zone on mobile)
  const scale = showEffect ? 1.03 : 1;

  return (
    <div
      ref={ref}
      className={`relative group ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
        transition: 'all 350ms cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy easing
        filter: showEffect ? 'saturate(1.2) contrast(1.1)' : 'saturate(1) contrast(1)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated scanning beam border */}
      <div
        className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none transition-opacity duration-500"
        style={{
          zIndex: 0,
          opacity: showEffect ? 1 : 0
        }}
      >
        {/* Rotating conic gradient - the scanning beam */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(
              from var(--beam-angle, 0deg) at 50% 50%,
              transparent 0deg,
              transparent 60deg,
              ${colorScheme.primary} 80deg,
              ${colorScheme.secondary} 90deg,
              ${colorScheme.primary} 100deg,
              transparent 120deg,
              transparent 360deg
            )`,
            animation: 'beam-spin 3s linear infinite'
          }}
        />
        {/* Inner mask to create border effect */}
        <div className="absolute inset-[2px] rounded-xl bg-[#0a0a0a]" />
      </div>

      {/* Static border (visible when effect not showing) */}
      <div
        className="absolute inset-0 rounded-xl border border-[#D4AF37]/20 transition-colors duration-300 pointer-events-none"
        style={{
          zIndex: 1,
          borderColor: showEffect ? 'transparent' : 'rgba(212, 175, 55, 0.2)'
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-500"
        style={{
          zIndex: 0,
          opacity: showEffect ? 1 : 0,
          boxShadow: `0 0 40px ${colorScheme.glow}, inset 0 0 20px ${colorScheme.glow}`
        }}
      />

      {/* Radial glow - centered on mobile, cursor-following on desktop */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${isMobile ? 50 : glowPos.x}% ${isMobile ? 50 : glowPos.y}%, ${colorScheme.radial} 0%, transparent 50%)`,
          zIndex: 0,
          opacity: showEffect ? 1 : 0
        }}
      />

      {/* Content */}
      <div className="relative rounded-xl h-full" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
