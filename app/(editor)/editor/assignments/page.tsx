import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  FolderOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  BookOpen,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, getServiceTypeLabel, formatWordCount } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";

async function getAssignments(editorId: string) {
  await connectDB();
  const assignments = await Project.find({ editor: editorId })
    .sort({ createdAt: -1 })
    .populate("author", "name")
    .lean();
  return JSON.parse(JSON.stringify(assignments));
}

export default async function EditorAssignmentsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const assignments = await getAssignments(session.user.id);

  const activeAssignments = assignments.filter((a: any) =>
    ["assigned", "in_progress", "review"].includes(a.status)
  );
  const completedAssignments = assignments.filter(
    (a: any) => a.status === "completed"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">My Assignments</h1>
        <p className="text-slate-400 mt-1">
          Manage your editing assignments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-white">{activeAssignments.length}</p>
            <p className="text-sm text-slate-400">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-white">{completedAssignments.length}</p>
            <p className="text-sm text-slate-400">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">
              {activeAssignments.filter((a: any) => a.status === "in_progress").length}
            </p>
            <p className="text-sm text-slate-400">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {activeAssignments.filter((a: any) => a.status === "review").length}
            </p>
            <p className="text-sm text-slate-400">In Review</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Tabs */}
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">
            Active ({activeAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedAssignments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          {activeAssignments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FolderOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  No active assignments
                </h3>
                <p className="text-slate-400 mb-4">
                  Browse available jobs to find your next project
                </p>
                <Button asChild>
                  <Link href="/editor/jobs">Browse Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeAssignments.map((assignment: any) => (
                <AssignmentCard key={assignment._id} assignment={assignment} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedAssignments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  No completed assignments
                </h3>
                <p className="text-slate-400">
                  Your completed projects will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {completedAssignments.map((assignment: any) => (
                <AssignmentCard key={assignment._id} assignment={assignment} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AssignmentCard({ assignment }: { assignment: any }) {
  const getDeadlineStatus = () => {
    if (!assignment.deadline) return null;
    const deadline = new Date(assignment.deadline);
    const now = new Date();
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return { label: "Overdue", variant: "red" as const };
    if (daysLeft <= 3) return { label: `${daysLeft} days left`, variant: "yellow" as const };
    return { label: `${daysLeft} days left`, variant: "emerald" as const };
  };

  const deadlineStatus = getDeadlineStatus();

  return (
    <Link href={`/editor/assignments/${assignment._id}`}>
      <Card className="hover:border-slate-600 transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-white">{assignment.title}</h3>
                <Badge variant={assignment.status as any}>
                  {assignment.status.replace(/_/g, " ")}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {getServiceTypeLabel(assignment.serviceType)}
                </span>
                <span>•</span>
                <span>{assignment.genre}</span>
                <span>•</span>
                <span>{formatWordCount(assignment.wordCount)} words</span>
              </div>
              {assignment.author && (
                <p className="text-sm text-slate-500">
                  Author: {assignment.author.name}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {deadlineStatus && (
                <Badge variant={deadlineStatus.variant}>
                  <Clock className="h-3 w-3 mr-1" />
                  {deadlineStatus.label}
                </Badge>
              )}
              {assignment.status === "completed" && (
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
