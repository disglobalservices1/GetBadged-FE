import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  CreditCard,
  Filter,
  MapPin,
  MessageSquare,
  PlusCircle,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  UserPlus
} from "lucide-react";
import { RestrictedState } from "@/components/common/restricted-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMockDepartmentDashboard } from "@/features/department/dashboard/get-mock-department-dashboard";
import { cn } from "@/lib/utils/cn";

type Dashboard = ReturnType<typeof getMockDepartmentDashboard>;

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

function MembershipSnapshot({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardCard className="flex min-h-[180px] flex-col">
      <CardContent className="flex flex-1 flex-col justify-between gap-4 !p-4">
        <div className="flex items-start gap-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center text-[color:var(--navy)]">
            <ShieldCheck className="h-14 w-12 shrink-0" preserveAspectRatio="xMidYMid meet" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-extrabold uppercase leading-tight text-[color:var(--blue)]">Membership Snapshot</p>
            <p className="mt-1 text-[12px] font-bold leading-tight text-[color:var(--navy)]">
              {dashboard.membershipPlanLabel} <span className="mx-1 text-slate-300">•</span>
              <span className="text-[color:var(--success)]">{dashboard.membershipStatus}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:ml-[2.25rem] sm:w-[calc(100%-2.25rem)] sm:grid-cols-[minmax(0,0.8fr)_1px_minmax(0,1fr)] sm:items-center">
          <div>
            <p className="text-[32px] font-semibold leading-none text-[color:var(--navy)]">
              {dashboard.badgeCreditsSent}
              <span className="text-base font-bold text-slate-500"> / {dashboard.monthlyBadgeCreditLimit}</span>
            </p>
            <p className="mt-1 text-[10px] font-bold leading-tight text-slate-600">Badge Tokens Used</p>
          </div>
          <div className="hidden h-9 bg-[color:var(--border-muted)] sm:block" />
          <div>
            <p className="text-[32px] font-semibold leading-none text-[color:var(--navy)]">{dashboard.badgeCreditsRemaining}</p>
            <p className="mt-1 text-[10px] font-bold leading-tight text-slate-600">Badge Tokens Remaining</p>
          </div>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-[color:var(--gold)]" style={{ width: `${dashboard.badgeUsagePercent}%` }} />
        </div>

        <div className="grid grid-cols-[1.25fr_1.35fr_1.25fr] gap-1.5">
          <a
            href="/department/membership-billing"
            className="inline-flex h-8 min-w-0 items-center justify-center whitespace-nowrap rounded border border-[color:var(--border-muted)] px-1 text-[8.5px] font-extrabold leading-none text-[color:var(--blue-deep)] transition hover:bg-blue-50"
          >
            Membership Details
          </a>
          <a
            href="/department/membership-billing"
            className="inline-flex h-8 min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded border border-[color:var(--border-muted)] px-1 text-[8.5px] font-extrabold leading-none text-[color:var(--blue-deep)] transition hover:bg-blue-50"
          >
            <CalendarDays className="h-2.5 w-2.5 shrink-0" />
            Renew Membership
          </a>
          <a
            href="/department/membership-billing"
            className="inline-flex h-8 min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded bg-[color:var(--gold)] px-1 text-[8.5px] font-extrabold leading-none text-[color:var(--navy)] transition hover:brightness-95"
          >
            <CreditCard className="h-2.5 w-2.5 shrink-0" />
            Buy More Badges
          </a>
        </div>
      </CardContent>
    </DashboardCard>
  );
}

function ApplicantActivity({ dashboard }: { dashboard: Dashboard }) {
  const activityStats = [
    {
      label: "Submitted Applications",
      value: dashboard.applicantActivity.submittedApplications,
      change: dashboard.applicantActivity.submittedChangePercent,
      icon: ClipboardList
    },
    {
      label: "Accepted Badges",
      value: dashboard.applicantActivity.acceptedBadges,
      change: dashboard.applicantActivity.acceptedChangePercent,
      icon: ShieldCheck
    }
  ];

  return (
    <DashboardCard className="min-h-[180px]">
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-[13px] uppercase !text-[color:var(--blue)]">
          Applicant Activity <span className="text-[11px] text-slate-500">(Last 30 Days)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 p-3 pt-0">
        <div className="grid gap-2 sm:grid-cols-2">
          {activityStats.map((stat) => (
            <div key={stat.label} className="rounded-md border border-[color:var(--border-muted)] p-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 self-start items-center justify-center rounded-md text-[color:var(--blue)]">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="min-w-0">
                  <p className="text-[28px] font-semibold leading-none text-[color:var(--navy)]">{stat.value}</p>
                  <p className="mt-1.5 text-[8.5px] font-extrabold leading-2.5 text-slate-500">{stat.label}</p>
                  <p className="mt-2.5 text-[10px] font-bold text-[color:var(--success)]">^ {stat.change}%</p>
                  <p className="mt-0.5 text-[9px] font-semibold leading-tight text-slate-500">vs prior 30 days</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button href="/department/applicants" variant="ghost" className="min-h-7 w-full !justify-start !px-0 text-left text-[10px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3 w-3" />}>
          View All Recent Activity
        </Button>
      </CardContent>
    </DashboardCard>
  );
}

function ResourceCenter({ dashboard }: { dashboard: Dashboard }) {
  const icons = [CalendarDays, CircleHelp, MessageSquare];

  return (
    <DashboardCard className="min-h-[180px]">
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-[13px] uppercase !text-[color:var(--blue)]">Resource Center</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 p-3 pt-0">
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
                    <span className="block text-[10px] font-extrabold leading-tight text-[color:var(--blue)]">{resource.label}</span>
                    <span className="block text-[9px] font-bold leading-6 text-[color:var(--muted)]">{resource.detail}</span>
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-[color:var(--blue)]" />
              </a>
            );
          })}
        </div>
        <Button href="/department" variant="ghost" className="min-h-7 w-fit justify-self-center px-0 text-[10px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3 w-3" />}>
          Explore All Resources
        </Button>
      </CardContent>
    </DashboardCard>
  );
}

function ApplicantPoolSnapshots({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSection title="Applicant Pool Snapshot by Job Type" className="text-[color:var(--blue)]">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {dashboard.applicantPoolSnapshots.map((snapshot) => (
          <div key={snapshot.jobType} className="grid gap-1 rounded-md border border-[color:var(--border-muted)] p-3">
            <div>
              <p className="text-[11px] font-bold text-[color:var(--navy)]">
                {snapshot.jobType} <span className="ml-1 text-[color:var(--success)]">• {snapshot.status.charAt(0).toUpperCase() + snapshot.status.slice(1)}</span>
              </p>
            </div>
            <div>
              <p className="text-[22px] font-semibold text-[color:var(--navy)]">{snapshot.totalApplicants}</p>
              <p className="text-[9px] font-semibold text-slate-500">Total Applicants</p>
            </div>
            <div className="mt-1 h-px bg-[color:var(--border-muted)]" />
            <div className="grid grid-cols-3 divide-x divide-[color:var(--border-muted)] text-left">
              <div className="pr-2">
                <p className="text-[13px] font-extrabold text-[color:var(--navy)]">{snapshot.minoritiesPercent}%</p>
                <p className="text-[9px] font-semibold text-slate-500">Minorities</p>
              </div>
              <div className="px-2">
                <p className="text-[13px] font-extrabold text-[color:var(--navy)]">{snapshot.higherEducationPercent}%</p>
                <p className="text-[9px] font-semibold text-slate-500">Higher Ed.</p>
              </div>
              <div className="pl-2">
                <p className="text-[13px] font-extrabold text-[color:var(--navy)]">{snapshot.femalePercent}%</p>
                <p className="text-[9px] font-semibold text-slate-500">Female</p>
              </div>
            </div>
            <a href={snapshot.href} className="mt-2 inline-flex h-8 min-w-0 items-center justify-center whitespace-nowrap rounded border border-[color:var(--blue-deep)] px-1 text-[8.5px] font-extrabold leading-none text-[color:var(--blue-deep)] transition hover:bg-blue-50">
              {snapshot.jobType === "All Job Types" ? "View Combined Applicant Pool" : "View Applicant Pool"}
            </a>
          </div>
        ))}
      </div>
    </DashboardSection>
  );
}

function BadgePoolPreview({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSection title="Badge Pool (Anonymous Profiles)">
      <div className="grid gap-3">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {dashboard.badgePoolPreview.tabs.map((tab) => (
              <a key={tab.label} type="button"
                className={cn("h-12 shrink-0 rounded-md border border-[color:var(--border-muted)] px-3 py-2 text-left text-[10px] font-bold leading-tight text-slate-600",
                  tab.active && "border-[color:var(--navy)] bg-[color:var(--navy)] text-white"
                )}>
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate">{tab.label}</span>
                  {tab.active ? <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-current" /> : null}
                </span>
                <span className="mt-1 block text-[8px] font-semibold opacity-80">{tab.count} Profiles</span>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Button variant="secondary" className="!min-h-8 !px-3 !py-1 !text-[11px]" iconLeft={<MapPin className="h-3.5 w-3.5" />}>
              {dashboard.badgePoolPreview.filters.distance} <span className="text-slate-300">|</span> {dashboard.badgePoolPreview.filters.location}
            </Button>
            <Button variant="secondary" className="!min-h-8 !px-3 !py-1 !text-[11px]">
              {dashboard.badgePoolPreview.filters.status}
            </Button>
            <Button variant="secondary" className="!min-h-8 !px-3 !py-1 !text-[11px]" iconRight={<Filter className="h-3.5 w-3.5" />}>
              More Filters
            </Button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-[9px]">
              <thead className="bg-slate-50 text-[8px] font-bold uppercase text-slate-500">
                <tr>
                  <th className="px-2 py-2.5">Exam Score</th>
                  <th className="px-2 py-2.5">City / Town</th>
                  <th className="px-2 py-2.5">Willing to Relocate</th>
                  <th className="px-2 py-2.5">Multilingual</th>
                  <th className="px-2 py-2.5">Education Level</th>
                  <th className="px-2 py-2.5">Volunteer Exp.</th>
                  <th className="px-2 py-2.5">Cadet / Citizens Acad.</th>
                  <th className="px-2 py-2.5">Veteran</th>
                  <th className="px-2 py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border-muted)]">
                {dashboard.badgePoolPreview.rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-2 py-2 font-bold text-[color:var(--navy)]">{row.examScore}</td>
                    <td className="px-2 py-2">{row.cityTown}</td>
                    <td className="px-2 py-2">{row.willingToRelocate}</td>
                    <td className="px-2 py-2">{row.multilingual}</td>
                    <td className="px-2 py-2">{row.educationLevel}</td>
                    <td className="px-2 py-2">{row.volunteerExperience}</td>
                    <td className="px-2 py-2">{row.cadetAcademy}</td>
                    <td className="px-2 py-2">{row.veteran}</td>
                    <td className="px-2 py-2">
                      <button type="button" className="inline-flex h-6 min-w-[88px] items-center justify-center bg-[color:var(--gold)] px-3 text-[10px] !font-extrabold leading-none text-[color:var(--navy)] transition hover:brightness-95">
                        Send Badge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] font-semibold text-slate-500">
          <span className="mt-5">{dashboard.badgePoolPreview.resultLabel}</span>
          <div className="mt-5 flex items-center gap-1.5">
            {["1", "2", "3", "...", "32"].map((page) => (
              <button
                key={page}
                type="button"
                className={cn(
                  "h-7 min-w-7 rounded-md border border-[color:var(--border-muted)] px-2 font-bold text-slate-600",
                  page === "1" && "border-[color:var(--navy)] bg-[color:var(--navy)] text-white"
                )}
              >
                {page}
              </button>
            ))}
            <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-[color:var(--border-muted)] text-slate-600">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
          </div>
          <div className="grid content-start gap-4">
            <QuickActions dashboard={dashboard} />
            <RestrictedActions dashboard={dashboard} />

          </div>
        </div>
      </div>
    </DashboardSection>
  );
}

function QuickActions({ dashboard }: { dashboard: Dashboard }) {
  const icons = [PlusCircle, BriefcaseBusiness, TrendingUp, UserPlus];

  return (
    <DashboardSection title="Quick Actions">
      <div className="grid gap-2">
        {dashboard.quickActions.map((action, index) => {
          const Icon = icons[index] ?? ChevronRight;

          return (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center justify-between gap-3 rounded-md px-1 py-1 transition hover:bg-[color:var(--surface-muted)]"
            >
              <span className="flex min-w-0 items-center gap-2">
                <Icon className="h-[18px] w-[18px] shrink-0 text-[color:var(--blue)]" />
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold text-[color:var(--blue-deep)]">{action.label}</span>
                  <span className="block text-[9px] leading-4 text-[color:var(--muted)]">{action.detail}</span>
                </span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[color:var(--blue)]" />
            </a>
          );
        })}
      </div>
    </DashboardSection>
  );
}

function RestrictedActions({ dashboard }: { dashboard: Dashboard }) {
  if (!dashboard.restrictedState) {
    return null;
  }

  return (
    <DashboardSection title="Restricted while expired">
      {dashboard.restrictedState.actions.map((action) => (
        <div key={action} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ShieldAlert className="h-4 w-4 text-[color:var(--danger)]" />
          {action}
        </div>
      ))}
    </DashboardSection>
  );
}

export function DepartmentDashboard() {
  const dashboard = getMockDepartmentDashboard();

  return (
    <div className="grid gap-5">
      <header className="grid gap-1">
        <h1 className="text-base font-extrabold tracking-normal text-[color:var(--navy)] sm:text-lg">
          Welcome back, {dashboard.adminName.split(" ")[0]}.
        </h1>
        <p className="text-xs font-bold text-[color:var(--blue)]">
          {dashboard.departmentName} <span className="mx-1 text-slate-400">•</span> Member since {dashboard.memberSinceLabel}{" "}
          <span className="mx-1 text-slate-400">•</span> Membership {dashboard.membershipStatus}
        </p>
      </header>

      {dashboard.restrictedState ? <RestrictedState title={dashboard.restrictedState.title} description={dashboard.restrictedState.description} /> : null}

      <div className="grid gap-4 xl:grid-cols-3">
        <MembershipSnapshot dashboard={dashboard} />
        <ApplicantActivity dashboard={dashboard} />
        <ResourceCenter dashboard={dashboard} />
      </div>

      <ApplicantPoolSnapshots dashboard={dashboard} />
      <BadgePoolPreview dashboard={dashboard} />
    </div>
  );
}
