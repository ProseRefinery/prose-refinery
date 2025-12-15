import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SAMPLE_REPORTS } from '@/lib/sample-reports';
import SampleReportView from './SampleReportView';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return Object.keys(SAMPLE_REPORTS).map((id) => ({
        id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const report = SAMPLE_REPORTS[id];

    if (!report) return {};

    return {
        title: `Sample ${report.tierName} Report | Prose Refinery`,
        description: report.subtitle,
        openGraph: {
            title: `Sample ${report.tierName} Report`,
            description: report.subtitle,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const report = SAMPLE_REPORTS[id];

    if (!report) {
        notFound();
    }

    return <SampleReportView report={report} />;
}
