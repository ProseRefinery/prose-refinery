'use client';

import { useState, ReactNode, MouseEvent } from 'react';

interface GridGlowBackgroundProps {
    children: ReactNode;
}

export function GridGlowBackground({ children }: GridGlowBackgroundProps) {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        });
    };

    return (
        <div className="relative w-full" onMouseMove={handleMouseMove}>
            <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{
                    backgroundImage: `
            radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
              rgba(16, 185, 129, 0.08) 0%, 
              transparent 50%),
            linear-gradient(rgba(30, 41, 59, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 41, 59, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '100% 100%, 40px 40px, 40px 40px'
                }}
            />
            <div className="relative w-full">{children}</div>
        </div>
    );
}
