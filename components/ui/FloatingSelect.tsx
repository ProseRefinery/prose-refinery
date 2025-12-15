'use client';

import { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface FloatingSelectProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    error?: boolean;
    required?: boolean;
}

export function FloatingSelect({
    name,
    label,
    value,
    onChange,
    options,
    error,
    required
}: FloatingSelectProps) {
    return (
        <div className="floating-label-input relative">
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className={cn(
                    'w-full px-4 py-3.5 pt-5 pr-10',
                    'bg-slate-900/80',
                    'border rounded-md',
                    'text-white text-sm',
                    'shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]',
                    'transition-all duration-200 ease-out',
                    'focus:outline-none',
                    'appearance-none',
                    'peer',
                    'hover:border-slate-600',
                    'cursor-pointer',
                    error
                        ? 'border-red-500/70 focus:border-red-500'
                        : 'border-slate-700/50 focus:border-emerald-500/70 focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_3px_rgba(16,185,129,0.15)]'
                )}
            >
                <option value="" disabled></option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value} className="bg-slate-900">
                        {opt.label}
                    </option>
                ))}
            </select>
            <label
                htmlFor={name}
                className={cn(
                    'absolute left-4 top-1/2 -translate-y-1/2',
                    'text-slate-500 text-sm',
                    'pointer-events-none',
                    'transition-all duration-200 ease-out',
                    'peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-400',
                    value && 'top-2 text-xs text-emerald-400'
                )}
            >
                {label}{required && <span className="text-emerald-400 ml-1">*</span>}
            </label>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
        </div>
    );
}
