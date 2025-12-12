'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ClipRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

/**
 * ClipReveal - Blueprint text reveal animation
 * Uses clip-path masking for the "unrolling blueprint" effect
 */
export function ClipReveal({ children, delay = 0, className = '' }: ClipRevealProps) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className={cn(visible ? '' : 'overflow-hidden', className)}>
            <div
                className="transition-all duration-700"
                style={{
                    // Blueprint unroll effect - slides up from hidden
                    clipPath: visible ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
                    transform: visible ? 'translateY(0)' : 'translateY(30px)',
                    opacity: visible ? 1 : 0,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' // Expo.out for engineered feel
                }}
            >
                {children}
            </div>
        </div>
    );
}

interface StaggerTextProps {
    text: string;
    delay?: number;
    className?: string;
}

/**
 * StaggerText - Character-by-character reveal with clip masking
 */
export function StaggerText({ text, delay = 0, className = '' }: StaggerTextProps) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <span ref={ref} className={cn('inline-flex overflow-hidden', className)}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className="inline-block transition-all duration-500"
                    style={{
                        clipPath: visible ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
                        transform: visible ? 'translateY(0)' : 'translateY(100%)',
                        opacity: visible ? 1 : 0,
                        transitionDelay: `${i * 30}ms`,
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
}
