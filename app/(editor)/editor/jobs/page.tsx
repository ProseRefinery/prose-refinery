import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Search,
  Filter,
  Briefcase,
  Clock,
  BookOpen,
  PoundSterling,
  Calendar,
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
import { formatDate, formatCurrency, getServiceTypeLabel, formatWordCount } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";

async function getAvailableJobs() {
  await connectDB();
  const jobs = await Project.find({
    status: "matching",
    editor: { $exists: false },
  })
    .sort({ createdAt: -1 })
    .populate("author", "name")
    .lean();
  return JSON.parse(JSON.stringify(jobs));
}

export default async function EditorJobsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const jobs = await getAvailableJobs();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Available Jobs</h1>
        <p className="text-slate-400 mt-1">
          Browse and apply for editing projects
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search jobs..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="thriller">Thriller</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="developmental_edit">Developmental Edit</SelectItem>
                <SelectItem value="line_edit">Line Edit</SelectItem>
                <SelectItem value="copy_edit">Copy Edit</SelectItem>
                <SelectItem value="proofread">Proofread</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Briefcase className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No jobs available</h3>
            <p className="text-slate-400">
              Check back later for new editing opportunities
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job: any) => (
            <Card key={job._id} className="hover:border-slate-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-white text-lg">
                        {job.title}
                      </h3>
                      <Badge variant="emerald">New</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {getServiceTypeLabel(job.serviceType)}
                      </span>
                      <span>•</span>
                      <span>{job.genre}</span>
                      <span>•</span>
                      <span>{formatWordCount(job.wordCount)} words</span>
                    </div>
                    {job.pitch && (
                      <p className="text-slate-400 text-sm line-clamp-2">
                        {job.pitch}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <PoundSterling className="h-4 w-4" />
                        {formatCurrency(job.editorPay || job.price * 0.7).replace("£", "")}
                      </div>
                      <p className="text-xs text-slate-500">Editor fee</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-slate-300">
                        <Calendar className="h-4 w-4" />
                        {job.deadline ? formatDate(job.deadline) : "Flexible"}
                      </div>
                      <p className="text-xs text-slate-500">Deadline</p>
                    </div>
                    <Button asChild>
                      <Link href={`/editor/jobs/${job._id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
