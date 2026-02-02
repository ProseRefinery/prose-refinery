"use client"

import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error:
            "group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive",
          success:
            "group-[.toaster]:bg-emerald-500/10 group-[.toaster]:text-emerald-400 group-[.toaster]:border-emerald-500/30",
          warning:
            "group-[.toaster]:bg-yellow-500/10 group-[.toaster]:text-yellow-400 group-[.toaster]:border-yellow-500/30",
          info:
            "group-[.toaster]:bg-blue-500/10 group-[.toaster]:text-blue-400 group-[.toaster]:border-blue-500/30",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
