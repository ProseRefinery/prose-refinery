import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Only editors can access this area
  if (session.user.role !== "editor") {
    if (session.user.role === "admin") {
      redirect("/admin");
    }
    redirect("/dashboard");
  }

  // Check if editor is approved
  if (session.user.editorStatus !== "approved") {
    redirect("/editor/pending");
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-slate-950">
        <Sidebar role="editor" />

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
