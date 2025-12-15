import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { COMPLAINT_PAGES } from '@/lib/complaint-pages';
import ComplaintLandingPage from './ComplaintLandingPage';

interface PageProps {
    params: Promise<{ complaint: string }>;
}

export async function generateStaticParams() {
    return Object.keys(COMPLAINT_PAGES).map((complaint) => ({
        complaint,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { complaint } = await params;
    const page = COMPLAINT_PAGES[complaint];

    if (!page) return {};

    return {
        title: page.headline,
        description: page.subhead,
        openGraph: {
            title: page.headline,
            description: page.subhead,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { complaint } = await params;
    const page = COMPLAINT_PAGES[complaint];

    if (!page) {
        notFound();
    }

    return <ComplaintLandingPage page={page} />;
}
