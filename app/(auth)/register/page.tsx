"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, CheckCircle2 } from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const [activeTab, setActiveTab] = useState<"author" | "editor">(
    roleParam === "editor" ? "editor" : "author"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  // Update tab when URL param changes
  useEffect(() => {
    if (roleParam === "editor") {
      setActiveTab("editor");
    }
  }, [roleParam]);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(pwd)) return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(pwd)) return "Password must contain a lowercase letter";
    if (!/[0-9]/.test(pwd)) return "Password must contain a number";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Validate
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setFormError(passwordError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role: activeTab,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || "Registration failed");
        return;
      }

      setSuccess(true);

      // Auto sign in for authors, redirect editors to pending page
      if (activeTab === "author") {
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.ok) {
          router.push("/dashboard");
          router.refresh();
        }
      }
    } catch (error) {
      setFormError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", {
      callbackUrl: activeTab === "editor" ? "/editor/pending" : "/dashboard"
    });
  };

  if (success && activeTab === "editor") {
    return (
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8">
          <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Application Submitted</h1>
          <p className="text-slate-400 mb-6">
            Thank you for applying to be an editor at Prose Refinery. We'll review your
            application and get back to you within 2-3 business days.
          </p>
          <Link href="/">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Join Prose Refinery to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Role Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "author" | "editor")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="author">I'm an Author</TabsTrigger>
            <TabsTrigger value="editor">I'm an Editor</TabsTrigger>
          </TabsList>
          <TabsContent value="author" className="mt-4">
            <p className="text-sm text-muted-foreground text-center">
              Submit manuscripts for professional editing services
            </p>
          </TabsContent>
          <TabsContent value="editor" className="mt-4">
            <p className="text-sm text-muted-foreground text-center">
              Apply to join our team of professional editors
            </p>
          </TabsContent>
        </Tabs>

        {/* Error message */}
        {formError && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Google Sign Up */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              At least 8 characters with uppercase, lowercase, and number
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : activeTab === "editor" ? "Submit Application" : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground text-center w-full">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image src="/logo.svg" alt="Prose Refinery" fill className="object-contain" />
          </div>
          <span className="font-semibold text-white">Prose Refinery</span>
        </Link>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Suspense fallback={<div className="animate-pulse bg-slate-800 rounded-lg h-96" />}>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
