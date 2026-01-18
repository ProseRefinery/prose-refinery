'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, COMPANY } from '@/lib/constants';
import { useHaptic } from '@/hooks/useHaptic';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

// Nav item type for custom navigation
interface NavItem {
    id: string;
    label: string;
    href: string;
}

// Props for customizable Nav
interface NavProps {
    variant?: 'default' | 'gold';
    navItems?: NavItem[];
    ctaHref?: string;
    ctaText?: string;
    availabilityText?: string | null; // null to hide
    showStatus?: boolean;
    onCtaClick?: () => void;
    logoHref?: string;
}

// Status Indicator - "Systems Online" pulsing light
function StatusIndicator({ variant = 'default' }: { variant?: 'default' | 'gold' }) {
    const isGold = variant === 'gold';
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <div className={cn("w-2 h-2 rounded-full", isGold ? "bg-[#D4AF37]" : "bg-emerald-500")} />
                <div className={cn("absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-75", isGold ? "bg-[#D4AF37]" : "bg-emerald-500")} />
            </div>
            <span className={cn("text-[10px] uppercase tracking-widest hidden lg:block", isGold ? "text-[#D4AF37]/70" : "text-emerald-500/70")}>
                Online
            </span>
        </div>
    );
}

// Urgency/Availability badge
function AvailabilityBadge({ text, variant = 'default' }: { text: string; variant?: 'default' | 'gold' }) {
    const isGold = variant === 'gold';
    return (
        <div className={cn(
            "hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md animate-in fade-in duration-500",
            isGold
                ? "bg-[#D4AF37]/10 border border-[#D4AF37]/30"
                : "bg-emerald-500/10 border border-emerald-500/30"
        )}>
            <span className={cn(
                "text-[10px] uppercase tracking-widest",
                isGold ? "text-[#D4AF37]" : "text-emerald-400"
            )} suppressHydrationWarning>
                {text}
            </span>
        </div>
    );
}

// Vertical architectural divider
function Divider() {
    return <div className="w-px h-6 bg-slate-700/50" />;
}

export function Nav({
    variant = 'default',
    navItems,
    ctaHref = '/diagnostic',
    ctaText = 'Begin',
    availabilityText = 'Limited Availability',
    showStatus = true,
    onCtaClick,
    logoHref = '/',
}: NavProps = {}) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { trigger } = useHaptic();

    const isGold = variant === 'gold';
    const items = navItems || NAV_ITEMS;

    // Color classes based on variant
    const activeColor = isGold ? 'text-[#D4AF37]' : 'text-emerald-400';
    const activeBg = isGold ? 'bg-[#D4AF37]/10' : 'bg-emerald-500/10';
    const activeGlow = isGold
        ? '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4)'
        : '0 0 8px rgba(16, 185, 129, 0.8), 0 0 16px rgba(16, 185, 129, 0.4)';
    const activeBorderColor = isGold ? 'bg-[#D4AF37]' : 'bg-emerald-500';
    const hoverColor = isGold ? 'hover:text-[#D4AF37]' : 'hover:text-emerald-400';
    const ctaVariant = isGold ? 'gold' : 'primary';

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between backdrop-blur-md bg-slate-900/80 border border-slate-800/50 rounded-md mt-2 px-4">
                    {/* Logo */}
                    <Link href={logoHref} className="inline-flex items-center gap-3 group px-2">
                        <div className="relative w-8 h-8 overflow-hidden rounded-md">
                            <Image
                                src="/logo.png"
                                alt="Prose Refinery"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <span className={cn(
                            "text-sm font-bold text-white font-[family-name:var(--font-playfair)] transition-colors",
                            hoverColor
                        )}>
                            {COMPANY.name}
                        </span>
                    </Link>

                    <Divider />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1 relative">
                        {items.map((item) => {
                            const isActive = pathname === item.href || (item.href.startsWith('#') && false);
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => trigger('light')}
                                    className={cn(
                                        'relative px-4 py-2 text-[11px] font-medium tracking-widest uppercase transition-colors',
                                        isActive
                                            ? activeColor
                                            : `text-slate-500 hover:text-slate-300`
                                    )}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span
                                            className={cn("absolute bottom-0 left-2 right-2 h-px", activeBorderColor)}
                                            style={{ boxShadow: activeGlow }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <Divider />

                    {/* Status + CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        {availabilityText && (
                            <AvailabilityBadge text={availabilityText} variant={variant} />
                        )}
                        {showStatus && <StatusIndicator variant={variant} />}
                        <MagneticButton
                            href={onCtaClick ? undefined : ctaHref}
                            onClick={onCtaClick}
                            variant={ctaVariant}
                        >
                            {ctaText}
                        </MagneticButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className={cn("md:hidden p-2 text-slate-400", isGold ? "hover:text-[#D4AF37]" : "hover:text-white")}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-2 py-4 px-4 bg-slate-900/95 backdrop-blur-md border border-slate-800/50 rounded-md max-h-[80vh] overflow-y-auto scrollbar-hide">
                        <div className="flex flex-col gap-1">
                            {items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => {
                                            trigger('light');
                                            setMobileMenuOpen(false);
                                        }}
                                        className={cn(
                                            'px-4 py-3 text-[11px] font-medium tracking-widest uppercase rounded-md transition-colors',
                                            isActive
                                                ? `${activeColor} ${activeBg}`
                                                : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <div className="pt-3 mt-2 border-t border-slate-800">
                                {showStatus && (
                                    <div className="flex items-center justify-between px-4 mb-3">
                                        <StatusIndicator variant={variant} />
                                    </div>
                                )}
                                <MagneticButton
                                    href={onCtaClick ? undefined : ctaHref}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        onCtaClick?.();
                                    }}
                                    variant={ctaVariant}
                                    className="w-full"
                                >
                                    {ctaText}
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
