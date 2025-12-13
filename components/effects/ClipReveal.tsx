'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ClipRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

/**
 * ClipReveal - Blueprint text reveal animation
 * Uses clip-path masking for the "unrolling blueprint" effect
 */
export function ClipReveal({ children, delay = 0, className = '' }: ClipRevealProps) {
    return (
        <div className={cn('overflow-hidden', className)}>
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                    mass: 0.8,
                    delay: delay / 1000
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}

interface StaggerTextProps {
    text: string;
    delay?: number;
    className?: string;
    split?: 'char' | 'word';
}

/**
 * StaggerText - Reveal animation
 * Supports 'char' (default) or 'word' splitting
 */
export function StaggerText({ text, delay = 0, className = '', split = 'char' }: StaggerTextProps) {
    const items = split === 'char' ? text.split('') : text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay / 1000 }
        })
    };

    const child = {
        hidden: {
            y: "120%",
            transition: { type: "spring", damping: 12, stiffness: 100 } as const
        },
        visible: {
            y: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 } as const
        }
    };

    return (
        <motion.span
            className={cn('inline-flex flex-wrap overflow-hidden', className)}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {items.map((item, index) => (
                <span className="overflow-hidden inline-flex" key={index}>
                    <motion.span variants={child} className="inline-block">
                        {item}
                    </motion.span>
                    {/* Add space after word if splitting by word, unless it's the last word */}
                    {split === 'word' && index < items.length - 1 && '\u00A0'}
                    {/* For char splitting, spaces are naturally handled by the split array provided strict whitespace isn't stripped, 
                        but split('') preserves spaces as items. We just need to ensure they render. */}
                    {split === 'char' && item === ' ' && '\u00A0'}
                </span>
            ))}
        </motion.span>
    );
}
