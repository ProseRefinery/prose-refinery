'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, CheckCircle2, Instagram, Twitter } from 'lucide-react';
import { COMPANY, NAV_ITEMS } from '@/lib/constants';
import { useState, FormEvent } from 'react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';

const FooterLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <div className="relative">
        <Link
            href={href}
            className={`text-slate-400 hover:text-emerald-400 transition-colors text-sm group flex items-center pl-0 hover:pl-4 transition-all duration-300 ${className || ''}`}
        >
            <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity top-[0.6em] -translate-y-1/2" />
            {children}
        </Link>
    </div>
);

import { WhatsAppIcon } from '@/components/ui/BrandIcons';

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

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Brand & Mission - 4 Cols */}
                    <div className="col-span-2 lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                                <Image
                                    src="/logo.png"
                                    alt="Prose Refinery"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <span className="text-xl font-bold text-white font-[family-name:var(--font-playfair)] tracking-wide group-hover:text-emerald-400 transition-colors">
                                {COMPANY.name}
                            </span>
                        </Link>

                        <p className="text-slate-400 leading-relaxed text-sm max-w-sm font-light">
                            Constructing the architecture of the next generation of fantasy bestsellers.
                            We don't just edit smooth sentences; we build unbreakable stories.
                        </p>

                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { icon: Mail, href: `mailto:${COMPANY.email}`, label: 'Email' },
                                { icon: WhatsAppIcon, href: `https://wa.me/${COMPANY.whatsapp?.replace('+', '')}`, label: 'WhatsApp' },
                                { icon: Twitter, href: '#', label: 'Twitter' },
                                { icon: Instagram, href: '#', label: 'Instagram' }
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all duration-300 group"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation - Expertise - 2 Cols */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white text-lg font-bold mb-6 font-[family-name:var(--font-playfair)]">Expertise</h4>
                        <ul className="space-y-3">
                            <li><FooterLink href="/services#diagnostics">Diagnostics</FooterLink></li>
                            <li><FooterLink href="/services#audits">Developmental Audits</FooterLink></li>
                            <li><FooterLink href="/services#mentorship">Mentorship</FooterLink></li>
                            <li><FooterLink href="/resources">Craft Resources</FooterLink></li>
                        </ul>
                    </div>

                    {/* Navigation - Company - 2 Cols */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white text-lg font-bold mb-6 font-[family-name:var(--font-playfair)]">Company</h4>
                        <ul className="space-y-3">
                            <li><FooterLink href="/method">The Method</FooterLink></li>
                            <li><FooterLink href="/about">About Us</FooterLink></li>
                            <li><FooterLink href="/contact">Contact</FooterLink></li>
                            <li className="pt-3 mt-3 border-t border-slate-800/50">
                                <Link
                                    href="/login"
                                    className="text-slate-500 hover:text-white transition-colors text-xs uppercase tracking-wider flex items-center gap-2 group"
                                >
                                    Client Portal
                                    <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter - 4 Cols */}
                    <div className="col-span-2 lg:col-span-4">
                        <div className="relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500">
                            {/* Beam Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <h4 className="relative text-white text-lg font-bold mb-2 font-[family-name:var(--font-playfair)]">
                                Refine Your Inbox
                            </h4>
                            <p className="relative text-slate-400 mb-6 text-sm font-light leading-relaxed">
                                Structural craft tips that agents actually look for. No fluff. Weekly.
                            </p>

                            {status === 'success' ? (
                                <div className="relative flex items-center gap-3 text-emerald-400 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 animate-in fade-in zoom-in duration-300">
                                    <CheckCircle2 size={20} />
                                    <span className="font-medium text-sm">You're on the list.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="relative flex gap-2">
                                    <div className="relative group/input flex-1">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="author@example.com"
                                            required
                                            disabled={status === 'loading'}
                                            className="peer w-full h-12 bg-slate-950/80 border border-slate-700 rounded-lg px-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-[family-name:var(--font-inter)] text-sm"
                                            id="footer-email"
                                        />
                                    </div>
                                    <MagneticButton
                                        type="submit"
                                        disabled={status === 'loading'}
                                        variant="primary"
                                        className="h-12 px-6 rounded-lg text-xs whitespace-nowrap"
                                    >
                                        {status === 'loading' ? '...' : 'Join'}
                                    </MagneticButton>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-600 text-xs font-light">
                        © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-xs text-slate-600 font-light">
                        <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
                        <Link href="/sitemap" className="hover:text-emerald-400 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
