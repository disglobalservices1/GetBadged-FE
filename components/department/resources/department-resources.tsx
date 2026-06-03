"use client";

import { CalendarDays, ChevronRight, CircleHelp, FileText } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DepartmentResourceCard } from "@/features/department/resources/get-mock-department-resources";

const iconById = {
  "elr-exam-schedule": CalendarDays,
  "help-faq": CircleHelp,
  "department-hiring-guide": FileText
} as const;

export function DepartmentResources({ resources }: { resources: DepartmentResourceCard[] }) {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Resources"
        title="Resources"
        description="Access exam scheduling information, help content, and department recruiting guidance published for department teams."
      />

      <Card>
        <CardHeader>
          <CardTitle>Resource Center</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {resources.map((resource) => {
            const Icon = iconById[resource.id as keyof typeof iconById] ?? CircleHelp;

            return (
              <a
                key={resource.id}
                href={resource.href}
                className="flex items-center justify-between gap-3 rounded-md border border-[color:var(--border-muted)] px-4 py-3 transition hover:bg-[color:var(--surface-muted)]"
              >
                <span className="flex min-w-0 items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[color:var(--surface-muted)] text-[color:var(--blue)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-[color:var(--navy)]">{resource.label}</span>
                    <span className="mt-1 block text-sm leading-6 text-[color:var(--muted)]">{resource.detail}</span>
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[color:var(--blue)]" />
              </a>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
