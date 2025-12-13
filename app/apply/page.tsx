'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { Reveal } from '@/components/effects/Reveal';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SuccessConfetti } from '@/components/effects/SuccessConfetti';

export default function ApplyPage() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        title: '',
        genre: '',
        wordcount: '',
        pitch: '',
        whyTier4: '',
        timeline: '',
        referral: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                alert('Something went wrong. Please try again or email us.');
            }
        } catch (error) {
            console.error('Submission failed', error);
            alert('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
                <SuccessConfetti trigger={true} />
                <GridGlowBackground>
                    <div className="max-w-2xl mx-auto px-6 text-center">
                        <Reveal>
                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                <Sparkles className="text-emerald-400 w-10 h-10" />
                            </div>
                        </Reveal>
                        <ClipReveal>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                Application Received
                            </h1>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                Thank you for applying to the Editorial Partnership program.
                                We review every application thoroughly to ensure we&apos;re the right fit for your work.
                            </p>
                            <p className="text-slate-400">
                                Expect to hear from us within 5 business days. In the meantime, check your email for confirmation.
                            </p>
                            <div className="mt-12">
                                <MagneticButton href="/" variant="primary">Return Home</MagneticButton>
                            </div>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </div>
        );
    }

    return (
        <section className="min-h-screen pt-24 pb-24 relative">
            <div className="absolute inset-0 bg-slate-950 -z-50" />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Reveal>
                        <HeroBadge icon="shield">Limited Availability</HeroBadge>
                    </Reveal>
                    <ClipReveal delay={100}>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                            Apply for Editorial Partnership
                        </h1>
                    </ClipReveal>
                    <Reveal delay={200}>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Tier 4 is our most intensive, hands-on collaboration. We only accept 3 manuscripts per quarter to ensure you get our undivided creative attention.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={300}>
                    <BeamCard glowColor="purple">
                        <div className="p-8 md:p-12 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800">
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Author Info */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">Author Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FloatingInput
                                            name="name"
                                            label="Your Name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <FloatingInput
                                            name="email"
                                            label="Email Address"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Manuscript Info */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">Manuscript Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FloatingInput
                                            name="title"
                                            label="Working Title"
                                            value={form.title}
                                            onChange={handleChange}
                                            required
                                        />
                                        <FloatingInput
                                            name="genre"
                                            label="Genre (e.g. Grimdark Fantasy)"
                                            value={form.genre}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FloatingInput
                                            name="wordcount"
                                            label="Current Word Count"
                                            value={form.wordcount}
                                            onChange={handleChange}
                                            required
                                        />
                                        <FloatingInput
                                            name="timeline"
                                            label="Desired Timeline / Deadline"
                                            value={form.timeline}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">The Pitch (1 Paragraph)</label>
                                        <textarea
                                            name="pitch"
                                            value={form.pitch}
                                            onChange={handleChange}
                                            className="w-full h-32 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                                            placeholder="What is your book about?"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">Why Tier 4?</label>
                                        <textarea
                                            name="whyTier4"
                                            value={form.whyTier4}
                                            onChange={handleChange}
                                            className="w-full h-32 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                                            placeholder="Why do you believe this deep-dive partnership is right for this specific project? What are your biggest struggles?"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Finishing Touches */}
                                <div className="space-y-6">
                                    <FloatingInput
                                        name="referral"
                                        label="How did you hear about us?"
                                        value={form.referral}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="pt-4">
                                    <MagneticButton type="submit" variant="primary" className="w-full justify-center py-4 text-lg" disabled={loading}>
                                        {loading ? 'Submitting Application...' : 'Submit Application'}
                                        {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
                                    </MagneticButton>
                                    <p className="text-center text-xs text-slate-500 mt-4">
                                        Submitting this application does not commit you to payment.
                                    </p>
                                </div>

                            </form>
                        </div>
                    </BeamCard>
                </Reveal>
            </div>
        </section>
    );
}
