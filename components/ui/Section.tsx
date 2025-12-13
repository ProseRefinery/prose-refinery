import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    noBorder?: boolean;
    background?: 'default' | 'subtle' | 'none';
}

export function Section({ children, className, id, noBorder = false, background = 'default' }: SectionProps) {
    const backgrounds = {
        default: "",
        subtle: "bg-slate-900/20",
        none: ""
    };

    return (
        <section
            id={id}
            className={cn(
                "py-24",
                !noBorder && "border-t border-slate-800/50",
                backgrounds[background],
                className
            )}
        >
            {children}
        </section>
    );
}
