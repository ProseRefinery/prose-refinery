"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CinematicText } from "./CinematicText";
import { ParticleSystem } from "@/components/effects/ParticleSystem";

// Brand Assets
const ASSETS = {
    afolabi: "/children-of-aiye/afolabi-character-art.png",
    kehinde: "/children-of-aiye/kehinde-character-art.png",
    taiwo: "/children-of-aiye/taiwo-character-art.png",
    bg: "/children-of-aiye/bg-luxury-matte.png",
};

// Pre-generated narration audio files (Nigerian English male voice - ancestral)
const NARRATION_AUDIO = {
    intro: "/audio/narrations/character_spotlight_intro.mp3",
    afolabi: "/audio/narrations/character_spotlight_afolabi.mp3",
    kehinde: "/audio/narrations/character_spotlight_kehinde.mp3",
    taiwo: "/audio/narrations/character_spotlight_taiwo.mp3",
    outro: "/audio/narrations/character_spotlight_outro.mp3",
};

// Scene Definitions
const SCENES = [
    {
        id: "intro",
        duration: 4000,
        audioKey: "intro" as keyof typeof NARRATION_AUDIO,
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-8 relative z-10">
                <CinematicText
                    text="THE PROPHECY"
                    className="text-[#D4AF37] text-3xl uppercase tracking-[0.4em] font-bold mb-4"
                    style={{ fontFamily: 'Cinzel, serif' }}
                    effect="glitch"
                />
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <CinematicText
                        text="AWAKENS"
                        className="text-[#f0f0f0] text-7xl sm:text-8xl uppercase tracking-[0.1em] font-black leading-none"
                        style={{ fontFamily: 'Cinzel, serif' }}
                        effect="slam"
                        delay={0.3}
                    />
                </motion.div>
            </div>
        ),
    },
    {
        id: "afolabi",
        duration: 5000,
        image: ASSETS.afolabi,
        title: "AFOLABI",
        subtitle: "The Anomaly",
        desc: "Four Frames. One soul. The gods say it's impossible.",
        color: "#D4AF37",
        audioKey: "afolabi" as keyof typeof NARRATION_AUDIO,
    },
    {
        id: "kehinde",
        duration: 5000,
        image: ASSETS.kehinde,
        title: "KEHINDE",
        subtitle: "The Anchor",
        desc: "She reads truth in a city of liars.",
        color: "#98FB98",
        audioKey: "kehinde" as keyof typeof NARRATION_AUDIO,
    },
    {
        id: "taiwo",
        duration: 5000,
        image: ASSETS.taiwo,
        title: "TAIWO",
        subtitle: "The Builder",
        desc: "He builds what others pray for.",
        color: "#87CEEB",
        audioKey: "taiwo" as keyof typeof NARRATION_AUDIO,
    },
    {
        id: "outro",
        duration: 6000,
        audioKey: "outro" as keyof typeof NARRATION_AUDIO,
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-8 relative z-10">
                <CinematicText
                    text="FOUR GODS."
                    className="text-6xl font-bold text-[#D4AF37] mb-2"
                    style={{ fontFamily: 'Cinzel, serif' }}
                    effect="slam"
                />
                <CinematicText
                    text="ONE SOUL."
                    className="text-6xl font-bold text-[#f0f0f0] mb-12"
                    style={{ fontFamily: 'Cinzel, serif' }}
                    effect="slam"
                    delay={0.6}
                />
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                    className="p-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-full max-w-[300px]"
                >
                    <div className="bg-black/80 backdrop-blur-md px-8 py-4">
                        <p className="text-[#D4AF37] text-xl font-bold uppercase tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
                            Read Chapter 1
                        </p>
                    </div>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="text-[#c0c0c0] mt-8 text-xl font-medium"
                    style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                >
                    Link in Bio
                </motion.p>
            </div>
        ),
    },
];

export default function CharacterReel({ isPlaying = false, onComplete }: { isPlaying?: boolean, onComplete?: () => void }) {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Play narration audio (pre-generated Nigerian voice - ancestral)
    const playNarration = (audioKey: keyof typeof NARRATION_AUDIO) => {
        if (typeof window === 'undefined') return;

        // Stop any currently playing audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        // Create and play new audio
        const audio = new Audio(NARRATION_AUDIO[audioKey]);
        audio.volume = 1.0;
        audioRef.current = audio;

        // Small delay to sync with visual transition
        setTimeout(() => {
            audio.play().catch(err => {
                console.log("Audio playback failed:", err);
            });
        }, 300);
    };

    // Stop audio when not playing
    useEffect(() => {
        if (!isPlaying && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [isPlaying]);

    useEffect(() => {
        if (!isPlaying) {
            return;
        }

        const scene = SCENES[currentSceneIndex];

        // Trigger narration audio
        if (scene.audioKey) {
            playNarration(scene.audioKey);
        }

        const timer = setTimeout(() => {
            if (currentSceneIndex < SCENES.length - 1) {
                setCurrentSceneIndex((prev) => prev + 1);
            } else {
                if (onComplete) onComplete();
            }
        }, scene.duration);

        return () => clearTimeout(timer);
    }, [currentSceneIndex, isPlaying, onComplete]);

    useEffect(() => {
        if (!isPlaying) setCurrentSceneIndex(0);
    }, [isPlaying]);

    const scene = SCENES[currentSceneIndex];

    return (
        <div className="relative w-full h-full bg-black text-white overflow-hidden">

            {/* 1. Global Background: Deep Space Radial Gradient + Stars */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_#1a1a2e_0%,_#000000_80%)]">

                {/* Star System */}
                <ParticleSystem
                    maxParticles={60}
                    color="#ffffff"
                    speed={0.2} // Very slow drift
                    direction="up"
                    className="opacity-70"
                />

                {/* Existing Texture Overlay (Subtle) */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                    <Image
                        src={ASSETS.bg}
                        alt="Texture"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Subtle "Breathing" Vignette */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"
                    animate={{ opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Static Background remains unchanged */}

            {/* Content Container - No AnimatePresence, Just Key Change */}
            <motion.div
                key={scene.id} // React re-renders this div when scene changes
                className="absolute inset-0 z-10 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // No exit animation - just snap overlap for performance or simple fade in
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                {/* Render Custom Content Scene (Intro/Outro) */}
                {scene.content && scene.content}

                {/* Render Character Slide */}
                {scene.image && (
                    <div className="w-full h-full relative flex items-end justify-center">

                        {/* Layer 2: Giant Background Text */}
                        <div className="absolute top-[15%] w-full text-center z-10 mix-blend-overlay opacity-30">
                            <CinematicText
                                text={scene.title || ""}
                                className="text-[180px] font-black leading-none tracking-tighter text-white whitespace-nowrap overflow-visible"
                                style={{ fontFamily: 'Cinzel, serif', transform: "rotate(-2deg)" }}
                                effect="slam"
                                delay={0.1}
                            />
                        </div>

                        {/* Layer 3: Character Cutout - SIMPLE ZOOM */}
                        <motion.div
                            className="absolute inset-0 z-20"
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1.0, opacity: 1 }}
                            transition={{
                                duration: 1.2,
                                ease: "easeOut"
                            }}
                        >
                            <Image
                                src={scene.image}
                                alt={scene.title || ""}
                                fill
                                className="object-cover object-center"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </motion.div>

                        {/* Layer 4: Foreground Text & UI */}
                        <div className="relative z-30 w-full p-12 pb-32">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <div className="h-[1px] w-24 bg-[#D4AF37] mb-4" />
                                <h2 className="text-6xl font-bold text-white mb-2 drop-shadow-2xl" style={{ fontFamily: 'Cinzel, serif' }}>
                                    {scene.title}
                                </h2>
                                <p className="text-lg uppercase tracking-[0.2em] font-bold mb-4" style={{ color: scene.color || "#D4AF37" }}>
                                    {scene.subtitle}
                                </p>
                                <p className="text-2xl text-[#e0e0e0] leading-relaxed drop-shadow-md max-w-md font-medium" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                                    {scene.desc}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
