"use client";

import { CalendarDays, ChevronRight, CircleHelp, FileText, Link2, MapPin } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DepartmentResourceDetailModel } from "@/features/department/resources/get-mock-department-resources";

export function DepartmentResourceDetail({ resource }: { resource: DepartmentResourceDetailModel }) {
  const DetailIcon = resource.type === "exam_schedule" ? CalendarDays : resource.type === "guide" ? FileText : CircleHelp;

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Resources" title={resource.label} description={resource.detail} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[color:var(--surface-muted)] text-[color:var(--blue)]">
              <DetailIcon className="h-5 w-5" />
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span>{resource.label}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{resource.publishedLabel}</span>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {resource.sections.map((section) => (
            <div key={section.title} className="grid gap-1.5">
              <h3 className="text-sm font-extrabold text-[color:var(--navy)]">{section.title}</h3>
              <p className="max-w-3xl text-sm leading-6 text-[color:var(--muted)]">{section.body}</p>
            </div>
          ))}

          {resource.examScheduleEntries.length > 0 ? (
            <div className="grid gap-3">
              <h3 className="text-sm font-extrabold text-[color:var(--navy)]">Active ELR exam dates</h3>
              <div className="grid gap-3">
                {resource.examScheduleEntries.map((entry) => (
                  <div key={entry.id} className="grid gap-3 rounded-md border border-[color:var(--border-muted)] px-4 py-3 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[color:var(--blue)]" />
                        <p className="text-sm font-bold text-[color:var(--navy)]">{entry.title}</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-500">
                        {entry.examDateLabel} at {entry.examTimeLabel} · Check-in {entry.checkInLabel}
                      </p>
                      <p className="text-sm text-[color:var(--muted)]">{entry.seatsRemainingLabel}</p>
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-semibold text-[color:var(--navy)]">{entry.formatLabel}</p>
                      <div className="flex items-start gap-2 text-sm text-[color:var(--muted)]">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--blue)]" />
                        <span>{entry.locationLabel}</span>
                      </div>
                      <p className="text-sm text-[color:var(--muted)]">Registration closes {entry.registrationDeadlineLabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {resource.links.length > 0 ? (
            <div className="grid gap-2">
              <h3 className="text-sm font-extrabold text-[color:var(--navy)]">Related links</h3>
              <div className="grid gap-2">
                {resource.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between gap-3 rounded-md border border-[color:var(--border-muted)] px-4 py-3 text-sm font-bold text-[color:var(--blue)] transition hover:bg-[color:var(--surface-muted)]"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Link2 className="h-4 w-4 shrink-0" />
                      <span className="truncate">{link.label}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <Button href="/department/resources" variant="secondary">
              Back to Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
