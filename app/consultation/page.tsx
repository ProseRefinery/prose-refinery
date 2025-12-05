import { Metadata } from 'next';
import { Calendar, Clock, Video, Mail } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Book a Free Consultation | Prose Refinery',
    description: '15-minute consultation to discuss your manuscript and find the right editorial tier for your needs.',
};

export default function ConsultationPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative flex justify-center pt-20 pb-24">
                <GridGlowBackground>
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <Reveal>
                                <HeroBadge icon="target">Free Consultation</HeroBadge>
                            </Reveal>
                            <ClipReveal delay={100}>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                    Let's Talk About Your Manuscript
                                </h1>
                            </ClipReveal>
                            <Reveal delay={200}>
                                <p className="text-lg text-slate-400 max-w-xl mx-auto">
                                    15 minutes. No obligation. We'll discuss your project and
                                    confirm which service level fits your needs.
                                </p>
                            </Reveal>
                        </div>

                        {/* Calendly Embed Placeholder */}
                        <Reveal delay={300}>
                            <BeamCard glowColor="emerald">
                                <div className="p-8 bg-slate-800/30 rounded-md min-h-[500px] flex flex-col items-center justify-center">
                                    {/* Replace this with actual Calendly embed */}
                                    <div className="text-center">
                                        <Calendar className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                                        <h3 className="text-xl font-semibold text-white mb-4">
                                            Calendly Embed Goes Here
                                        </h3>
                                        <p className="text-slate-400 mb-6 max-w-md">
                                            Replace this placeholder with your Calendly embed code.
                                            Use the inline embed widget for best integration.
                                        </p>
                                        <code className="block p-4 bg-slate-900/50 rounded-md text-sm text-emerald-400 font-mono">
                                            {'<!-- Calendly inline widget begin -->'}
                                            <br />
                                            {'<div class="calendly-inline-widget" data-url="YOUR_CALENDLY_URL"></div>'}
                                            <br />
                                            {'<script src="https://assets.calendly.com/assets/external/widget.js"></script>'}
                                        </code>
                                    </div>
                                </div>
                            </BeamCard>
                        </Reveal>

                        {/* What to Expect */}
                        <Reveal delay={400}>
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-slate-800/30 rounded-md border border-slate-700/50 text-center">
                                    <Clock className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                                    <h4 className="font-semibold text-white mb-2">15 Minutes</h4>
                                    <p className="text-sm text-slate-400">Quick, focused discussion</p>
                                </div>
                                <div className="p-6 bg-slate-800/30 rounded-md border border-slate-700/50 text-center">
                                    <Video className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                                    <h4 className="font-semibold text-white mb-2">Video Call</h4>
                                    <p className="text-sm text-slate-400">Google Meet or Zoom</p>
                                </div>
                                <div className="p-6 bg-slate-800/30 rounded-md border border-slate-700/50 text-center">
                                    <Mail className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                                    <h4 className="font-semibold text-white mb-2">Follow-Up</h4>
                                    <p className="text-sm text-slate-400">Summary email after</p>
                                </div>
                            </div>
                        </Reveal>

                        {/* Alternative */}
                        <Reveal delay={500}>
                            <div className="mt-12 text-center">
                                <p className="text-slate-400 mb-2">Not ready to talk?</p>
                                <a
                                    href={`mailto:${COMPANY.email}`}
                                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                                >
                                    Email us at {COMPANY.email}
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </section>
        </>
    );
}
