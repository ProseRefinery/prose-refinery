'use client';

import { useState } from 'react';
import { Check, ArrowRight, Shield, ChevronDown, ChevronUp, Calendar, CreditCard, Clock } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { TIERS, STRIPE_LINKS } from '@/lib/constants';

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
    const getTierCTA = (tier: typeof TIERS[0]) => {
        switch (tier.id) {
            case 1:
                return { text: 'Buy Now', href: '/services#tier-1-options', variant: 'secondary' as const };
            case 2:
                return { text: 'Book Consultation', href: '/consultation', variant: 'primary' as const };
            case 3:
                return { text: 'Book Consultation', href: '/consultation', variant: 'primary' as const };
            case 4:
                return { text: 'Apply', href: '/apply', variant: 'primary' as const };
            default:
                return { text: 'Get Started', href: '/contact', variant: 'secondary' as const };
        }
    };

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

            {/* Tiers Grid */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {TIERS.map((tier, i) => {
                            const isRecommended = tier.recommended;
                            const isPremium = tier.id === 4;
                            const cta = getTierCTA(tier);

                            const CardWrapper = isRecommended || isPremium ? BeamCard : TiltCard;
                            const glowColor = isPremium ? 'purple' : 'emerald';

                            return (
                                <Reveal key={tier.id} delay={i * 100}>
                                    <CardWrapper
                                        className="h-full"
                                        {...((isRecommended || isPremium) ? { glowColor } : {})}
                                    >
                                        <div id={`tier-${tier.id}`} className="p-8 bg-slate-800/30 rounded-md border border-slate-700/50 h-full flex flex-col">
                                            {/* Badges */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {isRecommended && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                                                        Most Popular
                                                    </span>
                                                )}
                                                {isPremium && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                                                        Premium
                                                    </span>
                                                )}
                                                {tier.id >= 3 && (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-700/50 text-slate-400 text-xs font-medium">
                                                        Limited Spots
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                                                {tier.name}
                                            </h3>
                                            <p className="text-slate-400 mb-4">{tier.description}</p>

                                            <div className="mb-6">
                                                <span className="text-3xl font-bold text-emerald-400">{tier.price}</span>
                                                <span className="text-slate-500 ml-2">• {tier.turnaround}</span>
                                            </div>

                                            <ul className="space-y-3 mb-8 flex-grow">
                                                {tier.includes.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-3">
                                                        <Check size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                                        <span className="text-slate-300 text-sm">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <MagneticButton
                                                href={cta.href}
                                                variant={cta.variant}
                                                className="w-full"
                                            >
                                                {cta.text}
                                                <ArrowRight size={16} />
                                            </MagneticButton>
                                        </div>
                                    </CardWrapper>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tier 1 Options Breakdown */}
            <section id="tier-1-options" className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <ClipReveal>
                            <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Select Your Diagnostic
                            </h2>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                Tier 1 services focus on a single critical aspect of your opening pages.
                                Choose the analysis that fits your current concern.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                    <MagneticButton href={STRIPE_LINKS.tier1_hook} variant="secondary" className="w-full">
                                        Select (95 GBP)
                                    </MagneticButton>
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
                                    <MagneticButton href={STRIPE_LINKS.tier1_voice} variant="secondary" className="w-full">
                                        Select (95 GBP)
                                    </MagneticButton>
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
                                    <MagneticButton href={STRIPE_LINKS.tier1_pacing} variant="secondary" className="w-full">
                                        Select (95 GBP)
                                    </MagneticButton>
                                </div>
                            </TiltCard>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Comparison Table - Desktop Only */}
            <section className="py-24 border-t border-slate-800/50 hidden lg:block">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <ClipReveal>
                            <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Compare All Tiers
                            </h2>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400">
                                Find the right level of support at a glance.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={200}>
                        <div className="overflow-x-auto">
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
                                    <tr>
                                        <td className="p-4 text-slate-300 border-b border-slate-800/50">Price</td>
                                        <td className="p-4 text-center text-emerald-400 border-b border-slate-800/50">£95–£175</td>
                                        <td className="p-4 text-center text-emerald-400 border-b border-slate-800/50 bg-emerald-500/5">£250–£750</td>
                                        <td className="p-4 text-center text-emerald-400 border-b border-slate-800/50">£1,500–£4,500</td>
                                        <td className="p-4 text-center text-purple-400 border-b border-slate-800/50 bg-purple-500/5">£5,000–£12,000</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-slate-300 border-b border-slate-800/50">Coverage</td>
                                        <td className="p-4 text-center text-slate-400 border-b border-slate-800/50">1,000–5,000 words</td>
                                        <td className="p-4 text-center text-slate-400 border-b border-slate-800/50 bg-emerald-500/5">12,500 words</td>
                                        <td className="p-4 text-center text-slate-400 border-b border-slate-800/50">Full manuscript</td>
                                        <td className="p-4 text-center text-slate-400 border-b border-slate-800/50 bg-purple-500/5">Full + extras</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-slate-300 border-b border-slate-800/50">Turnaround</td>
                                        <td className="p-4 text-center text-slate-400 border-b border-slate-800/50">48 hours</td>
                                        <td className="p-4 text-center text-slate-400 border-b border-slate-800/50 bg-emerald-500/5">5–7 days</td>
                                        <td className="p-4 text-center text-slate-400 border-b border-slate-800/50">3–4 weeks</td>
                                        <td className="p-4 text-center text-slate-400 border-b border-slate-800/50 bg-purple-500/5">8–12 weeks</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-slate-300 border-b border-slate-800/50">Structural Analysis</td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><span className="text-slate-500">○ Basic</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-emerald-500/5"><span className="text-yellow-400">◐ Partial</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-purple-500/5"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-slate-300 border-b border-slate-800/50">Editorial Letter</td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-emerald-500/5"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-purple-500/5"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-slate-300 border-b border-slate-800/50">Chapter-by-Chapter Notes</td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-emerald-500/5"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-purple-500/5"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-slate-300 border-b border-slate-800/50">Revision Support</td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-emerald-500/5"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><span className="text-slate-500">○ Basic</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-purple-500/5"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-slate-300 border-b border-slate-800/50">Query/Synopsis Help</td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-emerald-500/5"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-purple-500/5"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-slate-300 border-b border-slate-800/50">Multiple Draft Passes</td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-emerald-500/5"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center border-b border-slate-800/50 bg-purple-500/5"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-slate-300">Direct Access</td>
                                        <td className="p-4 text-center"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center bg-emerald-500/5"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center"><span className="text-slate-600">—</span></td>
                                        <td className="p-4 text-center bg-purple-500/5"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

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
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <BeamCard glowColor="emerald">
                            <div className="p-8 bg-slate-800/30 rounded-md text-center">
                                <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                    Our Promise
                                </h2>
                                <p className="text-slate-400 leading-relaxed max-w-xl mx-auto">
                                    If our feedback doesn't give you clear, actionable next steps for your manuscript,
                                    we'll refund your fee. No questions.
                                </p>
                                <p className="text-slate-500 text-sm mt-4">
                                    We'd rather lose money than leave you confused.
                                </p>
                            </div>
                        </BeamCard>
                    </Reveal>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 border-t border-slate-800/50">
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
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <h2 className="text-3xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                            Not Sure Which Tier Is Right?
                        </h2>
                    </ClipReveal>
                    <Reveal delay={100}>
                        <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                            Take our quick diagnostic quiz to get a personalized recommendation
                            based on your manuscript's needs.
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
            </section>
        </>
    );
}
