'use client';

import { ArrowRight, AlertTriangle, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { Reveal } from '@/components/effects/Reveal';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';

const MISTAKES = [
    {
        id: 1,
        title: "The 'Magic Fix' Cop-Out",
        problem: "Using magic or technology to solve a plot problem without established costs or limitations. If the hero is trapped and suddenly remembers a 'Teleport' spell they've never mentioned before, you've broken the reader's trust.",
        fix: "Establish the limitation early. If magic solves the problem, it must cost the hero something significant (energy, a memory, a relationship).",
    },
    {
        id: 2,
        title: "The Floating White Room",
        problem: "Dialogue scenes where the characters might as well be heads in a jar. There's no interaction with the setting, no sensory details, and no sense of where bodies are in space.",
        fix: "Ground every scene. Have characters interact with props. Use the setting to reflect the emotional tone. If they are arguing, have the storm outside break a window.",
    },
    {
        id: 3,
        title: "The Motivation Amnesia",
        problem: "A character acts out of character just because the plot needs them to. For example, a cautious strategist suddenly rushing into a trap because the author needs a capture scene.",
        fix: "Plot must follow character. If you need a capture scene, force the strategist into a corner where rushing is their *only* logical bad option.",
    },
    {
        id: 4,
        title: "The Info-Dump Prologue",
        problem: "Starting with 5 pages of history about the Great War of Xylophon. Agents skim this. Readers skip it.",
        fix: "Start with a character in trouble. Weave the history in only when it becomes relevant to the character's immediate survival.",
    },
    {
        id: 5,
        title: "The Stake Deflation",
        problem: "Promising a consequence (e.g., 'If we fail, the city burns') and then not delivering or softening the blow. If the hero fails and the city *doesn't* burn, the next threat won't be believed.",
        fix: "Deliver on your threats. If they fail, let the city burn. Then make them deal with the ashes.",
    },
    {
        id: 6,
        title: "The 'As You Know, Bob' Dialogue",
        problem: "Characters telling each other things they both already know just to inform the reader. 'As you know, my brother, our father died twenty years ago.'",
        fix: "Deliver exposition through conflict. Instead of agreeing on history, have them argue about whose fault it was.",
    },
    {
        id: 7,
        title: "The Saggy Middle",
        problem: "Act 2 becomes a series of 'and then this happened' without escalating tension. Characters wander aimlessly waiting for the climax.",
        fix: "Every scene in the middle must be a reaction to the previous scene's disaster. Use the 'Yes, But / No, And' structure to ensure constant complication.",
    }
];

export default function SevenMistakesPage() {
    return (
        <>
            <section className="relative flex justify-center pt-24 pb-24">
                <GridGlowBackground>
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                        <Reveal>
                            <HeroBadge icon="book-open">Free Resource | Prose Refinery</HeroBadge>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)] leading-tight">
                                7 Structural Mistakes That Kill <span className="text-emerald-400">Fantasy Contracts</span>
                            </h1>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                                Agents don't reject manuscripts because of typos. They reject them because
                                the story architecture collapses under scrutiny.
                            </p>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </section>

            <section className="pb-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {MISTAKES.map((mistake, i) => (
                            <Reveal key={mistake.id} delay={i * 100}>
                                <BeamCard glowColor="purple">
                                    <div className="p-8 bg-slate-900/50 rounded-md border border-slate-800">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                                </div>
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                                    {mistake.id}. {mistake.title}
                                                </h3>

                                                <div className="mb-6">
                                                    <div className="flex items-start gap-2 mb-2">
                                                        <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                                        <span className="text-xs font-bold text-red-400 uppercase tracking-wider">The Mistake</span>
                                                    </div>
                                                    <p className="text-slate-400 text-lg leading-relaxed">
                                                        {mistake.problem}
                                                    </p>
                                                </div>

                                                <div className="bg-emerald-900/10 p-4 rounded-md border border-emerald-500/20">
                                                    <div className="flex items-start gap-2 mb-2">
                                                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                                                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">The Fix</span>
                                                    </div>
                                                    <p className="text-slate-300">
                                                        {mistake.fix}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </BeamCard>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={200}>
                        <div className="mt-16 p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                    Does Your Manuscript Have Crack #3 or #7?
                                </h2>
                                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                                    Identifying your own structural blind spots is nearly impossible.
                                    Get a professional diagnostic to see exactly where your story stands.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <MagneticButton href="/diagnostic" variant="primary">
                                        Take Free 2-Minute Diagnostic
                                        <ArrowRight size={18} />
                                    </MagneticButton>
                                    <MagneticButton href="/services" variant="secondary">
                                        View All Services
                                    </MagneticButton>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
