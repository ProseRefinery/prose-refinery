'use client';

import { InlineWidget } from 'react-calendly';
import { Info } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { Reveal } from '@/components/effects/Reveal';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { HeroBadge } from '@/components/ui/HeroBadge';

export default function ConsultationPage() {
    return (
        <div className="min-h-screen pt-20 pb-24">
            <GridGlowBackground>
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mb-12">
                    <Reveal>
                        <HeroBadge icon="calendar">Free 15-Minute Strategy Call</HeroBadge>
                    </Reveal>

                    <ClipReveal delay={100}>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                            Let&apos;s Discuss Your Manuscript
                        </h1>
                    </ClipReveal>

                    <Reveal delay={200}>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                            No sales pressure. Just a quick chat to understand your project and confirm which editorial tier fits your goals.
                        </p>
                    </Reveal>

                    <Reveal delay={250}>
                        <div className="bg-emerald-900/10 border border-emerald-500/20 p-6 rounded-md inline-block max-w-2xl mx-auto mb-4 text-left relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="flex gap-4 relative z-10">
                                <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                    These consultations are for authors considering <strong>full manuscript assessment (£1,500–£4,500)</strong> or <strong>editorial partnerships</strong>.
                                    <span className="block mt-2 text-slate-400">
                                        For lighter-touch diagnostics and audits, you can <a href="/services" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/30 transition-colors">book directly through our services page</a>.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={300}>
                    <div className="mx-auto max-w-[1000px] h-[750px] relative z-10">
                        {/* Note: In production replace 'prose-refinery' with actual username if different */}
                        <InlineWidget
                            url="https://calendly.com/prose-refinery/consultation"
                            styles={{ height: '700px' }}
                            pageSettings={{
                                backgroundColor: '0f172a',
                                hideEventTypeDetails: false,
                                hideLandingPageDetails: false,
                                primaryColor: '10b981',
                                textColor: 'e2e8f0'
                            }}
                        />
                    </div>
                </Reveal>

                <Reveal delay={400}>
                    <div className="text-center mt-8">
                        <p className="text-slate-500 text-sm">
                            Can&apos;t find a time? Email us directly at <a href="mailto:hello@proserefinery.com" className="text-emerald-400 hover:text-emerald-300">hello@proserefinery.com</a>
                        </p>
                    </div>
                </Reveal>
            </GridGlowBackground>
        </div>
    );
}
