import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Craft & Critique | Expert Advice for Fantasy Authors",
    description: "Structural editing guides, industry insights, and craft essays for speculative fiction writers. Learn why agents reject fantasy and how to fix it.",
    openGraph: {
        title: "Prose Refinery Resources | The Editor's Desk",
        description: "Deep dives into story architecture and the mechanics of speculative fiction.",
    }
};

export default function ResourcesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
