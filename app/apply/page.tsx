'use client';

import { useState } from 'react';
import { Send, Star, Clock } from 'lucide-react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { SuccessConfetti } from '@/components/effects/SuccessConfetti';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { FloatingTextarea } from '@/components/ui/FloatingTextarea';
import { FloatingSelect } from '@/components/ui/FloatingSelect';
import { LoadingButton } from '@/components/ui/LoadingButton';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { track } from '@/lib/constants';

const GENRE_OPTIONS = [
    { value: 'fantasy-epic', label: 'Epic Fantasy' },
    { value: 'fantasy-urban', label: 'Urban Fantasy' },
    { value: 'fantasy-dark', label: 'Dark Fantasy' },
    { value: 'fantasy-cozy', label: 'Cozy Fantasy' },
    { value: 'romantasy', label: 'Romantasy' },
    { value: 'sci-fi', label: 'Science Fiction' },
    { value: 'other', label: 'Other Speculative' }
];

const TIMELINE_OPTIONS = [
    { value: 'asap', label: 'As soon as possible' },
    { value: '3-months', label: 'Within 3 months' },
    { value: '6-months', label: 'Within 6 months' },
    { value: 'flexible', label: 'Flexible / No rush' }
];

const REFERRAL_OPTIONS = [
    { value: 'google', label: 'Google Search' },
    { value: 'social', label: 'Social Media' },
    { value: 'referral', label: 'Friend/Colleague Referral' },
    { value: 'community', label: 'Writing Community' },
    { value: 'other', label: 'Other' }
];

export default function ApplyPage() {
    const [formData, setFormData] = useState({
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
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string, boolean> = {};
        if (!formData.name) newErrors.name = true;
        if (!formData.email) newErrors.email = true;
        if (!formData.title) newErrors.title = true;
        if (!formData.pitch) newErrors.pitch = true;
        if (!formData.whyTier4) newErrors.whyTier4 = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        track('tier4_application_submitted', { genre: formData.genre });

        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <>
                <SuccessConfetti trigger={true} />
                <section className="min-h-screen flex items-center justify-center -mt-16 pt-16">
                    <div className="mx-auto max-w-xl px-4 text-center">
                        <Reveal>
                            <div className="w-16 h-16 bg-purple-500/20 rounded-md flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 text-purple-400" />
                            </div>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <h1 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Application Received
                            </h1>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-slate-400 mb-8">
                                Thank you for applying for Editorial Partnership. We review applications
                                within 5 business days. If we're a fit, we'll schedule a call to discuss
                                your project in depth.
                            </p>
                        </Reveal>
                        <Reveal delay={300}>
                            <MagneticButton href="/" variant="primary">
                                Back to Home
                            </MagneticButton>
                        </Reveal>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className="relative flex justify-center pt-20 pb-24">
                <GridGlowBackground>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                        <Reveal>
                            <HeroBadge icon="award">Exclusive Application</HeroBadge>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                Apply for Editorial Partnership
                            </h1>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-lg text-slate-400">
                                Tier 4 is limited to <strong className="text-white">2 projects per quarter</strong>.
                                We select manuscripts where our deep-dive approach will have maximum impact.
                            </p>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </section>

            {/* Application Form */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <Reveal>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FloatingInput
                                    name="name"
                                    label="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    required
                                />
                                <FloatingInput
                                    name="email"
                                    label="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    required
                                />
                            </div>
                        </Reveal>

                        {/* Manuscript Details */}
                        <Reveal delay={100}>
                            <BeamCard glowColor="purple">
                                <div className="p-6 bg-slate-800/30 rounded-md space-y-6">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Star className="w-5 h-5 text-purple-400" />
                                        Manuscript Details
                                    </h3>

                                    <FloatingInput
                                        name="title"
                                        label="Manuscript Title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        error={errors.title}
                                        required
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FloatingSelect
                                            name="genre"
                                            label="Genre"
                                            value={formData.genre}
                                            onChange={handleChange}
                                            options={GENRE_OPTIONS}
                                        />
                                        <FloatingInput
                                            name="wordcount"
                                            label="Word Count (e.g., 95,000)"
                                            value={formData.wordcount}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <FloatingTextarea
                                        name="pitch"
                                        label="One-Paragraph Pitch"
                                        value={formData.pitch}
                                        onChange={handleChange}
                                        error={errors.pitch}
                                        rows={3}
                                    />
                                </div>
                            </BeamCard>
                        </Reveal>

                        {/* Why Tier 4 */}
                        <Reveal delay={200}>
                            <FloatingTextarea
                                name="whyTier4"
                                label="Why do you think this manuscript needs Tier 4?"
                                value={formData.whyTier4}
                                onChange={handleChange}
                                error={errors.whyTier4}
                                rows={4}
                            />
                        </Reveal>

                        {/* Timeline & Referral */}
                        <Reveal delay={300}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FloatingSelect
                                    name="timeline"
                                    label="When do you want to publish/submit?"
                                    value={formData.timeline}
                                    onChange={handleChange}
                                    options={TIMELINE_OPTIONS}
                                />
                                <FloatingSelect
                                    name="referral"
                                    label="How did you hear about us?"
                                    value={formData.referral}
                                    onChange={handleChange}
                                    options={REFERRAL_OPTIONS}
                                />
                            </div>
                        </Reveal>

                        {/* Submit */}
                        <Reveal delay={400}>
                            <LoadingButton
                                type="submit"
                                loading={loading}
                                variant="primary"
                                className="w-full"
                            >
                                <Send size={18} />
                                Submit Application
                            </LoadingButton>
                        </Reveal>

                        <Reveal delay={500}>
                            <div className="p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-slate-400">
                                        We review applications within <strong className="text-white">5 business days</strong>.
                                        If we're a fit, we'll schedule a call to discuss your project in depth.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </form>
                </div>
            </section>
        </>
    );
}
