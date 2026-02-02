import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Clock, CheckCircle2, Mail, FileText } from "lucide-react";
import { BaseCard as Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function EditorPendingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "editor") {
    redirect("/dashboard");
  }

  // If already approved, redirect to main editor dashboard
  if (session.user.editorStatus === "approved") {
    redirect("/editor");
  }

  const isPending = session.user.editorStatus === "pending";
  const isRejected = session.user.editorStatus === "rejected";

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Simple header */}
      <header className="border-b border-slate-800 p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src="/logo.svg"
              alt="Prose Refinery"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-white">Prose Refinery</span>
        </Link>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {isPending ? (
            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Application Under Review
                </h1>
                <p className="text-slate-400 mb-6">
                  Thank you for applying to be an editor at Prose Refinery. Our team is
                  reviewing your application and will get back to you within 2-3 business days.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="text-sm font-medium text-white mb-3">What happens next?</h3>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>We review your credentials and portfolio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>You may be asked to complete a brief editing test</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>You'll receive an email with our decision</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="mailto:editors@proserefinery.com">
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4" />
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="ghost" className="w-full">
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : isRejected ? (
            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Application Not Approved
                </h1>
                <p className="text-slate-400 mb-6">
                  Unfortunately, we're unable to approve your editor application at this time.
                  This may be due to our current capacity or specific qualification requirements.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="text-sm font-medium text-white mb-2">What you can do:</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Review our editor requirements and guidelines</li>
                    <li>• Gain additional editing experience</li>
                    <li>• Reapply after 3 months with updated credentials</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="mailto:editors@proserefinery.com">
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4" />
                      Request Feedback
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="ghost" className="w-full">
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Suspended or other status
            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 rounded-full bg-slate-500/10 flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Account Status
                </h1>
                <p className="text-slate-400 mb-6">
                  Your editor account is currently inactive. Please contact support for more information.
                </p>
                <Link href="mailto:support@proserefinery.com">
                  <Button className="w-full">
                    <Mail className="h-4 w-4" />
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
