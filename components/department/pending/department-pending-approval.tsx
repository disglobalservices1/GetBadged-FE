import { Building2, CheckCircle2, Clock3, LockKeyhole, Mail, ShieldAlert, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";
import { getPendingDepartmentApprovalViewModel } from "@/features/department/signup/get-department-signup-view-model";
import { cn } from "@/lib/utils/cn";

export function DepartmentPendingApproval() {
  const viewModel = getPendingDepartmentApprovalViewModel();
  const { department, primaryAdmin } = viewModel;

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Department onboarding"
        title={`${department.departmentName} is pending approval`}
        description="Full department features stay locked until GetBadged approves the registration."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="grid gap-6">
          <Card className="border-[#ead8a5] bg-[#fffaf0]">
            <CardContent className="grid gap-4 p-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-amber-700 shadow-sm">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="font-bold text-[color:var(--navy)]">Workspace pending GetBadged approval</h2>
                  <StatusChip label="Pending approval" tone="warning" />
                </div>
                <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-700">
                  You can review the submitted registration status here. Profile, jobs, Badge Pool, applicants, messages, reports, and exports stay
                  locked until activation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                  <CardTitle>Approval timeline</CardTitle>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">GetBadged reviews department identity, admin contact, and plan details.</p>
                </div>
                <StatusChip label="In review" tone="warning" />
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="relative grid gap-10">
                <div className="absolute left-[22px] top-5 bottom-5 w-px bg-[color:var(--border)]" />
                <div className="absolute left-[22px] top-5 h-20 w-px bg-[color:var(--success)]" />
                {viewModel.timeline.map((item) => (
                  <div key={item.label} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
                    <div className="relative flex justify-center">
                      <div
                        className={cn(
                          "relative z-10 flex h-9 w-9 items-center justify-center bg-white",
                          item.status === "complete" && "text-[color:var(--success)]",
                          item.status === "in_progress" && "text-[color:var(--blue)]",
                          item.status === "not_started" && "text-slate-400"
                        )}
                      >
                        {item.status === "complete" ? <CheckCircle2 className="h-5 w-5" /> : null}
                        {item.status === "in_progress" ? <Clock3 className="h-5 w-5" /> : null}
                        {item.status === "not_started" ? <LockKeyhole className="h-5 w-5" /> : null}
                      </div>
                    </div>
                    <div>
                      <div className="bg-white py-1">
                        <h3 className="text-sm font-bold text-[color:var(--navy)]">{item.label}</h3>
                        <p className="mt-1 text-sm leading-5 text-[color:var(--muted)]">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submitted registration</CardTitle>
              <p className="text-sm text-[color:var(--muted)]">These are the details currently queued for review.</p>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Detail label="Department" value={department.departmentName} />
              <Detail label="Requested tier" value={`${department.tier.toUpperCase()} tier`} />
              <Detail label="Location" value={`${department.city}, ${department.state} ${department.zipCode ?? ""}`} />
              <Detail label="Public phone" value={department.mainPhone ?? "Not provided"} />
              <Detail label="Website" value={department.websiteUrl ?? "Not provided"} />
              <Detail
                label="Primary admin"
                value={primaryAdmin ? `${primaryAdmin.firstName} ${primaryAdmin.lastName} (${primaryAdmin.email})` : "Pending admin"}
              />
            </CardContent>
          </Card>
        </section>

        <aside className="grid content-start gap-4 rounded-md border border-[color:var(--border-muted)] bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-[color:var(--blue)]">Queue position</p>
              <p className="mt-1 text-3xl font-bold text-[color:var(--navy)]">#{viewModel.approvalQueuePosition}</p>
            </div>
          </div>

          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase text-slate-500">Current status</p>
            <div className="mt-2">
              <StatusChip label="Pending GetBadged review" tone="warning" />
            </div>
          </div>

          <div className="grid gap-3 border-t border-[color:var(--border-muted)] pt-4">
            <h2 className="text-sm font-bold uppercase text-[color:var(--navy)]">Locked until active</h2>
            {viewModel.lockedFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <LockKeyhole className="h-4 w-4 text-slate-400" />
                {feature}
              </div>
            ))}
          </div>

          <div className="grid gap-3 border-t border-[color:var(--border-muted)] pt-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[color:var(--navy)]">
              <ShieldCheck className="h-4 w-4 text-[color:var(--success)]" />
              After approval
            </div>
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              The account status changes to active and this workspace opens Department Profile, Job Posts, Badge Pool, Applicant Pools, messages, and reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-[color:var(--border-muted)] pt-4">
            <Button href="mailto:support@getbadged.com" variant="secondary" iconLeft={<Mail className="h-4 w-4" />}>
              Contact support
            </Button>
            <Button href="/auth/signup/department">
              Review registration form
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[color:var(--border-muted)] bg-white p-4">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-[color:var(--navy)]">{value}</p>
    </div>
  );
}
