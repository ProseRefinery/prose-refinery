'use client';

import { useState, useRef, ReactNode, MouseEvent } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'ghost';
    href?: string;
    disabled?: boolean;
}

/**
 * MagneticButton - Cursor-pull effect with bounce on click
 * Uses rounded-md for sharp industrial aesthetic
 */
export function MagneticButton({
    children,
    onClick,
    className = '',
    type = 'button',
    variant = 'primary',
    href,
    disabled = false
}: MagneticButtonProps) {
    const [transform, setTransform] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current || disabled) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setTransform({
            x: (e.clientX - centerX) * 0.25,
            y: (e.clientY - centerY) * 0.25
        });
    };

    const handleMouseLeave = () => {
        setTransform({ x: 0, y: 0 });
    };

    const baseStyles = cn(
        'relative inline-flex items-center justify-center gap-2',
        'px-5 py-2.5 rounded-md font-medium text-xs tracking-widest uppercase',
        'transition-all duration-200 ease-out',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
            // Primary - emerald gradient with glow
            'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:from-emerald-500 hover:to-emerald-400 active:scale-95': variant === 'primary',
            // Secondary - ghost with border
            'border border-slate-700/50 bg-transparent text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5': variant === 'secondary',
            // Ghost - minimal
            'text-slate-500 hover:text-emerald-400 hover:bg-slate-800/30': variant === 'ghost'
        },
        className
    );

    const style = {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
    };

    if (href && !disabled) {
        return (
            <Link
                href={href}
                ref={ref as React.RefObject<HTMLAnchorElement>}
                className={baseStyles}
                style={style}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            ref={ref as React.RefObject<HTMLButtonElement>}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={baseStyles}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </button>
    );
}
