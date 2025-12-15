'use client';

import { ReactNode } from 'react';
import {
    Award, Layers, Users, BookOpen, Target, Sparkles,
    Search, Feather, Mail, LucideIcon
} from 'lucide-react';

// Icon map for string-based icon selection (avoids serialization issues)
const ICON_MAP: Record<string, LucideIcon> = {
    award: Award,
    layers: Layers,
    users: Users,
    book: BookOpen,
    target: Target,
    sparkles: Sparkles,
    search: Search,
    feather: Feather,
    mail: Mail,
};

interface HeroBadgeProps {
    children: ReactNode;
    icon?: keyof typeof ICON_MAP;
}

/**
 * HeroBadge - Context-aware pill badge above headlines
 * Use icon prop with string name for different pages:
 * - Home: "award"
 * - Services: "layers"
 * - About: "users"
 * - etc.
 */
export function HeroBadge({ children, icon = 'sparkles' }: HeroBadgeProps) {
    const Icon = ICON_MAP[icon] || Sparkles;

    return (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1),inset_0_1px_0_rgba(16,185,129,0.1)]">
            <Icon size={12} className="animate-pulse" />
            {children}
        </span>
    );
}
