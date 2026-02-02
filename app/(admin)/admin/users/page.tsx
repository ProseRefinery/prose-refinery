import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Search,
  Users,
  MoreHorizontal,
  Eye,
  Mail,
  Shield,
  UserX,
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

async function getUsers() {
  await connectDB();
  const users = await User.find({ role: "author" })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(users));
}

async function getUserStats() {
  await connectDB();
  const totalUsers = await User.countDocuments({ role: "author" });
  const activeUsers = await User.countDocuments({
    role: "author",
    lastLoginAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  });
  const newUsersThisMonth = await User.countDocuments({
    role: "author",
    createdAt: { $gte: new Date(new Date().setDate(1)) },
  });

  return { totalUsers, activeUsers, newUsersThisMonth };
}

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");

  const [users, stats] = await Promise.all([getUsers(), getUserStats()]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-slate-400 mt-1">Manage author accounts</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          variant="emerald"
        />
        <StatsCard
          title="Active (30 days)"
          value={stats.activeUsers}
          icon={Users}
          variant="blue"
        />
        <StatsCard
          title="New This Month"
          value={stats.newUsersThisMonth}
          icon={Users}
          variant="purple"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          {users.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No users</h3>
              <p className="text-slate-400">Users will appear here</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user: any) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.image} />
                          <AvatarFallback>
                            {getInitials(user.name || "User")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <Badge variant="outline" className="text-xs">
                            Author
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-300">{user.email}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-300">
                        {user.projectCount || 0}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-400">
                        {formatDate(user.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-400">
                        {user.lastLoginAt
                          ? formatDate(user.lastLoginAt)
                          : "Never"}
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
                            <Link href={`/admin/users/${user._id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-400">
                            <UserX className="h-4 w-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
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
