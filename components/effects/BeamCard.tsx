'use client';

import { ReactNode } from 'react';

interface BeamCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: 'emerald' | 'purple' | 'blue';
}

export function BeamCard({ children, className = '', glowColor = 'emerald' }: BeamCardProps) {
    const glowColors = {
        emerald: {
            primary: 'rgb(16 185 129)',
            secondary: 'rgb(52 211 153)',
            glow: 'rgba(16, 185, 129, 0.3)'
        },
        purple: {
            primary: 'rgb(168 85 247)',
            secondary: 'rgb(192 132 252)',
            glow: 'rgba(168, 85, 247, 0.3)'
        },
        blue: {
            primary: 'rgb(59 130 246)',
            secondary: 'rgb(96 165 250)',
            glow: 'rgba(59, 130, 246, 0.3)'
        }
    };

    const colors = glowColors[glowColor];

    return (
        <div className={`beam-card relative group ${className}`}>
            {/* Animated scanning beam border */}
            <div
                className="absolute -inset-[1px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
                style={{ zIndex: 0 }}
            >
                {/* Rotating conic gradient - the scanning beam */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `conic-gradient(
              from var(--beam-angle, 0deg) at 50% 50%,
              transparent 0deg,
              transparent 60deg,
              ${colors.primary} 80deg,
              ${colors.secondary} 90deg,
              ${colors.primary} 100deg,
              transparent 120deg,
              transparent 360deg
            )`,
                        animation: 'beam-spin 3s linear infinite'
                    }}
                />
                {/* Inner mask to create border effect */}
                <div className="absolute inset-[1px] rounded-md bg-slate-900/98" />
            </div>

            {/* Static border (visible when not hovered) */}
            <div
                className="absolute inset-0 rounded-md border border-slate-700/50 group-hover:border-transparent transition-colors duration-300 pointer-events-none"
                style={{ zIndex: 1 }}
            />

            {/* Hover glow effect */}
            <div
                className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    zIndex: 0,
                    boxShadow: `0 0 30px ${colors.glow}, inset 0 0 30px ${colors.glow}`
                }}
            />

            {/* Content */}
            <div className="relative rounded-md h-full" style={{ zIndex: 2 }}>
                {children}
            </div>
        </div>
    );
}
