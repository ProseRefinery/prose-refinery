// import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/effects/Reveal';

export default function CancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <Reveal>
                <div className="max-w-md w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-8 text-center backdrop-blur-sm">
                    <div className="flex justify-center mb-6">
                        <XCircle className="w-16 h-16 text-slate-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                        Payment Cancelled
                    </h1>
                    <p className="text-slate-400 mb-8">
                        Your payment was cancelled and no charges were made. If you experienced an issue, please try again or contact us.
                    </p>
                    <div className="flex flex-col gap-3">
                        <MagneticButton href="/services" variant="primary" className="w-full justify-center">
                            Return to Services
                        </MagneticButton>
                        <MagneticButton href="/contact" variant="ghost" className="w-full justify-center">
                            Contact Support
                        </MagneticButton>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
