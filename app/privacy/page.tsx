import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { Reveal } from '@/components/effects/Reveal';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24 pb-24">
            <GridGlowBackground>
                <div className="mx-auto max-w-3xl px-6">
                    <Reveal>
                        <h1 className="text-4xl font-bold text-white mb-8 font-[family-name:var(--font-playfair)]">
                            Privacy Policy
                        </h1>
                        <p className="text-slate-400 mb-12 border-b border-slate-800 pb-8">
                            Last updated: December 2025
                        </p>

                        <div className="prose prose-invert prose-emerald max-w-none space-y-12">
                            <p>
                                Prose Refinery Ltd (Company No: 16476326) is the data controller for information collected through this website and our services.
                            </p>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                                <h3 className="text-xl font-semibold text-emerald-400 mb-2">Diagnostic Form</h3>
                                <p className="text-slate-300 mb-4">When you complete our structural diagnostic, we collect:</p>
                                <ul className="list-disc pl-6 text-slate-400 space-y-2 mb-6">
                                    <li>Email address</li>
                                    <li>Your responses to diagnostic questions</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-emerald-400 mb-2">Service Enquiries and Purchases</h3>
                                <p className="text-slate-300 mb-4">When you enquire about or purchase services, we collect:</p>
                                <ul className="list-disc pl-6 text-slate-400 space-y-2">
                                    <li>Name and email address</li>
                                    <li>Manuscript details (title, genre, word count)</li>
                                    <li>Manuscript files submitted for editorial work</li>
                                    <li>Payment information (processed by Stripe)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                                <ul className="list-disc pl-6 text-slate-400 space-y-2 mb-6">
                                    <li>Deliver diagnostic results to your email</li>
                                    <li>Respond to service enquiries</li>
                                    <li>Provide editorial services</li>
                                    <li>Communicate about your project</li>
                                    <li>Process payments</li>
                                </ul>
                                <p className="text-slate-300">
                                    We do not sell your information. We do not share your information with third parties except as necessary to provide our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">3. Manuscript Confidentiality</h2>
                                <p className="text-slate-300 mb-4">All manuscripts are treated as strictly confidential.</p>
                                <ul className="list-disc pl-6 text-slate-400 space-y-2">
                                    <li>Never shared with third parties</li>
                                    <li>Never used for marketing, training, or any other purpose</li>
                                    <li>Stored securely during active projects</li>
                                    <li>Permanently deleted within 30 days of project completion</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">4. Data Retention</h2>
                                <ul className="list-disc pl-6 text-slate-400 space-y-2">
                                    <li><span className="text-emerald-400">Diagnostic data:</span> 12 months</li>
                                    <li><span className="text-emerald-400">Project records:</span> 6 years (accounting)</li>
                                    <li><span className="text-emerald-400">Manuscripts:</span> Deleted within 30 days of completion</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights (UK GDPR)</h2>
                                <p className="text-slate-300 mb-4">
                                    You have the right to: access, correct, delete, object to processing, request portability, and withdraw consent.
                                </p>
                                <p className="text-slate-300">Contact: <a href="mailto:hello@proserefinery.com" className="text-emerald-400 hover:text-emerald-300">hello@proserefinery.com</a></p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
                                <p className="text-slate-300">
                                    We use industry-standard security measures. Payment processing is handled by Stripe (PCI-compliant).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">7. Cookies</h2>
                                <p className="text-slate-300">
                                    This website uses essential cookies only. No tracking cookies.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">8. Contact</h2>
                                <p className="text-slate-300 mb-2">Email: <a href="mailto:hello@proserefinery.com" className="text-emerald-400 hover:text-emerald-300">hello@proserefinery.com</a></p>
                                <p className="text-slate-300">Prose Refinery Ltd, Company No: 16476326, United Kingdom</p>
                            </section>
                        </div>
                    </Reveal>
                </div>
            </GridGlowBackground>
        </div>
    );
}
