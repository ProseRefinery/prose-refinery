'use client';

import { useState, useRef, ReactNode, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    maxTilt?: number;
}

/**
 * TiltCard - 3D perspective tilt with cursor tracking
 * Uses rounded-md for sharp industrial aesthetic
 */
export function TiltCard({ children, className = '', maxTilt = 8 }: TiltCardProps) {
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const ref = useRef<HTMLDivElement>(null);

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

    const handleMouseLeave = () => {
        setTransform({ rotateX: 0, rotateY: 0 });
        setGlowPos({ x: 50, y: 50 });
    };

    return (
        <div
            ref={ref}
            className={cn(
                'relative transition-transform duration-200 ease-out group',
                className
            )}
            style={{
                transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
                transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Cursor-following glow */}
            <div
                className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)`,
                    zIndex: 0
                }}
            />
            <div className="relative h-full" style={{ zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
}
