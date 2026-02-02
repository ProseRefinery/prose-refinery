'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, ArrowRight, CheckCircle2, Instagram, Twitter } from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { useState, FormEvent } from 'react';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/effects/Reveal';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';

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

// ============================================================================
// AIYÉ FOOTER (Gold Theme - Premium)
// ============================================================================
function AiyeFooter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source: 'children_of_aiye_footer',
                    userGroup: 'Aiyé Reader'
                }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <footer
            className="relative w-full"
            style={{
                background: 'linear-gradient(to bottom, #0a0a0a, #050505)',
            }}
        >
            {/* Textured overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'url(/children-of-aiye/bg-luxury-matte.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Top decorative border */}
            <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)]" />
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 w-full px-6 sm:px-12 lg:px-24 py-20 sm:py-24">

                {/* Header with decorative elements */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
                        <h3
                            className="text-xs tracking-[0.4em] text-[#D4AF37] uppercase"
                            style={{ fontFamily: 'Cinzel, serif' }}
                        >
                            The Covenant
                        </h3>
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
                    </div>
                    <p
                        className="text-[#a0a0a0] text-base leading-relaxed max-w-md mx-auto"
                        style={{ fontFamily: 'Merriweather, Georgia, serif', fontStyle: 'italic' }}
                    >
                        The old gods never left. Now they&apos;re calling you home.
                    </p>
                </div>

                {/* Two column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">

                    {/* Newsletter Card */}
                    <div className="relative group">
                        {/* Card glow effect */}
                        <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Card */}
                        <div className="relative bg-[#111111]/80 backdrop-blur-sm border border-[#D4AF37]/10 rounded-xl p-8 hover:border-[#D4AF37]/30 transition-all duration-500">
                            {/* Corner accents */}
                            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#D4AF37]/40" />
                            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#D4AF37]/40" />
                            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#D4AF37]/40" />
                            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#D4AF37]/40" />

                            <label
                                htmlFor="aiye-newsletter"
                                className="block text-[#f0f0f0] text-lg mb-2"
                                style={{ fontFamily: 'Cinzel, serif' }}
                            >
                                Receive Transmissions
                            </label>
                            <p
                                className="text-[#888888] text-sm mb-6"
                                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                            >
                                Updates on Volume 2, exclusive content, and dispatches from Lagos 2067.
                            </p>

                            {status === 'success' ? (
                                <div className="flex items-center gap-3 text-[#D4AF37] bg-[#D4AF37]/10 p-4 rounded-lg border border-[#D4AF37]/30">
                                    <CheckCircle2 size={20} />
                                    <span
                                        className="text-sm"
                                        style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                                    >
                                        The gods have heard you.
                                    </span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        id="aiye-newsletter"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                        disabled={status === 'loading'}
                                        className="w-full h-12 bg-[#0a0a0a] border border-[#333333] rounded-lg px-4 text-[#f0f0f0] placeholder-[#555555] focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all text-sm"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full h-12 bg-gradient-to-r from-[#D4AF37] to-[#B8962E] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#0a0a0a] font-bold rounded-lg transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                                        style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}
                                    >
                                        {status === 'loading' ? '...' : 'JOIN THE COVENANT'}
                                    </button>
                                </form>
                            )}

                            {status === 'error' && (
                                <p className="text-red-400 text-sm mt-4" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Social & Connect Card */}
                    <div className="relative group">
                        {/* Card glow effect */}
                        <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Card */}
                        <div className="relative bg-[#111111]/80 backdrop-blur-sm border border-[#D4AF37]/10 rounded-xl p-8 hover:border-[#D4AF37]/30 transition-all duration-500 h-full">
                            {/* Corner accents */}
                            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#D4AF37]/40" />
                            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#D4AF37]/40" />
                            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#D4AF37]/40" />
                            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#D4AF37]/40" />

                            <h4
                                className="text-[#f0f0f0] text-lg mb-2"
                                style={{ fontFamily: 'Cinzel, serif' }}
                            >
                                Follow the Journey
                            </h4>
                            <p
                                className="text-[#888888] text-sm mb-8"
                                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
                            >
                                Behind-the-scenes art, character reveals, and community discussions.
                            </p>

                            <a
                                href="https://www.instagram.com/childrenofaiye/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 group/link p-4 -m-4 rounded-lg hover:bg-[#D4AF37]/5 transition-all duration-300"
                            >
                                <span className="relative w-14 h-14 rounded-full border-2 border-[#333333] bg-[#0a0a0a] flex items-center justify-center text-[#c0c0c0] group-hover/link:text-[#D4AF37] group-hover/link:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden">
                                    {/* Glow ring on hover */}
                                    <span className="absolute inset-0 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent" />
                                    <Instagram size={24} className="relative z-10" />
                                </span>
                                <div>
                                    <span
                                        className="block text-[#f0f0f0] group-hover/link:text-[#D4AF37] transition-colors font-medium"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        @childrenofaiye
                                    </span>
                                    <span className="text-xs text-[#666666]">Instagram</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legal Footer */}
            <div className="relative z-10 w-full border-t border-[#1a1a1a]">
                <div className="px-6 sm:px-12 lg:px-24 py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="text-xs text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            © 2026 Prose Refinery Press
                        </span>
                        <div className="flex items-center gap-8 text-xs text-[#555555]">
                            <Link
                                href="/privacy"
                                className="hover:text-[#D4AF37] transition-colors duration-300"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                className="hover:text-[#D4AF37] transition-colors duration-300"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ============================================================================
// DEFAULT FOOTER (Emerald Theme)
// ============================================================================
function DefaultFooter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                console.error('Newsletter signup failed');
                setStatus('idle');
            }
        } catch (error) {
            console.error('Newsletter signup error', error);
            setStatus('idle');
        }
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
                            <span className="text-xl font-bold text-white font-[family-name:var(--font-playfair)] group-hover:text-emerald-400 transition-colors">
                                {COMPANY.name}
                            </span>
                        </Link>

                        <p className="text-slate-400 leading-relaxed text-sm max-w-sm font-light">
                            Structural editorial practice for speculative fiction.
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
                            <li><FooterLink href="/services#audits">Structural Audits</FooterLink></li>

                            <li><FooterLink href="/resources">Craft Resources</FooterLink></li>
                        </ul>
                    </div>

                    {/* Navigation - Company - 2 Cols */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white text-lg font-bold mb-6 font-[family-name:var(--font-playfair)]">Company</h4>
                        <ul className="space-y-3">
                            <li><FooterLink href="/about">How It Works</FooterLink></li>
                            <li><FooterLink href="/contact">Contact</FooterLink></li>
                        </ul>
                    </div>

                    {/* Newsletter - 4 Cols */}
                    <div className="col-span-2 lg:col-span-4">
                        <Card variant="tilt" maxTilt={1} className="h-full" contentClassName="p-8">
                            <h4 className="relative text-white text-lg font-bold mb-2 font-[family-name:var(--font-playfair)]">
                                Refine Your Inbox
                            </h4>
                            <p className="relative text-slate-400 mb-6 text-sm font-light leading-relaxed">
                                Structural craft tips that agents actually look for. No fluff. Weekly.
                            </p>

                            {status === 'success' ? (
                                <div className="relative flex items-center gap-3 text-emerald-400 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 animate-in fade-in zoom-in duration-300">
                                    <CheckCircle2 size={20} />
                                    <span className="font-medium text-sm">You&apos;re on the list.</span>
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
                                            className="peer w-full h-12 bg-slate-950/80 border border-slate-700/50 rounded-lg px-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-[family-name:var(--font-inter)] text-sm"
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
                        </Card>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-600 text-xs font-light">
                        © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
                        <span className="block mt-1 text-slate-700">All manuscripts treated as confidential. Never shared or reused.</span>
                    </div>
                    <div className="flex gap-6 text-xs text-slate-600 font-light">
                        <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
                        <Link href="/sitemap.xml" className="hover:text-emerald-400 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ============================================================================
// MAIN FOOTER COMPONENT (Route-based switching)
// ============================================================================
export function Footer() {
    const pathname = usePathname();

    // Render Aiyé footer on Children of Aiyé pages
    if (pathname?.startsWith('/children-of-aiye')) {
        return <AiyeFooter />;
    }

    // Default Prose Refinery footer
    return <DefaultFooter />;
}
