import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { aboutPrinciples } from "@/features/public/marketing-content";

export function AboutPageContent() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12">
      <section className="grid gap-4">
        <p className="text-sm font-bold uppercase text-[color:var(--blue)]">About GetBadged</p>
        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-[color:var(--navy)]">
          Recruiting infrastructure for candidates, departments, and the privacy boundaries between them.
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
          GetBadged is built for Massachusetts public-safety hiring workflows. The platform helps candidates maintain a reusable profile while helping departments discover eligible prospects and manage applications in one place.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {aboutPrinciples.map((principle) => (
          <Card key={principle.title}>
            <CardContent className="grid gap-4 px-6 pb-6 pt-8">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <principle.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-[color:var(--navy)]">{principle.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{principle.body}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="rounded-xl bg-[color:var(--navy)] p-6 text-white md:p-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-[color:var(--gold)]">Massachusetts MVP</p>
            <h2 className="mt-2 text-2xl font-bold">Phase 1 focuses on the complete GetBadged workflow for Massachusetts.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">
              Multi-state expansion, AI assist, and assessment products are later phases. The first build prioritizes the full candidate, department, and GB Admin platform.
            </p>
          </div>
          <Button href="/auth/signup/candidate" iconRight={<ArrowRight size={18} />}>
            Get started
          </Button>
        </div>
      </section>
    </div>
  );
}
