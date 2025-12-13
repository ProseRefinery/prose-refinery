'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingSelectProps {
    name: string;
    label: string;
    value: string;
    onChange: (name: string, value: string) => void;
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
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label;

    const handleSelect = (newValue: string) => {
        onChange(name, newValue);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            {/* Trigger Area */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'relative w-full px-4 py-3.5 pt-5 pr-10',
                    'bg-slate-900/80',
                    'border rounded-md',
                    'text-white text-sm',
                    'shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]',
                    'transition-all duration-200 ease-out',
                    'cursor-pointer',
                    'group',
                    isOpen ? 'border-emerald-500/70' : 'hover:border-slate-600',
                    error
                        ? 'border-red-500/70'
                        : 'border-slate-700/50'
                )}
            >
                {/* Value Display */}
                <div className={cn(
                    "min-h-[1.25rem] flex items-center",
                    !selectedLabel && "opacity-0"
                )}>
                    {selectedLabel || "Select option"}
                </div>

                {/* Floating Label */}
                <label
                    className={cn(
                        'absolute left-4 transition-all duration-200 ease-out pointer-events-none',
                        (value || isOpen)
                            ? 'top-2 text-xs text-emerald-400'
                            : 'top-1/2 -translate-y-1/2 text-slate-500 text-sm'
                    )}
                >
                    {label}{required && <span className="text-emerald-400 ml-1">*</span>}
                </label>

                <ChevronDown className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 transition-transform duration-200",
                    isOpen && "rotate-180 text-emerald-400"
                )} />
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={cn(
                            "absolute z-50 w-full mt-2 left-0",
                            "bg-[#0a0f1c] border border-slate-700/50 rounded-md shadow-xl",
                            "overflow-hidden max-h-60 overflow-y-auto",
                            "backdrop-blur-xl ring-1 ring-black/5"
                        )}
                    >
                        <div className="py-1">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={cn(
                                        "w-full text-left px-4 py-3 text-sm flex items-center justify-between group transition-colors",
                                        value === option.value
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    )}
                                >
                                    <span>{option.label}</span>
                                    {value === option.value && (
                                        <Check className="w-4 h-4 text-emerald-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
