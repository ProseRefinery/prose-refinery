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
                type: "spring",
                stiffness: 50, // Looser spring for gentle reveal
                damping: 20,
                mass: 1,
                delay: delay / 1000 // Convert ms to seconds
            }}
            className={cn('relative', className)}
        >
            {children}
        </motion.div>
    );
}
