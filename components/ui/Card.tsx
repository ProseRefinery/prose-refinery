'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TiltCard } from '@/components/effects/TiltCard';
import { BeamCard } from '@/components/effects/BeamCard';

interface CardProps {
    children: ReactNode;
    variant?: 'tilt' | 'beam' | 'static';
    glowColor?: 'emerald' | 'purple' | 'blue' | 'rose' | 'amber';
    className?: string; // Wrapper class
    contentClassName?: string; // Inner content class (padding, flex, etc)
    bgClass?: string; // Specific background override
}

export function Card({
    children,
    variant = 'tilt',
    glowColor = 'emerald',
    className,
    contentClassName,
    bgClass
}: CardProps) {
    // Standard base styles for the visual "Card" surface
    // TiltCard needs these on the child. BeamCard needs these handled carefully to not block the beam.

    const baseContentStyles = cn(
        "relative rounded-md p-6 h-full flex flex-col", // Structural
        bgClass || "bg-slate-800/30", // Default visual background (semi-transparent)
        contentClassName
    );

    const borderStyles = "border border-slate-700/50 hover:border-emerald-500/30 transition-colors duration-300";

    if (variant === 'beam') {
        // BeamCard has its own border mechanism. 
        // We pass the bgClass to BeamCard logic if we modify it, but BeamCard usually expects an opaque mask.
        // If we use semi-transparent bg here, the beam might look weird underneath if we don't mask it.
        // Current BeamCard implementation has a hardcoded inner mask.
        // We'll wrap the content and strict borders are handled by BeamCard.
        return (
            <BeamCard glowColor={glowColor} className={className}>
                <div className={cn("p-6 h-full flex flex-col", contentClassName)}>
                    {children}
                </div>
            </BeamCard>
        );
    }

    if (variant === 'tilt') {
        return (
            <TiltCard className={className}>
                <div className={cn("relative rounded-md p-6 h-full flex flex-col", bgClass || "bg-slate-800/30", "border border-slate-700/50 hover:border-emerald-500/30 transition-colors duration-300", contentClassName)}>
                    {children}
                </div>
            </TiltCard>
        );
    }

    // Static
    return (
        <div className={cn("relative rounded-md p-6 h-full flex flex-col", bgClass || "bg-slate-800/30", "border border-slate-700/50", className, contentClassName)}>
            {children}
        </div>
    );
}
