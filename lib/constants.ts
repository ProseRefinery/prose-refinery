import { Layers, Users, BookOpen, Zap, Target, Heart, BarChart3 } from "lucide-react";
import { Tier, Pillar, Question, NavItem } from "./types";

export const COMPANY = {
    name: 'Prose Refinery',
    legalName: 'Prose Refinery Ltd',
    companyNumber: '16476326',
    email: 'hello@proserefinery.com',
    whatsapp: '+447735750274'
} as const;

// Stripe Price IDs - Replace with your actual Stripe Price IDs (price_...)
export const STRIPE_PRICES = {
    // Editorial
    tier1_hook: 'price_1SbRI0BXNkcYRXZ1T52dy0QC',
    tier1_voice: 'price_1SbRHwBXNkcYRXZ1CzADAfOW',
    tier1_pacing: 'price_1SbRHrBXNkcYRXZ1s5QPeTRa',
    tier1_bundle: 'price_1SbRHmBXNkcYRXZ1jgljYxkb',
    single_pillar_audit: 'price_1SbRHhBXNkcYRXZ16X9naTUo',

    // Tier 3 Structure (New)
    // Tier 3 Structure (New)
    tier3_preview: 'price_1SdaDFBXNkcYRXZ1D9OI5fhy', // Was Taster - Needs new ID £250
    tier3_core: 'price_1SdaGXBXNkcYRXZ10UVMAVGP', // £1500
    tier3_standard: 'price_1SdaHpBXNkcYRXZ1hVPj6mGe', // £2800
    tier3_premium: 'price_1SdaJuBXNkcYRXZ1gAnvOLNY', // £4500+

    launch_arsenal: 'price_1SbRHbBXNkcYRXZ1Jfj04GZ1',

    // Multimedia
    teaser_soundtrack: 'price_1SbRHZBXNkcYRXZ1Qi2k8OYp',
    full_soundtrack: 'price_1SbRHVBXNkcYRXZ1rL4u6ad6',
    book_trailer: 'price_1SbRHBBXNkcYRXZ1CqsOmlqk',
    marketing_power_pack: 'price_1SbRH7BXNkcYRXZ1kDJV0Nz2',
} as const;

export const TIERS: Tier[] = [
    {
        id: 1,
        name: 'Story Integrity Diagnostic™',
        price: '£95 – £175',
        turnaround: '48 hours',
        description: "Pinpoint what's not working",
        includes: ['Opening Hook Assessment', 'Voice & Tone Diagnostic', 'Pacing Snapshot']
    },
    {
        id: 2,
        name: 'Single-Pillar Structural Audit',
        price: '£350',
        turnaround: '7 days',
        description: 'Repair what you already see',
        includes: ['Single-Pillar Deep Dive', 'Act-Level Structure Audit', 'Character Arc Analysis'],
        recommended: true,
        pricingContext: 'Single pillar analysis (up to 30k words)'
    },
    {
        id: 3,
        name: 'Full Structural Edit',
        price: '£1,500 – £4,500+',
        turnaround: '3–4 weeks',
        description: 'Reconstruct the full manuscript',
        includes: ['Complete 4-Pillar Assessment', 'Iterative Revision Cycles', 'Strategy Consultations', 'Line-Level Annotation'],
        pricingContext: 'Structured Tiers: Core (£1.5k), Standard (£2.8k), Premium (£4.5k+)'
    },
    {
        id: 4,
        name: 'Editorial Partnership',
        price: '£5,000 – £12,000',
        turnaround: '3–6 months',
        description: 'Partner through multiple drafts',
        includes: ['Everything in Tier 3', 'Multiple Draft Passes', 'Ongoing Consultation', 'Direct Access'],
        pricingContext: 'Custom quote based on project scope, timeline, and number of draft passes'
    }
];

export const PILLARS: Pillar[] = [
    { id: 1, name: 'Plot Architecture', icon: Layers, short: 'Does the structure hold weight?' },
    { id: 2, name: 'Character Integrity', icon: Users, short: 'Do internal arcs drive external action?' },
    { id: 3, name: 'World-System Logic', icon: BookOpen, short: 'Is the setting consistent and consequential?' },
    { id: 4, name: 'Pacing & Pressure', icon: Zap, short: 'Does tension escalate effectively?' }
];

export const QUESTIONS: Question[] = [
    { id: 'stage', question: 'What stage is your manuscript in?', options: [{ value: 1, label: 'Early draft' }, { value: 2, label: 'Complete first draft' }, { value: 3, label: 'Revised draft' }, { value: 4, label: 'Final or near-final' }] },
    { id: 'wordcount', question: 'Approximate word count?', options: [{ value: 1, label: 'Under 40,000' }, { value: 2, label: '40,000 – 80,000' }, { value: 3, label: '80,001 – 120,000' }, { value: 4, label: 'Over 120,000' }] },
    { id: 'complexity', question: 'How complex is your worldbuilding?', options: [{ value: 1, label: 'Minimal' }, { value: 2, label: 'Moderate' }, { value: 3, label: 'Complex' }, { value: 4, label: 'Highly complex' }] },
    { id: 'concern', question: 'Primary concern?', options: [{ value: 1, label: 'Something feels off' }, { value: 2, label: 'Pacing/structure issues' }, { value: 3, label: 'Character/worldbuilding' }, { value: 4, label: 'Submission ready' }] },
    { id: 'feedback', question: 'Professional feedback received?', options: [{ value: 1, label: 'None yet' }, { value: 2, label: 'Beta readers only' }, { value: 3, label: 'Some professional' }, { value: 4, label: 'Extensive history' }] },
    { id: 'goal', question: 'Primary goal?', options: [{ value: 1, label: 'Worth continuing?' }, { value: 2, label: 'Fix specific problems' }, { value: 3, label: 'Make agent-ready' }, { value: 4, label: 'Long-term partnership' }] },
    { id: 'timeline', question: 'Your timeline?', options: [{ value: 1, label: 'Urgent (2 weeks)' }, { value: 2, label: 'Soon (1-2 months)' }, { value: 3, label: 'Flexible (3-6 months)' }, { value: 4, label: 'Open-ended' }] },
    { id: 'investment', question: 'Investment level?', options: [{ value: 1, label: 'Under £200' }, { value: 2, label: '£250 – £750' }, { value: 3, label: '£1,500 – £4,500' }, { value: 4, label: '£5,000+' }] }
];

export const NAV_ITEMS: NavItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'resources', label: 'Resources', href: '/resources' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'diagnostic', label: 'Diagnostic', href: '/diagnostic' },
    { id: 'contact', label: 'Contact', href: '/contact' }
];

// Analytics helper
type AnalyticsEvent = {
    event: string;
    data?: Record<string, unknown>;
};

export const track = (event: string, data?: Record<string, unknown>) => {
    // Log in development
    if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', event, data || '');
    }

    // Execute in production (or if snippets are active)
    if (typeof window !== 'undefined') {
        // Meta Pixel
        const win = window as any;
        if (win.fbq) {
            win.fbq('track', event, data);
        }

        // Google Analytics 4
        if (win.gtag) {
            win.gtag('event', event, data);
        }
    }
};
