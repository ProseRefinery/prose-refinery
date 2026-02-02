'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioControlProps {
    src?: string;
}

export function AudioControl({ src = '/children-of-aiye/ambient-drone.mp3' }: AudioControlProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Lazy load: Only create audio element on first play
    const initAudio = () => {
        if (!audioRef.current) {
            const audio = new Audio(src);
            audio.loop = true;
            audio.volume = volume;
            audioRef.current = audio;
            setIsLoaded(true);
        }
        return audioRef.current;
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handleToggle = () => {
        const audio = initAudio();
        if (!isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch((error) => {
                        console.log("Audio playback failed:", error);
                    });
            }
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-4">
            {/* No <audio> tag - loaded lazily via JavaScript */}

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggle}
                className="relative group w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center transition-colors hover:bg-black/60 hover:border-[#D4AF37]"
                aria-label={isPlaying ? "Mute Ambient Sound" : "Play Ambient Sound"}
            >
                {/* Glow effect when playing */}
                {isPlaying && (
                    <motion.div
                        className="absolute inset-0 rounded-full border border-[#D4AF37] opacity-0"
                        animate={{ opacity: [0, 0.5, 0], scale: [1, 1.2, 1.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}

                {isPlaying ? (
                    <Volume2 className="w-5 h-5 text-[#D4AF37]" />
                ) : (
                    <VolumeX className="w-5 h-5 text-[#a0a0a0] group-hover:text-[#D4AF37] transition-colors" />
                )}
            </motion.button>

            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="hidden sm:block"
                    >
                        <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase">
                            Now Playing: Aiyé Eternal
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
