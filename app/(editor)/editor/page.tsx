import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Briefcase,
  FolderOpen,
  PoundSterling,
  Clock,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Star,
  TrendingUp,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { formatCurrency, formatRelativeTime, getServiceTypeLabel, formatWordCount } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";
import User from "@/lib/db/models/User";

async function getEditorStats(editorId: string) {
  await connectDB();

  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    activeAssignments,
    completedProjects,
    availableJobs,
    monthlyEarnings,
    totalEarnings,
  ] = await Promise.all([
    Project.countDocuments({ editorId, status: { $in: ["assigned", "in_progress", "review"] } }),
    Project.countDocuments({ editorId, status: "completed" }),
    Project.countDocuments({ status: "matching" }),
    Project.aggregate([
      { $match: { editorId, status: "completed", completedAt: { $gte: thisMonth } } },
      { $group: { _id: null, total: { $sum: "$editorPayout" } } },
    ]).then((res) => res[0]?.total || 0),
    Project.aggregate([
      { $match: { editorId, status: "completed" } },
      { $group: { _id: null, total: { $sum: "$editorPayout" } } },
    ]).then((res) => res[0]?.total || 0),
  ]);

  return {
    activeAssignments,
    completedProjects,
    availableJobs,
    monthlyEarnings,
    totalEarnings,
  };
}

async function getActiveAssignments(editorId: string) {
  await connectDB();

  return Project.find({
    editorId,
    status: { $in: ["assigned", "in_progress", "review"] }
  })
    .sort({ deadline: 1 })
    .limit(5)
    .populate("authorId", "name")
    .lean();
}

async function getAvailableJobs() {
  await connectDB();

  return Project.find({ status: "matching" })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
}

function EditorDashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-800 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="h-96 bg-slate-800 rounded-xl animate-pulse" />
        <div className="h-96 bg-slate-800 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

async function EditorDashboardContent() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "editor") {
    redirect("/login");
  }

  const [stats, activeAssignments, availableJobs] = await Promise.all([
    getEditorStats(session.user.id),
    getActiveAssignments(session.user.id),
    getAvailableJobs(),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {session.user.name?.split(" ")[0]}
          </h1>
          <p className="text-slate-400 mt-1">
            Here's your editing dashboard
          </p>
        </div>
        <Link href="/editor/jobs">
          <Button>
            <Briefcase className="h-4 w-4" />
            Browse Jobs
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Assignments"
          value={stats.activeAssignments}
          icon={FolderOpen}
          variant="blue"
        />
        <StatsCard
          title="Completed"
          value={stats.completedProjects}
          icon={CheckCircle2}
          variant="emerald"
        />
        <StatsCard
          title="Available Jobs"
          value={stats.availableJobs}
          icon={Briefcase}
          variant="purple"
        />
        <StatsCard
          title="This Month"
          value={formatCurrency(stats.monthlyEarnings)}
          icon={PoundSterling}
          variant="emerald"
          subtitle={`${formatCurrency(stats.totalEarnings)} total`}
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Assignments */}
        <Card className="py-0">
          <CardHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Active Assignments</CardTitle>
              <Link
                href="/editor/assignments"
                className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-700/50">
              {activeAssignments.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <FolderOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No active assignments</p>
                  <Link href="/editor/jobs" className="text-emerald-400 text-sm hover:text-emerald-300">
                    Browse available jobs
                  </Link>
                </div>
              ) : (
                activeAssignments.map((project: any) => (
                  <Link
                    key={project._id.toString()}
                    href={`/editor/assignments/${project._id}`}
                    className="flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-5 w-5 text-blue-400" />
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
                      {project.deadline && (
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <Clock className="h-4 w-4" />
                          {formatRelativeTime(project.deadline)}
                        </div>
                      )}
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

        {/* Available Jobs */}
        <Card className="py-0">
          <CardHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Available Jobs</CardTitle>
              <Link
                href="/editor/jobs"
                className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-700/50">
              {availableJobs.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No jobs available right now</p>
                  <p className="text-sm">Check back later for new opportunities</p>
                </div>
              ) : (
                availableJobs.map((project: any) => (
                  <Link
                    key={project._id.toString()}
                    href={`/editor/jobs/${project._id}`}
                    className="flex items-center justify-between p-4 hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-5 w-5 text-purple-400" />
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
                    <div className="flex-shrink-0">
                      <span className="text-emerald-400 font-medium">
                        {formatCurrency(project.editorPayout || 0)}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <p className="text-sm text-slate-400">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {stats.completedProjects}
              </div>
              <p className="text-sm text-slate-400">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-2">
                98%
              </div>
              <p className="text-sm text-slate-400">On-Time Delivery</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EditorDashboardPage() {
  return (
    <Suspense fallback={<EditorDashboardSkeleton />}>
      <EditorDashboardContent />
    </Suspense>
  );
}
