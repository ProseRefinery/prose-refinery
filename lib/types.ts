import { LucideIcon } from "lucide-react";
import { ChangeEvent, ReactNode } from "react";

export type PageId = 'home' | 'method' | 'services' | 'resources' | 'about' | 'diagnostic' | 'contact';

export interface Tier {
    id: number;
    name: string;
    price: string;
    turnaround: string;
    description: string;
    includes: string[];
    recommended?: boolean;
    pricingContext?: string;
}

export interface Pillar {
    id: number;
    name: string;
    icon: LucideIcon;
    short: string;
}

export interface QuestionOption {
    value: number;
    label: string;
}

export interface Question {
    id: string;
    question: string;
    options: QuestionOption[];
}

export interface DiagnosticAnswers {
    stage?: number;
    wordcount?: number;
    complexity?: number;
    concern?: number;
    feedback?: number;
    goal?: number;
    timeline?: number;
    investment?: number;
}

export interface DiagnosticResult {
    tier: number;
    name: string;
    price: string;
    turnaround: string;
    icon: LucideIcon;
    color: 'emerald' | 'slate';
    reasoning: string[];
    whatYouGet: string[];
    nextSteps: string[];
    secondaryNote?: string | null;
    note?: string;
    badge?: string;
    checkoutUrl?: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    tier: string;
    title: string;
    genre: string;
    wordcount: string;
    pitch: string;
    concern: string;
    prev: string;
}

export interface FormErrors {
    [key: string]: boolean;
}

// Component Props
export interface RevealProps {
    children: ReactNode;
    delay?: number;
}

export interface CountUpProps {
    end: number;
    suffix?: string;
}

export interface AccordionProps {
    title: string;
    children: ReactNode;
    icon?: LucideIcon;
}

export interface HeroBadgeProps {
    children: ReactNode;
}

export interface TiltCardProps {
    children: ReactNode;
    className?: string;
}

export interface MagneticButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'ghost';
    href?: string;
    disabled?: boolean;
}

export interface BeamCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: 'emerald' | 'purple' | 'blue';
}

export interface ClipRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export interface FloatingInputProps {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'number' | 'tel';
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    required?: boolean;
    disabled?: boolean;
}

export interface FloatingTextareaProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    error?: boolean;
    required?: boolean;
}

export interface FloatingSelectProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    error?: boolean;
    required?: boolean;
}

export interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'rect' | 'circle';
    width?: string;
    height?: string;
}

export interface LoadingButtonProps {
    children: ReactNode;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

export interface PageTransitionProps {
    children: ReactNode;
    pageKey: string;
}

export interface NavItem {
    id: PageId;
    label: string;
    href: string;
}
