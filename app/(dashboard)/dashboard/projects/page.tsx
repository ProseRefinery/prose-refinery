import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  FolderOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, getServiceTypeLabel, formatWordCount } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";

async function getProjects(userId: string) {
  await connectDB();
  const projects = await Project.find({ author: userId })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(projects));
}

export default async function ProjectsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const projects = await getProjects(session.user.id);

  const statusCounts = {
    all: projects.length,
    active: projects.filter((p: any) =>
      ["pending", "paid", "matching", "assigned", "in_progress", "review"].includes(p.status)
    ).length,
    completed: projects.filter((p: any) => p.status === "completed").length,
    draft: projects.filter((p: any) => p.status === "draft").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Projects</h1>
          <p className="text-slate-400 mt-1">
            Manage your manuscript editing projects
          </p>
        </div>
        <Button asChild>
          <Link href="/contact">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ({statusCounts.all})</SelectItem>
                <SelectItem value="active">Active ({statusCounts.active})</SelectItem>
                <SelectItem value="completed">Completed ({statusCounts.completed})</SelectItem>
                <SelectItem value="draft">Draft ({statusCounts.draft})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No projects yet</h3>
            <p className="text-slate-400 mb-6">
              Start your editing journey by submitting your first manuscript.
            </p>
            <Button asChild>
              <Link href="/contact">
                <Plus className="h-4 w-4 mr-2" />
                Submit Manuscript
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project: any) => (
            <Link
              key={project._id}
              href={`/dashboard/projects/${project._id}`}
              className="block"
            >
              <Card className="hover:border-slate-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-white">
                          {project.title}
                        </h3>
                        <Badge variant={project.status as any}>
                          {project.status.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                        <span>{getServiceTypeLabel(project.serviceType)}</span>
                        <span>•</span>
                        <span>{project.genre}</span>
                        <span>•</span>
                        <span>{formatWordCount(project.wordCount)} words</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(project.createdAt)}</span>
                      </div>
                      {project.status === "completed" && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
