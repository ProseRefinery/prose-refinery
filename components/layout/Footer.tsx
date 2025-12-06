'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare, ArrowRight, CheckCircle2, Instagram, Twitter, Linkedin } from 'lucide-react';
import { COMPANY, NAV_ITEMS } from '@/lib/constants';
import { useState, FormEvent } from 'react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        // Simulator
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <footer className="relative border-t border-slate-800/50">
            <GridGlowBackground className="absolute inset-0 pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Brand & Mission - 5 Cols */}
                    <div className="lg:col-span-5 space-y-8">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                                <Image
                                    src="/logo.png"
                                    alt="Prose Refinery"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <span className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)] tracking-wide group-hover:text-emerald-400 transition-colors">
                                {COMPANY.name}
                            </span>
                        </Link>

                        <p className="text-slate-400 leading-relaxed text-lg max-w-md font-light">
                            Constructing the architecture of the next generation of fantasy bestsellers.
                            We don't just edit smooth sentences; we build unbreakable stories.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            {[
                                { icon: Mail, href: `mailto:${COMPANY.email}`, label: 'Email' },
                                { icon: MessageSquare, href: `https://wa.me/${COMPANY.whatsapp?.replace('+', '')}`, label: 'WhatsApp' },
                                { icon: Twitter, href: '#', label: 'Twitter' },
                                { icon: Instagram, href: '#', label: 'Instagram' }
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-12 h-12 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all duration-300 group"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation - 3 Cols */}
                    <div className="lg:col-span-3 lg:pl-8">
                        <h4 className="text-white text-lg font-bold mb-8 font-[family-name:var(--font-playfair)]">Explore</h4>
                        <ul className="space-y-4">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-400 hover:text-emerald-400 transition-colors text-base flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all duration-300" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-4 border-t border-slate-800/50 mt-4">
                                <Link href="/login" className="text-slate-500 hover:text-white transition-colors text-sm">
                                    Client Portal Log In
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter - 4 Cols */}
                    <div className="lg:col-span-4">
                        <div className="relative p-8 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500">
                            {/* Beam Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <h4 className="relative text-white text-xl font-bold mb-3 font-[family-name:var(--font-playfair)]">
                                Refine Your Inbox
                            </h4>
                            <p className="relative text-slate-400 mb-8 font-light">
                                Structural craft tips that agents actually look for. No fluff. Weekly.
                            </p>

                            {status === 'success' ? (
                                <div className="relative flex items-center gap-3 text-emerald-400 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 animate-in fade-in zoom-in duration-300">
                                    <CheckCircle2 size={24} />
                                    <span className="font-medium">You're on the list.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="relative space-y-4">
                                    <div className="relative group/input">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder=" "
                                            required
                                            disabled={status === 'loading'}
                                            className="peer w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-[family-name:var(--font-inter)]"
                                            id="footer-email"
                                        />
                                        <label
                                            htmlFor="footer-email"
                                            className="absolute left-4 top-2 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-500 pointer-events-none"
                                        >
                                            Email address
                                        </label>
                                    </div>
                                    <MagneticButton
                                        type="submit"
                                        disabled={status === 'loading'}
                                        variant="primary"
                                        className="w-full justify-center py-4 rounded-xl text-sm"
                                    >
                                        <span>{status === 'loading' ? 'Joining...' : 'Join the Inner Circle'}</span>
                                        {!status && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                                    </MagneticButton>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-600 text-sm font-light">
                        © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
                    </div>
                    <div className="flex gap-8 text-sm text-slate-600 font-light">
                        <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
                        <Link href="/sitemap" className="hover:text-emerald-400 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
