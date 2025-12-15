import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Prose Refinery',
        short_name: 'Prose Refinery',
        description: 'Structural editing for speculative fiction. We fix the cracks that make agents pass.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        icons: [
            {
                src: '/icon',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
