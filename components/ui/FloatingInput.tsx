'use client';

import { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

interface FloatingInputProps {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'number' | 'tel';
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    required?: boolean;
    disabled?: boolean;
    inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
}

export function FloatingInput({
    name,
    label,
    type = 'text',
    value,
    onChange,
    error,
    required,
    disabled = false,
    inputMode,
    enterKeyHint
}: FloatingInputProps) {
    return (
        <div className="floating-label-input relative">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder=" "
                disabled={disabled}
                inputMode={inputMode}
                enterKeyHint={enterKeyHint}
                className={cn(
                    'w-full px-4 py-3.5 pt-5',
                    'bg-slate-900/80',
                    'border rounded-md',
                    'text-base md:text-sm', // 16px on mobile to prevent zoom
                    'text-white',
                    'shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]',
                    'transition-all duration-200 ease-out',
                    'focus:outline-none',
                    'peer',
                    'hover:border-slate-600',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    error
                        ? 'border-red-500/70 focus:border-red-500 focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_3px_rgba(239,68,68,0.15)]'
                        : 'border-slate-700/50 focus:border-emerald-500/70 focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_3px_rgba(16,185,129,0.15),0_0_20px_rgba(16,185,129,0.1)]'
                )}
            />
            <label
                htmlFor={name}
                className={cn(
                    'absolute left-4 top-1/2 -translate-y-1/2',
                    'text-slate-500 text-sm',
                    'pointer-events-none',
                    'transition-all duration-200 ease-out',
                    'peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-400',
                    'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs',
                    error && 'peer-focus:text-red-400'
                )}
            >
                {label}{required && <span className="text-emerald-400 ml-1">*</span>}
            </label>
        </div>
    );
}
