import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CandidateSignupPlaceholder() {
  return (
    <main className="mx-auto grid min-h-screen max-w-xl place-items-center px-6 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create candidate account</CardTitle>
          <p className="text-sm text-[color:var(--muted)]">Free accounts get a limited dashboard until purchase and eligibility are complete.</p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input label="First name" placeholder="Jordan" />
          <Input label="Last name" placeholder="Smith" />
          <Input label="Email" placeholder="jordan@example.com" type="email" />
          <Button href="/candidate">Create mock account</Button>
        </CardContent>
      </Card>
    </main>
  );
}
