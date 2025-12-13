'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ClipRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

/**
 * ClipReveal - Restored to match Reveal's CSS logic
 * Uses simple CSS transitions for mask reveal
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
        <div className={cn('overflow-hidden', className)}>
            <div
                ref={ref}
                className={cn(
                    'transition-all duration-700 ease-out',
                    visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                )}
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
    split?: 'char' | 'word';
}

/**
 * StaggerText - Simple CSS delay staggering
 */
export function StaggerText({ text, delay = 0, className = '', split = 'char' }: StaggerTextProps) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const items = split === 'char' ? text.split('') : text.split(' ');

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
        <span
            ref={ref}
            className={cn('inline-flex flex-wrap overflow-hidden', className)}
        >
            {items.map((item, index) => (
                <span
                    key={index}
                    className={cn(
                        "inline-block transition-all duration-500 ease-out",
                        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    )}
                    style={{ transitionDelay: `${index * 30}ms` }}
                >
                    {item}
                    {split === 'word' && index < items.length - 1 && '\u00A0'}
                    {split === 'char' && item === ' ' && '\u00A0'}
                </span>
            ))}
        </span>
    );
}
