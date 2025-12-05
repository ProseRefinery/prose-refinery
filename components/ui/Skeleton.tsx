import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'rect' | 'circle';
    width?: string;
    height?: string;
}

export function Skeleton({ className = '', variant = 'rect', width, height }: SkeletonProps) {
    const variantStyles = {
        text: 'h-4 rounded',
        rect: 'rounded-lg',
        circle: 'rounded-full'
    };

    return (
        <div
            className={cn('skeleton', variantStyles[variant], className)}
            style={{
                width,
                height,
                background: 'linear-gradient(90deg, rgba(30,41,59,0.5) 25%, rgba(51,65,85,0.5) 50%, rgba(30,41,59,0.5) 75%)',
                backgroundSize: '200% 100%',
                animation: 'skeleton-shimmer 1.5s ease-in-out infinite'
            }}
        />
    );
}
