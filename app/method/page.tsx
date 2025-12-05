'use client';

import { ArrowRight, Layers, Users, BookOpen, Zap, Target, Heart, BarChart3, X, Check, Calendar } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';

// Enhanced pillar data with good/bad examples
const PILLARS_DATA = [
    {
        id: 1,
        name: 'World & Tone Integrity',
        Icon: Layers,
        short: 'Does the world feel real and consistent?',
        description: 'Your world operates by consistent internal rules that readers can trust and predict.',
        bad: {
            label: 'What breaks it',
            example: 'In chapter 3, teleportation requires blood sacrifice. In chapter 18, the protagonist teleports with no cost mentioned. Readers notice. They lose trust.'
        },
        good: {
            label: 'What works',
            example: 'Every use of teleportation costs something. The cost escalates. By the climax, readers dread what the protagonist must sacrifice.'
        },
        diagnosis: 'We map every rule your world establishes and track every instance where it\'s applied, testing for contradictions and escalation.'
    },
    {
        id: 2,
        name: 'Character Continuity',
        Icon: Users,
        short: 'Do characters behave consistently?',
        description: 'Characters act according to their established motivations, growing in believable ways.',
        bad: {
            label: 'What breaks it',
            example: 'Your pacifist healer kills someone in Act 2 with no setup or aftermath. The reader feels whiplash—"would they really do that?"'
        },
        good: {
            label: 'What works',
            example: 'The healer\'s pacifism cracks under pressure throughout Acts 1-2. When they finally act violently, it feels tragic and earned.'
        },
        diagnosis: 'We track each character\'s core traits, decisions, and growth arc, flagging contradictions and missed opportunities.'
    },
    {
        id: 3,
        name: 'Lore Consistency',
        Icon: BookOpen,
        short: 'Does the mythology hold together?',
        description: 'Your myths, histories, and cultures form a coherent tapestry without contradictions.',
        bad: {
            label: 'What breaks it',
            example: 'The ancient empire fell 1000 years ago in chapter 4, but artifacts from "500 years ago" reference it as active. Timeline confusion pulls readers out.'
        },
        good: {
            label: 'What works',
            example: 'Historical references build on each other. The reader pieces together the lore like a puzzle, feeling rewarded for paying attention.'
        },
        diagnosis: 'We create a timeline and lore bible from your manuscript, catching inconsistencies before your readers do.'
    },
    {
        id: 4,
        name: 'System Cohesion',
        Icon: Zap,
        short: 'Do magic/tech systems follow rules?',
        description: 'Your magic, technology, or supernatural elements operate within clear limitations.',
        bad: {
            label: 'What breaks it',
            example: 'Magic can do anything the plot needs at that moment. No weaknesses, no costs. Tension evaporates—if magic can solve everything, why worry?'
        },
        good: {
            label: 'What works',
            example: 'Magic has clear costs and limitations. The climax works because the protagonist finds a clever workaround within established rules.'
        },
        diagnosis: 'We document every use of your system, ensuring limitations are consistent and exploits are intentional, not accidents.'
    },
    {
        id: 5,
        name: 'Plot Logic',
        Icon: Target,
        short: 'Does cause follow effect?',
        description: 'Events chain together logically. Character decisions drive the plot forward believably.',
        bad: {
            label: 'What breaks it',
            example: 'The villain captures the hero by coincidentally being at the exact right location at the exact right time. Too convenient.'
        },
        good: {
            label: 'What works',
            example: 'The villain planted a tracker in Act 1. The capture feels inevitable in hindsight. Readers say, "Oh, of course."'
        },
        diagnosis: 'We trace every plot beat to its cause, identifying coincidences that strain believability and gaps that confuse readers.'
    },
    {
        id: 6,
        name: 'Emotional Resonance',
        Icon: Heart,
        short: 'Do emotional beats land?',
        description: 'Key moments carry the weight they should. Readers feel what you want them to feel.',
        bad: {
            label: 'What breaks it',
            example: 'A character dies in chapter 20, but we barely knew them. The protagonist grieves for pages, but the reader feels nothing.'
        },
        good: {
            label: 'What works',
            example: 'The relationship is seeded early. Small moments build attachment. When the death comes, readers are devastated alongside the protagonist.'
        },
        diagnosis: 'We map emotional setups and payoffs, ensuring you\'ve earned the reactions you\'re asking readers to have.'
    },
    {
        id: 7,
        name: 'Market Alignment',
        Icon: BarChart3,
        short: 'Is it positioned correctly?',
        description: 'Your manuscript meets genre expectations while standing out from the competition.',
        bad: {
            label: 'What breaks it',
            example: 'Your "epic fantasy" is 50,000 words with no romance and a cliffhanger. It doesn\'t fit what agents and publishers expect from that label.'
        },
        good: {
            label: 'What works',
            example: 'The manuscript knows its category, hits genre beats readers crave, and has a hook that distinguishes it from comp titles.'
        },
        diagnosis: 'We assess genre conventions, word count expectations, and market positioning to ensure your query package is targeted.'
    }
];

export default function MethodPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative flex justify-center pt-20 pb-24">
                <GridGlowBackground>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <div className="max-w-3xl mx-auto">
                            <Reveal>
                                <HeroBadge icon="layers">The Narrative Integrity Engine™</HeroBadge>
                            </Reveal>
                            <ClipReveal delay={100}>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                    The 7 Pillars of Structural Excellence
                                </h1>
                            </ClipReveal>
                            <Reveal delay={200}>
                                <p className="text-xl text-slate-300 mb-6">
                                    Other editors check grammar. We check story architecture—the invisible
                                    foundation that determines whether your book works.
                                </p>
                            </Reveal>
                            <Reveal delay={300}>
                                <p className="text-lg text-slate-400">
                                    Our systematic approach ensures every aspect of your speculative fiction
                                    manuscript is analyzed against proven structural principles. Here's exactly
                                    what we look for—and what we catch.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </GridGlowBackground>
            </section>

            {/* Pillars Detail with Examples */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-16">
                        {PILLARS_DATA.map((pillar, i) => (
                            <Reveal key={pillar.id} delay={i * 50}>
                                <BeamCard glowColor={i % 2 === 0 ? 'emerald' : 'purple'}>
                                    <div className="p-8 bg-slate-800/30 rounded-md">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="p-3 rounded-md bg-slate-700/30">
                                                <pillar.Icon className="w-8 h-8 text-emerald-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)]">
                                                    {pillar.id}. {pillar.name}
                                                </h3>
                                                <p className="text-slate-400 mt-1">{pillar.short}</p>
                                            </div>
                                        </div>

                                        <p className="text-slate-300 mb-6">{pillar.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            {/* Bad Example */}
                                            <div className="p-4 bg-slate-900/50 rounded-md border-l-2 border-red-500/50">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <X className="w-4 h-4 text-red-400" />
                                                    <span className="text-xs text-red-400 uppercase tracking-wider font-medium">
                                                        {pillar.bad.label}
                                                    </span>
                                                </div>
                                                <p className="text-slate-400 text-sm">{pillar.bad.example}</p>
                                            </div>

                                            {/* Good Example */}
                                            <div className="p-4 bg-slate-900/50 rounded-md border-l-2 border-emerald-500/50">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Check className="w-4 h-4 text-emerald-400" />
                                                    <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium">
                                                        {pillar.good.label}
                                                    </span>
                                                </div>
                                                <p className="text-slate-300 text-sm">{pillar.good.example}</p>
                                            </div>
                                        </div>

                                        {/* How we diagnose */}
                                        <div className="p-4 bg-emerald-500/5 rounded-md border border-emerald-500/20">
                                            <p className="text-sm text-emerald-400">
                                                <strong className="uppercase tracking-wider text-xs">How we diagnose: </strong>
                                                <span className="text-slate-400">{pillar.diagnosis}</span>
                                            </p>
                                        </div>
                                    </div>
                                </BeamCard>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Overview */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <ClipReveal>
                            <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                How It Works
                            </h2>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400 max-w-xl mx-auto">
                                A systematic process designed for clarity and impact.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Submit', desc: 'Send your manuscript and complete our intake questionnaire to help us understand your goals.' },
                            { step: '02', title: 'Analyze', desc: 'We assess your work against all 7 pillars, documenting every finding with specific examples.' },
                            { step: '03', title: 'Transform', desc: 'Receive a detailed editorial letter with prioritized, actionable revision guidance.' }
                        ].map((item, i) => (
                            <Reveal key={i} delay={i * 150}>
                                <TiltCard className="p-8 bg-slate-800/30 rounded-md border border-slate-700/50 text-center h-full">
                                    <div className="text-5xl font-bold text-emerald-500/20 mb-4">{item.step}</div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                    <p className="text-slate-400 text-sm">{item.desc}</p>
                                </TiltCard>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <h2 className="text-3xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                            Ready to See What We Find?
                        </h2>
                    </ClipReveal>
                    <Reveal delay={100}>
                        <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                            Every manuscript has hidden structural issues. Let's find yours before agents do.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="flex flex-wrap justify-center gap-4">
                            <MagneticButton href="/diagnostic" variant="primary">
                                Start Your Diagnostic
                                <ArrowRight size={18} />
                            </MagneticButton>
                            <MagneticButton href="/consultation" variant="secondary">
                                <Calendar size={18} />
                                Book Free Consultation
                            </MagneticButton>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
