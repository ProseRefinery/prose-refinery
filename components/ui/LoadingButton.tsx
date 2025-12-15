'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps {
    children: ReactNode;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

export function LoadingButton({
    children,
    loading = false,
    onClick,
    className = '',
    type = 'button',
    variant = 'primary',
    disabled = false
}: LoadingButtonProps) {
    const baseStyles = variant === 'primary'
        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)]'
        : 'border border-slate-600/50 bg-slate-800/30 text-slate-300';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading || disabled}
            className={cn(
                'relative px-6 py-3 rounded-md font-semibold',
                'transition-all duration-200 ease-out',
                'disabled:opacity-70 disabled:cursor-not-allowed',
                baseStyles,
                className
            )}
        >
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
            )}
            <span className={loading ? 'opacity-0' : 'opacity-100'}>{children}</span>
        </button>
    );
}
