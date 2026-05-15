import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DepartmentSignupPlaceholder() {
  return (
    <main className="mx-auto grid min-h-screen max-w-xl place-items-center px-6 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Register department</CardTitle>
          <p className="text-sm text-[color:var(--muted)]">Department self-registration enters a GB Admin approval queue.</p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input label="Department name" placeholder="Westview Police Department" />
          <Input label="Admin email" placeholder="admin@department.gov" type="email" />
          <Input label="City" placeholder="Westview" />
          <Button href="/department">Submit mock registration</Button>
        </CardContent>
      </Card>
    </main>
  );
}
