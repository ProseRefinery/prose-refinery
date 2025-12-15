import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'emerald' | 'blue' | 'red' | 'purple';
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: "bg-slate-800 border border-slate-700 text-slate-300",
        emerald: "bg-emerald-500/20 text-emerald-400",
        blue: "bg-blue-500/20 text-blue-400",
        red: "bg-red-500/20 text-red-400",
        purple: "bg-purple-500/20 text-purple-400"
    };

    return (
        <span className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-medium cursor-default",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
