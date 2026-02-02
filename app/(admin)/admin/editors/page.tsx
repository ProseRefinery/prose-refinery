import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Eye,
  Mail,
  CheckCircle2,
  XCircle,
  Star,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { formatDate, getInitials } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

async function getEditors() {
  await connectDB();
  const editors = await User.find({ role: "editor" })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(editors));
}

async function getEditorStats() {
  await connectDB();
  const totalEditors = await User.countDocuments({ role: "editor" });
  const activeEditors = await User.countDocuments({
    role: "editor",
    editorStatus: "approved",
  });
  const pendingApplications = await User.countDocuments({
    role: "editor",
    editorStatus: "pending",
  });

  return { totalEditors, activeEditors, pendingApplications };
}

export default async function AdminEditorsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");

  const [editors, stats] = await Promise.all([getEditors(), getEditorStats()]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Editors</h1>
          <p className="text-slate-400 mt-1">Manage editor accounts and applications</p>
        </div>
        <Button asChild>
          <Link href="/admin/editors/applications">
            <UserPlus className="h-4 w-4 mr-2" />
            View Applications ({stats.pendingApplications})
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total Editors"
          value={stats.totalEditors}
          icon={UserPlus}
          variant="emerald"
        />
        <StatsCard
          title="Active Editors"
          value={stats.activeEditors}
          icon={CheckCircle2}
          variant="blue"
        />
        <StatsCard
          title="Pending Applications"
          value={stats.pendingApplications}
          icon={UserPlus}
          variant="yellow"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search editors..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Editors Table */}
      <Card>
        <CardContent className="p-0">
          {editors.length === 0 ? (
            <div className="py-12 text-center">
              <UserPlus className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No editors</h3>
              <p className="text-slate-400">Editors will appear here</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Editor</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Specialties</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editors.map((editor: any) => (
                  <TableRow key={editor._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={editor.image} />
                          <AvatarFallback>
                            {getInitials(editor.name || "Editor")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{editor.name}</p>
                          {editor.rating && (
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="h-3 w-3 fill-current" />
                              <span className="text-xs">{editor.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-300">{editor.email}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={editor.editorStatus as any}>
                        {editor.editorStatus || "pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {editor.specialties?.slice(0, 2).map((s: string) => (
                          <Badge key={s} variant="outline" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                        {editor.specialties?.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{editor.specialties.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-300">
                        {editor.completedProjects || 0}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-400">
                        {formatDate(editor.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/editors/${editor._id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {editor.editorStatus === "approved" ? (
                            <DropdownMenuItem className="text-red-400">
                              <XCircle className="h-4 w-4 mr-2" />
                              Suspend Editor
                            </DropdownMenuItem>
                          ) : editor.editorStatus === "pending" ? (
                            <>
                              <DropdownMenuItem className="text-emerald-400">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400">
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          ) : null}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
