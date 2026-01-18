'use client';

import { useState, useRef, MouseEvent, ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface MagneticButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'gold-outline';
    href?: string;
    disabled?: boolean;
    loading?: boolean;
}

/**
 * MagneticButton - Restored original CSS-based implementation
 * Mobile: Native feel (no magnet)
 * Desktop: Magnetic pull with CSS transition (no spring bounce)
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
    const [transform, setTransform] = useState({ x: 0, y: 0 });
    const [isBouncing, setIsBouncing] = useState(false);
    const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const { trigger } = useHaptic();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current || disabled || loading || isMobile) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Original magnetic strength was strict
        setTransform({ x: distanceX * 0.2, y: distanceY * 0.2 });
    };

    const handleMouseLeave = () => {
        setTransform({ x: 0, y: 0 });
    };

    const handlePress = () => {
        if (disabled || loading) return;

        trigger((variant === 'primary' || variant === 'gold') ? 'heavy' : 'medium');

        // Trigger bounce animation
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 300);

        if (onClick) onClick();
    };

    // Bounce effect: scales down then bounces back with overshoot via cubic-bezier
    const style = {
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${isBouncing ? 0.92 : 1})`,
        transition: isBouncing
            ? 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)'
            : 'transform 200ms ease-out',
    };

    const baseStyles = cn(
        'relative inline-flex items-center justify-center gap-2',
        'px-5 py-2.5 rounded-md font-medium text-xs tracking-widest uppercase',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Note: scale/bounce is handled via JS for better control
        {
            // Primary - emerald gradient with glow
            'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:from-emerald-500 hover:to-emerald-400': variant === 'primary',
            // Secondary - ghost with border
            'border border-slate-700/50 bg-transparent text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5': variant === 'secondary',
            // Ghost - minimal
            'text-slate-500 hover:text-emerald-400 hover:bg-slate-800/30': variant === 'ghost',
            // Gold - solid gold button (for Children of Aiyé)
            'bg-[#D4AF37] text-[#0a0a0a] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-[#E5C158] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]': variant === 'gold',
            // Gold Outline - gold border button
            'border-2 border-[#D4AF37] bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0a0a]': variant === 'gold-outline'
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

    if (href && !disabled && !loading) {
        return (
            <Link
                href={href}
                ref={ref as any}
                className={baseStyles}
                style={style}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handlePress} // Use handlePress to trigger haptic + navigation
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            ref={ref as any}
            type={type}
            onClick={handlePress}
            disabled={disabled || loading}
            className={baseStyles}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {content}
        </button>
    );
}
