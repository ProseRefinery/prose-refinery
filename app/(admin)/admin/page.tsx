import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  FolderOpen,
  Users,
  UserPlus,
  PoundSterling,
  Clock,
  AlertCircle,
  ArrowRight,
  BookOpen,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { formatCurrency, formatRelativeTime, getServiceTypeLabel, getInitials } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";
import User from "@/lib/db/models/User";

async function getAdminStats() {
  await connectDB();

  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalProjects,
    activeProjects,
    needsMatching,
    totalAuthors,
    totalEditors,
    pendingEditors,
    monthlyRevenue,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ status: { $in: ["assigned", "in_progress", "review"] } }),
    Project.countDocuments({ status: "matching" }),
    User.countDocuments({ role: "author" }),
    User.countDocuments({ role: "editor", editorStatus: "approved" }),
    User.countDocuments({ role: "editor", editorStatus: "pending" }),
    Project.aggregate([
      { $match: { status: { $in: ["paid", "assigned", "in_progress", "review", "completed"] }, createdAt: { $gte: thisMonth } } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]).then((res) => res[0]?.total || 0),
  ]);

  return {
    totalProjects,
    activeProjects,
    needsMatching,
    totalAuthors,
    totalEditors,
    pendingEditors,
    monthlyRevenue,
  };
}

async function getRecentProjects() {
  await connectDB();

  return Project.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("authorId", "name email")
    .populate("editorId", "name")
    .lean();
}

async function getNeedsAttention() {
  await connectDB();

  const [matchingProjects, pendingEditors] = await Promise.all([
    Project.find({ status: "matching" })
      .sort({ createdAt: 1 })
      .limit(3)
      .populate("authorId", "name")
      .lean(),
    User.find({ role: "editor", editorStatus: "pending" })
      .sort({ createdAt: 1 })
      .limit(3)
      .lean(),
  ]);

  return { matchingProjects, pendingEditors };
}

function AdminDashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-800 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-96 bg-slate-800 rounded-xl animate-pulse" />
        <div className="h-96 bg-slate-800 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

async function AdminDashboardContent() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") {
    redirect("/login");
  }

  const [stats, recentProjects, attention] = await Promise.all([
    getAdminStats(),
    getRecentProjects(),
    getNeedsAttention(),
  ]);

  const totalAttention = stats.needsMatching + stats.pendingEditors;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Admin Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Platform overview and management
          </p>
        </div>
        {totalAttention > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-yellow-400">
              {totalAttention} item{totalAttention !== 1 ? "s" : ""} need attention
            </span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Monthly Revenue"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={PoundSterling}
          variant="emerald"
        />
        <StatsCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={FolderOpen}
          variant="blue"
        />
        <StatsCard
          title="Total Authors"
          value={stats.totalAuthors}
          icon={Users}
          variant="purple"
        />
        <StatsCard
          title="Active Editors"
          value={stats.totalEditors}
          icon={UserPlus}
          variant="cyan"
          subtitle={stats.pendingEditors > 0 ? `${stats.pendingEditors} pending` : undefined}
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <Card className="lg:col-span-2 py-0">
          <CardHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Link
                href="/admin/projects"
                className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-700/50">
              {recentProjects.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  No projects yet
                </div>
              ) : (
                recentProjects.map((project: any) => (
                  <Link
                    key={project._id.toString()}
                    href={`/admin/projects/${project._id}`}
                    className="flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">
                          {project.title}
                        </p>
                        <p className="text-sm text-slate-400">
                          {project.authorId?.name || "Unknown"} • {getServiceTypeLabel(project.serviceType)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-sm text-slate-400 hidden sm:block">
                        {formatRelativeTime(project.createdAt)}
                      </span>
                      <Badge variant={project.status as any}>
                        {project.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Needs Attention */}
        <Card className="py-0">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              Needs Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-700/50">
              {/* Projects needing matching */}
              {attention.matchingProjects.map((project: any) => (
                <Link
                  key={project._id.toString()}
                  href={`/admin/projects/${project._id}`}
                  className="flex items-center gap-3 p-4 hover:bg-slate-700/30 transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <FolderOpen className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {project.title}
                    </p>
                    <p className="text-xs text-slate-400">
                      Needs editor match
                    </p>
                  </div>
                  <Badge variant="matching" size="sm">Match</Badge>
                </Link>
              ))}

              {/* Pending editor applications */}
              {attention.pendingEditors.map((editor: any) => (
                <Link
                  key={editor._id.toString()}
                  href={`/admin/editors/applications/${editor._id}`}
                  className="flex items-center gap-3 p-4 hover:bg-slate-700/30 transition-colors"
                >
                  <Avatar size="sm">
                    <AvatarImage src={editor.image} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {getInitials(editor.name || "U")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {editor.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      Editor application
                    </p>
                  </div>
                  <Badge variant="pending" size="sm">Review</Badge>
                </Link>
              ))}

              {totalAttention === 0 && (
                <div className="p-6 text-center text-slate-400">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">All caught up!</p>
                </div>
              )}
            </div>

            {totalAttention > 0 && (
              <div className="p-4 border-t border-slate-700/50">
                <Link href="/admin/projects?status=matching">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Items
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link href="/admin/projects?status=matching">
              <Button variant="outline" className="w-full justify-start">
                <FolderOpen className="h-4 w-4" />
                Match Projects ({stats.needsMatching})
              </Button>
            </Link>
            <Link href="/admin/editors/applications">
              <Button variant="outline" className="w-full justify-start">
                <UserPlus className="h-4 w-4" />
                Review Editors ({stats.pendingEditors})
              </Button>
            </Link>
            <Link href="/admin/messages">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4" />
                All Messages
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4" />
                View Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<AdminDashboardSkeleton />}>
      <AdminDashboardContent />
    </Suspense>
  );
}
