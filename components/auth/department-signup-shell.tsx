import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function DepartmentSignupShell() {
  return (
    <main className="mx-auto grid min-h-screen max-w-3xl place-items-center px-6 py-10">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>Register department</CardTitle>
              <p className="mt-1 text-sm text-[color:var(--muted)]">This auth shell captures the account entry point. Dev B owns the full department-specific registration workflow.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Department name" placeholder="Westview Police Department" />
            <Input label="Department city" placeholder="Westview" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Admin first name" placeholder="Avery" />
            <Input label="Admin last name" placeholder="Cole" />
          </div>
          <Input label="Admin email" placeholder="admin@department.gov" type="email" />
          <div className="rounded-md border border-[color:var(--border-muted)] bg-[color:var(--surface-muted)] p-4 text-sm leading-6 text-[color:var(--muted)]">
            Submitted departments enter pending approval before profile and job posts can become public.
          </div>
          <Button href="/department?registration=pending_approval" iconRight={<ArrowRight size={18} />}>
            Submit mock registration
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
