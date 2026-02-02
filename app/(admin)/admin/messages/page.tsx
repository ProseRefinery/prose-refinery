"use client";

import { useState } from "react";
import {
  Search,
  MessageSquare,
  Users,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { getInitials, formatRelativeTime } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [conversations] = useState<any[]>([]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-slate-400 mt-1">
          Monitor and manage platform communications
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total Conversations"
          value={0}
          icon={MessageSquare}
          variant="emerald"
        />
        <StatsCard
          title="Active Today"
          value={0}
          icon={Users}
          variant="blue"
        />
        <StatsCard
          title="Flagged"
          value={0}
          icon={AlertTriangle}
          variant="red"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Conversations</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No conversations
              </h3>
              <p className="text-slate-400">
                Platform conversations will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged" className="mt-6">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertTriangle className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No flagged messages
              </h3>
              <p className="text-slate-400">
                Messages flagged for review will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="mt-6">
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No support tickets
              </h3>
              <p className="text-slate-400">
                Support requests will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
