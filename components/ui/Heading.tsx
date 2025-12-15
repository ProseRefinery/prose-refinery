import { cn } from "@/lib/utils";

interface HeadingProps {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
    variant?: 'hero' | 'section' | 'card' | 'subsection';
    className?: string;
}

export function Heading({ children, as: Component = 'h2', variant = 'section', className }: HeadingProps) {
    const variants = {
        hero: "text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-playfair)] leading-tight break-words hyphens-auto",
        section: "text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-playfair)] break-words hyphens-auto",
        card: "text-2xl font-bold text-white font-[family-name:var(--font-playfair)] break-words",
        subsection: "text-xl font-bold text-white font-[family-name:var(--font-playfair)] break-words"
    };

    return (
        <Component className={cn(variants[variant], className)}>
            {children}
        </Component>
    );
}
