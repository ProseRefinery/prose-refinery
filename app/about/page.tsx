import { Metadata } from 'next';
import { ArrowRight, Calendar, BookOpen, Feather, GraduationCap, Award, Building } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'About Us | Prose Refinery',
    description: 'Learn about Prose Refinery: our mission, methodology, and the founder behind the Narrative Integrity Engine.',
};

export default function AboutPage() {
    return (
        <>
            {/* Hero - Mission Statement */}
            <section className="relative flex justify-center pt-20 pb-24">
                <GridGlowBackground>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <div className="max-w-3xl mx-auto">
                            <Reveal>
                                <HeroBadge icon="award">About Prose Refinery</HeroBadge>
                            </Reveal>
                            <ClipReveal delay={100}>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                    We Fix What Other Editors Miss
                                </h1>
                            </ClipReveal>
                            <Reveal delay={200}>
                                <p className="text-xl text-slate-300 mb-6">
                                    Most editorial feedback focuses on prose. Clean sentences. Tighter paragraphs.
                                    Better word choices. <strong className="text-white">That's the final 10%.</strong>
                                </p>
                            </Reveal>
                            <Reveal delay={300}>
                                <p className="text-lg text-slate-400 mb-8">
                                    We focus on the 90% that determines whether your book works: structure, pacing,
                                    world logic, character motivation, and the invisible architecture readers feel
                                    but can't articulate.
                                </p>
                            </Reveal>
                            <Reveal delay={400}>
                                <p className="text-lg text-slate-400">
                                    Speculative fiction demands more. Magic systems must be internally consistent.
                                    Worlds must feel lived-in. Foreshadowing must land. We built our entire
                                    methodology around these genre-specific demands.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </GridGlowBackground>
            </section>

            {/* The Editor - Personal Story */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <Reveal>
                                <span className="text-sm text-emerald-400 uppercase tracking-widest mb-4 block">
                                    The Founder
                                </span>
                            </Reveal>
                            <ClipReveal delay={100}>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                    Why Speculative Fiction?
                                </h2>
                            </ClipReveal>
                            <Reveal delay={200}>
                                <p className="text-slate-300 mb-4">
                                    I've been obsessed with fantasy since I was twelve, devouring everything from
                                    Tolkien to Octavia Butler to N.K. Jemisin. Twenty years later, that obsession
                                    became a methodology.
                                </p>
                            </Reveal>
                            <Reveal delay={300}>
                                <p className="text-slate-400 mb-4">
                                    The Narrative Integrity Engine™ started as a personal tool—a way to diagnose
                                    why certain books captivated me while others fell apart. I mapped the patterns.
                                    I built the framework. Then I tested it on my own 110,000-word
                                    Afro-mythpunk saga.
                                </p>
                            </Reveal>
                            <Reveal delay={400}>
                                <p className="text-slate-400 mb-6">
                                    Now I use that same framework to help other authors see what they're too close
                                    to see: the structural cracks that beta readers sense but can't name.
                                </p>
                            </Reveal>
                            <Reveal delay={500}>
                                <p className="text-slate-300 font-medium">
                                    — Ola, Founder & Lead Editor
                                </p>
                            </Reveal>
                        </div>

                        <div className="order-1 lg:order-2">
                            <Reveal delay={200}>
                                <BeamCard glowColor="emerald">
                                    <div className="p-8 bg-slate-800/30 rounded-md text-center">
                                        {/* Placeholder for founder photo - replace with actual image */}
                                        <div className="w-48 h-48 mx-auto mb-6 rounded-md bg-gradient-to-br from-emerald-500/20 to-purple-500/20 flex items-center justify-center">
                                            <Feather className="w-16 h-16 text-emerald-400/50" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">Ola Tunde</h3>
                                        <p className="text-emerald-400 text-sm mb-4">Founder & Lead Editor</p>
                                        <div className="text-xs text-slate-500 space-y-1">
                                            <p>20+ years studying narrative structure</p>
                                            <p>Speculative fiction specialist</p>
                                        </div>
                                    </div>
                                </BeamCard>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credentials & Background */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <ClipReveal>
                            <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Background & Credentials
                            </h2>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400 max-w-xl mx-auto">
                                The expertise behind our methodology.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: GraduationCap,
                                title: '20+ Years',
                                desc: 'Studying narrative structure and what makes speculative fiction work'
                            },
                            {
                                icon: BookOpen,
                                title: '200+ Novels',
                                desc: 'Analyzed to build our diagnostic framework'
                            },
                            {
                                icon: Award,
                                title: '110K Words',
                                desc: 'Our flagship project: living proof of the methodology'
                            }
                        ].map((item, i) => (
                            <Reveal key={i} delay={i * 100}>
                                <TiltCard className="p-6 bg-slate-800/30 rounded-md border border-slate-700/50 h-full">
                                    <item.icon className="w-10 h-10 text-emerald-400 mb-4" />
                                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </TiltCard>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={400}>
                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800/50 border border-slate-700/50">
                                <Building className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-400">
                                    Registered as <strong className="text-white">{COMPANY.legalName}</strong>
                                    {' '}(UK Company No: {COMPANY.companyNumber})
                                </span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Flagship Project - Children of Aiyé */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <ClipReveal>
                            <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Children of Aiyé — Our Proof of Concept
                            </h2>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                We don't just preach methodology. We use it. Every technique we recommend,
                                every structural principle we teach—we've applied it to our own work first.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={200}>
                        <BeamCard glowColor="purple">
                            <div className="p-8 bg-slate-800/30 rounded-md">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium mb-4">
                                            Flagship Project
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                            Children of Aiyé
                                        </h3>
                                        <p className="text-slate-400 mb-4">
                                            A 110,000-word Afro-mythpunk saga spanning the collision of old gods
                                            and modern Nigeria. This project is our living laboratory—where we
                                            test every editorial technique before recommending it to clients.
                                        </p>
                                        <ul className="space-y-2 text-sm text-slate-400">
                                            <li className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-purple-400" />
                                                Multi-year development
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4 text-purple-400" />
                                                110,000+ words
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Feather className="w-4 h-4 text-purple-400" />
                                                Afro-mythpunk / Secondary World Fantasy
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-900/50 rounded-md border-l-2 border-red-500/50">
                                            <span className="text-xs text-red-400 uppercase tracking-wider">Before</span>
                                            <p className="text-slate-400 text-sm mt-2 italic">
                                                "Kọlá felt the weight of centuries as she walked. The shrine had always
                                                been sacred, though few remembered why."
                                            </p>
                                        </div>
                                        <div className="p-4 bg-slate-900/50 rounded-md border-l-2 border-emerald-500/50">
                                            <span className="text-xs text-emerald-400 uppercase tracking-wider">After</span>
                                            <p className="text-slate-300 text-sm mt-2 italic">
                                                "Blood on the shrine meant someone would die within a fortnight. Kọlá
                                                pressed her thumb against the iron blade until crimson beaded at the tip."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </BeamCard>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <ClipReveal>
                        <h2 className="text-3xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                            Let's Transform Your Manuscript
                        </h2>
                    </ClipReveal>
                    <Reveal delay={100}>
                        <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                            Start with our 2-minute diagnostic. We'll recommend the perfect editorial
                            tier for your manuscript's needs.
                        </p>
                    </Reveal>
                    <Reveal delay={200}>
                        <div className="flex flex-wrap justify-center gap-4">
                            <MagneticButton href="/diagnostic" variant="primary">
                                Start Your Diagnostic
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
