"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Briefcase,
  FileText,
  BarChart3,
  UserPlus,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  children?: { label: string; href: string }[];
}

// Navigation items for each role
const authorNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Projects", href: "/dashboard/projects", icon: FolderOpen },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const editorNav: NavItem[] = [
  { label: "Dashboard", href: "/editor", icon: LayoutDashboard },
  { label: "Available Jobs", href: "/editor/jobs", icon: Briefcase },
  { label: "My Assignments", href: "/editor/assignments", icon: FolderOpen },
  { label: "Messages", href: "/editor/messages", icon: MessageSquare },
  { label: "Earnings", href: "/editor/earnings", icon: BarChart3 },
  { label: "Settings", href: "/editor/settings", icon: Settings },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderOpen,
    children: [
      { label: "All Projects", href: "/admin/projects" },
      { label: "Needs Matching", href: "/admin/projects?status=matching" },
      { label: "In Progress", href: "/admin/projects?status=in_progress" },
    ],
  },
  { label: "Users", href: "/admin/users", icon: Users },
  {
    label: "Editors",
    href: "/admin/editors",
    icon: UserPlus,
    children: [
      { label: "All Editors", href: "/admin/editors" },
      { label: "Applications", href: "/admin/editors/applications" },
    ],
  },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Reports", href: "/admin/reports", icon: FileText },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface SidebarProps {
  role: "author" | "editor" | "admin";
  unreadMessages?: number;
  unreadNotifications?: number;
}

export function Sidebar({
  role,
  unreadMessages = 0,
  unreadNotifications = 0,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navItems =
    role === "admin" ? adminNav : role === "editor" ? editorNav : authorNav;

  // Add badges to nav items
  const navItemsWithBadges = navItems.map((item) => ({
    ...item,
    badge: item.label === "Messages" ? unreadMessages : undefined,
  }));

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === "/editor" || href === "/admin") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const NavContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-border",
          collapsed && "justify-center px-2"
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-8 w-8 flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Prose Refinery"
              fill
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <span className="font-semibold text-foreground text-lg">
              Prose Refinery
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-1">
            {navItemsWithBadges.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  // Parent item with children
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => toggleExpanded(item.label)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                            isActive(item.href)
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                            collapsed && "justify-center px-2"
                          )}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {!collapsed && (
                            <>
                              <span className="flex-1 text-left">
                                {item.label}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-200",
                                  expandedItems.includes(item.label) &&
                                    "rotate-180"
                                )}
                              />
                            </>
                          )}
                        </button>
                      </TooltipTrigger>
                      {collapsed && (
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                    {!collapsed && expandedItems.includes(item.label) && (
                      <ul className="mt-1 ml-4 pl-4 border-l border-border space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                pathname === child.href
                                  ? "text-primary bg-primary/5"
                                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Regular nav item
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                          isActive(item.href)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1">{item.label}</span>
                            {item.badge !== undefined && item.badge > 0 && (
                              <Badge
                                variant="default"
                                className="bg-primary text-primary-foreground text-xs"
                              >
                                {item.badge > 99 ? "99+" : item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    )}
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>

      {/* User section */}
      <div className="border-t border-border p-4">
        {session?.user && (
          <div
            className={cn(
              "flex items-center gap-3",
              collapsed && "justify-center"
            )}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={session.user.image || undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {getInitials(session.user.name || "User")}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {session.user.name}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {role}
                </p>
              </div>
            )}
            {!collapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Collapse button (desktop only) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex items-center justify-center py-3 border-t border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
      >
        <Menu
          className={cn(
            "h-5 w-5 transition-transform",
            isCollapsed && "rotate-180"
          )}
        />
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src="/logo.svg"
              alt="Prose Refinery"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-foreground">Prose Refinery</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={
              role === "admin"
                ? "/admin/notifications"
                : role === "editor"
                ? "/editor/notifications"
                : "/dashboard/notifications"
            }
            className="relative p-2 text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
          </Link>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {isMobileOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-card">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed top-0 left-0 bottom-0 bg-card border-r border-border z-30 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <NavContent collapsed={isCollapsed} />
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-40 flex items-center justify-around px-2 pb-safe">
        {navItemsWithBadges.slice(0, 4).map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
              isActive(item.href) ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className="relative">
              <item.icon className="h-5 w-5" />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full" />
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
