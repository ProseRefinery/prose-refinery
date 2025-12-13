'use client';

import { useState } from 'react';
import { Check, ArrowRight, Shield, ChevronDown, ChevronUp, Calendar, CreditCard, Clock, Sparkles } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { CheckoutButton } from '@/components/ui/checkout-button';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { STRIPE_PRICES } from '@/lib/constants';
import { COMPARISON_DATA } from '@/lib/comparison-data';

// Mobile Comparison Component
function MobileComparison() {
    const [activeTier, setActiveTier] = useState<1 | 2 | 3 | 4>(2);

    return (
        <div className="block lg:hidden">
            {/* Sticky Tabs */}
            <div className="sticky top-20 z-10 bg-[#05080f]/95 backdrop-blur-sm border-b border-slate-700/50 pt-4 pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6">
                <div className="flex justify-between gap-1">
                    {[1, 2, 3, 4].map((tierId) => (
                        <button
                            key={tierId}
                            onClick={() => setActiveTier(tierId as 1 | 2 | 3 | 4)}
                            className={`flex-1 py-3 text-sm font-medium rounded-md transition-all ${activeTier === tierId
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                : 'text-slate-400 hover:text-white bg-slate-800/50'
                                }`}
                        >
                            Tier {tierId}
                        </button>
                    ))}
                </div>
                <div className="text-center mt-3 text-xs text-emerald-400 font-medium uppercase tracking-wide">
                    {activeTier === 1 && "Entry Diagnostics"}
                    {activeTier === 2 && "Focused Audits"}
                    {activeTier === 3 && "Full Manuscript"}
                    {activeTier === 4 && "Editorial Partnership"}
                </div>
            </div>

            {/* Content Maps */}
            <div className="space-y-4">
                {COMPARISON_DATA.map((row, i) => (
                    <div key={i} className="p-4 bg-slate-800/30 rounded-md border border-slate-700/30 flex justify-between items-center">
                        <span className="text-slate-400 text-sm font-medium">{row.feature}</span>
                        <div key={activeTier} className="text-right text-white animate-in fade-in duration-200">
                            {activeTier === 1 && row.tier1}
                            {activeTier === 2 && row.tier2}
                            {activeTier === 3 && row.tier3}
                            {activeTier === 4 && row.tier4}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// FAQ Data
const FAQ_ITEMS = [
    {
        question: "What if I'm not satisfied with the edit?",
        answer: "We offer a satisfaction guarantee on all services. If our feedback doesn't resonate or isn't actionable, we'll revise our editorial letter or refund your fee. We'd rather lose a fee than leave you feeling unheard."
    },
    {
        question: "How long does each service take?",
        answer: "Tier 1 (Snapshots): 48 hours. Tier 2 (Focused Audits): 5-7 business days. Tier 3 (Full Manuscript): 3-4 weeks. Tier 4 (Partnership): 8-12 weeks with ongoing communication. We confirm exact timelines before starting."
    },
    {
        question: "Do you work with debut authors?",
        answer: "Absolutely. Most of our clients are debut authors preparing their first submission. We also work with published authors between contracts and indie authors leveling up their craft. What matters isn't your publishing history—it's your commitment to getting the structure right."
    },
    {
        question: "What makes you different from editors on Reedsy or Fiverr?",
        answer: "Most editors focus on prose: sentence clarity, grammar, word choice. We focus on architecture: story structure, world logic, character motivation, pacing. We diagnose why your second act drags or why readers put the book down at chapter seven. Prose polish is the final 10%. We handle the 90% that determines whether your book works."
    },
    {
        question: "What genres do you specialize in?",
        answer: "Speculative fiction: fantasy (epic, urban, dark, cozy), science fiction, and genre-blending work. We don't edit literary fiction, memoir, romance (unless romantasy), or non-fiction. This focus means we understand genre conventions deeply—what readers expect and how to subvert those expectations effectively."
    },
    {
        question: "Can I see a sample edit before committing?",
        answer: "Yes. Our Tier 1 services (£95-£175) function as a sample—you'll see exactly how we work on a portion of your manuscript. Many clients start with Tier 1, then upgrade to a full manuscript review. There's no pressure to continue if it's not the right fit."
    },
    {
        question: "Do you offer payment plans?",
        answer: "For Tier 3 and Tier 4, yes. We typically split into two payments: 50% upfront, 50% on delivery. For Tier 4, we can discuss quarterly billing. Just mention this when booking your consultation."
    }
];

// FAQ Accordion Component
function FAQItem({ item, isOpen, onClick }: { item: typeof FAQ_ITEMS[0], isOpen: boolean, onClick: () => void }) {
    return (
        <TiltCard className="mb-4">
            <button
                onClick={onClick}
                className="w-full p-6 bg-slate-800/30 border border-slate-700/50 rounded-md text-left hover:border-emerald-500/30 transition-colors"
            >
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                </div>
                {isOpen && (
                    <p className="mt-4 text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4">
                        {item.answer}
                    </p>
                )}
            </button>
        </TiltCard>
    );
}

export default function ServicesPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Get tier-specific CTA
    // Unused helper removed

    return (
        <>
            {/* Hero */}
            <section className="relative flex justify-center pt-20 pb-24">
                <GridGlowBackground>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <Reveal>
                            <HeroBadge icon="layers">Services & Pricing</HeroBadge>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                Choose Your Path to Publication
                            </h1>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                                From quick diagnostics to comprehensive editorial partnerships,
                                find the right level of support for your manuscript.
                            </p>
                        </Reveal>
                        <Reveal delay={300}>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-2">
                                    <Shield size={16} className="text-emerald-400" />
                                    Satisfaction Guarantee
                                </span>
                                <span className="flex items-center gap-2">
                                    <CreditCard size={16} className="text-emerald-400" />
                                    Payment Plans Available
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock size={16} className="text-emerald-400" />
                                    Fast Turnaround
                                </span>
                            </div>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </section>

            {/* Tier 1: Entry Diagnostics */}
            <section id="tier-1-options" className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <ClipReveal>
                            <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Tier 1: Entry Diagnostics
                            </h2>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                Focus on a single critical aspect of your opening pages.
                                Choose the analysis that fits your current concern.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Option 1: Hook */}
                        <Reveal delay={0}>
                            <TiltCard className="h-full">
                                <div className="p-6 bg-slate-800/30 rounded-md border border-slate-700/50 h-full flex flex-col hover:border-emerald-500/30 transition-colors">
                                    <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                        Opening Hook
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 flex-grow">
                                        Does your first chapter compel the reader to turn the page? We analyze your inciting incident and narrative traction.
                                    </p>
                                    <CheckoutButton priceId={STRIPE_PRICES.tier1_hook} variant="secondary" className="w-full">
                                        Buy Now (£95)
                                    </CheckoutButton>
                                </div>
                            </TiltCard>
                        </Reveal>

                        {/* Option 2: Voice */}
                        <Reveal delay={100}>
                            <TiltCard className="h-full">
                                <div className="p-6 bg-slate-800/30 rounded-md border border-slate-700/50 h-full flex flex-col hover:border-emerald-500/30 transition-colors">
                                    <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                        Voice & Tone
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 flex-grow">
                                        Is your narrative voice consistent and engaging? We check for tonal shifts and stylistic strength.
                                    </p>
                                    <CheckoutButton priceId={STRIPE_PRICES.tier1_voice} variant="secondary" className="w-full">
                                        Buy Now (£95)
                                    </CheckoutButton>
                                </div>
                            </TiltCard>
                        </Reveal>

                        {/* Option 3: Pacing */}
                        <Reveal delay={200}>
                            <TiltCard className="h-full">
                                <div className="p-6 bg-slate-800/30 rounded-md border border-slate-700/50 h-full flex flex-col hover:border-emerald-500/30 transition-colors">
                                    <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                        Pacing Snapshot
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 flex-grow">
                                        Are you starting too slow or moving too fast? We map the beats of your opening to ensure structural rhythm.
                                    </p>
                                    <CheckoutButton priceId={STRIPE_PRICES.tier1_pacing} variant="secondary" className="w-full">
                                        Buy Now (£95)
                                    </CheckoutButton>
                                </div>
                            </TiltCard>
                        </Reveal>

                        {/* Option 4: Bundle */}
                        <Reveal delay={300}>
                            <BeamCard glowColor="emerald" className="h-full">
                                <div className="p-6 bg-slate-800/30 rounded-md border border-emerald-500/30 h-full flex flex-col">
                                    <div className="mb-4">
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                                            Best Value
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                        Complete Bundle
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 flex-grow">
                                        All three assessments in one report: Hook, Voice & Tone, and Pacing. Save £110.
                                    </p>
                                    <CheckoutButton priceId={STRIPE_PRICES.tier1_bundle} variant="primary" className="w-full">
                                        Buy Now (£175)
                                    </CheckoutButton>
                                </div>
                            </BeamCard>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Tier 2: Focused Work */}
            <section className="py-24 border-t border-slate-800/50 bg-slate-900/20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <h2 className="text-3xl font-bold text-white mb-8 font-[family-name:var(--font-playfair)]">
                            Tier 2: Focused Work
                        </h2>
                    </ClipReveal>
                    <Reveal>
                        <BeamCard glowColor="emerald" className="max-w-2xl mx-auto">
                            <div className="p-8 bg-slate-800/30 rounded-md border border-emerald-500/30 text-left">
                                <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                    Single-Pillar Audit
                                </h3>
                                <p className="text-slate-400 mb-6">
                                    A deep dive into one specific aspect of your story. Choose any of the 7 Pillars (e.g., Plot Logic, Character Continuity).
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-3">
                                        <Check size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-300 text-sm">Up to 30,000 words analyzed</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-300 text-sm">Actionable report delivered in 7 days</span>
                                    </li>
                                </ul>
                                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
                                    <div className="text-3xl font-bold text-emerald-400">£350</div>
                                    <CheckoutButton priceId={STRIPE_PRICES.single_pillar_audit} variant="primary" className="w-full sm:w-auto">
                                        Buy Now
                                    </CheckoutButton>
                                </div>
                            </div>
                        </BeamCard>
                        <div className="mt-6 text-slate-400 text-sm">
                            Need a multi-pillar analysis? <a href="/consultation" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4">Book a consultation</a> for a custom quote.
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Tier 3: Full Manuscript */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <ClipReveal>
                            <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Tier 3: Full Manuscript Refinement
                            </h2>
                        </ClipReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Option 1: Taster */}
                        <Reveal delay={0}>
                            <TiltCard className="h-full">
                                <div className="p-8 bg-slate-800/30 rounded-md border border-slate-700/50 h-full flex flex-col hover:border-emerald-500/30 transition-colors">
                                    <div className="mb-4">
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
                                            Try Before You Commit
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                        Tier 3 Taster
                                    </h3>
                                    <p className="text-slate-400 mb-6 flex-grow">
                                        Sample edit of your first 50 pages to see if we&apos;re a good fit. The cost is credited toward the full service.
                                    </p>
                                    <div className="text-2xl font-bold text-white mb-6">£195</div>
                                    <CheckoutButton priceId={STRIPE_PRICES.tier3_preview} variant="secondary" className="w-full">
                                        Buy Sample Edit
                                    </CheckoutButton>
                                </div>
                            </TiltCard>
                        </Reveal>

                        {/* Option 2: Full Service */}
                        <Reveal delay={100}>
                            <TiltCard className="h-full">
                                <div className="p-8 bg-slate-800/30 rounded-md border border-slate-700/50 h-full flex flex-col hover:border-emerald-500/30 transition-colors">
                                    <div className="mb-4">
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                                            Comprehensive
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                        Full Manuscript Assessment
                                    </h3>
                                    <p className="text-slate-400 mb-6 flex-grow">
                                        Complete 7-Pillar analysis, chapter-by-chapter notes, and a comprehensive editorial letter.
                                    </p>
                                    <div className="text-2xl font-bold text-white mb-6">£1,500 – £4,500</div>
                                    <MagneticButton href="/consultation" variant="primary" className="w-full">
                                        Book Consultation
                                        <ArrowRight size={16} />
                                    </MagneticButton>
                                </div>
                            </TiltCard>
                        </Reveal>
                    </div>
                </div>
            </section>





            {/* Tier 4: Partnership */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <h2 className="text-3xl font-bold text-white mb-8 font-[family-name:var(--font-playfair)]">
                            Tier 4: Editorial Partnership
                        </h2>
                    </ClipReveal>
                    <Reveal>
                        <BeamCard glowColor="purple">
                            <div className="p-10 bg-slate-800/30 rounded-md border border-purple-500/30">
                                <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
                                    A 3-6 month partnership guiding you through multiple drafts. Includes everything in Tier 3, plus ongoing consultation and direct access.
                                </p>
                                <div className="text-3xl font-bold text-purple-400 mb-8">£5,000 – £12,000</div>
                                <MagneticButton href="/apply" variant="primary">
                                    Apply for Partnership
                                    <ArrowRight size={16} />
                                </MagneticButton>
                                <p className="text-xs text-purple-400/60 mt-4">Limited to 3 clients per quarter</p>
                            </div>
                        </BeamCard>
                    </Reveal>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <ClipReveal>
                            <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Compare Editorial Tiers
                            </h2>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400">
                                Find the right level of support at a glance.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={200}>
                        {/* Mobile View (Tabs) */}
                        <MobileComparison />

                        {/* Desktop View (Table) */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-left p-4 text-slate-400 font-normal text-sm border-b border-slate-700/50">Feature</th>
                                        <th className="text-center p-4 text-white font-semibold border-b border-slate-700/50">
                                            Tier 1<br /><span className="text-emerald-400 text-sm font-normal">Entry Diagnostics</span>
                                        </th>
                                        <th className="text-center p-4 text-white font-semibold border-b border-slate-700/50 bg-emerald-500/5">
                                            <span className="text-emerald-400 text-xs block mb-1">★ MOST POPULAR</span>
                                            Tier 2<br /><span className="text-emerald-400 text-sm font-normal">Focused Audits</span>
                                        </th>
                                        <th className="text-center p-4 text-white font-semibold border-b border-slate-700/50">
                                            Tier 3<br /><span className="text-emerald-400 text-sm font-normal">Full Manuscript</span>
                                        </th>
                                        <th className="text-center p-4 text-white font-semibold border-b border-slate-700/50 bg-purple-500/5">
                                            <span className="text-purple-400 text-xs block mb-1">★ PREMIUM</span>
                                            Tier 4<br /><span className="text-purple-400 text-sm font-normal">Partnership</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON_DATA.map((row, i) => (
                                        <tr key={i}>
                                            <td className="p-4 text-slate-300 border-b border-slate-800/50">{row.feature}</td>
                                            <td className="p-4 text-center border-b border-slate-800/50">{row.tier1}</td>
                                            <td className="p-4 text-center border-b border-slate-800/50 bg-emerald-500/5">{row.tier2}</td>
                                            <td className="p-4 text-center border-b border-slate-800/50">{row.tier3}</td>
                                            <td className="p-4 text-center border-b border-slate-800/50 bg-purple-500/5">{row.tier4}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Legend */}
                        <div className="mt-6 text-center text-xs text-slate-500">
                            <Check className="w-4 h-4 text-emerald-400 inline" /> Full &nbsp;
                            <span className="text-yellow-400">◐</span> Partial &nbsp;
                            <span className="text-slate-500">○</span> Basic &nbsp;
                            <span className="text-slate-600">—</span> Not included
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Guarantee Section */}
            < section className="py-24 border-t border-slate-800/50" >
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <BeamCard glowColor="emerald">
                            <div className="p-8 bg-slate-800/30 rounded-md text-center">
                                <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                    Our Promise
                                </h2>
                                <p className="text-slate-400 leading-relaxed max-w-xl mx-auto">
                                    If our feedback doesn&apos;t give you clear, actionable next steps for your manuscript,
                                    we&apos;ll refund your fee. No questions.
                                </p>
                                <p className="text-slate-500 text-sm mt-4">
                                    We&apos;d rather lose money than leave you confused.
                                </p>
                            </div>
                        </BeamCard>
                    </Reveal>
                </div>
            </section >

            {/* FAQ Section */}
            < section className="py-24 border-t border-slate-800/50" >
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <ClipReveal>
                            <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Frequently Asked Questions
                            </h2>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400">
                                Everything you need to know before getting started.
                            </p>
                        </Reveal>
                    </div>

                    <div>
                        {FAQ_ITEMS.map((item, i) => (
                            <Reveal key={i} delay={i * 50}>
                                <FAQItem
                                    item={item}
                                    isOpen={openFaq === i}
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA */}
            < section className="py-24 border-t border-slate-800/50" >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <h2 className="text-3xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                            Not Sure Which Tier Is Right?
                        </h2>
                    </ClipReveal>
                    <Reveal delay={100}>
                        <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                            Take our quick diagnostic quiz to get a personalized recommendation
                            based on your manuscript&apos;s needs.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="flex flex-wrap justify-center gap-4">
                            <MagneticButton href="/diagnostic" variant="primary">
                                Start Free Diagnostic
                                <ArrowRight size={18} />
                            </MagneticButton>
                            <MagneticButton href="/consultation" variant="secondary">
                                <Calendar size={18} />
                                Book Free Consultation
                            </MagneticButton>
                        </div>
                    </Reveal>
                </div>
            </section >
        </>
    );
}
