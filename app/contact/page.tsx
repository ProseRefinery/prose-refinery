'use client';

import { useState } from 'react';
// import { Metadata } from 'next';
import { ArrowRight, Send, Mail } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { Reveal } from '@/components/effects/Reveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { SuccessConfetti } from '@/components/effects/SuccessConfetti';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { FloatingTextarea } from '@/components/ui/FloatingTextarea';
import { FloatingSelect } from '@/components/ui/FloatingSelect';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { TIERS, COMPANY } from '@/lib/constants';

const tierOptions = TIERS.map(t => ({ value: t.id.toString(), label: `${t.name} (${t.price})` }));

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tier: '',
        title: '',
        genre: '',
        wordcount: '',
        pitch: '',
        concern: ''
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

        // Validate
        const newErrors: Record<string, boolean> = {};
        if (!formData.name) newErrors.name = true;
        if (!formData.email) newErrors.email = true;
        if (!formData.tier) newErrors.tier = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <>
                <SuccessConfetti trigger={true} />
                <section className="min-h-[80vh] flex items-center justify-center">
                    <div className="mx-auto max-w-xl px-4 text-center">
                        <Reveal>
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Send className="w-8 h-8 text-emerald-400" />
                            </div>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <h1 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                                Message Sent!
                            </h1>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-slate-400 mb-8">
                                Thank you for reaching out. We&apos;ll review your inquiry and get back to you within 48 hours.
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
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <Reveal>
                            <HeroBadge>Get In Touch</HeroBadge>
                        </Reveal>
                        <ClipReveal delay={100}>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
                                Let&apos;s Discuss Your Manuscript
                            </h1>
                        </ClipReveal>
                        <Reveal delay={200}>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                Tell us about your project and we&apos;ll recommend the best path forward.
                            </p>
                        </Reveal>
                    </div>
                </GridGlowBackground>
            </section>

            {/* Form */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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

                        <Reveal delay={100} className="relative z-20">
                            <FloatingSelect
                                name="tier"
                                label="Interested In"
                                value={formData.tier}
                                onChange={(name, value) => {
                                    setFormData(prev => ({ ...prev, [name]: value }));
                                    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
                                }}
                                options={tierOptions}
                                error={errors.tier}
                                required
                            />
                        </Reveal>

                        {/* Manuscript Details */}
                        <Reveal delay={200}>
                            <BeamCard>
                                <div className="p-6 bg-slate-800/30 rounded-lg space-y-6">
                                    <h3 className="text-lg font-semibold text-white">Manuscript Details</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FloatingInput
                                            name="title"
                                            label="Working Title"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                        <FloatingInput
                                            name="genre"
                                            label="Genre/Subgenre"
                                            value={formData.genre}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <FloatingInput
                                        name="wordcount"
                                        label="Approximate Word Count"
                                        value={formData.wordcount}
                                        onChange={handleChange}
                                    />

                                    <FloatingInput
                                        name="pitch"
                                        label="One-Line Pitch"
                                        value={formData.pitch}
                                        onChange={handleChange}
                                    />

                                    <FloatingTextarea
                                        name="concern"
                                        label="Primary Concerns or Goals"
                                        value={formData.concern}
                                        onChange={handleChange}
                                        rows={4}
                                    />
                                </div>
                            </BeamCard>
                        </Reveal>

                        <Reveal delay={300}>
                            <MagneticButton
                                type="submit"
                                loading={loading}
                                variant="primary"
                                className="w-full"
                            >
                                Send Message
                                <ArrowRight size={14} />
                            </MagneticButton>
                        </Reveal>
                    </form>

                    {/* Contact Info */}
                    <Reveal delay={400}>
                        <div className="mt-12 pt-12 border-t border-slate-800/50 text-center">
                            <p className="text-slate-400 mb-4">Or reach out directly:</p>
                            <div className="flex justify-center gap-6">
                                <a
                                    href={`mailto:${COMPANY.email}`}
                                    className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                                >
                                    <Mail size={18} />
                                    {COMPANY.email}
                                </a>
                                <a
                                    href={`https://wa.me/${COMPANY.whatsapp?.replace('+', '')}`}
                                    className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                                >
                                    <WhatsAppIcon size={18} />
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
