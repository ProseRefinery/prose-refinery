'use client';

import { ArrowRight, FileText, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { Reveal } from '@/components/effects/Reveal';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { BeforeAfterSnippet } from '@/components/proof/BeforeAfter';

export default function SampleReportPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <Section className="relative pt-24 pb-20" noBorder>
                <GridGlowBackground>
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <Reveal>
                            <HeroBadge icon="file-text">Sample Reports</HeroBadge>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <Heading as="h1" variant="hero" className="mb-6">
                                See What You&apos;ll Receive
                            </Heading>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
                                Sample excerpts from real structural reports. Names and details anonymised.
                            </p>
                            <p className="text-sm text-slate-500 max-w-xl mx-auto">
                                These excerpts show format and depth. Full reports include additional sections based on tier.
                            </p>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </Section>

            {/* Report Preview Cards */}
            <Section>
                <div className="mx-auto max-w-5xl px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Tier 1 Sample */}
                        <Reveal delay={100}>
                            <BeamCard glowColor="emerald" className="h-full">
                                <div className="flex flex-col h-full">
                                    <div className="mb-6">
                                        <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium">Tier 1</span>
                                        <h3 className="text-xl font-bold text-white mt-1">Story Integrity Diagnostic™</h3>
                                        <p className="text-slate-400 text-sm mt-2">Quick structural read on opening pages</p>
                                    </div>

                                    {/* Sample Content Preview */}
                                    <div className="bg-slate-900/50 rounded-lg p-4 mb-6 flex-grow border border-slate-800">
                                        <div className="space-y-4 font-mono text-xs">
                                            <div className="flex justify-between border-b border-slate-700/50 pb-2">
                                                <span className="text-slate-500">PROSE REFINERY</span>
                                                <span className="text-slate-600">Sample Excerpt</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block">RISK LEVEL:</span>
                                                <span className="text-amber-400">Moderate</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block">PRIMARY ZONE:</span>
                                                <span className="text-white">Pacing & Pressure</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block">INCLUDES:</span>
                                                <ul className="text-slate-300 text-[11px] space-y-1 mt-1">
                                                    <li>• Summary + priority order</li>
                                                    <li>• Failure zone analysis</li>
                                                    <li>• 3 action steps with reasoning</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-800">
                                        <p className="text-xs text-slate-500 mb-4">1-page diagnostic • 48hr delivery</p>
                                        <Link
                                            href="/sample-report/tier1-sample"
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors text-sm font-medium"
                                        >
                                            View Tier 1 Sample
                                            <ExternalLink size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </BeamCard>
                        </Reveal>

                        {/* Tier 3 Sample */}
                        <Reveal delay={200}>
                            <BeamCard glowColor="purple" className="h-full">
                                <div className="flex flex-col h-full">
                                    <div className="mb-6">
                                        <span className="text-xs text-purple-400 uppercase tracking-wider font-medium">Tier 3</span>
                                        <h3 className="text-xl font-bold text-white mt-1">Full Structural Edit</h3>
                                        <p className="text-slate-400 text-sm mt-2">Complete 4-pillar manuscript assessment</p>
                                    </div>

                                    {/* Sample Content Preview */}
                                    <div className="bg-slate-900/50 rounded-lg p-4 mb-6 flex-grow border border-slate-800">
                                        <div className="space-y-4 font-mono text-xs">
                                            <div className="flex justify-between border-b border-slate-700/50 pb-2">
                                                <span className="text-slate-500">PROSE REFINERY</span>
                                                <span className="text-slate-600">Sample Excerpt</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block">RISK LEVEL:</span>
                                                <span className="text-rose-400">High</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block">PRIMARY ZONE:</span>
                                                <span className="text-white">Plot Architecture</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block">INCLUDES:</span>
                                                <ul className="text-slate-300 text-[11px] space-y-1 mt-1">
                                                    <li>• Full summary + 4 priorities</li>
                                                    <li>• Extended failure analysis</li>
                                                    <li>• 5 action steps with reasoning</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-800">
                                        <p className="text-xs text-slate-500 mb-4">15-25 page report • 3-4 week delivery</p>
                                        <Link
                                            href="/sample-report/tier3-sample"
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors text-sm font-medium"
                                        >
                                            View Tier 3 Sample
                                            <ExternalLink size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </BeamCard>
                        </Reveal>
                    </div>
                </div>
            </Section>

            {/* What Every Report Includes */}
            <Section background="subtle">
                <div className="mx-auto max-w-4xl px-4">
                    <ClipReveal>
                        <Heading variant="section" className="text-center mb-12">
                            Every Report Includes
                        </Heading>
                    </ClipReveal>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: 'Structural Risk Level', desc: 'Low, Moderate, or High assessment of overall manuscript integrity' },
                            { title: 'Primary Failure Zone', desc: 'Which of the 4 pillars needs attention first' },
                            { title: 'Numbered Action Steps', desc: 'What to change, why it matters, what success looks like' },
                            { title: 'Revision Priority Order', desc: 'Sequence your fixes for maximum efficiency' },
                        ].map((item, index) => (
                            <Reveal key={index} delay={100 + index * 50}>
                                <div className="flex items-start gap-4 p-4 bg-slate-900/30 rounded-lg border border-slate-800">
                                    <Check className="text-emerald-400 shrink-0 mt-1" size={20} />
                                    <div>
                                        <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                        <p className="text-slate-400 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Before/After Example */}
            <Section>
                <div className="mx-auto max-w-4xl px-4">
                    <ClipReveal>
                        <Heading variant="section" className="text-center mb-4">
                            Structural Editing in Action
                        </Heading>
                    </ClipReveal>
                    <Reveal delay={100}>
                        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                            We change structure, not prose style. Here is what that looks like.
                        </p>
                    </Reveal>
                    <BeforeAfterSnippet id="pacing-pressure-1" />
                </div>
            </Section>

            {/* Trust Footer + CTA */}
            <Section background="subtle">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <Reveal>
                        <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800 mb-12">
                            <FileText className="text-slate-600 mx-auto mb-4" size={32} />
                            <p className="text-slate-400 text-sm mb-2">
                                Sample excerpts show format and depth. Details anonymised.
                            </p>
                            <p className="text-slate-500 text-xs">
                                This report addresses structural integrity. It does not provide line-level edits or proofreading.
                            </p>
                        </div>
                    </Reveal>
                    <ClipReveal delay={100}>
                        <Heading variant="section" className="mb-6">
                            Find Your Failure Zone First
                        </Heading>
                    </ClipReveal>
                    <Reveal delay={200}>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                            The free diagnostic quiz identifies your structural risk level and recommends the right tier for your manuscript.
                        </p>
                        <MagneticButton href="/diagnostic" variant="primary" className="px-8 py-4 text-lg">
                            Begin Free Diagnostic Quiz
                            <ArrowRight size={20} />
                        </MagneticButton>
                    </Reveal>
                </div>
            </Section>
        </div>
    );
}
