'use client';

import { useEffect, useRef } from 'react';

interface ParticleSystemProps {
    maxParticles?: number;
    color?: string; // hex color
    direction?: 'up' | 'down';
    speed?: number;
    className?: string; // Tailwind opacity/z-index classes
    glowIntensity?: 'subtle' | 'medium' | 'intense'; // NEW: glow halo intensity
    sizeMultiplier?: number; // NEW: make particles bigger
}

export function ParticleSystem({
    maxParticles = 50,
    color = '#ea9e29', // Default Gold
    direction = 'up',
    speed = 1,
    className = 'opacity-50',
    glowIntensity = 'medium',
    sizeMultiplier = 1
}: ParticleSystemProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Glow settings based on intensity
        const glowSettings = {
            subtle: { outerMultiplier: 2, outerOpacity: 0.1, midMultiplier: 1.5, midOpacity: 0.2 },
            medium: { outerMultiplier: 4, outerOpacity: 0.08, midMultiplier: 2, midOpacity: 0.15 },
            intense: { outerMultiplier: 6, outerOpacity: 0.12, midMultiplier: 3, midOpacity: 0.25 }
        };
        const glow = glowSettings[glowIntensity];

        // Particle class
        class Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            opacity: number;
            fadeSpeed: number;
            pulse: number;
            pulseSpeed: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                // Larger particles with size multiplier
                this.size = (Math.random() * 3 + 1) * sizeMultiplier;

                // Vertical speed based on direction
                const baseSpeed = Math.random() * 0.5 + 0.15;
                this.speedY = direction === 'up' ? -baseSpeed * speed : baseSpeed * speed;

                // Slight horizontal drift
                this.speedX = (Math.random() - 0.5) * 0.3;

                // Higher base opacity for more visibility
                this.opacity = Math.random() * 0.6 + 0.2;
                this.fadeSpeed = Math.random() * 0.008 + 0.003;

                // Individual pulse phase for organic feel
                this.pulse = Math.random() * Math.PI * 2;
                this.pulseSpeed = Math.random() * 0.03 + 0.01;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;

                // Smooth pulsing with sine wave
                this.pulse += this.pulseSpeed;

                // Respawn logic
                if (direction === 'up' && this.y < -20) {
                    this.y = canvas!.height + 20;
                    this.x = Math.random() * canvas!.width;
                    this.size = (Math.random() * 3 + 1) * sizeMultiplier;
                } else if (direction === 'down' && this.y > canvas!.height + 20) {
                    this.y = -20;
                    this.x = Math.random() * canvas!.width;
                    this.size = (Math.random() * 3 + 1) * sizeMultiplier;
                }
            }

            draw() {
                if (!ctx) return;

                // Calculate current opacity with pulse
                const pulseOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));

                // OUTER GLOW (largest, faintest)
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * glow.outerMultiplier, 0, Math.PI * 2);
                ctx.fillStyle = hexToRgba(color, pulseOpacity * glow.outerOpacity);
                ctx.fill();

                // MID GLOW
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * glow.midMultiplier, 0, Math.PI * 2);
                ctx.fillStyle = hexToRgba(color, pulseOpacity * glow.midOpacity);
                ctx.fill();

                // CORE (brightest)
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = hexToRgba(color, pulseOpacity);
                ctx.fill();

                // BRIGHT CENTER (white-ish hot core for intense glow)
                if (glowIntensity === 'intense') {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity * 0.3})`;
                    ctx.fill();
                }
            }
        }

        // Helper: Hex to RGBA
        function hexToRgba(hex: string, alpha: number) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        // Initialize particles
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? Math.floor(maxParticles / 2) : maxParticles;

        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [maxParticles, color, direction, speed, glowIntensity, sizeMultiplier]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            aria-hidden="true"
        />
    );
}
