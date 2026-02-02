"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { TiltCard } from "@/components/effects/TiltCard"
import { BeamCard } from "@/components/effects/BeamCard"

// ====================
// shadcn Card Components (for dashboard use)
// ====================

function BaseCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

// ====================
// Marketing Card Component (with TiltCard/BeamCard variants)
// ====================

interface MarketingCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "tilt" | "beam"
  bgClass?: string
  contentClassName?: string
  glowColor?: "emerald" | "purple" | "blue" | "rose" | "amber" | "red"
  maxTilt?: number
}

/**
 * Marketing Card - Polymorphic card component for marketing pages
 * - variant="default": Static card with border
 * - variant="tilt": 3D tilt effect on hover (TiltCard)
 * - variant="beam": Scanning light border effect (BeamCard)
 */
function Card({
  children,
  className,
  variant = "default",
  bgClass = "bg-slate-900/50",
  contentClassName,
  glowColor = "emerald",
  maxTilt = 8,
}: MarketingCardProps) {
  const baseClasses = cn(
    "rounded-md border border-slate-700/50 p-6",
    bgClass,
    contentClassName,
    className
  )

  if (variant === "tilt") {
    return (
      <TiltCard className={className} maxTilt={maxTilt}>
        <div className={cn("rounded-md border border-slate-700/50 p-6 h-full", bgClass, contentClassName)}>
          {children}
        </div>
      </TiltCard>
    )
  }

  if (variant === "beam") {
    return (
      <BeamCard className={className} glowColor={glowColor}>
        <div className={cn("rounded-md p-6 h-full", bgClass, contentClassName)}>
          {children}
        </div>
      </BeamCard>
    )
  }

  // Default static card
  return (
    <div className={baseClasses}>
      {children}
    </div>
  )
}

export {
  // Marketing Card (default export for pages)
  Card,
  // shadcn Card Components (for dashboard)
  BaseCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
