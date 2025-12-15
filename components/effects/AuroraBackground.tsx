'use client';

import { ReactNode, useEffect, useState } from 'react';

interface AuroraBackgroundProps {
    children: ReactNode;
}

/**
 * AuroraBackground - Living, breathing gradient atmosphere
 * Features animated color shifts and grid overlay
 */
export function AuroraBackground({ children }: AuroraBackgroundProps) {
    return (
        <div className="relative min-h-screen">
            {/* Aurora gradient layer - animated color shifts */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 0,
                    background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139, 92, 246, 0.08), transparent),
            radial-gradient(ellipse 50% 30% at 20% 80%, rgba(16, 185, 129, 0.1), transparent)
          `,
                    animation: 'aurora 15s ease-in-out infinite'
                }}
            />

            {/* Secondary aurora layer for depth */}
            <div
                className="fixed inset-0 pointer-events-none opacity-50"
                style={{
                    zIndex: 0,
                    background: `
            radial-gradient(ellipse 70% 40% at 30% 20%, rgba(52, 211, 153, 0.1), transparent),
            radial-gradient(ellipse 50% 50% at 70% 70%, rgba(168, 85, 247, 0.05), transparent)
          `,
                    animation: 'aurora 20s ease-in-out infinite reverse'
                }}
            />

            {/* Grid overlay - precision instrument feel */}
            <div
                className="fixed inset-0 pointer-events-none opacity-40"
                style={{
                    zIndex: 0,
                    backgroundImage: `
            linear-gradient(rgba(30, 41, 59, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 41, 59, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Subtle noise texture for depth */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.015]"
                style={{
                    zIndex: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="relative" style={{ zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
}
