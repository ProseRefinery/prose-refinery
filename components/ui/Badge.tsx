import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
        // Project status variants
        draft: "bg-slate-500/20 text-slate-400 border-slate-500/30",
        pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        paid: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        matching: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        assigned: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
        in_progress: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        review: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        completed: "bg-green-500/20 text-green-400 border-green-500/30",
        cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
        // Editor status variants
        approved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        rejected: "bg-red-500/20 text-red-400 border-red-500/30",
        suspended: "bg-red-500/20 text-red-400 border-red-500/30",
        // Color variants (for general use)
        emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        red: "bg-red-500/20 text-red-400 border-red-500/30",
        cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
        orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
