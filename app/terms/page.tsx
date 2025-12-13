import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { Reveal } from '@/components/effects/Reveal';

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-24 pb-24">
            <GridGlowBackground>
                <div className="mx-auto max-w-3xl px-6">
                    <Reveal>
                        <h1 className="text-4xl font-bold text-white mb-8 font-[family-name:var(--font-playfair)]">
                            Terms of Service
                        </h1>
                        <p className="text-slate-400 mb-12 border-b border-slate-800 pb-8">
                            Last updated: December 2024
                        </p>

                        <div className="prose prose-invert prose-emerald max-w-none space-y-12">
                            <p>
                                These terms govern your use of editorial services provided by Prose Refinery Ltd (Company No: 16476326).
                            </p>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">1. Services</h2>
                                <p className="text-slate-300">
                                    Prose Refinery provides structural editorial assessment and consultation services for authors of speculative fiction.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">2. Payment</h2>
                                <ul className="list-disc pl-6 text-slate-400 space-y-2">
                                    <li>Payment required before work begins</li>
                                    <li>All prices in GBP</li>
                                    <li>Processed via Stripe</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">3. Turnaround Times</h2>
                                <p className="text-slate-300">
                                    Turnaround times are estimates. We communicate any expected delays promptly.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">4. Cancellations and Refunds</h2>
                                <ul className="list-disc pl-6 text-slate-400 space-y-2">
                                    <li><span className="text-emerald-400">Within 24 hours (before work begins):</span> Full refund</li>
                                    <li><span className="text-emerald-400">After work begins:</span> No refund</li>
                                </ul>
                                <p className="text-slate-300 mt-4 italic">
                                    All diagnostic and editorial reports are reviewed against internal clarity and actionability standards. If your report does not clearly identify actionable next steps, request clarification within 7 days. We will revise the report at no charge. If the revised report still does not meet this standard, you will receive a full refund.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">5. Confidentiality</h2>
                                <p className="text-slate-300">
                                    All manuscripts and project details are strictly confidential.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                                <p className="text-slate-300">
                                    You retain full copyright. We claim no rights to your creative content.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                                <p className="text-slate-300">
                                    We provide editorial opinions. We do not guarantee publication or commercial success. Liability limited to fee paid.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
                                <p className="text-slate-300">
                                    Laws of England and Wales.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">9. Contact</h2>
                                <p className="text-slate-300">
                                    <a href="mailto:hello@proserefinery.com" className="text-emerald-400 hover:text-emerald-300">hello@proserefinery.com</a>
                                </p>
                            </section>
                        </div>
                    </Reveal>
                </div>
            </GridGlowBackground>
        </div>
    );
}
