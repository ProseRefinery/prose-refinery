'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

/**
 * Reveal - Restored original IntersectionObserver implementation
 * Uses simple CSS transitions (no spring physics)
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
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
        <div
            ref={ref}
            className={cn(
                'transition-all duration-700 ease-out', // The original "editorial" ease
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                className
            )}
        >
            {children}
        </div>
    );
}
