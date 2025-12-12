import { Check } from 'lucide-react';

export interface ComparisonRow {
    feature: string;
    tier1: React.ReactNode;
    tier2: React.ReactNode;
    tier3: React.ReactNode;
    tier4: React.ReactNode;
}

export const COMPARISON_DATA: ComparisonRow[] = [
    {
        feature: 'Price',
        tier1: <span className="text-emerald-400">£95–£175</span>,
        tier2: <span className="text-emerald-400">£250–£750</span>,
        tier3: <span className="text-emerald-400">£1,500–£4,500</span>,
        tier4: <span className="text-purple-400">£5,000–£12,000</span>,
    },
    {
        feature: 'Coverage',
        tier1: <span className="text-slate-400">1,000–5,000 words</span>,
        tier2: <span className="text-slate-400">Up to 30,000 words</span>,
        tier3: <span className="text-slate-400">Full manuscript</span>,
        tier4: <span className="text-slate-400">Full + extras</span>,
    },
    {
        feature: 'Turnaround',
        tier1: <span className="text-slate-400">48 hours</span>,
        tier2: <span className="text-slate-400">7 days</span>,
        tier3: <span className="text-slate-400">3–4 weeks</span>,
        tier4: <span className="text-slate-400">8–12 weeks</span>,
    },
    {
        feature: 'Structural Analysis',
        tier1: <span className="text-slate-500">○ Basic</span>,
        tier2: <span className="text-yellow-400">◐ Partial</span>,
        tier3: <Check className="w-5 h-5 text-emerald-400 mx-auto" />,
        tier4: <Check className="w-5 h-5 text-emerald-400 mx-auto" />,
    },
    {
        feature: 'Editorial Letter',
        tier1: <span className="text-slate-600">—</span>,
        tier2: <Check className="w-5 h-5 text-emerald-400 mx-auto" />,
        tier3: <Check className="w-5 h-5 text-emerald-400 mx-auto" />,
        tier4: <Check className="w-5 h-5 text-emerald-400 mx-auto" />,
    },
    {
        feature: 'Chapter-by-Chapter Notes',
        tier1: <span className="text-slate-600">—</span>,
        tier2: <span className="text-slate-600">—</span>,
        tier3: <Check className="w-5 h-5 text-emerald-400 mx-auto" />,
        tier4: <Check className="w-5 h-5 text-emerald-400 mx-auto" />,
    },
    {
        feature: 'Multiple Draft Passes',
        tier1: <span className="text-slate-600">—</span>,
        tier2: <span className="text-slate-600">—</span>,
        tier3: <span className="text-slate-600">—</span>,
        tier4: <Check className="w-5 h-5 text-emerald-400 mx-auto" />,
    },
];
