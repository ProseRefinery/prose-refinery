'use client';

import { ArrowRight, Check, X, HelpCircle } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { Reveal } from '@/components/effects/Reveal';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { BeforeAfterSnippet } from '@/components/proof/BeforeAfter';
import { ComplaintPage } from '@/lib/complaint-pages';

interface Props {
    page: ComplaintPage;
}

export default function ComplaintLandingPage({ page }: Props) {
    return (
        <div className="min-h-screen">
            {/* 1. Hero - mirrors the complaint */}
            <Section className="relative pt-24 pb-20" noBorder>
                <GridGlowBackground>
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <Reveal>
                            <HeroBadge icon="target">Free Structural Diagnostic</HeroBadge>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <Heading as="h1" variant="hero" className="mb-6">
                                {page.headline}
                            </Heading>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                                {page.subhead}
                            </p>
                        </Reveal>
                        <Reveal delay={300}>
                            <div className="flex flex-col items-center gap-4">
                                <MagneticButton href="/diagnostic" variant="primary" className="px-8 py-4 text-lg">
                                    Begin Free Diagnostic Quiz
                                    <ArrowRight size={20} />
                                </MagneticButton>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                                    8 questions • ~3 minutes • Immediate structural recommendation
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </Section>

            {/* 2. What You Get - Output Preview */}
            <Section background="subtle">
                <div className="mx-auto max-w-4xl px-4">
                    <ClipReveal>
                        <Heading variant="section" className="text-center mb-4">
                            What the Quiz Reveals
                        </Heading>
                    </ClipReveal>
                    <Reveal delay={100}>
                        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                            This is not advice. It is a triage result that tells you what to fix first.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <BeamCard glowColor="emerald">
                            <div className="grid md:grid-cols-2 gap-8 p-4">
                                <div className="space-y-6">
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Structural Risk Level</span>
                                        <span className="text-amber-400 font-bold text-lg">MODERATE</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Primary Failure Zone</span>
                                        <span className="text-white font-bold text-lg">Pacing & Pressure</span>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Recommended Tier</span>
                                        <span className="text-emerald-400 font-bold text-lg">Single-Pillar Structural Audit</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Revision Priority</span>
                                        <span className="text-slate-300">Scene turns before chapter structure</span>
                                    </div>
                                </div>
                            </div>
                        </BeamCard>
                    </Reveal>
                </div>
            </Section>

            {/* 3. Symptom-to-Structure Mapping */}
            <Section>
                <div className="mx-auto max-w-4xl px-4">
                    <ClipReveal>
                        <Heading variant="section" className="text-center mb-4">
                            What Your Symptoms Actually Mean
                        </Heading>
                    </ClipReveal>
                    <Reveal delay={100}>
                        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                            Translate emotional frustration into structural diagnosis.
                        </p>
                    </Reveal>
                    <div className="space-y-6">
                        {page.symptomMappings.map((mapping, index) => (
                            <Reveal key={index} delay={150 + index * 50}>
                                <BeamCard>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <span className="text-rose-400 mt-1 shrink-0">"</span>
                                            <p className="text-white font-medium italic">{mapping.symptom}"</p>
                                        </div>
                                        <div className="pl-6 border-l-2 border-emerald-500/30 space-y-2">
                                            <p className="text-sm">
                                                <span className="text-emerald-400 font-medium">Structural signal: </span>
                                                <span className="text-slate-300">{mapping.signal}</span>
                                            </p>
                                            <p className="text-sm">
                                                <span className="text-slate-500 font-medium">What to check: </span>
                                                <span className="text-slate-400">{mapping.whatToCheck}</span>
                                            </p>
                                        </div>
                                    </div>
                                </BeamCard>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* 4. This Is / This Is Not */}
            <Section background="subtle">
                <div className="mx-auto max-w-4xl px-4">
                    <ClipReveal>
                        <Heading variant="section" className="text-center mb-12">
                            What This Diagnostic Is (and Isn't)
                        </Heading>
                    </ClipReveal>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Reveal delay={100}>
                            <BeamCard glowColor="emerald">
                                <h4 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                                    <Check size={20} /> This Is
                                </h4>
                                <ul className="space-y-3 text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-emerald-400 mt-1 shrink-0" />
                                        Structural diagnosis of narrative architecture
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-emerald-400 mt-1 shrink-0" />
                                        Genre-aware (fantasy, sci-fi, speculative)
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-emerald-400 mt-1 shrink-0" />
                                        Actionable priority order for revision
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check size={16} className="text-emerald-400 mt-1 shrink-0" />
                                        Tier recommendation based on your needs
                                    </li>
                                </ul>
                            </BeamCard>
                        </Reveal>
                        <Reveal delay={200}>
                            <BeamCard>
                                <h4 className="text-rose-400 font-bold mb-4 flex items-center gap-2">
                                    <X size={20} /> This Is Not
                                </h4>
                                <ul className="space-y-3 text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-rose-400/60 mt-1 shrink-0" />
                                        Grammar or line editing
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-rose-400/60 mt-1 shrink-0" />
                                        Generic writing advice
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-rose-400/60 mt-1 shrink-0" />
                                        AI auto-feedback
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <X size={16} className="text-rose-400/60 mt-1 shrink-0" />
                                        Promises of publication
                                    </li>
                                </ul>
                            </BeamCard>
                        </Reveal>
                    </div>
                </div>
            </Section>

            {/* 5. Proof Block - Before/After Snippet */}
            <Section>
                <div className="mx-auto max-w-4xl px-4">
                    <ClipReveal>
                        <Heading variant="section" className="text-center mb-4">
                            Structural Revision Example
                        </Heading>
                    </ClipReveal>
                    <Reveal delay={100}>
                        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
                            This is what structural editing looks like. Line-level prose unchanged.
                        </p>
                    </Reveal>
                    <BeforeAfterSnippet id={page.proofSnippetId} />
                </div>
            </Section>

            {/* 6. Micro FAQ */}
            <Section background="subtle">
                <div className="mx-auto max-w-3xl px-4">
                    <ClipReveal>
                        <Heading variant="section" className="text-center mb-12">
                            Quick Questions
                        </Heading>
                    </ClipReveal>
                    <div className="space-y-4">
                        {page.microFaq.map((faq, index) => (
                            <Reveal key={index} delay={100 + index * 50}>
                                <BeamCard>
                                    <div className="flex items-start gap-4">
                                        <HelpCircle size={20} className="text-emerald-400 shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-medium mb-2">{faq.question}</p>
                                            <p className="text-slate-400 text-sm">{faq.answer}</p>
                                        </div>
                                    </div>
                                </BeamCard>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* 7. Trust + Final CTA */}
            <Section>
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <Reveal>
                        <div className="space-y-2 mb-8 text-sm text-slate-500">
                            <p>We do not request your manuscript file until we confirm fit.</p>
                            <p>Your results are delivered by email so you can revisit them.</p>
                        </div>
                    </Reveal>
                    <ClipReveal delay={100}>
                        <Heading variant="section" className="mb-6">
                            Ready to Find the Structural Break?
                        </Heading>
                    </ClipReveal>
                    <Reveal delay={200}>
                        <div className="flex flex-col items-center gap-4">
                            <MagneticButton href="/diagnostic" variant="primary" className="px-8 py-4 text-lg">
                                Begin Free Diagnostic Quiz
                                <ArrowRight size={20} />
                            </MagneticButton>
                            <a href="/sample-report" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors underline underline-offset-4">
                                See what a real report looks like →
                            </a>
                        </div>
                    </Reveal>
                </div>
            </Section>
        </div>
    );
}
