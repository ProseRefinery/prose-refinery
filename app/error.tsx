'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { BeamCard } from '@/components/effects/BeamCard';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Section className="min-h-screen flex items-center justify-center pt-24 pb-24" noBorder>
            <GridGlowBackground>
                <div className="max-w-md w-full px-4 text-center relative z-10">
                    <BeamCard glowColor="amber">
                        <div className="p-12 bg-slate-900/80 rounded-lg border border-slate-800 backdrop-blur-sm">
                            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
                                <AlertTriangle className="w-8 h-8 text-amber-400" />
                            </div>

                            <Heading as="h1" variant="card" className="mb-4 text-2xl">
                                System Malfunction
                            </Heading>

                            <p className="text-slate-400 mb-8">
                                Something went wrong on our end. The narrative flow has been interrupted.
                            </p>

                            <div className="space-y-4">
                                <MagneticButton
                                    onClick={() => reset()}
                                    variant="primary"
                                    className="w-full justify-center"
                                >
                                    <RefreshCw size={18} className="mr-2" />
                                    Try Again
                                </MagneticButton>

                                <a href="/" className="block text-sm text-slate-500 hover:text-white transition-colors">
                                    Return to Home
                                </a>
                            </div>
                        </div>
                    </BeamCard>
                </div>
            </GridGlowBackground>
        </Section>
    );
}
