import { ArrowRight, BadgeCheck, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  {
    title: "Candidates Apply",
    body: "Build one profile, track eligibility, and apply to public-safety roles with confidence.",
    icon: BadgeCheck
  },
  {
    title: "Departments Badge",
    body: "Browse eligible candidates, send Badge Requests, and manage applicant pools.",
    icon: Building2
  },
  {
    title: "Privacy First",
    body: "The Badge Pool protects candidate identity until consent is given.",
    icon: Shield
  }
];

export default function PublicHomePage() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12">
      <div className="grid gap-5">
        <p className="text-sm font-semibold uppercase text-[color:var(--blue)]">Massachusetts MVP</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-[color:var(--navy)]">
          Public-safety recruiting built around consent, eligibility, and better department fit.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
          GetBadged connects qualified candidates with departments through direct applications and Badge Requests.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/auth/login">Sign in</Button>
          <Button href="/jobs" variant="secondary" iconRight={<ArrowRight size={18} />}>
            Browse jobs
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <item.icon className="h-6 w-6 text-[color:var(--blue)]" />
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-[color:var(--muted)]">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
