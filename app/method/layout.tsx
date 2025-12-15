import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "The 7 Pillars Methodology",
    description: "Our proprietary 'Narrative Integrity Engine' analyzes your world-building, character arcs, and plot logic. See how we diagnose structural issues.",
    openGraph: {
        title: "The 7 Pillars of Structural Excellence | Prose Refinery",
        description: "We don't just guess. We use a 7-point framework to stress-test your story architecture.",
    }
};

export default function MethodLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
