import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Search,
  Filter,
  FolderOpen,
  MoreHorizontal,
  Eye,
  UserPlus,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, formatCurrency, getServiceTypeLabel, formatWordCount, getInitials } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";

async function getProjects() {
  await connectDB();
  const projects = await Project.find({})
    .sort({ createdAt: -1 })
    .populate("author", "name email")
    .populate("editor", "name")
    .lean();
  return JSON.parse(JSON.stringify(projects));
}

export default async function AdminProjectsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");

  const projects = await getProjects();

  const statusCounts = {
    all: projects.length,
    pending: projects.filter((p: any) => p.status === "pending").length,
    matching: projects.filter((p: any) => p.status === "matching").length,
    in_progress: projects.filter((p: any) => p.status === "in_progress").length,
    completed: projects.filter((p: any) => p.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">All Projects</h1>
        <p className="text-slate-400 mt-1">
          Manage all editing projects across the platform
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search projects..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ({statusCounts.all})</SelectItem>
                <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
                <SelectItem value="matching">Matching ({statusCounts.matching})</SelectItem>
                <SelectItem value="in_progress">In Progress ({statusCounts.in_progress})</SelectItem>
                <SelectItem value="completed">Completed ({statusCounts.completed})</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="developmental_edit">Developmental Edit</SelectItem>
                <SelectItem value="line_edit">Line Edit</SelectItem>
                <SelectItem value="copy_edit">Copy Edit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardContent className="p-0">
          {projects.length === 0 ? (
            <div className="py-12 text-center">
              <FolderOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No projects</h3>
              <p className="text-slate-400">Projects will appear here</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Editor</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project: any) => (
                  <TableRow key={project._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{project.title}</p>
                        <p className="text-xs text-slate-500">
                          {project.genre} • {formatWordCount(project.wordCount)} words
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {project.author ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {getInitials(project.author.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-white">{project.author.name}</p>
                            <p className="text-xs text-slate-500">{project.author.email}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-500">Unknown</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-300">
                        {getServiceTypeLabel(project.serviceType)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={project.status as any}>
                        {project.status.replace(/_/g, " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {project.editor ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {getInitials(project.editor.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-white">{project.editor.name}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-sm">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-emerald-400 font-medium">
                        {formatCurrency(project.price || 0)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-400">
                        {formatDate(project.createdAt)}
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
                            <Link href={`/admin/projects/${project._id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          {!project.editor && project.status === "matching" && (
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/projects/${project._id}/assign`}>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Assign Editor
                              </Link>
                            </DropdownMenuItem>
                          )}
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
