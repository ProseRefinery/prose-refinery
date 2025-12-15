import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { BeamCard } from '@/components/effects/BeamCard';
import { GridGlowBackground } from '@/components/effects/GridGlowBackground';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

export default function NotFound() {
    return (
        <Section className="min-h-screen flex items-center justify-center pt-24 pb-24" noBorder>
            <GridGlowBackground>
                <div className="max-w-md w-full px-4 text-center relative z-10">
                    <BeamCard glowColor="rose">
                        <div className="p-12 bg-slate-900/80 rounded-lg border border-slate-800 backdrop-blur-sm">
                            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-500/20">
                                <FileQuestion className="w-8 h-8 text-rose-400" />
                            </div>

                            <Heading as="h1" variant="card" className="mb-4 text-2xl">
                                Lost in the Draft?
                            </Heading>

                            <p className="text-slate-400 mb-8">
                                The page you're looking for seems to have been edited out of existence.
                            </p>

                            <MagneticButton href="/" variant="primary" className="w-full justify-center">
                                <Home size={18} className="mr-2" />
                                Return Home
                            </MagneticButton>
                        </div>
                    </BeamCard>
                </div>
            </GridGlowBackground>
        </Section>
    );
}
