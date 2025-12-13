'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Article } from '@/lib/articles';

export function ArticleView({ article }: { article: Article }) {
    return (
        <>
            <article>
                {/* Article Header */}
                <section className="relative pt-32 pb-20">
                    <GridGlowBackground>
                        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                            <Reveal>
                                <Link
                                    href="/resources"
                                    className="inline-flex items-center text-sm text-emerald-400 mb-8 hover:text-emerald-300 transition-colors"
                                >
                                    <ArrowLeft size={16} className="mr-2" />
                                    Back to Resources
                                </Link>
                            </Reveal>

                            <ClipReveal delay={100}>
                                <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-6">
                                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                                        {article.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {article.readTime}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {article.publishDate}
                                    </span>
                                </div>
                            </ClipReveal>

                            <ClipReveal delay={200}>
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)] leading-tight">
                                    {article.title}
                                </h1>
                            </ClipReveal>
                        </div>
                    </GridGlowBackground>
                </section>

                {/* Content */}
                <section className="pb-24">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <Reveal delay={300}>
                            <div
                                className="article-content max-w-none"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </Reveal>

                        {/* CTA Box */}
                        <Reveal delay={400}>
                            <div className="mt-16 p-8 bg-slate-800/50 rounded-lg border border-emerald-500/20 text-center">
                                <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                    Need an Expert Eye?
                                </h3>
                                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                                    Stop guessing if your structure works. Get a professional diagnostic of your first 5,000 words.
                                </p>
                                <MagneticButton href="/diagnostic" variant="primary">
                                    Start Free Diagnostic
                                </MagneticButton>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </article>
        </>
    );
}
