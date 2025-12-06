'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY, NAV_ITEMS } from '@/lib/constants';
import { useState, FormEvent } from 'react';

export function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        // TODO: Integrate with Resend/ConvertKit
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <footer className="border-t border-slate-800/50 bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand - 4 Cols */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Prose Refinery"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                            <span className="text-xl font-bold text-white tracking-tight">
                                {COMPANY.name}
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-sm">
                            Expert developmental editing for fantasy and sci-fi authors.
                            We don't just critique prose; we reconstruct architecture.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a
                                href={`mailto:${COMPANY.email}`}
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 transition-all border border-slate-700 hover:border-emerald-500/50"
                                aria-label="Email us"
                            >
                                <Mail size={18} />
                            </a>
                            <a
                                href={`https://wa.me/${COMPANY.whatsapp?.replace('+', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 transition-all border border-slate-700 hover:border-emerald-500/50"
                                aria-label="WhatsApp"
                            >
                                <MessageSquare size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation - 2 Cols */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-semibold mb-6">Explore</h4>
                        <ul className="space-y-3">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-400 hover:text-emerald-400 text-sm transition-colors block"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal - 2 Cols */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-semibold mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li>{COMPANY.legalName}</li>
                            <li>No. {COMPANY.companyNumber}</li>
                            <li className="pt-2">
                                <a href="#" className="hover:text-emerald-400 transition-colors block">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-emerald-400 transition-colors block">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter - 4 Cols */}
                    <div className="lg:col-span-4">
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                            <h4 className="text-white font-bold text-lg mb-2">Refine Your Inbox</h4>
                            <p className="text-slate-400 text-sm mb-6">
                                Weekly structural craft tips, industry analysis, and zero fluff. Join the inner circle.
                            </p>

                            {status === 'success' ? (
                                <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                                    <CheckCircle2 size={20} />
                                    <span className="text-sm font-medium">Welcome to the refinery.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="author@example.com"
                                            required
                                            disabled={status === 'loading'}
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                                        {!status && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-600 text-sm">
                        © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm text-slate-600">
                        <span>London, UK</span>
                        <span>Planet Earth</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
