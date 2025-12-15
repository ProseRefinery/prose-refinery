// import Link removed (unused)
import { CheckCircle } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/effects/Reveal';

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <Reveal>
                <div className="max-w-md w-full bg-slate-900/50 border border-emerald-500/30 rounded-lg p-8 text-center backdrop-blur-sm">
                    <div className="flex justify-center mb-6">
                        <CheckCircle className="w-16 h-16 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                        Payment Successful!
                    </h1>
                    <p className="text-slate-400 mb-8">
                        Thank you for your purchase. We&apos;ve received your order and will be in touch shortly with next steps.
                    </p>
                    <MagneticButton href="/" variant="primary" className="w-full justify-center">
                        Return Home
                    </MagneticButton>
                </div>
            </Reveal>
        </div>
    );
}
