import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Editorial Services & Pricing",
    description: "From £95 introductory diagnostics to full manuscript partnerships. Transparent pricing for fantasy and sci-fi structural editing.",
    openGraph: {
        title: "Editorial Services & Pricing | Prose Refinery",
        description: "Compare our 4 tiers of editorial support. Expert feedback for every budget.",
    }
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
