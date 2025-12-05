'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Target, Mail, Sparkles, Gift } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { BeamCard } from '@/components/effects/BeamCard';
import { SuccessConfetti } from '@/components/effects/SuccessConfetti';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { Skeleton } from '@/components/ui/Skeleton';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { QUESTIONS, TIERS, track } from '@/lib/constants';
import { DiagnosticAnswers } from '@/lib/types';

type DiagnosticState = 'intro' | 'quiz' | 'email-gate' | 'calculating' | 'result';

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
    const [state, setState] = useState<DiagnosticState>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<DiagnosticAnswers>({});
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [newsletter, setNewsletter] = useState(true);
    const [recommendedTier, setRecommendedTier] = useState<number>(2);
    const [showConfetti, setShowConfetti] = useState(false);

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

        // Simulate processing and calculate result
        setTimeout(() => {
            const tier = calculateResult(answers);
            setRecommendedTier(tier);
            setState('result');
            setShowConfetti(true);
            track('diagnostic_result_shown', { tier });
        }, 2000);
    };

    const question = QUESTIONS[currentQuestion];
    const currentAnswer = answers[question?.id as keyof DiagnosticAnswers];
    const tier = TIERS.find(t => t.id === recommendedTier);
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
                                We'll recommend the ideal service tier for your needs.
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
                                    "7 Structural Mistakes That Kill Fantasy Manuscripts"
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
                                    We'll never spam you. Unsubscribe anytime.
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

    // Result State
    if (state === 'result' && tier) {
        // Determine CTAs based on tier
        const getCTAs = () => {
            switch (tier.id) {
                case 1:
                    return {
                        primary: { text: 'Buy Now — £95', href: '/services#tier-1' },
                        secondary: { text: 'See All Tier 1 Options', href: '/services' }
                    };
                case 2:
                case 3:
                    return {
                        primary: { text: 'Book Free Consultation', href: '/consultation' },
                        secondary: { text: 'View Full Service Details', href: '/services' }
                    };
                case 4:
                    return {
                        primary: { text: 'Apply for Partnership', href: '/apply' },
                        secondary: { text: 'Learn More About Tier 4', href: '/services#tier-4' }
                    };
                default:
                    return {
                        primary: { text: 'Get Started', href: '/contact' },
                        secondary: { text: 'View All Options', href: '/services' }
                    };
            }
        };

        const ctas = getCTAs();

        return (
            <>
                <SuccessConfetti trigger={showConfetti} />
                <section className="py-24 border-t border-slate-800/50">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <Reveal>
                                <HeroBadge icon="target">Your Result</HeroBadge>
                            </Reveal>
                            <ClipReveal delay={100}>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                    We Recommend: {tier.name}
                                </h1>
                            </ClipReveal>
                            <Reveal delay={150}>
                                <p className="text-slate-400">
                                    Based on your responses, this tier is the best fit for your manuscript's needs.
                                </p>
                            </Reveal>
                        </div>

                        <Reveal delay={200}>
                            <BeamCard glowColor={tier.id >= 3 ? 'purple' : 'emerald'}>
                                <div className="p-8 bg-slate-800/30 rounded-md">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)]">
                                                {tier.name}
                                            </h2>
                                            <p className="text-slate-400">{tier.description}</p>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <div className="text-2xl font-bold text-emerald-400">{tier.price}</div>
                                            <div className="text-sm text-slate-500">{tier.turnaround}</div>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-700/50 pt-6 mb-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">What's Included:</h3>
                                        <ul className="space-y-3">
                                            {tier.includes.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Check size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                                    <span className="text-slate-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <MagneticButton href={ctas.primary.href} variant="primary" className="flex-1">
                                            {ctas.primary.text}
                                            <ArrowRight size={18} />
                                        </MagneticButton>
                                        <MagneticButton href={ctas.secondary.href} variant="secondary" className="flex-1">
                                            {ctas.secondary.text}
                                        </MagneticButton>
                                    </div>
                                </div>
                            </BeamCard>
                        </Reveal>

                        {/* Email confirmation */}
                        <Reveal delay={400}>
                            <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-md text-center">
                                <Mail className="w-5 h-5 text-emerald-400 inline mr-2" />
                                <span className="text-sm text-emerald-400">
                                    Results and free guide sent to {email}
                                </span>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </>
        );
    }

    // Quiz State
    return (
        <section className="py-24 border-t border-slate-800/50">
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
                                    <div className="flex items-center gap-4">
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

                {/* Navigation */}
                <div className="flex justify-between">
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
        </section>
    );
}
