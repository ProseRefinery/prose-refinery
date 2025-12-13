'use client';

import { ReactNode, useRef } from 'react'; // Added useRef for useInView if needed, though viewport prop handles it
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

/**
 * Reveal - Scroll reveal animation using Framer Motion
 * Uses spring physics for a weighted, premium feel
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 0.8, // Slower, more cinematic
                ease: [0.25, 0.46, 0.45, 0.94], // Cubic-bezier for "editorial" feel
                delay: delay / 1000
            }}
            className={cn('relative', className)}
        >
            {children}
        </motion.div>
    );
}
