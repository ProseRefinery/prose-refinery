'use client';

import { useState } from 'react';
import { Check, ArrowRight, Shield, ChevronDown, ChevronUp, Calendar, CreditCard, Clock, Sparkles } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';

import { Card } from '@/components/ui/Card';

import { MagneticButton } from '@/components/ui/MagneticButton';
import { CheckoutButton } from '@/components/ui/checkout-button';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
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
                    {activeTier === 1 && "Story Integrity Diagnostic™"}
                    {activeTier === 2 && "Single-Pillar Structural Audit"}
                    {activeTier === 3 && "Full Structural Edit"}
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
        <Card variant="tilt" className="mb-4" contentClassName="p-0">
            <button
                onClick={onClick}
                className="w-full p-6 text-left h-full"
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
        </Card>
    );
}

export default function ServicesPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Get tier-specific CTA
    // Unused helper removed

    return (
        <>
            {/* Hero */}
            <Section className="relative flex justify-center pt-20 pb-24" noBorder>
                <GridGlowBackground>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <Reveal>
                            <HeroBadge icon="layers">Services & Pricing</HeroBadge>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <Heading as="h1" variant="hero" className="mb-6">
                                Choose Your Path to Publication
                            </Heading>
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
            </Section>

            {/* Tier 1: Entry Diagnostics */}
            <Section id="tier-1-options">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <ClipReveal>
                            <Heading variant="section" className="mb-4">
                                Tier 1: Story Integrity Diagnostic™
                            </Heading>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                Focus on a single critical aspect of your opening pages.
                                Choose the analysis that fits your current concern.
                            </p>
                        </Reveal>
                    </div>

                    {/* Mobile: Horizontal Scroll Snap, Desktop: Grid */}
                    {/* Mobile: Horizontal Scroll Snap, Desktop: Grid */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 md:mx-0 md:px-0 md:overflow-visible scrollbar-hide">
                        {/* Option 1: Hook */}
                        <Reveal delay={0} className="min-w-[85vw] md:min-w-0 snap-center">
                            <Card variant="tilt" className="h-full">
                                <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                    Opening Hook
                                </h3>
                                <p className="text-slate-400 text-sm mb-6 flex-grow">
                                    Does your first chapter compel the reader to turn the page? We analyze your inciting incident and narrative traction.
                                </p>
                                <CheckoutButton priceId={STRIPE_PRICES.tier1_hook} variant="secondary" className="w-full">
                                    Buy Now (£95)
                                </CheckoutButton>
                            </Card>
                        </Reveal>

                        {/* Option 2: Voice */}
                        <Reveal delay={100} className="min-w-[85vw] md:min-w-0 md:w-auto snap-center">
                            <Card variant="tilt" className="h-full">
                                <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                    Voice & Tone
                                </h3>
                                <p className="text-slate-400 text-sm mb-6 flex-grow">
                                    Is your narrative voice consistent and engaging? We check for tonal shifts and stylistic strength.
                                </p>
                                <CheckoutButton priceId={STRIPE_PRICES.tier1_voice} variant="secondary" className="w-full">
                                    Buy Now (£95)
                                </CheckoutButton>
                            </Card>
                        </Reveal>

                        {/* Option 3: Pacing */}
                        <Reveal delay={200} className="min-w-[85vw] md:min-w-0 md:w-auto snap-center">
                            <Card variant="tilt" className="h-full">
                                <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                    Pacing Snapshot
                                </h3>
                                <p className="text-slate-400 text-sm mb-6 flex-grow">
                                    Are you starting too slow or moving too fast? We map the beats of your opening to ensure structural rhythm.
                                </p>
                                <CheckoutButton priceId={STRIPE_PRICES.tier1_pacing} variant="secondary" className="w-full">
                                    Buy Now (£95)
                                </CheckoutButton>
                            </Card>
                        </Reveal>

                        {/* Option 4: Bundle */}
                        <Reveal delay={300} className="min-w-[85vw] md:min-w-0 md:w-auto snap-center">
                            <Card variant="beam" glowColor="emerald" className="h-full" contentClassName="border border-emerald-500/30">
                                <div className="mb-4">
                                    <Badge variant="emerald">Best Value</Badge>
                                </div>
                                <Heading as="h3" variant="subsection" className="mb-2">
                                    Complete Bundle
                                </Heading>
                                <p className="text-slate-400 text-sm mb-6 flex-grow">
                                    All three assessments in one report: Hook, Voice & Tone, and Pacing. Save £110.
                                </p>
                                <CheckoutButton priceId={STRIPE_PRICES.tier1_bundle} variant="primary" className="w-full">
                                    Buy Now (£175)
                                </CheckoutButton>
                            </Card>
                        </Reveal>
                    </div>
                </div>
            </Section>

            {/* Tier 2: Focused Work */}
            <Section background="subtle">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <Heading variant="section" className="mb-8">
                            Tier 2: Single-Pillar Structural Audit
                        </Heading>
                    </ClipReveal>
                    <Reveal>
                        <Card variant="beam" glowColor="emerald" className="max-w-2xl mx-auto" contentClassName="p-8 border border-emerald-500/30 text-left">
                            <Heading as="h3" variant="card" className="mb-2">
                                Single-Pillar Audit
                            </Heading>
                            <p className="text-slate-400 mb-6">
                                A deep dive into one specific aspect of your story. Choose any of the 4 Pillars (e.g., Plot Architecture, Pacing & Pressure).
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3">
                                    <Check size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-300 text-sm">Up to 30,000 words: <strong>£250</strong></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-300 text-sm">30k–60k words: <strong>£350</strong></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-300 text-sm">60k–100k words: <strong>£450</strong></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-300 text-sm">Actionable report in 7-10 business days</span>
                                </li>
                            </ul>
                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
                                <div className="text-3xl font-bold text-emerald-400">£250 – £450</div>
                                <CheckoutButton priceId={STRIPE_PRICES.single_pillar_audit} variant="primary" className="w-full sm:w-auto">
                                    Select Pillar
                                </CheckoutButton>
                            </div>
                        </Card>
                        <div className="mt-6 text-slate-400 text-sm">
                            Need a multi-pillar analysis? <a href="/consultation" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4">Book a consultation</a> for a custom quote.
                        </div>
                    </Reveal>
                </div>
            </Section>

            {/* Tier 3: Full Manuscript */}
            <Section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <ClipReveal>
                            <Heading variant="section" className="mb-4">
                                Tier 3: Full Structural Edit
                            </Heading>
                        </ClipReveal>
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-4 -mx-4 px-4 md:grid md:grid-cols-2 md:gap-8 max-w-5xl mx-auto md:pb-0 md:px-0 md:overflow-visible scrollbar-hide">
                        {/* Option 1: Taster */}
                        <Reveal delay={0} className="min-w-[85vw] md:min-w-0 snap-center">
                            <Card variant="tilt" className="h-full" contentClassName="p-8">
                                <div className="mb-4">
                                    <Badge variant="blue">Try Before You Commit</Badge>
                                </div>
                                <Heading as="h3" variant="card" className="mb-2">
                                    Tier 3 Taster
                                </Heading>
                                <p className="text-slate-400 mb-6 flex-grow">
                                    Sample edit of your first 50 pages to see if we&apos;re a good fit. The cost is credited toward the full service.
                                </p>
                                <div className="text-2xl font-bold text-white mb-6">£195</div>
                                <CheckoutButton priceId={STRIPE_PRICES.tier3_preview} variant="secondary" className="w-full">
                                    Buy Sample Edit
                                </CheckoutButton>
                            </Card>
                        </Reveal>

                        {/* Option 2: Full Service */}
                        <Reveal delay={100} className="min-w-[85vw] md:min-w-0 snap-center">
                            <Card variant="tilt" className="h-full" contentClassName="p-8">
                                <div className="mb-4">
                                    <Badge variant="emerald">Comprehensive</Badge>
                                </div>
                                <Heading as="h3" variant="card" className="mb-2">
                                    Full Manuscript Assessment
                                </Heading>
                                <p className="text-slate-400 mb-6 flex-grow">
                                    Complete 4-Pillar analysis, chapter-by-chapter notes, and a comprehensive editorial letter.
                                </p>
                                <div className="text-2xl font-bold text-white mb-6">£1,500 – £4,500</div>
                                <MagneticButton href="/consultation" variant="primary" className="w-full">
                                    Book Consultation
                                    <ArrowRight size={16} />
                                </MagneticButton>
                            </Card>
                        </Reveal>
                    </div>
                </div>
            </Section>

            {/* Tier 4: Partnership */}
            <Section>
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <Heading variant="section" className="mb-8">
                            Tier 4: Editorial Partnership
                        </Heading>
                    </ClipReveal>
                    <Reveal>
                        <Card variant="beam" glowColor="purple" contentClassName="p-10 border border-purple-500/30">
                            <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
                                A 3-6 month partnership guiding you through multiple drafts. Includes everything in Tier 3, plus ongoing consultation and direct access.
                            </p>
                            <div className="text-3xl font-bold text-purple-400 mb-8">£5,000 – £12,000</div>
                            <MagneticButton href="/apply" variant="primary">
                                Apply for Partnership
                                <ArrowRight size={16} />
                            </MagneticButton>
                            <p className="text-xs text-purple-400/60 mt-4">Limited to 3 authors per quarter</p>
                        </Card>
                    </Reveal>
                </div>
            </Section>

            {/* Comparison Table */}
            <Section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <ClipReveal>
                            <Heading variant="section" className="mb-4">
                                Compare Editorial Tiers
                            </Heading>
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
                                            Tier 1<br /><span className="text-emerald-400 text-sm font-normal">Story Integrity</span>
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
            </Section>

            {/* Guarantee Section */}
            <Section>
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <Card variant="beam" glowColor="emerald" contentClassName="p-8 text-center">
                            <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                            <Heading as="h2" variant="card" className="mb-4">
                                Our Promise
                            </Heading>
                            <p className="text-slate-400 leading-relaxed max-w-xl mx-auto">
                                All diagnostic and editorial reports are reviewed against internal clarity and actionability standards.
                            </p>
                            <p className="text-slate-400 leading-relaxed max-w-xl mx-auto mt-4">
                                If your report does not clearly identify actionable next steps, request clarification within 7 days. We will revise the report at no charge.
                                If the revised report still does not meet this standard, you will receive a full refund.
                            </p>
                        </Card>
                    </Reveal>
                </div>
            </Section>

            {/* FAQ Section */}
            <Section>
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <ClipReveal>
                            <Heading variant="section" className="mb-4">
                                Frequently Asked Questions
                            </Heading>
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
            </Section>

            {/* CTA */}
            <Section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <Heading variant="section" className="mb-6">
                            Not Sure Which Tier Is Right?
                        </Heading>
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
                                Start Free Diagnostic Quiz
                                <ArrowRight size={18} />
                            </MagneticButton>
                            <MagneticButton href="/consultation" variant="secondary">
                                <Calendar size={18} />
                                Book Free Consultation
                            </MagneticButton>
                        </div>
                    </Reveal>
                </div>
            </Section>
        </>
    );
}
