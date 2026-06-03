"use client";

import { useEffect, useState } from "react";
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
import { getCurrentMockRole } from "@/lib/auth/mock-session";
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

function DashboardStateBox({
  title,
  description,
  tone = "neutral"
}: {
  title: string;
  description: string;
  tone?: "neutral" | "warning" | "danger";
}) {
  return (
    <div
      className={cn(
        "grid gap-1.5 rounded-md border px-3 py-3",
        tone === "warning" && "border-amber-200 bg-amber-50",
        tone === "danger" && "border-rose-200 bg-rose-50",
        tone === "neutral" && "border-[color:var(--border-muted)] bg-slate-50"
      )}
    >
      <p
        className={cn(
          "text-[12px] font-bold",
          tone === "warning" && "text-amber-800",
          tone === "danger" && "text-rose-700",
          tone === "neutral" && "text-[color:var(--navy)]"
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "text-[11px] font-semibold leading-5",
          tone === "warning" && "text-amber-800",
          tone === "danger" && "text-rose-700",
          tone === "neutral" && "text-slate-600"
        )}
      >
        {description}
      </p>
    </div>
  );
}

function DashboardEmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-dashed border-[color:var(--border-muted)] px-3 py-4 text-[12px] font-semibold leading-5 text-slate-500">
      {message}
    </div>
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
  const isDepartmentExpired = dashboard.accountStatusLabel.toLowerCase() === "expired";
  const isDepartmentPending = dashboard.accountStatusLabel.toLowerCase() === "pending approval";
  const warningToneClassName = isDepartmentExpired
    ? "border-rose-200 bg-rose-50 text-rose-700"
    : isDepartmentPending
      ? "border-amber-200 bg-amber-50 text-amber-800"
      : "border-amber-200 bg-amber-50 text-amber-800";

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
      {dashboard.renewalWarningLabel ? (
        <div className={cn("rounded-md border px-3 py-2 text-[12px] font-semibold", warningToneClassName)}>
          {dashboard.renewalWarningLabel}
        </div>
      ) : null}
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
      {dashboard.accountRestrictions.length > 0 ? (
        <div className="grid gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-3">
          <p className="text-[12px] font-bold text-rose-700">Restricted while expired</p>
          <div className="grid gap-1.5">
            {dashboard.accountRestrictions.map((restriction) => (
              <p key={restriction} className="text-[11px] font-semibold text-rose-700">
                {restriction}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </DashboardSummarySection>
  );
}

function BadgeCreditSummary({ dashboard }: { dashboard: Dashboard }) {
  const badgeWarningToneClassName = dashboard.badgeCreditsRemaining === 0
    ? "border-rose-200 bg-rose-50 text-rose-700"
    : "border-amber-200 bg-amber-50 text-amber-800";

  return (
    <DashboardSummarySection
      title="Badge Credit"
      icon={CreditCardIcon}
      footer={
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button href="/department/billing" variant="secondary" className="!min-h-8 !text-[12px]">
            Add Credits
          </Button>
          {dashboard.badgePoolActionDisabled ? (
            <Button type="button" variant="ghost" className="!min-h-8 !text-[12px] !font-bold" disabled>
              Browse Badge Pool
            </Button>
          ) : (
            <Button href="/department/badge-pool" variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
              Browse Badge Pool
            </Button>
          )}
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
      {dashboard.badgeCreditWarningLabel ? (
        <p className={cn("rounded-md border px-3 py-2 text-[12px] font-bold", badgeWarningToneClassName)}>
          {dashboard.badgeCreditWarningLabel}
        </p>
      ) : null}
      {dashboard.badgePoolActionDisabledReason ? (
        <p className="text-[11px] font-semibold text-slate-600">
          {dashboard.badgePoolActionDisabledReason}
        </p>
      ) : null}
    </DashboardSummarySection>
  );
}

function ActiveJobsSummary({ dashboard }: { dashboard: Dashboard }) {
  const isExpired = dashboard.accountStatusLabel.toLowerCase() === "expired";
  const secondaryJobStats = [
    dashboard.revisionsNeededJobs > 0 ? { label: "Revisions needed", value: dashboard.revisionsNeededJobs } : null,
    dashboard.inactiveJobs > 0 ? { label: "Closed / inactive", value: dashboard.inactiveJobs } : null
  ].filter((item): item is { label: string; value: number } => Boolean(item));

  return (
    <DashboardSummarySection
      title="Active Jobs / Job Posts"
      icon={BriefcaseBusiness}
      footer={
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button href="/department/jobs" variant="secondary" className="!min-h-8 !text-[12px]">
            Manage Job Posts
          </Button>
          {isExpired ? (
            <Button href="/department/billing" variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
              Renew Membership
            </Button>
          ) : (
            <Button href="/department/jobs/new" variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
              Create Job Post
            </Button>
          )}
        </div>
      }
    >
      <div className="grid gap-2 sm:grid-cols-3">
        <DashboardMetricRow label="Active" value={dashboard.activeJobs} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
        <DashboardMetricRow label="Pending approval" value={dashboard.pendingJobs} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
        <DashboardMetricRow label="Drafts" value={dashboard.draftJobs} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
      </div>
      {secondaryJobStats.length > 0 ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {secondaryJobStats.map((stat) => (
            <DashboardMetricRow
              key={stat.label}
              label={stat.label}
              value={stat.value}
              valueClassName="text-[28px]"
              labelClassName="text-[11px] whitespace-nowrap"
              stacked
            />
          ))}
        </div>
      ) : null}
      {dashboard.isPendingApproval ? (
        <DashboardStateBox
          title="Recruiting unlocks after approval"
          description="You can keep working on drafts now. Active job publishing and applicant-pool access start once GB Admin approves the department."
          tone="warning"
        />
      ) : isExpired ? (
        <DashboardStateBox
          title="Recruiting actions restricted while expired"
          description="Existing job posts remain visible, but creating new job posts and active recruiting actions are blocked until membership is renewed."
          tone="danger"
        />
      ) : null}
      {dashboard.activeJobLinks.length > 0 ? (
        <p className="text-[12px] font-semibold text-slate-600">Most recent active jobs</p>
      ) : null}
      {dashboard.activeJobLinks.length > 0 ? (
        <div className="grid gap-2">
          {dashboard.activeJobLinks.map((job) => (
            <a
              key={job.id}
              href={job.href}
              className="flex items-center justify-between gap-3 rounded-md border border-[color:var(--border-muted)] px-3 py-2 transition hover:bg-[color:var(--surface-muted)]"
            >
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-bold text-[color:var(--navy)]">{job.title}</span>
                <span className="block text-[11px] font-semibold text-slate-500">Open Applicant Pool</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[color:var(--blue)]" />
            </a>
          ))}
        </div>
      ) : dashboard.activeJobs === 0 ? (
        <DashboardEmptyState
          message={
            dashboard.isPendingApproval
              ? "No live job posts yet. Create and save drafts while approval is pending."
              : "No active job posts yet. Create a new job post to start recruiting."
          }
        />
      ) : null}
      <p className="text-[12px] font-semibold text-slate-600">{dashboard.jobApprovalSummary}</p>
    </DashboardSummarySection>
  );
}

function ApplicantPoolsSummary({ dashboard }: { dashboard: Dashboard }) {
  const isExpired = dashboard.accountStatusLabel.toLowerCase() === "expired";

  return (
    <DashboardSummarySection
      title="Applicant Pools"
      icon={FolderKanban}
      footer={
        dashboard.isPendingApproval ? null : (
          <Button href="/department/applicant-pools" variant="ghost" className="min-h-7 w-fit !justify-start !px-0 text-left text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
            View All Applicants
          </Button>
        )
      }
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <DashboardMetricRow label="Combined applicants" value={dashboard.applicantCount} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
        <DashboardMetricRow label="New applications" value={dashboard.newApplicants} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <DashboardMetricRow label="Active applicants" value={dashboard.activeApplicants} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
        <DashboardMetricRow label="Archived records" value={dashboard.archivedApplicants} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <DashboardMetricRow label="Direct applications" value={dashboard.directApplications} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
        <DashboardMetricRow label="Accepted badges" value={dashboard.acceptedBadges} valueClassName="text-[34px]" labelClassName="text-[11px] whitespace-nowrap" stacked />
      </div>
      {dashboard.isPendingApproval ? (
        <DashboardStateBox
          title="Applicant pools unlock after approval"
          description="Applications and per-job pools will appear once the department is approved and jobs are live."
          tone="warning"
        />
      ) : isExpired ? (
        <DashboardStateBox
          title="Contact details hidden while expired"
          description="You can still review applicant records, but candidate contact information and exported contact data remain hidden until membership is renewed."
          tone="danger"
        />
      ) : null}
      {dashboard.applicantPoolJobLinks.length > 0 ? (
        <>
          <p className="text-[12px] font-semibold text-slate-600">Applicant pools by job</p>
          <div className="grid gap-2">
            {dashboard.applicantPoolJobLinks.map((job) => (
              <a
                key={job.id}
                href={job.href}
                className="flex items-center justify-between gap-3 rounded-md border border-[color:var(--border-muted)] px-3 py-2 transition hover:bg-[color:var(--surface-muted)]"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[12px] font-bold text-[color:var(--navy)]">{job.title}</span>
                  <span className="block text-[11px] font-semibold text-slate-500">{job.applicantCount} active applicant{job.applicantCount === 1 ? "" : "s"}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[color:var(--blue)]" />
              </a>
            ))}
          </div>
        </>
      ) : dashboard.applicantCount === 0 ? (
        <DashboardEmptyState
          message={
            dashboard.isPendingApproval
              ? "No applicant pools yet. Approval and live job posts are required before candidate activity begins."
              : "No applicant activity yet. Applicant pools will populate as direct applications and Badge responses arrive."
          }
        />
      ) : null}
    </DashboardSummarySection>
  );
}

function DepartmentProfileSummary({ dashboard }: { dashboard: Dashboard }) {
  const rawProfileStatus = dashboard.profileApprovalStatusLabel.toLowerCase();
  const profileStatusLabel = toStartCase(dashboard.profileApprovalStatusLabel);
  const profileStatusToneClassName =
    rawProfileStatus === "approved" || rawProfileStatus === "active"
      ? "text-[color:var(--success)]"
      : rawProfileStatus === "pending_approval"
        ? "text-amber-700"
        : rawProfileStatus === "revisions_needed"
          ? "text-rose-700"
          : "text-slate-700";
  const canViewPublicProfile = ["approved", "active"].includes(rawProfileStatus);
  const shouldShowSubmitAction = rawProfileStatus === "draft";
  const shouldShowApprovalRequested = rawProfileStatus === "pending_approval" && dashboard.profileApprovalRequestedAtLabel;
  const shouldShowPublishedDate = canViewPublicProfile && dashboard.profilePublishedAtLabel;
  const shouldShowApprovalNotes = rawProfileStatus === "revisions_needed" && dashboard.profileApprovalNotes;

  return (
    <DashboardSummarySection
      title="Department Profile"
      icon={Building2}
      footer={
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button href="/department/profile" variant="secondary" className="!min-h-8 !text-[12px]">
            Edit Profile
          </Button>
          {canViewPublicProfile ? (
            <Button href={`/departments/${dashboard.department.slug}`} variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
              View Public Profile
            </Button>
          ) : shouldShowSubmitAction ? (
            <Button href="/department/profile/edit" variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
              Submit for Approval
            </Button>
          ) : (
            <Button href="/department/profile" variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
              View Approval Status
            </Button>
          )}
        </div>
      }
    >
      <DashboardMetricRow
        label="Profile status"
        value={profileStatusLabel}
        valueClassName={profileStatusToneClassName}
      />
      {shouldShowApprovalRequested ? (
        <DashboardMetricRow label="Approval requested" value={dashboard.profileApprovalRequestedAtLabel} />
      ) : null}
      {shouldShowPublishedDate ? (
        <DashboardMetricRow label="Published date" value={dashboard.profilePublishedAtLabel} />
      ) : null}
      <p className="rounded-md bg-slate-50 px-3 py-2 text-[12px] font-semibold text-slate-600">{dashboard.profileApprovalDetail}</p>
      {shouldShowApprovalNotes ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
          <p className="text-[11px] font-bold text-amber-800">GB Admin notes</p>
          <p className="mt-1 text-[11px] font-semibold text-amber-900">{dashboard.profileApprovalNotes}</p>
        </div>
      ) : null}
    </DashboardSummarySection>
  );
}

function NotificationsSummary({ dashboard }: { dashboard: Dashboard }) {
  const isExpired = dashboard.accountStatusLabel.toLowerCase() === "expired";
  const isPendingApproval = dashboard.accountStatusLabel.toLowerCase() === "pending approval";

  return (
    <DashboardSummarySection
      title="Notifications"
      icon={Bell}
      footer={
        isExpired ? (
          <Button href="/department/billing" variant="ghost" className="min-h-7 w-fit !justify-start !px-0 text-left text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
            Renew Membership
          </Button>
        ) : isPendingApproval ? null : (
          <Button href="/department/notifications" variant="ghost" className="min-h-7 w-fit !justify-start !px-0 text-left text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
            View All Notifications
          </Button>
        )
      }
    >
      {isExpired ? (
        <div className="grid gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-3">
          <p className="text-[12px] font-bold text-rose-700">Notifications unavailable while membership is expired.</p>
          <p className="text-[11px] font-semibold leading-5 text-rose-700">Renew membership to receive application, Badge, and candidate activity alerts again.</p>
        </div>
      ) : isPendingApproval ? (
        <DashboardStateBox
          title="Notifications start after approval"
          description="This department is still under review. Application, Badge, and candidate alerts will appear here after approval."
          tone="warning"
        />
      ) : (
        <>
          <DashboardMetricRow
            label="Unread notifications"
            value={dashboard.unreadNotifications}
            valueClassName="text-[28px] text-[color:var(--blue-deep)]"
            labelClassName="text-[color:var(--blue-deep)]"
            className="border-[color:var(--blue)]/20 bg-[color:var(--surface-muted)] shadow-[0_1px_2px_rgba(37,99,235,0.08)]"
          />
          {dashboard.notifications.length > 0 ? (
            <div className="grid gap-2">
              {dashboard.notifications.slice(0, 3).map((notification) => (
                <a key={notification.id} href={notification.linkHref} className="rounded-md border border-[color:var(--border-muted)] px-3 py-2 transition hover:bg-[color:var(--surface-muted)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[12px] font-bold text-[color:var(--navy)]">{notification.title}</p>
                      <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-600">{notification.body}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-2">
                      {notification.isUnread ? (
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--blue)]" />
                      ) : null}
                      <ChevronRight className="mt-0.5 h-4 w-4 text-[color:var(--blue)]" />
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] font-semibold text-slate-500">{notification.createdAtLabel}</p>
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-[color:var(--border-muted)] px-3 py-4 text-[12px] font-semibold text-slate-500">
              No recent notifications.
            </div>
          )}
        </>
      )}
    </DashboardSummarySection>
  );
}

function MessageCenterSummary({ dashboard }: { dashboard: Dashboard }) {
  const isExpired = dashboard.accountStatusLabel.toLowerCase() === "expired";
  const isPendingApproval = dashboard.accountStatusLabel.toLowerCase() === "pending approval";
  const isDepartmentAdmin = dashboard.adminRoleLabel.toLowerCase() === "department admin";
  const isDepartmentUser = dashboard.adminRoleLabel.toLowerCase() === "department user";

  return (
    <DashboardSummarySection
      title="Message Center Summary"
      icon={MessageSquare}
      footer={
        isExpired ? (
          <Button href="/department/billing" variant="ghost" className="min-h-7 w-fit !justify-start !px-0 text-left text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
            Renew Membership
          </Button>
        ) : isPendingApproval ? null : (
          <div className="grid gap-2 sm:grid-cols-2">
            <Button href="/department/messages" variant="secondary" className="!min-h-8 !text-[12px]">
              Open Messages
            </Button>
            {isDepartmentAdmin ? (
              <Button href="/department/messages" variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
                Send Message
              </Button>
            ) : (
              <Button href="/department/messages" variant="ghost" className="!min-h-8 !text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
                View Templates
              </Button>
            )}
          </div>
        )
      }
    >
      {isExpired ? (
        <div className="grid gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-3">
          <p className="text-[12px] font-bold text-rose-700">Messages unavailable while membership is expired.</p>
          <p className="text-[11px] font-semibold leading-5 text-rose-700">Renew membership to resume candidate conversations and message templates.</p>
        </div>
      ) : isPendingApproval ? (
        <DashboardStateBox
          title="Message Center unlocks after approval"
          description="Candidate conversations and template actions become available once the department is approved."
          tone="warning"
        />
      ) : (
        <>
          <DashboardMetricRow
            label="Unread threads"
            value={dashboard.unreadThreads}
            valueClassName="text-[28px] text-[color:var(--blue-deep)]"
            labelClassName="text-[color:var(--blue-deep)]"
            className="border-[color:var(--blue)]/20 bg-[color:var(--surface-muted)] shadow-[0_1px_2px_rgba(37,99,235,0.08)]"
          />
          <p className="text-[12px] font-semibold leading-5 text-slate-600">
            {dashboard.unreadMessages} unread message{dashboard.unreadMessages === 1 ? "" : "s"} across {dashboard.unreadThreads} candidate thread{dashboard.unreadThreads === 1 ? "" : "s"}.
          </p>
          {dashboard.messageThreadPreviews.length > 0 ? (
            <div className="grid gap-2">
              {dashboard.messageThreadPreviews.map((thread) => (
                <a key={thread.id} href={thread.href} className="rounded-md border border-[color:var(--border-muted)] px-3 py-2 transition hover:bg-[color:var(--surface-muted)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-bold text-[color:var(--navy)]">{thread.subject}</p>
                      <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-600">{thread.candidateName}</p>
                    </div>
                    {thread.unreadCount > 0 ? (
                      <span className="inline-flex shrink-0 rounded-full bg-[color:var(--surface-muted)] px-2 py-0.5 text-[10px] font-bold text-[color:var(--blue)]">
                        {thread.unreadCount} new
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 text-[11px] font-semibold text-slate-500">{thread.lastMessageLabel}</p>
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-[color:var(--border-muted)] px-3 py-4 text-[12px] font-semibold text-slate-500">
              No recent candidate responses.
            </div>
          )}
          {isDepartmentUser ? (
            <DashboardStateBox
              title="View-only Message Center access"
              description="Department Users can review conversation history and template content here, but sending messages and creating templates is disabled."
            />
          ) : isDepartmentAdmin ? (
            <p className="text-[12px] font-semibold leading-5 text-slate-600">
              You can send messages and manage department templates.
            </p>
          ) : null}
        </>
      )}
    </DashboardSummarySection>
  );
}

function RecentActivitySummary({ dashboard }: { dashboard: Dashboard }) {
  const isExpired = dashboard.accountStatusLabel.toLowerCase() === "expired";
  const isPendingApproval = dashboard.accountStatusLabel.toLowerCase() === "pending approval";
  const activityIconByType = {
    direct_application_received: ClipboardList,
    badge_accepted: ShieldAlert,
    profile_returned: Building2,
    message_response: MessageSquare
  } as const;

  return (
    <DashboardSummarySection
      title="Recent Activity"
      icon={ClipboardList}
      footer={
        isPendingApproval ? null : (
          <Button href="/department/applicant-pools" variant="ghost" className="min-h-7 w-fit !justify-start !px-0 text-left text-[12px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
            View All Recent Activity
          </Button>
        )
      }
    >
      {isExpired ? (
        <p className="text-[12px] font-semibold leading-5 text-slate-600">Showing recent historical department activity. New notification-driven activity resumes after renewal.</p>
      ) : isPendingApproval ? (
        <DashboardStateBox
          title="Recent activity starts after approval"
          description="You will see candidate, Badge, profile, and message events here once the department is approved and active."
          tone="warning"
        />
      ) : null}
      {dashboard.recentActivity.length > 0 ? (
        <div className="grid gap-2">
          {dashboard.recentActivity.map((item) => {
            const Icon = activityIconByType[item.type as keyof typeof activityIconByType] ?? ClipboardList;

            return (
              <a
                key={item.id}
                href={item.href}
                className="flex items-start justify-between gap-3 rounded-md border border-[color:var(--border-muted)] px-3 py-2 transition hover:bg-[color:var(--surface-muted)]"
              >
                <span className="flex min-w-0 items-start gap-2.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[color:var(--surface-muted)] text-[color:var(--blue)]">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-bold text-[color:var(--navy)]">{item.title}</span>
                    <span className="mt-1 block text-[11px] font-semibold leading-4 text-slate-600">{item.detail}</span>
                    <span className="mt-1.5 block text-[11px] font-semibold text-slate-500">{item.occurredAtLabel}</span>
                  </span>
                </span>
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[color:var(--blue)]" />
              </a>
            );
          })}
        </div>
      ) : (
        <DashboardEmptyState
          message={
            isPendingApproval
              ? "No dashboard activity yet. Candidate and recruiting events will begin after department approval."
              : "No recent activity yet."
          }
        />
      )}
    </DashboardSummarySection>
  );
}

export function DepartmentDashboard() {
  const [departmentRole, setDepartmentRole] = useState<"department_admin" | "department_user">("department_admin");
  const dashboard = getMockDepartmentDashboard(departmentRole);
  const membershipStatusLabel = toStartCase(dashboard.membershipStatus);
  const accountStatusLabel = toStartCase(dashboard.accountStatusLabel);
  const isMembershipActive = dashboard.membershipStatus.toLowerCase() === "active";
  const isAccountActive = dashboard.accountStatusLabel.toLowerCase() === "active";
  const isAccountPending = dashboard.accountStatusLabel.toLowerCase() === "pending approval";

  useEffect(() => {
    const nextRole = getCurrentMockRole(["department_admin", "department_user"]);
    if (nextRole === "department_admin" || nextRole === "department_user") {
      setDepartmentRole(nextRole);
    }
  }, []);

  return (
    <div className="grid gap-5">
      <header className="grid gap-3">
        <h1 className="text-[28px] font-extrabold leading-none tracking-normal text-[color:var(--navy)] sm:text-[34px]">
          Welcome back, {dashboard.adminName.split(" ")[0]}.
        </h1>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-muted)] bg-white px-3 py-1.5 text-[12px] font-semibold text-[color:var(--blue-deep)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:text-[13px]">
            <Building2 className="h-3.5 w-3.5 text-[color:var(--blue)]" />
            {dashboard.departmentName}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-muted)] bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-600 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:text-[13px]">
            <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
            Member since {dashboard.memberSinceLabel}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:text-[13px]",
              isMembershipActive
                ? "border-emerald-200 bg-emerald-50 text-[color:var(--success)]"
                : "border-amber-200 bg-amber-50 text-amber-800"
            )}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Membership {membershipStatusLabel}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:text-[13px]",
              isAccountActive
                ? "border-emerald-200 bg-emerald-50 text-[color:var(--success)]"
                : isAccountPending
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-rose-200 bg-rose-50 text-rose-700"
            )}
          >
            {isAccountActive ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
            Department {accountStatusLabel}
          </span>
        </div>
      </header>

      {dashboard.pendingState ? <DashboardStateBox title={dashboard.pendingState.title} description={dashboard.pendingState.description} tone="warning" /> : null}
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
