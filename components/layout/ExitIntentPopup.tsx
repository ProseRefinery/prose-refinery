'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ExitIntentPopup() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if already shown this session
        if (typeof window !== 'undefined' && sessionStorage.getItem('exitPopupShown')) return;

        const handleMouseLeave = (e: MouseEvent) => {
            // Trigger when mouse leaves the top of the viewport
            if (e.clientY <= 0) {
                setShow(true);
                sessionStorage.setItem('exitPopupShown', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, []);

    const handleSubmit = async () => {
        if (!email) return;
        setLoading(true);

        try {
            const res = await fetch('/api/exit-capture', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error('Failed to submit', error);
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 max-w-md w-full relative shadow-2xl shadow-emerald-900/20">
                <button
                    onClick={() => setShow(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {submitted ? (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📩</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 font-serif">Check Your Inbox!</h3>
                        <p className="text-slate-400">
                            Your guide <strong>"7 Structural Mistakes That Kill Fantasy Manuscripts"</strong> is on its way.
                        </p>
                        <button
                            onClick={() => setShow(false)}
                            className="mt-6 text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                        >
                            Close Window
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                Wait — Don't Leave Empty-Handed
                            </span>
                            <h3 className="text-2xl font-bold text-white mb-3 font-serif">
                                Is Your Manuscript Making These 7 Fatal Mistakes?
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Before you go, get our free guide on the structural cracks that make agents pass instantly.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-emerald-900/40 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Me The Free Guide'}
                            </button>
                        </div>

                        <p className="text-xs text-slate-600 mt-4 text-center">
                            No spam. Unsubscribe anytime. High-value structural advice only.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
