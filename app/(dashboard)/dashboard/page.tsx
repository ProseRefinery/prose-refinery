import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  FolderOpen,
  FileText,
  Clock,
  CheckCircle2,
  Plus,
  ArrowRight,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { formatDate, getServiceTypeLabel, formatWordCount } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";

async function getAuthorStats(authorId: string) {
  await connectDB();

  const [total, inProgress, completed, drafts] = await Promise.all([
    Project.countDocuments({ authorId }),
    Project.countDocuments({ authorId, status: { $in: ["assigned", "in_progress", "review"] } }),
    Project.countDocuments({ authorId, status: "completed" }),
    Project.countDocuments({ authorId, status: "draft" }),
  ]);

  return { total, inProgress, completed, drafts };
}

async function getRecentProjects(authorId: string) {
  await connectDB();

  return Project.find({ authorId })
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean();
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-800 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-slate-800 rounded-xl animate-pulse" />
    </div>
  );
}

async function DashboardContent() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [stats, recentProjects] = await Promise.all([
    getAuthorStats(session.user.id),
    getRecentProjects(session.user.id),
  ]);

  const hasProjects = stats.total > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {session.user.name?.split(" ")[0]}
          </h1>
          <p className="text-slate-400 mt-1">
            {hasProjects
              ? "Here's an overview of your manuscripts"
              : "Get started by submitting your first manuscript"}
          </p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Projects"
          value={stats.total}
          icon={FolderOpen}
          variant="default"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          variant="blue"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          variant="emerald"
        />
        <StatsCard
          title="Drafts"
          value={stats.drafts}
          icon={FileText}
          variant="yellow"
        />
      </div>

      {/* Main content */}
      {hasProjects ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <Card className="lg:col-span-2 py-0">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Projects</CardTitle>
                <Link
                  href="/dashboard/projects"
                  className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-slate-700/50">
                {recentProjects.map((project: any) => (
                  <Link
                    key={project._id.toString()}
                    href={`/dashboard/projects/${project._id}`}
                    className="flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">
                          {project.title}
                        </p>
                        <p className="text-sm text-slate-400">
                          {getServiceTypeLabel(project.serviceType)} • {formatWordCount(project.wordCount)} words
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge variant={project.status as any}>
                        {project.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/projects/new" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4" />
                  Submit New Manuscript
                </Button>
              </Link>
              <Link href="/dashboard/messages" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4" />
                  View Messages
                </Button>
              </Link>
              <Link href="/diagnostic" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4" />
                  Take Diagnostic Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Empty State */
        <Card className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Ready to refine your prose?
            </h2>
            <p className="text-slate-400 mb-6">
              Submit your manuscript for expert structural editing. Our editors specialize
              in speculative fiction and will help elevate your story.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard/projects/new">
                <Button>
                  <Plus className="h-4 w-4" />
                  Submit Manuscript
                </Button>
              </Link>
              <Link href="/diagnostic">
                <Button variant="secondary">
                  Not sure? Take the Diagnostic
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default function AuthorDashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
