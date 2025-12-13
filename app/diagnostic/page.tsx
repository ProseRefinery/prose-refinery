'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check, Target, Sparkles, Gift } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { Skeleton } from '@/components/ui/Skeleton';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { QUESTIONS, track } from '@/lib/constants';
import { DiagnosticAnswers } from '@/lib/types';

type DiagnosticState = 'intro' | 'quiz' | 'email-gate' | 'calculating';

function calculateResult(answers: DiagnosticAnswers): number {
    const values = Object.values(answers).filter(v => v !== undefined) as number[];
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const investment = answers.investment || 2;

    if (investment === 1) return 1;
    if (investment === 2) return 2;
    if (investment === 3) return 3;
    if (investment === 4) return 4;

    if (avg < 1.5) return 1;
    if (avg < 2.5) return 2;
    if (avg < 3.5) return 3;
    return 4;
}

export default function DiagnosticPage() {
    const router = useRouter();
    const [state, setState] = useState<DiagnosticState>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<DiagnosticAnswers>({});
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [newsletter, setNewsletter] = useState(true);

    const handleStart = () => {
        setState('quiz');
        track('diagnostic_started');
    };

    const handleAnswer = (questionId: string, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // Go to email gate instead of calculating directly
            setState('email-gate');
            track('diagnostic_completed');
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate email
        if (!email || !email.includes('@')) {
            setEmailError(true);
            return;
        }

        setEmailError(false);
        setState('calculating');

        // Track email capture
        track('diagnostic_email_captured', { email, newsletter });

        try {
            const tier = calculateResult(answers);

            // Send to backend (saves to audience + sends result email)
            await fetch('/api/diagnostic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    tier,
                    answers,
                    newsletter
                })
            });

            track('diagnostic_result_shown', { tier });
            router.push(`/diagnostic/results?tier=${tier}`);
        } catch (error) {
            console.error('Failed to submit diagnostic:', error);
            // Fallback to showing results anyway so user isn't stuck
            const tier = calculateResult(answers);
            router.push(`/diagnostic/results?tier=${tier}`);
        }
    };

    const question = QUESTIONS[currentQuestion];
    const currentAnswer = answers[question?.id as keyof DiagnosticAnswers];
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

    // Intro State
    if (state === 'intro') {
        return (
            <section className="flex justify-center pt-20 pb-24">
                <GridGlowBackground>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                        <Reveal>
                            <HeroBadge icon="target">2-Minute Diagnostic</HeroBadge>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                Find Your Perfect Editorial Tier
                            </h1>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                                Answer 8 quick questions about your manuscript and goals.
                                We&apos;ll recommend the ideal service tier for your needs.
                            </p>
                        </Reveal>
                        <Reveal delay={300}>
                            <MagneticButton onClick={handleStart} variant="primary">
                                Start Diagnostic
                                <ArrowRight size={18} />
                            </MagneticButton>
                        </Reveal>
                        <Reveal delay={400}>
                            <p className="text-xs text-slate-500 mt-6">
                                No commitment required. Free personalized recommendation.
                            </p>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </section>
        );
    }

    // Email Gate State (NEW)
    if (state === 'email-gate') {
        return (
            <section className="flex justify-center pt-20 pb-24">
                <GridGlowBackground>
                    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
                        {/* Progress indicator */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-slate-400 mb-2">
                                <span>Complete!</span>
                                <span>100%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-full" />
                            </div>
                        </div>

                        <Reveal>
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-md flex items-center justify-center mx-auto mb-6">
                                <Gift className="w-8 h-8 text-emerald-400" />
                            </div>
                        </Reveal>

                        <ClipReveal delay={100}>
                            <h1 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Your Personalized Recommendation is Ready
                            </h1>
                        </ClipReveal>

                        <Reveal delay={200}>
                            <p className="text-slate-400 mb-8">
                                Enter your email to receive your diagnostic results, plus a free guide:
                                <span className="block text-emerald-400 mt-2 font-medium">
                                    &quot;7 Structural Mistakes That Kill Fantasy Manuscripts&quot;
                                </span>
                            </p>
                        </Reveal>

                        <Reveal delay={300}>
                            <form onSubmit={handleEmailSubmit} className="space-y-4">
                                <BeamCard>
                                    <div className="p-6 bg-slate-800/30 rounded-md space-y-4">
                                        <FloatingInput
                                            name="email"
                                            label="Your Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (emailError) setEmailError(false);
                                            }}
                                            error={emailError}
                                            required
                                        />

                                        <label className="flex items-center gap-3 cursor-pointer text-left">
                                            <input
                                                type="checkbox"
                                                checked={newsletter}
                                                onChange={(e) => setNewsletter(e.target.checked)}
                                                className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50"
                                            />
                                            <span className="text-sm text-slate-400">
                                                Send me occasional tips on manuscript craft
                                            </span>
                                        </label>
                                    </div>
                                </BeamCard>

                                <MagneticButton type="submit" variant="primary" className="w-full">
                                    <Sparkles size={18} />
                                    Get My Results
                                </MagneticButton>

                                <p className="text-xs text-slate-500">
                                    We&apos;ll never spam you. Unsubscribe anytime.
                                </p>
                            </form>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </section>
        );
    }

    // Calculating State
    if (state === 'calculating') {
        return (
            <section className="min-h-screen flex items-center justify-center -mt-16 pt-16">
                <div className="mx-auto max-w-xl px-4 text-center">
                    <Reveal>
                        <div className="mb-8">
                            <Target className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
                        </div>
                    </Reveal>
                    <ClipReveal>
                        <h2 className="text-2xl font-bold text-white mb-6">Analyzing Your Responses...</h2>
                    </ClipReveal>
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                    </div>
                    <Reveal delay={500}>
                        <p className="text-sm text-slate-500 mt-8">
                            Check your inbox for the free guide!
                        </p>
                    </Reveal>
                </div>
            </section>
        );
    }

    // Quiz State
    return (
        <section className="pt-20 pb-32 md:py-24 border-t border-slate-800/50">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                        <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <ClipReveal key={question.id}>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 font-[family-name:var(--font-playfair)]">
                        {question.question}
                    </h2>
                </ClipReveal>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {question.options.map((option, i) => (
                        <Reveal key={option.value} delay={i * 50}>
                            <TiltCard
                                className={`cursor-pointer transition-all ${currentAnswer === option.value
                                    ? 'ring-2 ring-emerald-500 bg-emerald-500/10'
                                    : ''
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleAnswer(question.id, option.value)}
                                    className="w-full p-6 text-left bg-slate-800/30 rounded-md border border-slate-700/50 hover:border-emerald-500/50 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${currentAnswer === option.value
                                            ? 'border-emerald-500 bg-emerald-500'
                                            : 'border-slate-600'
                                            }`}>
                                            {currentAnswer === option.value && (
                                                <Check size={12} className="text-white" />
                                            )}
                                        </div>
                                        <span className="text-white">{option.label}</span>
                                    </div>
                                </button>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>


                {/* Navigation (Sticky on Mobile) */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#05080f]/95 backdrop-blur-md border-t border-slate-800 z-40 md:static md:bg-transparent md:border-0 md:p-0 flex justify-between">
                    <MagneticButton
                        onClick={handleBack}
                        variant="ghost"
                        disabled={currentQuestion === 0}
                    >
                        <ArrowLeft size={18} />
                        Back
                    </MagneticButton>
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
        </section >
    );
}
