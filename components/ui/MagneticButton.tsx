'use client';

import { useRef, ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useHaptic } from '@/hooks/useHaptic';

interface MagneticButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'ghost';
    href?: string;
    disabled?: boolean;
    loading?: boolean;
}

/**
 * MagneticButton 2.0 - Physics-based interaction
 * Mobile: Instant active scale (no drag)
 * Desktop: Spring-based magnetic pull
 */
export function MagneticButton({
    children,
    onClick,
    className = '',
    type = 'button',
    variant = 'primary',
    href,
    disabled = false,
    loading = false
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const { trigger } = useHaptic();
    const [isMobile, setIsMobile] = useState(false);

    // Physics Configuration
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }; // Lightweight, snappy
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        // Simple touch detection to disable magnetic drag on mobile
        const checkMobile = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current || disabled || loading || isMobile) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * 0.35); // Magnetic pull strength
        y.set(distanceY * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handlePress = () => {
        trigger();
    };

    const baseStyles = cn(
        'relative inline-flex items-center justify-center gap-2',
        'px-5 py-2.5 rounded-md font-medium text-xs tracking-widest uppercase',
        'transition-colors duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
            'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:from-emerald-500 hover:to-emerald-400': variant === 'primary',
            'border border-slate-700/50 bg-transparent text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5': variant === 'secondary',
            'text-slate-500 hover:text-emerald-400 hover:bg-slate-800/30': variant === 'ghost'
        },
        className
    );

    const content = loading ? (
        <>
            <span className="opacity-0 flex items-center gap-2">{children}</span>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
        </>
    ) : (
        children
    );

    // Animation props for Framer Motion
    const motionProps = {
        className: baseStyles,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onTapStart: handlePress, // Instant tap detection
        whileTap: { scale: 0.95 },
        style: { x: springX, y: springY },
        transition: { type: 'spring', stiffness: 400, damping: 10 } as const // Fix TS inference
    };

    if (href && !disabled && !loading) {
        return (
            <Link href={href} legacyBehavior passHref>
                <motion.a
                    ref={ref as any}
                    {...motionProps as any}
                    onClick={onClick}
                >
                    {content}
                </motion.a>
            </Link>
        );
    }

    return (
        <motion.button
            ref={ref as any}
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            {...motionProps}
        >
            {content}
        </motion.button>
    );
}
