'use client';

import { useEffect, useRef } from 'react';

interface ParticleSystemProps {
    maxParticles?: number;
    color?: string; // hex color
    direction?: 'up' | 'down';
    speed?: number;
    className?: string; // Tailwind opacity/z-index classes
}

export function ParticleSystem({
    maxParticles = 50,
    color = '#ea9e29', // Default Gold
    direction = 'up',
    speed = 1,
    className = 'opacity-50'
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

        // Particle class
        class Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            opacity: number;
            fadeSpeed: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                // Start particles randomly throughout vertical space to prevent initial "empty" look
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2 + 0.5; // Small, dust-like particles

                // Vertical speed based on direction
                const baseSpeed = Math.random() * 0.5 + 0.1;
                this.speedY = direction === 'up' ? -baseSpeed * speed : baseSpeed * speed;

                // Slight horizontal drift
                this.speedX = (Math.random() - 0.5) * 0.2;

                this.opacity = Math.random() * 0.5 + 0.1;
                this.fadeSpeed = Math.random() * 0.005 + 0.002;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;

                // Pulse opacity
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0 || this.opacity >= 0.8) {
                    this.fadeSpeed = -this.fadeSpeed;
                }

                // Respawn logic
                if (direction === 'up' && this.y < -10) {
                    this.y = canvas!.height + 10;
                    this.x = Math.random() * canvas!.width;
                } else if (direction === 'down' && this.y > canvas!.height + 10) {
                    this.y = -10;
                    this.x = Math.random() * canvas!.width;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = hexToRgba(color, this.opacity);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
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
        // Reduce count on mobile/small screens for performance
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
    }, [maxParticles, color, direction, speed]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        />
    );
}
