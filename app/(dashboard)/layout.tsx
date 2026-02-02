import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Redirect editors and admins to their respective dashboards
  if (session.user.role === "admin") {
    redirect("/admin");
  }
  if (session.user.role === "editor") {
    redirect("/editor");
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-slate-950">
        <Sidebar role="author" />

        {/* Main content */}
        <main className="lg:pl-64 pt-16 lg:pt-0 pb-16 lg:pb-0 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
        <Toaster position="top-right" richColors closeButton />
      </div>
    </SessionProvider>
  );
}
