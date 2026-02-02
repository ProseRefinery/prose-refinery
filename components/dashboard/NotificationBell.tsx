"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Check,
  CheckCheck,
  Loader2,
  FileText,
  MessageSquare,
  CreditCard,
  UserCheck,
  UserX,
  Briefcase,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { formatRelativeTime, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  metadata?: {
    referenceNumber?: string;
    serviceType?: string;
  };
}

const getNotificationIcon = (type: string) => {
  const iconMap: Record<string, { icon: React.ElementType; color: string }> = {
    project_submitted: { icon: FileText, color: "text-blue-400" },
    project_paid: { icon: CreditCard, color: "text-emerald-400" },
    project_assigned: { icon: Briefcase, color: "text-cyan-400" },
    project_completed: { icon: CheckCircle2, color: "text-emerald-400" },
    project_cancelled: { icon: XCircle, color: "text-red-400" },
    document_request: { icon: FileText, color: "text-yellow-400" },
    document_uploaded: { icon: FileText, color: "text-blue-400" },
    new_bid: { icon: Briefcase, color: "text-purple-400" },
    bid_accepted: { icon: CheckCircle2, color: "text-emerald-400" },
    bid_rejected: { icon: XCircle, color: "text-red-400" },
    job_available: { icon: Briefcase, color: "text-emerald-400" },
    editor_approved: { icon: UserCheck, color: "text-emerald-400" },
    editor_rejected: { icon: UserX, color: "text-red-400" },
    new_message: { icon: MessageSquare, color: "text-blue-400" },
    payment_received: { icon: CreditCard, color: "text-emerald-400" },
  };

  const config = iconMap[type] || { icon: AlertCircle, color: "text-slate-400" };
  const Icon = config.icon;
  return <Icon className={cn("h-4 w-4", config.color)} />;
};

export function NotificationBell() {
  const { data: session, status: authStatus } = useSession();
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkingRead, setIsMarkingRead] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine base path based on user role
  const getNotificationsUrl = () => {
    if (pathname?.startsWith("/admin")) return "/admin/notifications";
    if (pathname?.startsWith("/editor")) return "/editor/notifications";
    return "/dashboard/notifications";
  };

  const fetchNotifications = useCallback(async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/notifications?limit=10");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  const markAllAsRead = async () => {
    if (unreadCount === 0) return;

    setIsMarkingRead(true);
    try {
      const response = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAllRead: true }),
      });

      if (response.ok) {
        setUnreadCount(0);
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      }
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    } finally {
      setIsMarkingRead(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationIds: [notificationId] }),
      });

      if (response.ok) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? { ...n, read: true } : n
          )
        );
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notifications on mount and periodically
  useEffect(() => {
    if (authStatus === "authenticated") {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [authStatus, fetchNotifications]);

  if (authStatus !== "authenticated") {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchNotifications();
        }}
        className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between bg-slate-800/80">
            <h3 className="font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                disabled={isMarkingRead}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 disabled:opacity-50"
              >
                {isMarkingRead ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <CheckCheck className="h-3 w-3" />
                )}
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="py-8 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-slate-400" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-700/50">
                {notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={cn(
                      "relative",
                      !notification.read && "bg-emerald-500/5"
                    )}
                  >
                    {notification.link ? (
                      <Link
                        href={notification.link}
                        onClick={() => {
                          if (!notification.read) {
                            markAsRead(notification._id);
                          }
                          setIsOpen(false);
                        }}
                        className="block px-4 py-3 hover:bg-slate-700/30 transition-colors"
                      >
                        <NotificationContent notification={notification} />
                      </Link>
                    ) : (
                      <div className="px-4 py-3">
                        <NotificationContent notification={notification} />
                      </div>
                    )}
                    {!notification.read && (
                      <div className="absolute top-3 right-3 h-2 w-2 bg-emerald-500 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-slate-700 text-center bg-slate-800/80">
              <Link
                href={getNotificationsUrl()}
                onClick={() => setIsOpen(false)}
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationContent({ notification }: { notification: Notification }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 mt-0.5">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{notification.title}</p>
        <p className="text-sm text-slate-400 line-clamp-2">{notification.message}</p>
        <p className="text-xs text-slate-500 mt-1">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>
    </div>
  );
}
