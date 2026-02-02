"use client";

import React from "react";
import { motion } from "framer-motion";

interface CinematicTextProps {
    text: string;
    className?: string;
    effect?: "slam" | "glitch" | "fade";
    delay?: number;
    style?: React.CSSProperties;
}

export const CinematicText = ({ text, className, effect = "slam", delay = 0, style }: CinematicTextProps) => {

    if (effect === "slam") {
        return (
            <div className="overflow-hidden relative">
                <motion.h1
                    initial={{ scale: 2, opacity: 0, z: 100 }}
                    animate={{ scale: 1, opacity: 1, z: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: delay,
                        ease: [0.34, 1.56, 0.64, 1] // Spring-like slam
                    }}
                    className={className}
                    style={style}
                >
                    {text}
                </motion.h1>
                {/* Impact Shake Ghost */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0], scale: [1.1, 1.2, 1.1] }}
                    transition={{ delay: delay + 0.1, duration: 0.2 }}
                    className={`absolute inset-0 text-[#D4AF37] mix-blend-overlay ${className}`}
                    style={style}
                    aria-hidden="true"
                >
                    {text}
                </motion.h1>
            </div>
        );
    }

    if (effect === "glitch") {
        return (
            <div className="relative">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay, duration: 0.2 }}
                    className={className}
                    style={style}
                >
                    {text}

                    {/* Glitch Layers */}
                    <motion.span
                        className="absolute inset-0 text-red-500 opacity-50 mix-blend-screen"
                        animate={{
                            x: [0, -2, 2, -1, 0],
                            y: [0, 1, -1, 0],
                            opacity: [0, 1, 0, 0.5, 0]
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                            delay: delay + 0.5
                        }}
                        aria-hidden="true"
                    >
                        {text}
                    </motion.span>
                    <motion.span
                        className="absolute inset-0 text-blue-500 opacity-50 mix-blend-screen"
                        animate={{
                            x: [0, 2, -2, 1, 0],
                            y: [0, -1, 1, 0],
                            opacity: [0, 1, 0, 0.5, 0]
                        }}
                        transition={{
                            duration: 0.4,
                            repeat: Infinity,
                            repeatDelay: 2.1,
                            delay: delay + 0.5
                        }}
                        aria-hidden="true"
                    >
                        {text}
                    </motion.span>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8 }}
            className={className}
            style={style}
        >
            {text}
        </motion.div>
    );
};
