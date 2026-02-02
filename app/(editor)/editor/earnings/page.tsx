import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  PoundSterling,
  TrendingUp,
  Calendar,
  Download,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { formatCurrency, formatDate } from "@/lib/utils";
import connectDB from "@/lib/db/mongodb";
import Project from "@/lib/db/models/Project";

async function getEarningsData(editorId: string) {
  await connectDB();

  const completedProjects = await Project.find({
    editor: editorId,
    status: "completed",
  }).lean();

  const pendingProjects = await Project.find({
    editor: editorId,
    status: { $in: ["assigned", "in_progress", "review"] },
  }).lean();

  const totalEarned = completedProjects.reduce(
    (sum: number, p: any) => sum + (p.editorPay || 0),
    0
  );

  const pendingEarnings = pendingProjects.reduce(
    (sum: number, p: any) => sum + (p.editorPay || 0),
    0
  );

  // Mock payment history
  const payments = completedProjects.map((p: any) => ({
    _id: p._id,
    projectTitle: p.title,
    amount: p.editorPay || 0,
    status: "paid",
    paidAt: p.completedAt || p.updatedAt,
  }));

  return {
    totalEarned,
    pendingEarnings,
    completedCount: completedProjects.length,
    payments: JSON.parse(JSON.stringify(payments)),
  };
}

export default async function EditorEarningsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { totalEarned, pendingEarnings, completedCount, payments } =
    await getEarningsData(session.user.id);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Earnings</h1>
          <p className="text-slate-400 mt-1">Track your income and payments</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Earned"
          value={formatCurrency(totalEarned)}
          icon={PoundSterling}
          variant="emerald"
        />
        <StatsCard
          title="Pending Earnings"
          value={formatCurrency(pendingEarnings)}
          icon={Clock}
          variant="yellow"
        />
        <StatsCard
          title={`${currentMonth} Earnings`}
          value={formatCurrency(0)}
          icon={Calendar}
          variant="blue"
        />
        <StatsCard
          title="Completed Projects"
          value={completedCount}
          icon={CheckCircle2}
          variant="purple"
        />
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <PoundSterling className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No payments yet</p>
              <p className="text-sm text-slate-500 mt-1">
                Complete editing projects to start earning
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment: any) => (
                <div
                  key={payment._id}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-white">
                      {payment.projectTitle}
                    </p>
                    <p className="text-sm text-slate-400">
                      {formatDate(payment.paidAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="emerald">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Paid
                    </Badge>
                    <span className="font-semibold text-emerald-400">
                      {formatCurrency(payment.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payout Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <p className="font-medium text-white">Payout Method</p>
              <p className="text-sm text-slate-400">Bank Transfer</p>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <p className="font-medium text-white">Payout Schedule</p>
              <p className="text-sm text-slate-400">
                Automatic weekly payouts for completed projects
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
