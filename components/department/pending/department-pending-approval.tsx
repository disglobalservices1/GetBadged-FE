import { Building2, CheckCircle2, Clock3, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { RestrictedState } from "@/components/common/restricted-state";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { getPendingDepartmentApprovalViewModel } from "@/features/department/signup/get-department-signup-view-model";

export function DepartmentPendingApproval() {
  const viewModel = getPendingDepartmentApprovalViewModel();
  const { department, primaryAdmin } = viewModel;

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Department onboarding"
        title={`${department.departmentName} is pending approval`}
        description="Full department features stay locked until GB Admin approves the registration."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="grid gap-6">
          <RestrictedState
            title="Workspace pending GB Admin approval"
            description="Your department can review the submitted registration status here, but profile, jobs, Badge Pool, applicants, messages, and reports remain unavailable until activation."
          />

          <section className="rounded-md border border-[color:var(--border-muted)] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-muted)] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[color:var(--navy)]">Approval timeline</h2>
                <p className="mt-1 text-sm text-[color:var(--muted)]">The mock workflow mirrors the future admin approval queue.</p>
              </div>
              <StatusChip label="Pending approval" tone="warning" />
            </div>
            <div className="mt-5 grid gap-4">
              {viewModel.timeline.map((item) => (
                <div key={item.label} className="flex gap-3 rounded-md border border-[color:var(--border-muted)] p-4">
                  <div className="mt-0.5">
                    {item.status === "complete" ? <CheckCircle2 className="h-5 w-5 text-[color:var(--success)]" /> : null}
                    {item.status === "in_progress" ? <Clock3 className="h-5 w-5 text-[color:var(--blue)]" /> : null}
                    {item.status === "not_started" ? <LockKeyhole className="h-5 w-5 text-slate-400" /> : null}
                  </div>
                  <div>
                    <h3 className="font-bold text-[color:var(--navy)]">{item.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-[color:var(--border-muted)] bg-white p-5">
            <h2 className="text-lg font-bold text-[color:var(--navy)]">Submitted registration</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Detail label="Department" value={department.departmentName} />
              <Detail label="Requested tier" value={`${department.tier.toUpperCase()} tier`} />
              <Detail label="Location" value={`${department.city}, ${department.state} ${department.zipCode ?? ""}`} />
              <Detail label="Public phone" value={department.mainPhone ?? "Not provided"} />
              <Detail label="Website" value={department.websiteUrl ?? "Not provided"} />
              <Detail
                label="Primary admin"
                value={primaryAdmin ? `${primaryAdmin.firstName} ${primaryAdmin.lastName} (${primaryAdmin.email})` : "Pending admin"}
              />
            </div>
          </section>
        </section>

        <aside className="grid content-start gap-4 rounded-md border border-[color:var(--border-muted)] bg-white p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase text-[color:var(--blue)]">Queue position</p>
              <p className="mt-1 text-3xl font-bold text-[color:var(--navy)]">#{viewModel.approvalQueuePosition}</p>
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
              The account status changes to active and this workspace opens the Department Profile, Job Posts, Badge Pool, and Applicant Pool.
            </p>
          </div>

          <div className="grid gap-3 border-t border-[color:var(--border-muted)] pt-4">
            <Button href="mailto:support@getbadged.com" variant="secondary" iconLeft={<Mail className="h-4 w-4" />}>
              Contact support
            </Button>
            <Button href="/auth/signup/department" variant="ghost">
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
    <div className="rounded-md border border-[color:var(--border-muted)] p-4">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-6 text-[color:var(--navy)]">{value}</p>
    </div>
  );
}
