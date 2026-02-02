"use client";

import { useState } from "react";
import {
  Settings,
  Globe,
  Mail,
  CreditCard,
  Shield,
  Bell,
  Palette,
  Database,
  Loader2,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Settings saved successfully");
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Configure platform settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic platform configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" defaultValue="Prose Refinery" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    defaultValue="Expert developmental editing for fantasy and sci-fi novels."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    defaultValue="hello@proserefinery.com"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-white">Platform Status</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-slate-500">
                      Disable public access to the platform
                    </p>
                  </div>
                  <Checkbox />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Accept New Projects</Label>
                    <p className="text-sm text-slate-500">
                      Allow authors to submit new projects
                    </p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Accept Editor Applications</Label>
                    <p className="text-sm text-slate-500">
                      Allow new editor applications
                    </p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Settings
              </CardTitle>
              <CardDescription>
                Configure email notifications and templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    defaultValue="noreply@proserefinery.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input id="fromName" defaultValue="Prose Refinery" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-white">Notification Templates</h4>
                <div className="grid gap-4">
                  {[
                    "Project Submitted",
                    "Payment Received",
                    "Editor Assigned",
                    "Project Completed",
                    "New Message",
                  ].map((template) => (
                    <div
                      key={template}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                    >
                      <span className="text-white">{template}</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Settings
              </CardTitle>
              <CardDescription>
                Configure Stripe and payment options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Stripe Mode</Label>
                  <Select defaultValue="test">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test">Test Mode</SelectItem>
                      <SelectItem value="live">Live Mode</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripeKey">Stripe Public Key</Label>
                  <Input
                    id="stripeKey"
                    type="password"
                    defaultValue="pk_test_..."
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-white">Platform Fees</h4>
                <div className="space-y-2">
                  <Label htmlFor="platformFee">Platform Fee (%)</Label>
                  <Input
                    id="platformFee"
                    type="number"
                    defaultValue="30"
                    min="0"
                    max="100"
                  />
                  <p className="text-sm text-slate-500">
                    Percentage taken from each project payment
                  </p>
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-slate-500">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <Checkbox />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-slate-500">
                      Auto logout after inactivity
                    </p>
                  </div>
                  <Select defaultValue="24h">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="8h">8 hours</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-white">Access Logs</h4>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-slate-400 text-center">
                    Access logs feature coming soon
                  </p>
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
