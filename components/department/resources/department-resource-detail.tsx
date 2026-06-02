"use client";

import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type DepartmentResourceDetailModel = {
  id: string;
  label: string;
  detail: string;
  href: string;
};

const bodyById: Record<string, string> = {
  "elr-exam-schedule":
    "Review upcoming entry-level exam windows, registration guidance, and planning notes for hiring teams tracking ELR candidate readiness.",
  "help-faq":
    "Find answers to common recruiting, messaging, Badge Pool, and applicant workflow questions for department teams using GetBadged.",
  "department-hiring-guide":
    "Use this department hiring guide as a reference for writing stronger job posts, reviewing applicants consistently, and planning department outreach."
};

export function DepartmentResourceDetail({ resource }: { resource: DepartmentResourceDetailModel }) {
  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Resources" title={resource.label} description={resource.detail} />

      <Card>
        <CardHeader>
          <CardTitle>{resource.label}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
            {bodyById[resource.id] ?? "Additional department resource details will be added here."}
          </p>
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
