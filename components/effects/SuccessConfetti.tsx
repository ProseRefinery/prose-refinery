'use client';

import { useState, useEffect } from 'react';

interface Particle {
    id: number;
    x: number;
    color: string;
    delay: number;
    rotation: number;
}

interface SuccessConfettiProps {
    trigger: boolean;
    onComplete?: () => void;
}

const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a78bfa', '#818cf8'];

export function SuccessConfetti({ trigger, onComplete }: SuccessConfettiProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        if (trigger) {
            const newParticles = Array.from({ length: 30 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                delay: Math.random() * 0.5,
                rotation: Math.random() * 360
            }));
            // eslint-disable-next-line
            setParticles(newParticles);

            const timer = setTimeout(() => {
                setParticles([]);
                onComplete?.();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [trigger, onComplete]);

    if (particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute w-2.5 h-2.5 rounded-sm"
                    style={{
                        left: `${p.x}%`,
                        top: '-20px',
                        backgroundColor: p.color,
                        animation: `confetti-fall 3s ease-out ${p.delay}s forwards`,
                        transform: `rotate(${p.rotation}deg)`
                    }}
                />
            ))}
        </div>
    );
}
