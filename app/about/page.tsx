import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { COMPANY, PILLARS } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How It Works | Prose Refinery',
    description: 'Our methodology focuses on structural narrative integrity: plot architecture, character integrity, world-system logic, and pacing pressure.',
};

export default function AboutPage() {
    return (
        <>
            {/* Hero - Mission Statement */}
            <Section className="relative flex justify-center pt-20 pb-24" noBorder>
                <GridGlowBackground>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <div className="max-w-3xl mx-auto">
                            <Reveal>
                                <HeroBadge icon="award">Methodology</HeroBadge>
                            </Reveal>
                            <ClipReveal delay={100}>
                                <Heading as="h1" variant="hero" className="mb-6">
                                    How Prose Refinery Works
                                </Heading>
                            </ClipReveal>
                            <Reveal delay={200}>
                                <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                                    <p>
                                        Prose Refinery is a specialist editorial practice focused on <strong className="text-white">structural narrative integrity</strong> in speculative fiction.
                                    </p>
                                    <p className="text-slate-400">
                                        We do not offer stylistic polish, motivational feedback, or generic writing advice. We diagnose and correct failures in plot architecture, character escalation, pacing pressure, and world-system logic—before revision cycles waste months.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </GridGlowBackground>
            </Section>

            {/* 4 Pillars Section */}
            <Section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <ClipReveal>
                            <Heading variant="section" className="mb-4">
                                The 4 Core Pillars
                            </Heading>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                The structural load-bearing walls of any speculative novel.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {PILLARS.map((pillar, i) => {
                            const Icon = pillar.icon;
                            return (
                                <Reveal key={pillar.id} delay={i * 100}>
                                    <TiltCard className="p-8 bg-slate-800/30 rounded-md border border-slate-700/50 h-full">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                                <Icon className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div>
                                                <Heading as="h3" variant="card" className="mb-2 text-white">{pillar.name}</Heading>
                                                <p className="text-sm text-slate-400 leading-relaxed">{pillar.short}</p>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </Section>

            {/* Editorial Standards */}
            <Section background="subtle">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <Heading variant="section" className="mb-6">
                            Editorial Standards
                        </Heading>
                    </ClipReveal>
                    <Reveal delay={100}>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 md:p-12 mb-12">
                            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                                Editorial work is carried out by Prose Refinery&apos;s lead structural editor and, where appropriate, supporting reviewers operating under the same diagnostic framework.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                All reports follow standardised formats and quality controls to ensure consistency regardless of reviewer.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="text-sm text-slate-500 italic max-w-xl mx-auto">
                            Prose Refinery is led by a senior structural editor with a background in speculative narrative systems.
                        </p>
                    </Reveal>
                </div>
            </Section>

            {/* CTA */}
            <Section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <Heading variant="section" className="mb-6">
                            Construct Your Narrative Architecture
                        </Heading>
                    </ClipReveal>
                    <Reveal delay={100}>
                        <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                            Start with our 2-minute diagnostic. We&apos;ll recommend the perfect editorial
                            tier for your manuscript&apos;s needs.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="flex justify-center">
                            <MagneticButton href="/diagnostic" variant="primary">
                                Start Your Diagnostic
                                <ArrowRight size={18} />
                            </MagneticButton>
                        </div>
                    </Reveal>
                </div>
            </Section>
        </>
    );
}
