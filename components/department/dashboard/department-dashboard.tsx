import {
  CalendarDays,
  ChevronRight,
  CircleHelp,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  BriefcaseBusiness,
  Bell,
  Building2,
  ClipboardList,
  CreditCardIcon,
  FolderKanban,
  ShieldAlert
} from "lucide-react";
import { RestrictedState } from "@/components/common/restricted-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMockDepartmentDashboard } from "@/features/department/dashboard/get-mock-department-dashboard";
import { cn } from "@/lib/utils/cn";

type Dashboard = ReturnType<typeof getMockDepartmentDashboard>;

function toStartCase(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function DashboardCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <Card className={cn("overflow-hidden", className)}>{children}</Card>;
}

function DashboardSection({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <DashboardCard className={className}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs uppercase !text-[color:var(--blue)]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 p-4 pt-0">{children}</CardContent>
    </DashboardCard>
  );
}

function DashboardMetricRow({
  label,
  value,
  valueClassName,
  stacked = false,
  labelClassName,
  className
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
  stacked?: boolean;
  labelClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-[color:var(--border-muted)] px-3 py-2.5",
        stacked ? "grid justify-items-center gap-2 text-center" : "flex items-center justify-between gap-3",
        className
      )}
    >
      {stacked ? (
        <>
          <p className={cn("text-[14px] font-extrabold text-[color:var(--navy)] leading-none", valueClassName)}>{value}</p>
          <p className={cn("text-[13px] font-bold leading-tight text-slate-600", labelClassName)}>{label}</p>
        </>
      ) : (
        <>
          <p className="text-[12px] font-bold leading-tight text-slate-600">{label}</p>
          <p className={cn("text-[14px] font-extrabold text-[color:var(--navy)]", valueClassName)}>{value}</p>
        </>
      )}
    </div>
  );
}

function DashboardSummarySection({
  title,
  icon: Icon,
  children,
  footer
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <DashboardCard className="min-h-[180px]">
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[color:var(--surface-muted)] text-[color:var(--blue)]">
            <Icon className="h-4.5 w-4.5" />
          </div>
          <CardTitle className="pt-0.5 text-[16px] uppercase !text-[color:var(--blue)]">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-3 pt-0">
        {children}
        {footer}
      </CardContent>
    </DashboardCard>
  );
}

function ResourceCenter({ dashboard }: { dashboard: Dashboard }) {
  const icons = [CalendarDays, CircleHelp, MessageSquare];

  return (
    <DashboardSummarySection
      title="Resource Center"
      icon={CircleHelp}
      footer={
        <div className="grid gap-1.5">
          <Button href="/department/resources" variant="ghost" className="min-h-7 w-fit justify-self-center px-0 text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
            Explore All Resources
          </Button>
        </div>
      }
    >
      <div className="grid gap-1.5">
        {dashboard.resourceCenter.map((resource, index) => {
          const Icon = icons[index] ?? CircleHelp;

          return (
            <a
              key={resource.label}
              href={resource.href}
              className="flex items-center justify-between gap-2 rounded-md p-1 transition hover:bg-[color:var(--surface-muted)]"
            >
              <span className="flex min-w-0 items-center gap-2">
                <Icon className="h-6 w-6 shrink-0 !text-[color:var(--blue)]" />
                <span className="min-w-0">
                  <span className="block text-[12px] font-extrabold leading-tight text-[color:var(--blue)]">{resource.label}</span>
                  <span className="block text-[11px] font-bold leading-5 text-[color:var(--muted)]">{resource.detail}</span>
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[color:var(--blue)]" />
            </a>
          );
        })}
      </div>
    </DashboardSummarySection>
  );
}

function AccountStatusSummary({ dashboard }: { dashboard: Dashboard }) {
  const departmentStatusLabel = toStartCase(dashboard.accountStatusLabel);
  const membershipStatusLabel = toStartCase(dashboard.membershipStatus);
  const isDepartmentActive = dashboard.accountStatusLabel.toLowerCase() === "active";
  const isMembershipActive = dashboard.membershipStatus.toLowerCase() === "active";

  return (
    <DashboardSummarySection
      title="Account Status"
      icon={ShieldCheck}
      footer={
        <Button href="/department/billing" variant="ghost" className="min-h-7 w-fit !justify-start !px-0 text-left text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
          Renew Membership
        </Button>
      }
    >
      <DashboardMetricRow
        label="Department status"
        value={departmentStatusLabel}
        valueClassName={cn(isDepartmentActive && "text-[color:var(--success)]")}
      />
      <DashboardMetricRow label="Membership plan" value={dashboard.membershipPlanLabel} />
      <DashboardMetricRow label="Renews on" value={dashboard.planRenewsAtLabel} />
      <DashboardMetricRow
        label="Membership state"
        value={membershipStatusLabel}
        valueClassName={cn(isMembershipActive && "text-[color:var(--success)]")}
      />
    </DashboardSummarySection>
  );
}

function BadgeCreditSummary({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSummarySection
      title="Badge Credit"
      icon={CreditCardIcon}
      footer={
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button href="/department/billing" variant="secondary" className="!min-h-8 !text-[12px]">
            Add Credits
          </Button>
          <Button href="/department/badge-pool" variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
            Browse Badge Pool
          </Button>
        </div>
      }
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <DashboardMetricRow label="Remaining" value={dashboard.badgeCreditsRemaining} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
        <DashboardMetricRow label="Used this cycle" value={`${dashboard.badgeCreditsSent} / ${dashboard.monthlyBadgeCreditLimit}`} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
      </div>
      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-[color:var(--gold)]" style={{ width: `${dashboard.badgeUsagePercent}%` }} />
      </div>
      {dashboard.badgeCreditsRemaining <= 2 ? (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-[12px] font-bold text-amber-800">
          {dashboard.badgeCreditsRemaining === 0 ? "No badge credits remaining." : `${dashboard.badgeCreditsRemaining} badge credits remaining.`}
        </p>
      ) : null}
    </DashboardSummarySection>
  );
}

function ActiveJobsSummary({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSummarySection
      title="Active Jobs / Job Posts"
      icon={BriefcaseBusiness}
      footer={
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button href="/department/jobs" variant="secondary" className="!min-h-8 !text-[12px]">
            Manage Job Posts
          </Button>
          <Button href="/department/jobs" variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
            Create Job Post
          </Button>
        </div>
      }
    >
      <div className="grid gap-2 sm:grid-cols-3">
        <DashboardMetricRow label="Active" value={dashboard.activeJobs} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
        <DashboardMetricRow label="Pending approval" value={dashboard.pendingJobs} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
        <DashboardMetricRow label="Drafts" value={dashboard.draftJobs} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
      </div>
      <p className="mt-3 text-[12px] font-semibold text-slate-600">{dashboard.jobApprovalSummary}</p>
    </DashboardSummarySection>
  );
}

function ApplicantPoolsSummary({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSummarySection
      title="Applicant Pools"
      icon={FolderKanban}
      footer={
        <Button href="/department/applicant-pools" variant="ghost" className="min-h-7 w-fit !justify-start !px-0 text-left text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
          View All Applicants
        </Button>
      }
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <DashboardMetricRow label="Combined applicants" value={dashboard.applicantCount} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
        <DashboardMetricRow label="New applications" value={dashboard.newApplicants} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <DashboardMetricRow label="Direct applications" value={dashboard.directApplications} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
        <DashboardMetricRow label="Accepted badges" value={dashboard.acceptedBadges} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
      </div>
    </DashboardSummarySection>
  );
}

function DepartmentProfileSummary({ dashboard }: { dashboard: Dashboard }) {
  const profileStatusLabel = toStartCase(dashboard.profileApprovalStatusLabel);

  return (
    <DashboardSummarySection
      title="Department Profile"
      icon={Building2}
      footer={
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button href="/department/profile" variant="secondary" className="!min-h-8 !text-[12px]">
            Edit Profile
          </Button>
          <Button href="/department/profile" variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
            View Approval Status
          </Button>
        </div>
      }
    >
      <DashboardMetricRow
        label="Profile status"
        value={profileStatusLabel}
        valueClassName="text-[color:var(--success)]"
      />
      <p className="rounded-md bg-slate-50 px-3 py-2 text-[12px] font-semibold text-slate-600">{dashboard.profileApprovalDetail}</p>
    </DashboardSummarySection>
  );
}

function NotificationsSummary({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSummarySection
      title="Notifications"
      icon={Bell}
      footer={
        <Button href="/department/notifications" variant="ghost" className="min-h-7 w-fit !justify-start !px-0 text-left text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
          View All Notifications
        </Button>
      }
    >
      <DashboardMetricRow
        label="Unread notifications"
        value={dashboard.unreadNotifications}
        valueClassName="text-[28px] text-[color:var(--blue-deep)]"
        labelClassName="text-[color:var(--blue-deep)]"
        className="border-[color:var(--blue)]/20 bg-[color:var(--surface-muted)] shadow-[0_1px_2px_rgba(37,99,235,0.08)]"
      />
      <div className="grid gap-2">
        {dashboard.notifications.slice(0, 2).map((notification) => (
          <a key={notification.id} href={notification.linkHref} className="rounded-md border border-[color:var(--border-muted)] px-3 py-2 transition hover:bg-[color:var(--surface-muted)]">
            <p className="text-[12px] font-bold text-[color:var(--navy)]">{notification.title}</p>
            <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-600">{notification.createdAtLabel}</p>
          </a>
        ))}
      </div>
    </DashboardSummarySection>
  );
}

function MessageCenterSummary({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSummarySection
      title="Message Center Summary"
      icon={MessageSquare}
      footer={
        <Button href="/department/messages" variant="ghost" className="min-h-7 w-fit !justify-start !px-0 text-left text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
          Open Messages
        </Button>
      }
    >
      <DashboardMetricRow
        label="Unread threads"
        value={dashboard.unreadMessages}
        valueClassName="text-[28px] text-[color:var(--blue-deep)]"
        labelClassName="text-[color:var(--blue-deep)]"
        className="border-[color:var(--blue)]/20 bg-[color:var(--surface-muted)] shadow-[0_1px_2px_rgba(37,99,235,0.08)]"
      />
      <p className="text-[12px] font-semibold leading-5 text-slate-600">Department Admin can send messages and manage templates. Department Users can review history and templates only.</p>
    </DashboardSummarySection>
  );
}

function RecentActivitySummary({ dashboard }: { dashboard: Dashboard }) {
  const activityStats = [
    {
      label: "Submitted applications",
      value: dashboard.applicantActivity.submittedApplications,
      change: dashboard.applicantActivity.submittedChangePercent,
      icon: ClipboardList
    },
    {
      label: "Accepted badges",
      value: dashboard.applicantActivity.acceptedBadges,
      change: dashboard.applicantActivity.acceptedChangePercent,
      icon: ShieldAlert
    }
  ];

  return (
    <DashboardSummarySection
      title="Recent Activity"
      icon={ClipboardList}
      footer={
        <Button href="/department/applicant-pools" variant="ghost" className="min-h-7 w-fit !justify-start !px-0 text-left text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
          View All Recent Activity
        </Button>
      }
    >
      <div className="grid gap-2">
        {activityStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="rounded-md border border-[color:var(--border-muted)] p-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[color:var(--surface-muted)] text-[color:var(--blue)]">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[26px] font-semibold leading-none text-[color:var(--navy)]">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-extrabold leading-tight text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-[12px] font-bold text-[color:var(--success)]">+{stat.change}% vs prior 30 days</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardSummarySection>
  );
}

export function DepartmentDashboard() {
  const dashboard = getMockDepartmentDashboard();

  return (
    <div className="grid gap-5">
      <header className="grid gap-1">
        <h1 className="text-[28px] font-extrabold leading-none tracking-normal text-[color:var(--navy)] sm:text-[34px]">
          Welcome back, {dashboard.adminName.split(" ")[0]}.
        </h1>
        <p className="text-[12px] font-bold text-[color:var(--blue)] sm:text-[14px]">
          {dashboard.departmentName} <span className="mx-1 text-slate-400">•</span> Member since {dashboard.memberSinceLabel}{" "}
          <span className="mx-1 text-slate-400">•</span> Membership {dashboard.membershipStatus}
        </p>
      </header>

      {dashboard.restrictedState ? <RestrictedState title={dashboard.restrictedState.title} description={dashboard.restrictedState.description} /> : null}

      <div className="grid gap-4 xl:grid-cols-3">
        <AccountStatusSummary dashboard={dashboard} />
        <BadgeCreditSummary dashboard={dashboard} />
        <ActiveJobsSummary dashboard={dashboard} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <ApplicantPoolsSummary dashboard={dashboard} />
        <DepartmentProfileSummary dashboard={dashboard} />
        <NotificationsSummary dashboard={dashboard} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <MessageCenterSummary dashboard={dashboard} />
        <ResourceCenter dashboard={dashboard} />
        <RecentActivitySummary dashboard={dashboard} />
      </div>
    </div>
  );
}
