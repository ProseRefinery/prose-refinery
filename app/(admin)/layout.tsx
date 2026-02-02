import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Only admins can access this area
  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-slate-950">
        <Sidebar role="admin" />

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
