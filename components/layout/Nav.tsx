'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, COMPANY } from '@/lib/constants';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

// Status Indicator - "Systems Online" pulsing light
function StatusIndicator() {
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-emerald-500/70 hidden lg:block">
                Online
            </span>
        </div>
    );
}

// Urgency/Availability badge
function AvailabilityBadge() {
    return (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400">
                Now Booking: Feb 2025
            </span>
        </div>
    );
}

// Vertical architectural divider
function Divider() {
    return <div className="w-px h-6 bg-slate-700/50" />;
}

export function Nav() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between backdrop-blur-md bg-slate-900/80 border border-slate-800/50 rounded-md mt-2 px-4">
                    {/* Logo */}
                    <Link href="/" className="inline-flex items-center gap-3 group px-2">
                        <div className="relative w-8 h-8 overflow-hidden rounded-md">
                            <Image
                                src="/logo.png"
                                alt="Prose Refinery"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <span className="text-sm font-bold text-white font-[family-name:var(--font-playfair)] tracking-wide group-hover:text-emerald-400 transition-colors">
                            {COMPANY.name}
                        </span>
                    </Link>

                    <Divider />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 relative">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={cn(
                                        'relative px-4 py-2 text-[11px] font-medium tracking-widest uppercase transition-colors',
                                        isActive
                                            ? 'text-emerald-400'
                                            : 'text-slate-500 hover:text-slate-300'
                                    )}
                                >
                                    {item.label}
                                    {/* Active indicator - glowing bottom border */}
                                    {isActive && (
                                        <span
                                            className="absolute bottom-0 left-2 right-2 h-px bg-emerald-500"
                                            style={{
                                                boxShadow: '0 0 8px rgba(16, 185, 129, 0.8), 0 0 16px rgba(16, 185, 129, 0.4)'
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <Divider />

                    {/* Status + CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <AvailabilityBadge />
                        <StatusIndicator />
                        <MagneticButton href="/diagnostic" variant="primary">
                            Begin
                        </MagneticButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden p-2 text-slate-400 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-2 py-4 px-4 bg-slate-900/95 backdrop-blur-md border border-slate-800/50 rounded-md">
                        <div className="flex flex-col gap-1">
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            'px-4 py-3 text-[11px] font-medium tracking-widest uppercase rounded-md transition-colors',
                                            isActive
                                                ? 'text-emerald-400 bg-emerald-500/10'
                                                : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <div className="pt-3 mt-2 border-t border-slate-800">
                                <div className="flex items-center justify-between px-4 mb-3">
                                    <StatusIndicator />
                                </div>
                                <MagneticButton href="/diagnostic" variant="primary" className="w-full">
                                    Begin Diagnostic
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
