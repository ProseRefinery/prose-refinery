'use client';

import { ArrowRight, ArrowLeft, FileText, AlertTriangle, Target, ListOrdered, CheckCircle2, Package, Clock, Printer } from 'lucide-react';
import Link from 'next/link';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { Reveal } from '@/components/effects/Reveal';
import { ClipReveal } from '@/components/effects/ClipReveal';
import { BeamCard } from '@/components/effects/BeamCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { HeroBadge } from '@/components/ui/HeroBadge';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { SampleReport } from '@/lib/sample-reports';

interface Props {
    report: SampleReport;
}

export default function SampleReportView({ report }: Props) {
    const riskColorClass = report.summary.riskLevel === 'High'
        ? 'text-rose-400'
        : report.summary.riskLevel === 'Moderate'
            ? 'text-amber-400'
            : 'text-emerald-400';

    const tierColor = report.tier === 1 ? 'emerald' : 'purple';
    const tierColorClass = tierColor === 'emerald' ? 'text-emerald-400' : 'text-purple-400';
    const tierBgClass = tierColor === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-purple-600 hover:bg-purple-500';

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    /* Hide navigation, footer, CTAs, backgrounds */
                    nav, footer, .print-hide, .sticky-cta, 
                    [class*="GridGlow"], [class*="BeamCard"]::before,
                    button:not(.print-show) {
                        display: none !important;
                    }
                    
                    /* Reset colors for print */
                    body {
                        background: white !important;
                        color: black !important;
                    }
                    
                    .print-container {
                        background: white !important;
                        color: black !important;
                    }
                    
                    .print-container * {
                        color: black !important;
                        border-color: #ccc !important;
                    }
                    
                    .print-container h1, .print-container h2, .print-container h3 {
                        color: black !important;
                    }
                    
                    .print-container .risk-high { color: #dc2626 !important; }
                    .print-container .risk-moderate { color: #d97706 !important; }
                    .print-container .risk-low { color: #059669 !important; }
                    
                    /* Page breaks */
                    .print-break-before { page-break-before: always; }
                    .print-break-after { page-break-after: always; }
                    
                    /* Ensure sections print cleanly */
                    section { 
                        padding: 1rem 0 !important; 
                        background: white !important;
                    }
                }
            `}</style>

            <div className="min-h-screen">
                {/* Sticky Mobile CTA */}
                <div className="sticky-cta fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-4">
                    <Link
                        href={report.tier === 1 ? '/services#tier1' : '/consultation'}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${tierBgClass} rounded-lg text-white font-medium`}
                    >
                        Get {report.tierName}
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Header with Top CTA */}
                <Section className="relative pt-24 pb-8" noBorder>
                    <GridGlowBackground>
                        <div className="mx-auto max-w-4xl px-4">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                <div className="flex-grow">
                                    <Reveal>
                                        <Link
                                            href="/sample-report"
                                            className="print-hide inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
                                        >
                                            <ArrowLeft size={16} /> Back to Sample Reports
                                        </Link>
                                    </Reveal>
                                    <Reveal delay={50}>
                                        <HeroBadge icon="file-text">{report.tierName}</HeroBadge>
                                    </Reveal>
                                    <ClipReveal delay={100}>
                                        <Heading as="h1" variant="hero" className="mb-4">
                                            {report.title}
                                        </Heading>
                                    </ClipReveal>
                                    <Reveal delay={200}>
                                        <p className="text-slate-400 text-sm max-w-2xl">
                                            {report.subtitle}
                                        </p>
                                    </Reveal>
                                </div>

                                {/* Top CTA - Desktop */}
                                <Reveal delay={200}>
                                    <div className="print-hide hidden md:flex flex-col items-end gap-3 shrink-0">
                                        <Link
                                            href={report.tier === 1 ? '/services#tier1' : '/consultation'}
                                            className={`flex items-center gap-2 px-6 py-3 ${tierBgClass} rounded-lg text-white font-medium transition-colors`}
                                        >
                                            Get {report.tierName}
                                            <ArrowRight size={18} />
                                        </Link>
                                        <button
                                            onClick={handlePrint}
                                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                                        >
                                            <Printer size={14} />
                                            Print this sample
                                        </button>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </GridGlowBackground>
                </Section>

                {/* What You Get Section */}
                <Section background="subtle" className="print-hide">
                    <div className="mx-auto max-w-4xl px-4">
                        <Reveal>
                            <BeamCard glowColor={tierColor}>
                                <div className="flex items-start gap-4 mb-6">
                                    <Package className={tierColorClass} size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            What You Get with {report.tierName}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <span className={tierColorClass}>{report.price}</span>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {report.turnaround}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {report.deliverables.map((item, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <CheckCircle2 size={16} className={`${tierColorClass} shrink-0 mt-0.5`} />
                                            <span className="text-sm text-slate-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-center">
                                    <Link
                                        href={report.tier === 1 ? '/services#tier1' : '/consultation'}
                                        className={`flex items-center gap-2 px-6 py-2 ${tierBgClass} rounded-lg text-white text-sm font-medium transition-colors`}
                                    >
                                        Get Started
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </BeamCard>
                        </Reveal>
                    </div>
                </Section>

                {/* Report Document */}
                <Section>
                    <div className="mx-auto max-w-4xl px-4">
                        <Reveal>
                            <div className="print-container bg-slate-900/80 rounded-xl border border-slate-700/50 overflow-hidden">
                                {/* Document Header */}
                                <div className="bg-slate-800/50 border-b border-slate-700/50 px-8 py-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="text-xs text-slate-500 uppercase tracking-wider">Prose Refinery</span>
                                            <h2 className="text-lg font-semibold text-white mt-1">{report.tierName}</h2>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-slate-500 uppercase tracking-wider block">{report.date}</span>
                                            <span className={`text-xs ${tierColorClass} mt-1 block`}>
                                                SAMPLE EXCERPT
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Section */}
                                <div className="px-8 py-8 border-b border-slate-700/50">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Target size={18} className={tierColorClass} />
                                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Summary</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Structural Risk Level</span>
                                                <span className={`text-lg font-bold ${riskColorClass} ${report.summary.riskLevel === 'High' ? 'risk-high' : report.summary.riskLevel === 'Moderate' ? 'risk-moderate' : 'risk-low'}`}>
                                                    {report.summary.riskLevel.toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Primary Failure Zone</span>
                                                <span className="text-lg font-bold text-white">{report.summary.failureZone}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Recommended Tier</span>
                                                <span className={`text-lg font-bold ${tierColorClass}`}>
                                                    {report.summary.recommendedTier}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-2">Revision Priority Order</span>
                                                <ol className="space-y-1">
                                                    {report.summary.revisionPriority.map((item, i) => (
                                                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                                            <span className="text-slate-500 font-mono text-xs mt-0.5">{i + 1}.</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Failure Zone Analysis */}
                                <div className="px-8 py-8 border-b border-slate-700/50">
                                    <div className="flex items-center gap-2 mb-6">
                                        <AlertTriangle size={18} className="text-amber-400" />
                                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Failure Zone Analysis</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {report.failureZoneAnalysis.map((paragraph, i) => (
                                            <p key={i} className="text-slate-300 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Steps */}
                                <div className="px-8 py-8 border-b border-slate-700/50 print-break-before">
                                    <div className="flex items-center gap-2 mb-6">
                                        <ListOrdered size={18} className="text-emerald-400" />
                                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Action Steps</h3>
                                    </div>
                                    <div className="space-y-8">
                                        {report.actionSteps.map((step, i) => (
                                            <div key={i} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-5 before:h-5 before:rounded-full before:bg-emerald-500/20 before:flex before:items-center before:justify-center">
                                                <span className="absolute left-1.5 top-2.5 text-xs text-emerald-400 font-bold">{i + 1}</span>
                                                <div className="space-y-3">
                                                    <div>
                                                        <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium block mb-1">What to change:</span>
                                                        <p className="text-white font-medium">{step.what}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs text-slate-500 uppercase tracking-wider font-medium block mb-1">Why it matters:</span>
                                                        <p className="text-slate-400 text-sm">{step.why}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs text-slate-500 uppercase tracking-wider font-medium block mb-1">Success looks like:</span>
                                                        <p className="text-slate-400 text-sm">{step.success}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-8 py-6 bg-slate-800/30">
                                    <div className="flex items-start gap-3">
                                        <FileText size={16} className="text-slate-500 shrink-0 mt-0.5" />
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            {report.footer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </Section>

                {/* Bottom CTA */}
                <Section background="subtle" className="print-hide">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <ClipReveal>
                            <Heading variant="section" className="mb-4">
                                Ready to Get Your Own Diagnosis?
                            </Heading>
                        </ClipReveal>
                        <Reveal delay={100}>
                            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                                Start with the free diagnostic quiz to identify your failure zone, or proceed directly to {report.tierName}.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <MagneticButton
                                    href={report.tier === 1 ? '/services#tier1' : '/consultation'}
                                    variant="primary"
                                    className="px-8 py-4"
                                >
                                    Get {report.tierName}
                                    <ArrowRight size={18} />
                                </MagneticButton>
                                <MagneticButton href="/diagnostic" variant="secondary" className="px-6 py-3">
                                    Take Free Diagnostic First
                                </MagneticButton>
                            </div>
                        </Reveal>
                    </div>
                </Section>

                {/* Spacer for mobile sticky CTA */}
                <div className="h-20 md:hidden print-hide" />
            </div>
        </>
    );
}
