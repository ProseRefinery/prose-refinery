import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  TrendingUp,
  Users,
  FolderOpen,
  PoundSterling,
  BarChart3,
  Calendar,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { formatCurrency } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";
import User from "@/lib/db/models/User";

async function getAnalytics() {
  await connectDB();

  const totalRevenue = await Project.aggregate([
    { $match: { paymentStatus: "paid" } },
    { $group: { _id: null, total: { $sum: "$price" } } },
  ]);

  const totalProjects = await Project.countDocuments();
  const completedProjects = await Project.countDocuments({ status: "completed" });
  const totalUsers = await User.countDocuments({ role: "author" });
  const totalEditors = await User.countDocuments({
    role: "editor",
    editorStatus: "approved",
  });

  // Monthly data (simplified)
  const monthlyProjects = await Project.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
        revenue: { $sum: "$price" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return {
    totalRevenue: totalRevenue[0]?.total || 0,
    totalProjects,
    completedProjects,
    totalUsers,
    totalEditors,
    conversionRate: totalProjects > 0
      ? ((completedProjects / totalProjects) * 100).toFixed(1)
      : 0,
    monthlyProjects: JSON.parse(JSON.stringify(monthlyProjects)),
  };
}

export default async function AdminAnalyticsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");

  const analytics = await getAnalytics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400 mt-1">Platform performance overview</p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(analytics.totalRevenue)}
          icon={PoundSterling}
          variant="emerald"
        />
        <StatsCard
          title="Total Projects"
          value={analytics.totalProjects}
          icon={FolderOpen}
          variant="blue"
        />
        <StatsCard
          title="Active Users"
          value={analytics.totalUsers}
          icon={Users}
          variant="purple"
        />
        <StatsCard
          title="Completion Rate"
          value={`${analytics.conversionRate}%`}
          icon={TrendingUp}
          variant="yellow"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                <p>Revenue chart coming soon</p>
                <p className="text-sm text-slate-600">
                  Install recharts to enable charts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Projects Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                <p>Projects chart coming soon</p>
                <p className="text-sm text-slate-600">
                  Install recharts to enable charts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Platform Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Users</span>
              <span className="font-semibold text-white">
                {analytics.totalUsers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Active Editors</span>
              <span className="font-semibold text-white">
                {analytics.totalEditors}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Completed Projects</span>
              <span className="font-semibold text-white">
                {analytics.completedProjects}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Avg. Project Value</span>
              <span className="font-semibold text-emerald-400">
                {formatCurrency(
                  analytics.totalProjects > 0
                    ? analytics.totalRevenue / analytics.totalProjects
                    : 0
                )}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Top Genres */}
        <Card>
          <CardHeader>
            <CardTitle>Top Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Fantasy", "Sci-Fi", "Romance", "Thriller", "Mystery"].map(
                (genre, index) => (
                  <div key={genre} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-500 w-4">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-white">{genre}</span>
                        <span className="text-slate-400">--</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${100 - index * 15}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <div className="flex-1">
                  <p className="text-sm text-white">New project submitted</p>
                  <p className="text-xs text-slate-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm text-white">Editor application</p>
                  <p className="text-xs text-slate-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <div className="flex-1">
                  <p className="text-sm text-white">Project completed</p>
                  <p className="text-xs text-slate-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="flex-1">
                  <p className="text-sm text-white">Payment received</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
