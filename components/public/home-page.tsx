import { ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { publicAudienceCards, publicHeroStats, publicTrustCards, publicWorkflowSteps } from "@/features/public/marketing-content";

export function HomePage() {
  return (
    <div className="bg-[color:var(--background)]">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="grid gap-7">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase text-[color:var(--blue)]">Massachusetts public-safety recruiting</p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-[color:var(--navy)] md:text-5xl">
              One consent-based marketplace for candidates and departments.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              GetBadged helps candidates build verified profiles and helps departments find qualified public-safety applicants through direct applications and Badge Requests.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/auth/signup/candidate" iconRight={<ArrowRight size={18} />}>
              Start as Candidate
            </Button>
            <Button href="/auth/signup/department" variant="secondary">
              Register Department
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {publicHeroStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-[color:var(--border-muted)] bg-white p-4">
                <p className="text-2xl font-extrabold text-[color:var(--navy)]">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase text-slate-500">{stat.label}</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[color:var(--border-muted)] bg-white p-5 shadow-sm">
          <div className="rounded-lg bg-[color:var(--navy)] p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-[color:var(--blue)]">
                <Shield fill="currentColor" size={24} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-[color:var(--gold)]">Badge Pool Preview</p>
                <h2 className="text-xl font-bold">Anonymous until candidate consent</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {["Track: ELR", "Education: Bachelor's Degree", "Exam Score: 82.09%", "Credentials: CPR, EMT, LTC"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md bg-white/10 px-3 py-3 text-sm font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--gold)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-3 rounded-lg border border-[color:var(--border-muted)] p-4">
            <p className="text-sm font-bold uppercase text-[color:var(--navy)]">Protected before acceptance</p>
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              Departments see eligibility signals first. Full profile, documents, essays, and contact details are released only after direct Apply or Badge acceptance.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 py-8 md:grid-cols-2">
        {publicAudienceCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="grid gap-5 !p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <card.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold text-[color:var(--navy)]">{card.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{card.body}</p>
                </div>
              </div>
              <Button href={card.href} variant="secondary" iconRight={<ArrowRight size={18} />}>
                {card.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10">
        <div className="grid gap-2">
          <p className="text-sm font-bold uppercase text-[color:var(--blue)]">How it works</p>
          <h2 className="text-3xl font-bold text-[color:var(--navy)]">A clear workflow from profile to hiring process.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {publicWorkflowSteps.map((step, index) => (
            <Card key={step.title}>
              <CardContent className="grid gap-4 !p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-[color:var(--navy)]">{step.title}</h3>
                  </div>
                  <span className="text-sm font-extrabold text-[color:var(--gold)]">0{index + 1}</span>
                </div>
                <p className="text-sm leading-6 text-[color:var(--muted)]">{step.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 py-10 md:grid-cols-3">
        {publicTrustCards.map((card) => (
          <div key={card.title} className="rounded-lg border border-[color:var(--border-muted)] bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-[color:var(--navy)]">{card.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{card.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
