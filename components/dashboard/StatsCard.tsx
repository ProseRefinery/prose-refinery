"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "emerald" | "purple" | "blue" | "yellow" | "red" | "cyan";
  className?: string;
}

const variantStyles = {
  default: {
    icon: "bg-slate-700/50 text-slate-300",
    gradient: "from-slate-500/10 to-transparent",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400",
    gradient: "from-emerald-500/10 to-transparent",
  },
  purple: {
    icon: "bg-purple-500/10 text-purple-400",
    gradient: "from-purple-500/10 to-transparent",
  },
  blue: {
    icon: "bg-blue-500/10 text-blue-400",
    gradient: "from-blue-500/10 to-transparent",
  },
  yellow: {
    icon: "bg-yellow-500/10 text-yellow-400",
    gradient: "from-yellow-500/10 to-transparent",
  },
  red: {
    icon: "bg-red-500/10 text-red-400",
    gradient: "from-red-500/10 to-transparent",
  },
  cyan: {
    icon: "bg-cyan-500/10 text-cyan-400",
    gradient: "from-cyan-500/10 to-transparent",
  },
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatsCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-5",
        "hover:border-slate-600/50 transition-all duration-200",
        className
      )}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50",
          styles.gradient
        )}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-400">{title}</span>
          <div className={cn("p-2 rounded-lg", styles.icon)}>
            <Icon className="h-4 w-4" />
          </div>
        </div>

        {/* Value */}
        <div className="flex items-end gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium mb-1",
                trend.isPositive ? "text-emerald-400" : "text-red-400"
              )}
            >
              {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// Mini stats for inline display
export interface MiniStatProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  className?: string;
}

export function MiniStat({ label, value, icon: Icon, className }: MiniStatProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Icon && <Icon className="h-4 w-4 text-slate-400" />}
      <span className="text-sm text-slate-400">{label}:</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}
