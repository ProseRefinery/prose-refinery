"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Loader2,
  BookOpen,
  FileText,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { getInitials } from "@/lib/utils";

export default function EditorSettingsPage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    bio: "",
    specialties: [] as string[],
  });
  const [notifications, setNotifications] = useState({
    newJobs: true,
    messages: true,
    payments: true,
  });

  const genres = [
    "Fantasy",
    "Sci-Fi",
    "Romance",
    "Thriller",
    "Mystery",
    "Horror",
    "Literary Fiction",
    "Young Adult",
  ];

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      await update({ name: profileData.name });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const toggleSpecialty = (genre: string) => {
    setProfileData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(genre)
        ? prev.specialties.filter((g) => g !== genre)
        : [...prev.specialties, genre],
    }));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your editor profile and settings</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </CardTitle>
          <CardDescription>
            Your public editor profile visible to authors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback className="text-lg">
                {getInitials(session?.user?.name || "User")}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
              <p className="text-xs text-slate-500 mt-1">
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell authors about your editing experience and style..."
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                rows={4}
              />
            </div>
          </div>

          <Button onClick={handleProfileUpdate} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Genre Specialties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Genre Specialties
          </CardTitle>
          <CardDescription>
            Select the genres you specialize in editing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre}
                variant={profileData.specialties.includes(genre) ? "emerald" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleSpecialty(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payout Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payout Settings
          </CardTitle>
          <CardDescription>Configure how you receive payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <p className="font-medium text-white">Bank Account</p>
              <p className="text-sm text-slate-400">**** **** **** 4242</p>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <p className="font-medium text-white">Tax Information</p>
              <p className="text-sm text-slate-400">Required for payments</p>
            </div>
            <Badge variant="yellow">Pending</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Choose what notifications you receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Job Alerts</Label>
              <p className="text-sm text-slate-500">
                Get notified when new jobs match your specialties
              </p>
            </div>
            <Checkbox
              checked={notifications.newJobs}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, newJobs: checked as boolean })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Messages</Label>
              <p className="text-sm text-slate-500">
                Get notified when you receive new messages
              </p>
            </div>
            <Checkbox
              checked={notifications.messages}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, messages: checked as boolean })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Payment Updates</Label>
              <p className="text-sm text-slate-500">
                Get notified about payment status changes
              </p>
            </div>
            <Checkbox
              checked={notifications.payments}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, payments: checked as boolean })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Password</p>
              <p className="text-sm text-slate-400">Last changed 3 months ago</p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Two-Factor Authentication</p>
              <p className="text-sm text-slate-400">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
