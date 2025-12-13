'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { Reveal } from '@/components/effects/Reveal';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { SuccessConfetti } from '@/components/effects/SuccessConfetti';
import { TIERS } from '@/lib/constants';

function DiagnosticResultsContent() {
    const searchParams = useSearchParams();

    // Parse Hybrid Params
    const startTierId = parseInt(searchParams.get('startTier') || '0', 10);
    // Legacy support or fallback
    const tierId = startTierId || parseInt(searchParams.get('tier') || '0', 10);

    const needTierId = parseInt(searchParams.get('needTier') || '0', 10);
    const isConstrained = searchParams.get('isConstrained') === '1';

    const [showConfetti, setShowConfetti] = useState(false);

    // Find tier or default to 2 if invalid/missing
    const tier = TIERS.find(t => t.id === tierId) || TIERS.find(t => t.id === 2);

    useEffect(() => {
        // Show confetti on load if it's a valid result visit
        const timer = setTimeout(() => setShowConfetti(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!tier) return null; // Should fall back to default above, but safety check

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
        <section className="min-h-screen pt-24 pb-24 relative overflow-hidden">
            <SuccessConfetti trigger={showConfetti} />

            {/* Background elements to match site theme */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Reveal>
                        <HeroBadge icon="target">Your Diagnostic Result</HeroBadge>
                    </Reveal>

                    {/* Smart Start Alert (Constrained State) */}
                    {isConstrained && (
                        <ClipReveal delay={50}>
                            <div className="mt-6 mb-8 p-6 rounded-lg border border-yellow-500/20 bg-yellow-500/5 max-w-2xl mx-auto text-left relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                                <h3 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                                    <span className="text-xl">⚠️</span> Smart Start Recommendation
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Your manuscript signals a need for <span className="text-white font-semibold">Tier {needTierId}</span> (based on your stage and goals),
                                    but based on your current investment preference, <span className="text-white font-semibold">Tier {tierId}</span> is the smartest starting point.
                                </p>
                                <p className="text-slate-400 text-xs mt-3 italic">
                                    Strategy: Start here safely to get immediate clarity, then upgrade when you&apos;re ready—your results will still apply.
                                </p>
                            </div>
                        </ClipReveal>
                    )}

                    <ClipReveal delay={100}>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                            We Recommend: {tier.name}
                        </h1>
                    </ClipReveal>
                    <Reveal delay={150}>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            {isConstrained
                                ? "This is your safe, high-impact entry point."
                                : "Based on your manuscript's stage and your goals, this tier provides the most effective editorial intervention."
                            }
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={200}>
                    <BeamCard glowColor={tier.id >= 3 ? 'purple' : 'emerald'}>
                        <div className="p-8 sm:p-10 bg-slate-900/50 backdrop-blur-sm rounded-md border border-slate-800">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)] mb-2">
                                        {tier.name}
                                    </h2>
                                    <p className="text-slate-400 italic text-lg">{tier.description}</p>
                                </div>
                                <div className="text-left sm:text-right bg-slate-800/50 p-4 rounded-lg sm:bg-transparent sm:p-0">
                                    <div className="text-3xl font-bold text-emerald-400 mb-1">{tier.price}</div>
                                    <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">Turnaround: {tier.turnaround}</div>
                                </div>
                            </div>

                            <div className="border-t border-slate-700/50 pt-8 mb-8">
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                    <Check className="w-5 h-5 text-emerald-500" />
                                    What&apos;s Included
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {tier.includes.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <MagneticButton href={ctas.primary.href} variant="primary" className="flex-1 justify-center">
                                    {ctas.primary.text}
                                    <ArrowRight size={18} className="ml-2" />
                                </MagneticButton>
                                <MagneticButton href={ctas.secondary.href} variant="secondary" className="flex-1 justify-center">
                                    {ctas.secondary.text}
                                </MagneticButton>
                            </div>
                        </div>
                    </BeamCard>
                </Reveal>

                {/* Additional Context / Safe Haven */}
                <Reveal delay={400}>
                    <div className="mt-12 text-center">
                        <p className="text-slate-500 text-sm mb-4">
                            Need a second opinion?
                        </p>
                        <a href="mailto:hello@proserefinery.com" className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email us directly
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default function DiagnosticResultsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <DiagnosticResultsContent />
        </Suspense>
    );
}
