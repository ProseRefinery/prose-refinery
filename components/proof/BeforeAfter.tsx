'use client';

import { SNIPPETS, Snippet } from '@/lib/snippets';
import { BeamCard } from '@/components/effects/BeamCard';
import { Reveal } from '@/components/effects/Reveal';

interface BeforeAfterSnippetProps {
    id: string;
    showTitle?: boolean;
}

export function BeforeAfterSnippet({ id, showTitle = true }: BeforeAfterSnippetProps) {
    const snippet = SNIPPETS[id];

    if (!snippet) {
        console.warn(`Snippet with id "${id}" not found`);
        return null;
    }

    return (
        <Reveal>
            <BeamCard glowColor="emerald">
                {showTitle && (
                    <div className="mb-6 pb-4 border-b border-slate-800">
                        <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium block mb-1">
                            {snippet.pillar}
                        </span>
                        <h4 className="text-lg font-semibold text-white">
                            {snippet.title}
                        </h4>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Before */}
                    <div className="space-y-2">
                        <span className="text-xs text-rose-400 uppercase tracking-wider font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-400/50" />
                            Before
                        </span>
                        <p className="font-mono text-sm text-slate-400 leading-relaxed bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            {snippet.before}
                        </p>
                    </div>

                    {/* After */}
                    <div className="space-y-2">
                        <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400/50" />
                            After
                        </span>
                        <p className="font-mono text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-lg border border-emerald-900/30">
                            {snippet.after}
                        </p>
                    </div>
                </div>

                {/* Changes explanation */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">
                        What changed structurally:
                    </p>
                    <ul className="space-y-2">
                        {snippet.changes.map((change, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                                <span className="text-emerald-400 mt-1">•</span>
                                {change}
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs text-slate-600 mt-4 italic">
                        {snippet.unchanged}
                    </p>
                </div>
            </BeamCard>
        </Reveal>
    );
}

// Gallery component for displaying multiple snippets
interface SnippetGalleryProps {
    pillar?: Snippet['pillar'];
    limit?: number;
}

export function SnippetGallery({ pillar, limit }: SnippetGalleryProps) {
    let snippets = Object.values(SNIPPETS);

    if (pillar) {
        snippets = snippets.filter(s => s.pillar === pillar);
    }

    if (limit) {
        snippets = snippets.slice(0, limit);
    }

    return (
        <div className="space-y-8">
            {snippets.map((snippet) => (
                <BeforeAfterSnippet key={snippet.id} id={snippet.id} />
            ))}
        </div>
    );
}
