'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { ARTICLES } from '@/lib/articles';

export default function ResourcesPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative flex justify-center pt-20 pb-24">
                <GridGlowBackground>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <Reveal>
                            <HeroBadge icon="book">The Editor&apos;s Desk</HeroBadge>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                Craft & Critique
                            </h1>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                Deep dives into story architecture, industry insights, and the mechanics of speculative fiction.
                            </p>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </section>

            {/* Articles Grid */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ARTICLES.map((article, i) => (
                            <Reveal key={article.slug} delay={i * 100} className="h-full">
                                <Link href={`/resources/${article.slug}`} className="block h-full relative hover:z-10 transition-transform">
                                    <BeamCard className="h-full" glowColor={article.image === 'purple' ? 'purple' : 'emerald'}>
                                        <div className="p-8 h-full flex flex-col group">
                                            {/* Meta */}
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                                                <span className="px-2 py-1 rounded-full bg-slate-700/50 text-slate-300">
                                                    {article.category}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {article.readTime}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-playfair)] group-hover:text-emerald-400 transition-colors min-h-[3.5rem]">
                                                {article.title}
                                            </h3>

                                            <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                                                {article.excerpt}
                                            </p>

                                            <div className="flex items-center text-sm text-emerald-400 font-medium mt-auto">
                                                Read Article
                                                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </BeamCard>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
