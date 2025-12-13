'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, AlertTriangle, Activity, PenTool, CheckCircle2, XCircle } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Skeleton } from '@/components/ui/Skeleton';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { QUESTIONS, track, TIERS } from '@/lib/constants';
import { DiagnosticAnswers } from '@/lib/types';

type DiagnosticState = 'intro' | 'quiz' | 'email-gate' | 'calculating' | 'results';

interface DiagnosticResult {
    tier: number;
    risk: 'Low' | 'Moderate' | 'High';
    zone: string;
    priority: string;
}

function calculateDetailedResult(answers: DiagnosticAnswers): DiagnosticResult {
    const values = Object.values(answers).filter(v => v !== undefined) as number[];
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const concern = answers.concern || 1;

    // Determine Risk
    let risk: 'Low' | 'Moderate' | 'High' = 'Moderate';
    if (avg < 2) risk = 'High';
    if (avg > 3) risk = 'Low';

    // Map Zone from Concern
    const zones = ['General Structure', 'Pacing & Pressure', 'Character & World', 'Market Positioning'];
    const zone = zones[concern - 1] || 'Plot Architecture';

    // Map Priority
    const priorities = [
        'Clarify core narrative stakes',
        'Tighten act transitions',
        'Deepen character-world integration',
        'Refine hook and voice'
    ];
    const priority = priorities[concern - 1] || 'Structural cohesion';

    // Determine Tier (Logic from previous implementation)
    let tier = 2;
    const investment = answers.investment || 2;
    if (investment === 1) tier = 1;
    else if (investment === 4) tier = 4;
    else {
        if (avg < 1.5) tier = 1;
        else if (avg < 2.5) tier = 2;
        else if (avg < 3.5) tier = 3;
        else tier = 4;
    }

    return { tier, risk, zone, priority };
}

export default function DiagnosticPage() {
    const [state, setState] = useState<DiagnosticState>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<DiagnosticAnswers>({});
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [result, setResult] = useState<DiagnosticResult | null>(null);

    const handleStart = () => {
        setState('quiz');
        track('diagnostic_started');
        window.scrollTo(0, 0);
    };

    const handleAnswer = (questionId: string, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setState('email-gate');
            track('diagnostic_completed');
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setEmailError(true);
            return;
        }

        setEmailError(false);
        setState('calculating');
        const calculatedResult = calculateDetailedResult(answers);
        setResult(calculatedResult);

        track('diagnostic_email_captured', { email });

        try {
            await fetch('/api/diagnostic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    tier: calculatedResult.tier,
                    answers,
                    newsletter: true // Implicit opt-in or strictly simple
                })
            });
        } catch (error) {
            console.error('Submission failed', error);
        }

        setTimeout(() => {
            setState('results');
            window.scrollTo(0, 0);
            track('diagnostic_result_shown', { tier: calculatedResult.tier });
        }, 1500);
    };

    const question = QUESTIONS[currentQuestion];
    const currentAnswer = answers[question?.id as keyof DiagnosticAnswers];
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

    // Intro State
    if (state === 'intro') {
        return (
            <div className="min-h-screen bg-slate-950">
                {/* 1. Hero Block */}
                <Section className="relative pt-32 pb-20" noBorder>
                    <GridGlowBackground>
                        <div className="mx-auto max-w-4xl px-4 text-center">
                            <ClipReveal>
                                <Heading as="h1" variant="hero" className="mb-6">
                                    Find Out What’s Structurally Breaking Your Novel
                                </Heading>
                            </ClipReveal>
                            <Reveal delay={100}>
                                <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                                    Answer 8 targeted questions. Receive a structural priority map and tier recommendation.
                                </p>
                            </Reveal>
                            <Reveal delay={200}>
                                <div className="flex flex-col items-center gap-4">
                                    <MagneticButton onClick={handleStart} variant="primary" className="px-8 py-4 text-lg">
                                        Start Free Diagnostic Quiz
                                        <ArrowRight size={20} />
                                    </MagneticButton>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                                        ~3 minutes • 8 questions • Immediate results
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </GridGlowBackground>
                </Section>

                {/* 2. Output Preview */}
                <Section background="subtle">
                    <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <Reveal delay={100}>
                                <BeamCard glowColor="emerald">
                                    <div className="p-8 bg-slate-900/90 rounded-lg border border-emerald-500/20 font-mono text-sm leading-relaxed">
                                        <div className="flex justify-between border-b border-slate-800 pb-4 mb-4">
                                            <span className="text-slate-500">DIAGNOSTIC OUTPUT</span>
                                            <span className="text-emerald-500">READY</span>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-slate-500 block text-xs mb-1">STRUCTURAL RISK LEVEL</span>
                                                <span className="text-amber-400 font-bold">MODERATE</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block text-xs mb-1">PRIMARY FAILURE ZONE</span>
                                                <span className="text-white">Act II Pacing & Pressure</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block text-xs mb-1">RECOMMENDED TIER</span>
                                                <span className="text-emerald-400">Single-Pillar Structural Audit</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block text-xs mb-1">PRIORITY</span>
                                                <span className="text-slate-300">Stakes escalation before scene transitions</span>
                                            </div>
                                        </div>
                                    </div>
                                </BeamCard>
                            </Reveal>
                        </div>
                        <div className="order-1 md:order-2">
                            <ClipReveal>
                                <div className="text-emerald-500 font-medium mb-2 uppercase tracking-wide text-sm">What You’ll Receive</div>
                                <Heading variant="section" className="mb-4">
                                    A blueprint for revision.
                                </Heading>
                            </ClipReveal>
                            <Reveal delay={100}>
                                <p className="text-slate-400 mb-6 text-lg">
                                    Your diagnostic identifies where your manuscript’s structure is under stress—and what to prioritise first.
                                </p>
                                <ul className="space-y-3 text-slate-300">
                                    {[
                                        'Structural Risk Level',
                                        'Primary Failure Zone',
                                        'Recommended Service Tier',
                                        'Revision Priority'
                                    ].map(item => (
                                        <li key={item} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        </div>
                    </div>
                </Section>

                {/* 3. Boundary Setting */}
                <Section>
                    <div className="mx-auto max-w-4xl px-4">
                        <div className="text-center mb-16">
                            <Heading variant="section">
                                What This Diagnostic Is (and Isn’t)
                            </Heading>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                            <Reveal delay={100}>
                                <div className="space-y-4">
                                    <Heading as="h3" variant="card" className="text-emerald-400 border-b border-emerald-500/20 pb-2">This IS</Heading>
                                    <ul className="space-y-3 text-slate-300">
                                        <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Structural analysis</li>
                                        <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Architecture-level diagnosis</li>
                                        <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Genre-aware (speculative fiction)</li>
                                        <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Actionable prioritisation</li>
                                    </ul>
                                </div>
                            </Reveal>
                            <Reveal delay={200}>
                                <div className="space-y-4">
                                    <Heading as="h3" variant="card" className="text-rose-400 border-b border-rose-500/20 pb-2">This is NOT</Heading>
                                    <ul className="space-y-3 text-slate-400">
                                        <li className="flex gap-2"><XCircle size={18} className="text-rose-500/70 shrink-0" /> Grammar or prose feedback</li>
                                        <li className="flex gap-2"><XCircle size={18} className="text-rose-500/70 shrink-0" /> Line editing</li>
                                        <li className="flex gap-2"><XCircle size={18} className="text-rose-500/70 shrink-0" /> AI auto-feedback</li>
                                        <li className="flex gap-2"><XCircle size={18} className="text-rose-500/70 shrink-0" /> Generic writing advice</li>
                                    </ul>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </Section>

                {/* 4. How It Works */}
                <Section background="subtle">
                    <div className="mx-auto max-w-7xl px-4 text-center">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { step: '01', title: 'Answer 8 Questions', text: 'Draft stage, revision history, structural pain points.' },
                                { step: '02', title: 'Receive Your Structural Map', text: 'Risk level, failure zone, and tier recommendation.' },
                                { step: '03', title: 'Decide Next Steps', text: 'Revise independently or proceed with professional support.' }
                            ].map((s, i) => (
                                <Reveal key={i} delay={i * 100} className="h-full">
                                    <TiltCard className="h-full">
                                        <div className="relative p-6 pt-12 border border-slate-800 rounded-lg bg-slate-900/50 h-full flex flex-col">
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-emerald-500 font-mono text-sm px-3 py-1 rounded-full">
                                                {s.step}
                                            </div>
                                            <Heading as="h3" variant="card" className="mb-2">{s.title}</Heading>
                                            <p className="text-slate-400 text-sm flex-grow">{s.text}</p>
                                        </div>
                                    </TiltCard>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* 5. Final CTA */}
                <Section>
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <ClipReveal>
                            <Heading variant="section" className="mb-6">
                                Know What’s Broken Before You Rewrite
                            </Heading>
                        </ClipReveal>
                        <Reveal>
                            <p className="text-slate-400 mb-8">8 questions. 3 minutes. A clear structural priority.</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <MagneticButton onClick={handleStart} variant="primary">
                                    Start the Free Diagnostic Quiz
                                </MagneticButton>
                                <a href="/services" className="px-6 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                    View Services →
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </Section>
            </div>
        );
    }

    // Quiz State
    if (state === 'quiz') {
        return (
            <section className="min-h-screen pt-32 pb-20 px-4">
                <div className="mx-auto max-w-2xl">
                    {/* Progress */}
                    <div className="mb-12">
                        <div className="flex justify-between text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
                            <span>Question {currentQuestion + 1} / {QUESTIONS.length}</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <ClipReveal key={question.id}>
                        <Heading as="h2" variant="section" className="mb-8">
                            {question.question}
                        </Heading>
                    </ClipReveal>

                    <div className="space-y-3 mb-12">
                        {question.options.map((option, i) => (
                            <Reveal key={option.value} delay={i * 50}>
                                <button
                                    type="button"
                                    onClick={() => handleAnswer(question.id, option.value)}
                                    className={`w-full p-5 text-left rounded-md border transition-all duration-200 group ${currentAnswer === option.value
                                        ? 'bg-emerald-950/20 border-emerald-500/50 text-white'
                                        : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option.label}</span>
                                        {currentAnswer === option.value && <Check size={16} className="text-emerald-400" />}
                                    </div>
                                </button>
                            </Reveal>
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={currentQuestion === 0}
                            className={`flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors ${currentQuestion === 0 ? 'opacity-0 cursor-default' : ''}`}
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                        <MagneticButton
                            onClick={handleNext}
                            variant="primary"
                            disabled={currentAnswer === undefined}
                        >
                            {currentQuestion === QUESTIONS.length - 1 ? 'Get Results' : 'Next'}
                            <ArrowRight size={18} />
                        </MagneticButton>
                    </div>
                </div>
            </section>
        );
    }

    // Email Gate
    if (state === 'email-gate') {
        return (
            <section className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <ClipReveal>
                        <Heading as="h2" variant="section" className="text-center mb-8">
                            Where should we send your results?
                        </Heading>
                    </ClipReveal>

                    <Reveal>
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <FloatingInput
                                name="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (emailError) setEmailError(false);
                                }}
                                error={emailError}
                                required
                            />

                            <MagneticButton type="submit" variant="primary" className="w-full">
                                Get My Results
                            </MagneticButton>
                        </form>
                    </Reveal>
                </div>
            </section>
        );
    }

    // Calculating
    if (state === 'calculating') {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Activity className="w-8 h-8 text-emerald-400 mx-auto animate-pulse mb-4" />
                    <p className="text-slate-500 text-sm font-mono">GENERATING STRUCTURAL MAP...</p>
                </div>
            </section>
        );
    }

    // Results (Inline)
    if (state === 'results' && result) {
        const tierDetails = TIERS.find(t => t.id === result.tier);

        return (
            <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4">
                <div className="mx-auto max-w-3xl">
                    <ClipReveal>
                        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2 font-[family-name:var(--font-playfair)]">
                            Your Structural Diagnostic Results
                        </h1>
                        <p className="text-slate-500 text-center mb-12 text-sm">A copy has been sent to your email.</p>
                    </ClipReveal>

                    <Reveal>
                        <BeamCard glowColor="emerald" className="mb-12">
                            <div className="p-8 bg-slate-900/50 rounded-lg border border-slate-700/50">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <span className="text-xs text-slate-500 font-sans tracking-wide uppercase block mb-1">Structural Risk Level</span>
                                            <div className={`text-xl font-bold ${result.risk === 'High' ? 'text-rose-400' : result.risk === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                {result.risk.toUpperCase()}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-500 font-sans tracking-wide uppercase block mb-1">Primary Failure Zone</span>
                                            <div className="text-xl font-bold text-white">{result.zone}</div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-500 font-sans tracking-wide uppercase block mb-1">Recommended Tier</span>
                                            <div className="text-xl font-bold text-emerald-400">{tierDetails?.name}</div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-500 font-sans tracking-wide uppercase block mb-1">Revision Priority</span>
                                            <div className="text-lg text-slate-300">{result.priority}</div>
                                        </div>
                                    </div>
                                    <div className="border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
                                        <p className="text-sm text-slate-400 mb-6 italic">
                                            &quot;Based on your responses, your manuscript requires focus on {result.zone.toLowerCase()}. The {tierDetails?.name} is designed to address this specifically.&quot;
                                        </p>
                                        <MagneticButton href={`/services#${result.tier === 1 ? 'diagnostic' : result.tier === 2 ? 'audit' : 'full'}`} variant="primary" className="w-full justify-center">
                                            Proceed to {tierDetails?.name}
                                        </MagneticButton>
                                    </div>
                                </div>
                            </div>
                        </BeamCard>
                    </Reveal>

                    <Reveal delay={100}>
                        <div className="text-center space-y-4">
                            <a href="/services" className="text-slate-400 hover:text-white transition-colors text-sm border-b border-transparent hover:border-slate-500 pb-0.5">
                                View All Service Tiers →
                            </a>
                            <p className="text-xs text-slate-600 mt-8">
                                Questions about your results? <a href="/contact" className="underline hover:text-slate-400">Book a brief call.</a>
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        );
    }

    return null;
}
