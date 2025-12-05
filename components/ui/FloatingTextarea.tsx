'use client';

import { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

interface FloatingTextareaProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    error?: boolean;
    required?: boolean;
}

export function FloatingTextarea({
    name,
    label,
    value,
    onChange,
    rows = 3,
    error,
    required
}: FloatingTextareaProps) {
    return (
        <div className="floating-label-input relative">
            <textarea
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder=" "
                rows={rows}
                className={cn(
                    'w-full px-4 py-3.5 pt-6',
                    'bg-slate-900/80',
                    'border rounded-md',
                    'text-white text-sm',
                    'shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]',
                    'transition-all duration-200 ease-out',
                    'focus:outline-none',
                    'resize-y min-h-[100px]',
                    'peer',
                    'hover:border-slate-600',
                    error
                        ? 'border-red-500/70 focus:border-red-500'
                        : 'border-slate-700/50 focus:border-emerald-500/70 focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_3px_rgba(16,185,129,0.15)]'
                )}
            />
            <label
                htmlFor={name}
                className={cn(
                    'absolute left-4 top-4',
                    'text-slate-500 text-sm',
                    'pointer-events-none',
                    'transition-all duration-200 ease-out',
                    'peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-emerald-400',
                    'peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs'
                )}
            >
                {label}{required && <span className="text-emerald-400 ml-1">*</span>}
            </label>
        </div>
    );
}
