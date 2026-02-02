"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Square, Video, Settings2 } from "lucide-react";
import { ReelStage } from "@/components/aiye/reels/ReelStage";
import CharacterReel from "@/components/aiye/reels/CharacterReel";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function ReelStudioPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTemplate, setActiveTemplate] = useState<"character" | "world">("character");
    const [showGuides, setShowGuides] = useState(false);

    // Recording State
    const [isRecording, setIsRecording] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const recorderRef = React.useRef<MediaRecorder | null>(null);
    const chunksRef = React.useRef<Blob[]>([]);

    const handlePlayToggle = () => {
        setIsPlaying(!isPlaying);
    };

    const handleRecord = async () => {
        try {
            // 1. Request Screen Capture with AUDIO
            // @ts-ignore
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    width: 1080,
                    height: 1920,
                    frameRate: 60,
                    cursor: "always",
                    displaySurface: "browser" // Hint to pick tab
                } as any,
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    // @ts-ignore
                    systemAudio: "include"
                }
            });

            // 2. Setup Recorder
            // Convert to MP4 on server
            const recorder = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs=vp9'
            });

            recorderRef.current = recorder;
            chunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            recorder.onstop = async () => {
                // Cleanup stream tracks
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());

                setIsRecording(false);
                setIsPlaying(false);
                setIsConverting(true);

                // Create Blob
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });

                // Send to Converter API if Blob is valid
                if (blob.size === 0) {
                    alert("Recording failed: No data captured.");
                    setIsConverting(false);
                    return;
                }

                try {
                    const response = await fetch('/api/video/convert', {
                        method: 'POST',
                        body: blob,
                    });

                    if (!response.ok) throw new Error("Conversion failed");

                    // Download MP4
                    const mp4Blob = await response.blob();
                    const url = URL.createObjectURL(mp4Blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `aiye-reel-mp4-${Date.now()}.mp4`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);

                } catch (err) {
                    console.error("Conversion error:", err);
                    alert("Conversion failed. Check console.");
                } finally {
                    setIsConverting(false);
                }
            };

            // 3. Start Recording & Play Reel
            recorder.start();
            setIsRecording(true);
            setIsPlaying(true); // Auto-start play

        } catch (err) {
            console.error("Recording init failed:", err);
            // User likely canceled picking a tab
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col md:flex-row font-sans">

            {/* Sidebar Controls */}
            <div className="w-full md:w-80 border-r border-[#333] p-6 flex flex-col gap-8 z-50 bg-[#0a0a0a]">
                <div>
                    <Link
                        href="/children-of-aiye"
                        className="flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} /> Back to Site
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                        Reel Studio
                    </h1>
                    <p className="text-sm text-[#888]">
                        Generate marketing assets using live site code.
                    </p>
                </div>

                {/* Templates */}
                <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest text-[#666] font-bold">Templates</h3>

                    <button
                        onClick={() => setActiveTemplate("character")}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${activeTemplate === "character"
                            ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]"
                            : "bg-[#111] border-[#222] hover:border-[#444]"
                            }`}
                    >
                        <div className="font-bold mb-1">Character Spotlight</div>
                        <div className="text-xs opacity-70">Sequenced reveal of Afolabi, Kehinde, Taiwo.</div>
                    </button>

                    <button
                        disabled
                        className="w-full text-left p-4 rounded-lg border bg-[#111] border-[#222] opacity-50 cursor-not-allowed"
                    >
                        <div className="font-bold mb-1">World Reveal (Coming Soon)</div>
                        <div className="text-xs opacity-70">Atmospheric pan of Lagos 2067.</div>
                    </button>
                </div>

                {/* Playback Controls */}
                <div className="space-y-4 bg-[#111] p-4 rounded-lg border border-[#222]">
                    <h3 className="text-xs uppercase tracking-widest text-[#666] font-bold mb-2">Controls</h3>

                    <div className="flex flex-col gap-2">
                        <MagneticButton
                            onClick={handlePlayToggle}
                            disabled={isRecording}
                            className={`w-full py-3 flex items-center justify-center gap-2 font-bold text-black rounded transition-all ${isPlaying ? "bg-red-500 hover:bg-red-400" : "bg-[#D4AF37] hover:bg-[#b5952f]"
                                } ${isRecording ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {isPlaying ? (
                                <>
                                    <Square size={16} fill="currentColor" /> Stop Preview
                                </>
                            ) : (
                                <>
                                    <Play size={16} fill="currentColor" /> Preview Reel
                                </>
                            )}
                        </MagneticButton>

                        <MagneticButton
                            onClick={handleRecord}
                            disabled={isRecording || isConverting}
                            className={`w-full py-3 flex items-center justify-center gap-2 font-bold rounded transition-all border ${isRecording
                                ? "bg-red-900/50 border-red-500 text-red-500 animate-pulse"
                                : isConverting
                                    ? "bg-blue-900/50 border-blue-500 text-blue-500"
                                    : "bg-transparent border-[#444] text-[#ccc] hover:bg-[#222]"
                                }`}
                        >
                            {isRecording ? (
                                <>
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                                    Recording...
                                </>
                            ) : isConverting ? (
                                <>
                                    <Settings2 size={16} className="animate-spin" />
                                    Converting to MP4...
                                </>
                            ) : (
                                <>
                                    <Video size={16} /> Record & Download MP4
                                </>
                            )}
                        </MagneticButton>
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-xs text-[#888]">
                        <input
                            type="checkbox"
                            id="guides"
                            checked={showGuides}
                            onChange={(e) => setShowGuides(e.target.checked)}
                            className="rounded bg-[#222] border-[#444]"
                        />
                        <label htmlFor="guides" className="cursor-pointer select-none">Show Instagram Safe Zones</label>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-auto p-4 bg-blue-900/20 border border-blue-800/50 rounded text-sm text-blue-200">
                    <div className="flex items-center gap-2 mb-2 font-bold text-blue-100">
                        <Video size={16} /> How to Record
                    </div>
                    <ol className="list-decimal list-inside space-y-1 opacity-80 pl-1">
                        <li>Click <strong>Record & Download</strong>.</li>
                        <li>Select <strong>Current Tab</strong> in the popup.</li>
                        <li>Wait for the reel to finish.</li>
                        <li>MP4 file will auto-download.</li>
                    </ol>
                </div>
            </div>

            {/* Main Stage */}
            <div className="flex-1 bg-[#1a1a1a] relative flex items-center justify-center">
                <ReelStage showGuides={showGuides}>
                    {activeTemplate === "character" && (
                        <CharacterReel
                            isPlaying={isPlaying}
                            onComplete={() => {
                                if (!isRecording) setIsPlaying(false);
                                // If recording, we wait for user to hit Stop OR we could auto-stop
                                // For now, let's auto-stop recording
                                if (isRecording && recorderRef.current) {
                                    recorderRef.current.stop();
                                }
                            }}
                        />
                    )}
                </ReelStage>
            </div>

        </div>
    );
}
