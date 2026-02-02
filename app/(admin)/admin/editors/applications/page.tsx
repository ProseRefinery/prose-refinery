import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  UserPlus,
  Clock,
  FileText,
  Mail,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, formatRelativeTime, getInitials } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

async function getPendingApplications() {
  await connectDB();
  const applications = await User.find({
    role: "editor",
    editorStatus: "pending",
  })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(applications));
}

export default async function EditorApplicationsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");

  const applications = await getPendingApplications();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/editors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Editor Applications</h1>
          <p className="text-slate-400 mt-1">
            Review and approve editor applications
          </p>
        </div>
      </div>

      {/* Applications */}
      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <UserPlus className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No pending applications
            </h3>
            <p className="text-slate-400">
              New editor applications will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((application: any) => (
            <Card key={application._id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Applicant Info */}
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={application.image} />
                      <AvatarFallback className="text-lg">
                        {getInitials(application.name || "Editor")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {application.name}
                        </h3>
                        <p className="text-slate-400">{application.email}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="h-4 w-4" />
                        Applied {formatRelativeTime(application.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex-1">
                    <p className="text-sm text-slate-400 mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {application.specialties?.map((specialty: string) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      )) || (
                        <span className="text-slate-500">None specified</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/admin/editors/applications/${application._id}`}>
                        <FileText className="h-4 w-4 mr-2" />
                        Review
                      </Link>
                    </Button>
                    <Button
                      variant="default"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button variant="destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>

                {/* Bio Preview */}
                {application.bio && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-sm text-slate-400 mb-1">Bio</p>
                    <p className="text-slate-300 line-clamp-2">
                      {application.bio}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
