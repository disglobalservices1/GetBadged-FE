import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { resourceGroups } from "@/features/public/marketing-content";

export function ResourcesPageContent() {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 py-12">
      <section className="grid gap-3">
        <p className="text-sm font-bold uppercase text-[color:var(--blue)]">Resources</p>
        <h1 className="max-w-3xl text-4xl font-extrabold text-[color:var(--navy)]">Guides for every side of the GetBadged workflow.</h1>
        <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">
          These resource groups are ready for mock content now and GB Admin-managed CMS content later.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {resourceGroups.map((group) => (
          <Card key={group.title}>
            <CardContent className="grid gap-5 px-4 sm:px-6 pb-6 pt-8">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <group.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-[color:var(--navy)]">{group.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{group.description}</p>
                </div>
              </div>
              <div className="grid gap-3">
                {group.links.map((link) => (
                  <a key={link} href="/resources" className="flex items-center justify-between rounded-md border border-[color:var(--border-muted)] px-3 py-3 text-sm font-semibold text-[color:var(--navy)] hover:bg-[color:var(--surface-muted)]">
                    {link}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
