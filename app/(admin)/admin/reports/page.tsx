import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  FileText,
  Download,
  Calendar,
  PoundSterling,
  Users,
  FolderOpen,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function AdminReportsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");

  const reports = [
    {
      title: "Revenue Report",
      description: "Detailed breakdown of platform revenue",
      icon: PoundSterling,
      color: "emerald",
    },
    {
      title: "User Growth Report",
      description: "New user signups and retention metrics",
      icon: Users,
      color: "blue",
    },
    {
      title: "Project Report",
      description: "Project submissions and completion rates",
      icon: FolderOpen,
      color: "purple",
    },
    {
      title: "Editor Performance",
      description: "Editor ratings and completion times",
      icon: FileText,
      color: "yellow",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-slate-400 mt-1">Generate and export platform reports</p>
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
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {reports.map((report) => (
          <Card key={report.title}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div
                  className={`p-3 rounded-lg bg-${report.color}-500/10`}
                >
                  <report.icon className={`h-6 w-6 text-${report.color}-400`} />
                </div>
              </div>
              <CardTitle className="mt-4">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No reports generated yet</p>
            <p className="text-sm text-slate-500 mt-1">
              Generate a report above to get started
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automatic report generation</CardDescription>
            </div>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No scheduled reports</p>
            <p className="text-sm text-slate-500 mt-1">
              Set up automatic weekly or monthly reports
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
