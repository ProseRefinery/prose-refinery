'use client';
import { InlineWidget } from 'react-calendly';
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
                            Let's Discuss Your Manuscript
                        </h1>
                    </ClipReveal>

                    <Reveal delay={200}>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            No sales pressure. Just a quick chat to understand your project and confirm which editorial tier fits your goals.
                        </p>
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
                            Can't find a time? Email us directly at <a href="mailto:hello@proserefinery.com" className="text-emerald-400 hover:text-emerald-300">hello@proserefinery.com</a>
                        </p>
                    </div>
                </Reveal>
            </GridGlowBackground>
        </div>
    );
}
