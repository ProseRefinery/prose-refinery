'use client';

import { useState, useEffect, useRef } from 'react';

interface Rune {
    char: string;
    x: number;
    y: number;
    speed: number; // Parallax multiplier
    size: string;
    opacity: number;
    rotation: number;
}

const RUNES: Rune[] = [
    { char: '✦', x: 8, y: 15, speed: 0.03, size: 'text-lg', opacity: 0.08, rotation: 0 },
    { char: 'Ω', x: 88, y: 25, speed: 0.06, size: 'text-xl', opacity: 0.06, rotation: 15 },
    { char: '⁂', x: 15, y: 55, speed: 0.09, size: 'text-sm', opacity: 0.1, rotation: -10 },
    { char: '◇', x: 78, y: 70, speed: 0.04, size: 'text-lg', opacity: 0.07, rotation: 45 },
    { char: '✦', x: 45, y: 35, speed: 0.07, size: 'text-2xl', opacity: 0.05, rotation: 0 },
    { char: '○', x: 25, y: 80, speed: 0.11, size: 'text-xs', opacity: 0.12, rotation: 0 },
    { char: 'Ω', x: 92, y: 10, speed: 0.05, size: 'text-base', opacity: 0.06, rotation: -20 },
    { char: '⁂', x: 5, y: 45, speed: 0.08, size: 'text-lg', opacity: 0.08, rotation: 30 },
    { char: '◇', x: 60, y: 85, speed: 0.1, size: 'text-sm', opacity: 0.09, rotation: 60 },
    { char: '✦', x: 35, y: 65, speed: 0.06, size: 'text-xl', opacity: 0.04, rotation: 0 },
];

/**
 * ParallaxRunes - Scroll-linked floating elements with velocity-based depth
 * Creates 3D depth as you scroll using different parallax speeds
 */
export function ParallaxRunes() {
    const [scrollY, setScrollY] = useState(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {RUNES.map((rune, i) => (
                <span
                    key={i}
                    className={`absolute text-emerald-500/80 ${rune.size} font-light`}
                    style={{
                        left: `${rune.x}%`,
                        top: `${rune.y}%`,
                        opacity: rune.opacity,
                        // Velocity-based parallax - different speeds create depth
                        transform: `
              translateY(${scrollY * rune.speed}px) 
              rotate(${rune.rotation + (scrollY * rune.speed * 0.02)}deg)
            `,
                        transition: 'transform 0.1s linear',
                        willChange: 'transform'
                    }}
                >
                    {rune.char}
                </span>
            ))}
        </div>
    );
}
