import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import {
  ArrowLeft,
  Clock,
  FileText,
  MessageSquare,
  Download,
  User as UserIcon,
  Calendar,
  BookOpen,
  CreditCard,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  formatDate,
  formatCurrency,
  getServiceTypeLabel,
  formatWordCount,
  getInitials,
} from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";
import User from "@/lib/db/models/User";

async function getProject(id: string, userId: string) {
  await connectDB();
  const project = await Project.findOne({ _id: id, authorId: userId })
    .populate("editorId", "name image")
    .lean();
  return project ? JSON.parse(JSON.stringify(project)) : null;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;
  const project = await getProject(id, session.user.id);

  if (!project) {
    notFound();
  }

  const statusSteps = [
    { key: "pending", label: "Submitted" },
    { key: "paid", label: "Paid" },
    { key: "matching", label: "Finding Editor" },
    { key: "assigned", label: "Editor Assigned" },
    { key: "in_progress", label: "In Progress" },
    { key: "review", label: "Under Review" },
    { key: "completed", label: "Completed" },
  ];

  const currentStepIndex = statusSteps.findIndex(
    (step) => step.key === project.status
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{project.title}</h1>
            <Badge variant={project.status as any} size="lg">
              {project.status.replace(/_/g, " ")}
            </Badge>
          </div>
          <p className="text-slate-400 mt-1">
            {getServiceTypeLabel(project.serviceType)} • {project.genre}
          </p>
        </div>
      </div>

      {/* Progress Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex justify-between">
              {statusSteps.map((step, index) => (
                <div
                  key={step.key}
                  className={`flex flex-col items-center ${
                    index <= currentStepIndex
                      ? "text-emerald-400"
                      : "text-slate-600"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= currentStepIndex
                        ? "bg-emerald-500/20 border-2 border-emerald-500"
                        : "bg-slate-800 border-2 border-slate-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-2 hidden sm:block">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-700 -z-10">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{
                  width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Manuscript Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Manuscript Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400">Word Count</label>
                  <p className="text-white font-medium">
                    {formatWordCount(project.wordCount)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Genre</label>
                  <p className="text-white font-medium">{project.genre}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Service Type</label>
                  <p className="text-white font-medium">
                    {getServiceTypeLabel(project.serviceType)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-400">Submitted</label>
                  <p className="text-white font-medium">
                    {formatDate(project.createdAt)}
                  </p>
                </div>
              </div>

              {project.pitch && (
                <div>
                  <label className="text-sm text-slate-400">Pitch</label>
                  <p className="text-white mt-1">{project.pitch}</p>
                </div>
              )}

              {project.concerns && (
                <div>
                  <label className="text-sm text-slate-400">
                    Areas of Concern
                  </label>
                  <p className="text-white mt-1">{project.concerns}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Files */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              {project.files?.length > 0 ? (
                <div className="space-y-3">
                  {project.files.map((file: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-slate-400" />
                        <div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-xs text-slate-400">{file.type}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={file.url} download>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">
                  No files uploaded yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Editor Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Your Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              {project.editorId ? (
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={project.editorId.image} />
                    <AvatarFallback>
                      {getInitials(project.editorId.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">
                      {project.editorId.name}
                    </p>
                    <p className="text-sm text-slate-400">Editor</p>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">
                  {project.status === "matching"
                    ? "Finding the perfect editor for your manuscript..."
                    : "Editor will be assigned soon"}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Amount</span>
                <span className="text-white font-medium">
                  {formatCurrency(project.price || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status</span>
                <Badge variant={project.paymentStatus === "paid" ? "emerald" : "yellow"}>
                  {project.paymentStatus || "pending"}
                </Badge>
              </div>
              {project.status === "pending" && (
                <Button className="w-full mt-4" asChild>
                  <Link href={`/checkout?project=${project._id}`}>
                    Pay Now
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/dashboard/messages?project=${project._id}`}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
