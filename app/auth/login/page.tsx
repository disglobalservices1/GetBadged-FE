import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[color:var(--background)] px-6 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <ShieldCheck className="h-8 w-8 text-[color:var(--blue)]" />
          <CardTitle>Sign in to GetBadged</CardTitle>
          <p className="text-sm text-[color:var(--muted)]">One login routes candidates, departments, and GB Admins.</p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input label="Email" placeholder="you@example.com" type="email" />
          <Input label="Password" placeholder="Enter password" type="password" />
          <Button>Sign in</Button>
          <div className="grid gap-2 text-sm text-[color:var(--blue)]">
            <a href="/auth/signup/candidate">Create candidate account</a>
            <a href="/auth/signup/department">Register department</a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
