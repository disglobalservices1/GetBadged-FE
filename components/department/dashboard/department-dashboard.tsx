import {
  BadgeCheck,
  BriefcaseBusiness,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  UsersRound,
  WalletCards
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { RestrictedState } from "@/components/common/restricted-state";
import { StatCard } from "@/components/common/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusChip } from "@/components/ui/status-chip";
import { getMockDepartmentDashboard } from "@/features/department/dashboard/get-mock-department-dashboard";

type Dashboard = ReturnType<typeof getMockDepartmentDashboard>;

function DashboardSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
    </Card>
  );
}

function ApprovalTone({ label }: { label: string }) {
  const normalized = label.toLowerCase();
  const tone = normalized.includes("approved") || normalized.includes("active") ? "success" : normalized.includes("pending") ? "warning" : "muted";

  return <StatusChip label={label} tone={tone} />;
}

function PlanStatus({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSection title="Plan and credits">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">{dashboard.tierLabel}</p>
          <p className="mt-1 text-sm text-[color:var(--muted)]">Renews {dashboard.planRenewsAtLabel}</p>
        </div>
        <StatusChip label={dashboard.accountStatusLabel} tone="success" />
      </div>
      <div className="grid gap-2">
        <div className="flex items-end justify-between gap-3">
          <span className="text-sm font-semibold text-slate-700">Badge credits used</span>
          <span className="text-sm font-bold text-[color:var(--navy)]">
            {dashboard.badgeCreditsSent}/{dashboard.monthlyBadgeCreditLimit}
          </span>
        </div>
        <Progress value={dashboard.badgeUsagePercent} />
      </div>
      <div className="grid gap-2 rounded-md bg-slate-50 p-3 text-sm text-[color:var(--muted)]">
        <div className="flex items-center gap-2 font-bold text-[color:var(--navy)]">
          <WalletCards className="h-4 w-4" />
          {dashboard.badgeCreditsRemaining} credits remaining
        </div>
        <p>Badge sends are tracked before Badge Pool workflows unlock in later task groups.</p>
      </div>
    </DashboardSection>
  );
}

function ApprovalStatus({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSection title="Approval status">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[color:var(--border-muted)] p-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[color:var(--success)]" />
            <div>
              <p className="text-sm font-bold text-[color:var(--navy)]">Department profile</p>
              <p className="text-sm text-[color:var(--muted)]">{dashboard.profileApprovalDetail}</p>
            </div>
          </div>
          <ApprovalTone label={dashboard.profileApprovalStatusLabel} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[color:var(--border-muted)] p-3">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness className="h-5 w-5 text-[color:var(--blue)]" />
            <div>
              <p className="text-sm font-bold text-[color:var(--navy)]">Job approvals</p>
              <p className="text-sm text-[color:var(--muted)]">{dashboard.jobApprovalSummary}</p>
            </div>
          </div>
          <StatusChip label={`${dashboard.pendingJobs} pending`} tone={dashboard.pendingJobs > 0 ? "warning" : "success"} />
        </div>
      </div>
    </DashboardSection>
  );
}

function RecentJobs({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSection title="Job post summary">
      <div className="overflow-x-auto rounded-md border border-[color:var(--border-muted)]">
        <div className="grid min-w-[680px] grid-cols-[minmax(0,1fr)_120px_100px_120px] gap-3 bg-slate-50 px-4 py-3 text-xs font-bold uppercase text-slate-500">
          <span>Job</span>
          <span>Status</span>
          <span>Applicants</span>
          <span>Updated</span>
        </div>
        {dashboard.recentJobs.map((job) => (
          <div
            key={job.id}
            className="grid min-w-[680px] grid-cols-[minmax(0,1fr)_120px_100px_120px] gap-3 border-t border-[color:var(--border-muted)] px-4 py-3 text-sm"
          >
            <span className="font-semibold text-[color:var(--navy)]">{job.title}</span>
            <ApprovalTone label={job.statusLabel} />
            <span className="font-semibold text-slate-700">{job.applicants}</span>
            <span className="text-[color:var(--muted)]">{job.updatedAtLabel}</span>
          </div>
        ))}
      </div>
    </DashboardSection>
  );
}

function ApplicantSummary({ dashboard }: { dashboard: Dashboard }) {
  const rows = [
    { label: "New for review", value: dashboard.newApplicants },
    { label: "Direct applications", value: dashboard.directApplications },
    { label: "Accepted Badges", value: dashboard.acceptedBadges }
  ];

  return (
    <DashboardSection title="Applicant pool">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {rows.map((row) => (
          <div key={row.label} className="grid min-w-0 justify-items-center rounded-md border border-[color:var(--border-muted)] p-3 text-center sm:p-4 xl:justify-items-start xl:text-left">
            <p className="text-2xl font-bold text-[color:var(--navy)] sm:text-3xl">{row.value}</p>
            <p className="mt-1 text-xs font-semibold leading-5 text-[color:var(--muted)] sm:text-sm">{row.label}</p>
          </div>
        ))}
      </div>
    </DashboardSection>
  );
}

function NotificationsSummary({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSection title="Messages and notifications">
      {dashboard.notifications.map((notification) => (
        <div key={notification.id} className="rounded-md border border-[color:var(--border-muted)] p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[color:var(--navy)]">{notification.title}</p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{notification.body}</p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-slate-500">{notification.createdAtLabel}</span>
          </div>
        </div>
      ))}
    </DashboardSection>
  );
}

function NextActions({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSection title="Next actions">
      {dashboard.nextActions.map((action) => (
        <div key={action.href} className="rounded-md border border-[color:var(--border-muted)] p-3">
          <p className="text-sm font-bold text-[color:var(--navy)]">{action.label}</p>
          <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{action.detail}</p>
        </div>
      ))}
    </DashboardSection>
  );
}

export function DepartmentDashboard() {
  const dashboard = getMockDepartmentDashboard();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow={`${dashboard.tierLabel} | ${dashboard.location}`}
        eyebrowClassName="select-none text-xs font-bold uppercase text-[color:var(--blue)]"
        title={dashboard.departmentName}
        description="Department overview for plan status, Badge credits, jobs, applicants, approvals, messages, and notifications."
      />

      {dashboard.restrictedState ? (
        <RestrictedState title={dashboard.restrictedState.title} description={dashboard.restrictedState.description} />
      ) : null}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={<BriefcaseBusiness />} label="Active Jobs" value={dashboard.activeJobs} detail={`${dashboard.pendingJobs} pending, ${dashboard.draftJobs} draft`} />
        <StatCard icon={<BadgeCheck />} label="Badge Credits" value={dashboard.badgeCreditsRemaining} detail={`${dashboard.badgeCreditsSent} sent this cycle`} />
        <StatCard icon={<UsersRound />} label="Applicants" value={dashboard.applicantCount} detail={`${dashboard.newApplicants} new for department review`} />
        <StatCard icon={<MessageSquare />} label="Unread Messages" value={dashboard.unreadMessages} detail={`${dashboard.unreadNotifications} unread notifications`} />
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-6">
          <ApplicantSummary dashboard={dashboard} />
          <RecentJobs dashboard={dashboard} />
          <NotificationsSummary dashboard={dashboard} />
        </div>

        <div className="grid content-start gap-6">
          <PlanStatus dashboard={dashboard} />
          <ApprovalStatus dashboard={dashboard} />
          <NextActions dashboard={dashboard} />
          {dashboard.restrictedState ? (
            <DashboardSection title="Restricted while expired">
              {dashboard.restrictedState.actions.map((action) => (
                <div key={action} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ShieldAlert className="h-4 w-4 text-[color:var(--danger)]" />
                  {action}
                </div>
              ))}
            </DashboardSection>
          ) : null}
        </div>
      </div>
    </div>
  );
}
