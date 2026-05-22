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
  Send,
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
        <CardTitle className="text-xs uppercase text-[color:var(--blue)]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 p-4 pt-0">{children}</CardContent>
    </DashboardCard>
  );
}

function MembershipSnapshot({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardCard className="flex min-h-[180px] flex-col">
      <CardContent className="flex flex-1 flex-col justify-between gap-4 !p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center text-[color:var(--navy)]">
            <ShieldCheck className="h-11 w-11 shrink-0" preserveAspectRatio="xMidYMid meet" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold uppercase leading-tight text-[color:var(--blue)]">Membership Snapshot</p>
            <p className="mt-1 text-[11px] font-bold leading-tight text-[color:var(--navy)]">
              {dashboard.membershipPlanLabel} <span className="mx-1 text-slate-300">•</span>
              <span className="text-[color:var(--success)]">{dashboard.membershipStatus}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:ml-[3.25rem] sm:w-[calc(100%-3.25rem)] sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] sm:items-center">
          <div>
            <p className="text-[28px] font-extrabold leading-none text-[color:var(--navy)]">
              {dashboard.badgeCreditsSent}
              <span className="text-base font-bold text-slate-500"> / {dashboard.monthlyBadgeCreditLimit}</span>
            </p>
            <p className="mt-1 text-[10px] font-bold leading-tight text-slate-600">Badge Tokens Used</p>
          </div>
          <div className="hidden h-9 bg-[color:var(--border-muted)] sm:block" />
          <div>
            <p className="text-[28px] font-extrabold leading-none text-[color:var(--navy)]">{dashboard.badgeCreditsRemaining}</p>
            <p className="mt-1 text-[10px] font-bold leading-tight text-slate-600">Badge Tokens Remaining</p>
          </div>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-[color:var(--gold)]" style={{ width: `${dashboard.badgeUsagePercent}%` }} />
        </div>

        <div className="grid grid-cols-[1.25fr_1fr_1fr] gap-1.5">
          <a
            href="/department/membership-billing"
            className="inline-flex h-8 min-w-0 items-center justify-center whitespace-nowrap rounded border border-[color:var(--border-muted)] px-1 text-[8.5px] font-extrabold leading-none text-[color:var(--blue-deep)] transition hover:bg-blue-50"
          >
            View Membership Details
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
        <CardTitle className="text-[10px] uppercase text-[color:var(--blue)]">
          Applicant Activity <span className="text-[9px] text-slate-500">(Last 30 Days)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 p-3 pt-0">
        <div className="grid gap-2 sm:grid-cols-2">
          {activityStats.map((stat) => (
            <div key={stat.label} className="rounded-md border border-[color:var(--border-muted)] p-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <stat.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-extrabold leading-none text-[color:var(--navy)]">{stat.value}</p>
                  <p className="mt-0.5 text-[8px] font-extrabold leading-3 text-slate-500">{stat.label}</p>
                </div>
              </div>
              <p className="mt-1.5 text-[10px] font-bold text-[color:var(--success)]">^ {stat.change}%</p>
              <p className="text-[9px] font-semibold leading-tight text-slate-500">vs prior 30 days</p>
            </div>
          ))}
        </div>
        <Button href="/department/applicants" variant="ghost" className="min-h-7 w-fit px-0 text-[10px]" iconRight={<ChevronRight className="h-3 w-3" />}>
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
        <CardTitle className="text-[10px] uppercase text-[color:var(--blue)]">Resource Center</CardTitle>
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
                  <Icon className="h-4 w-4 shrink-0 text-[color:var(--blue)]" />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-extrabold leading-tight text-[color:var(--blue-deep)]">{resource.label}</span>
                    <span className="block text-[9px] leading-3 text-[color:var(--muted)]">{resource.detail}</span>
                  </span>
                </span>
                <ChevronRight className="h-3 w-3 shrink-0 text-[color:var(--blue)]" />
              </a>
            );
          })}
        </div>
        <Button href="/department" variant="ghost" className="min-h-7 w-fit justify-self-center px-0 text-[10px]" iconRight={<ChevronRight className="h-3 w-3" />}>
          Explore All Resources
        </Button>
      </CardContent>
    </DashboardCard>
  );
}

function ApplicantPoolSnapshots({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSection title="Applicant Pool Snapshot by Job Type">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {dashboard.applicantPoolSnapshots.map((snapshot) => (
          <div key={snapshot.jobType} className="grid gap-3 rounded-md border border-[color:var(--border-muted)] p-3">
            <div>
              <p className="text-xs font-bold text-[color:var(--navy)]">
                {snapshot.jobType} <span className="ml-1 text-[color:var(--success)]">• {snapshot.status}</span>
              </p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-[color:var(--navy)]">{snapshot.totalApplicants}</p>
              <p className="text-xs font-semibold text-slate-500">Total Applicants</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-[color:var(--border-muted)] text-center">
              <div>
                <p className="text-sm font-extrabold text-[color:var(--navy)]">{snapshot.minoritiesPercent}%</p>
                <p className="text-[10px] font-semibold text-slate-500">Minorities</p>
              </div>
              <div>
                <p className="text-sm font-extrabold text-[color:var(--navy)]">{snapshot.higherEducationPercent}%</p>
                <p className="text-[10px] font-semibold text-slate-500">Higher Ed.</p>
              </div>
              <div>
                <p className="text-sm font-extrabold text-[color:var(--navy)]">{snapshot.femalePercent}%</p>
                <p className="text-[10px] font-semibold text-slate-500">Female</p>
              </div>
            </div>
            <Button href={snapshot.href} variant="secondary" className="min-h-8 px-2 text-[11px]">
              {snapshot.jobType === "All Job Types" ? "View Combined Applicant Pool" : "View Applicant Pool"}
            </Button>
          </div>
        ))}
      </div>
    </DashboardSection>
  );
}

function BadgePoolPreview({ dashboard }: { dashboard: Dashboard }) {
  return (
    <DashboardSection title="Badge Pool (Anonymous Profiles)" className="xl:col-span-3">
      <div className="grid gap-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {dashboard.badgePoolPreview.tabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                className={cn(
                  "shrink-0 rounded-md border border-[color:var(--border-muted)] px-3 py-2 text-left text-[11px] font-bold text-slate-600",
                  tab.active && "border-[color:var(--navy)] bg-[color:var(--navy)] text-white"
                )}
              >
                {tab.label}
                <span className="mt-1 block font-semibold opacity-80">{tab.count} Profiles</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="min-h-8 px-3 text-xs" iconLeft={<MapPin className="h-4 w-4" />}>
              {dashboard.badgePoolPreview.filters.distance} {dashboard.badgePoolPreview.filters.location}
            </Button>
            <Button variant="secondary" className="min-h-8 px-3 text-xs">
              {dashboard.badgePoolPreview.filters.status}
            </Button>
            <Button variant="secondary" className="min-h-8 px-3 text-xs" iconRight={<Filter className="h-4 w-4" />}>
              More Filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border border-[color:var(--border-muted)]">
          <table className="w-full min-w-[980px] text-left text-[11px]">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500">
              <tr>
                <th className="px-3 py-3">Exam Score</th>
                <th className="px-3 py-3">City / Town</th>
                <th className="px-3 py-3">Willing to Relocate</th>
                <th className="px-3 py-3">Multilingual</th>
                <th className="px-3 py-3">Education Level</th>
                <th className="px-3 py-3">Volunteer Exp.</th>
                <th className="px-3 py-3">Cadet / Citizens Acad.</th>
                <th className="px-3 py-3">Veteran</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border-muted)]">
              {dashboard.badgePoolPreview.rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-3 font-bold text-[color:var(--navy)]">{row.examScore}</td>
                  <td className="px-3 py-3">{row.cityTown}</td>
                  <td className="px-3 py-3">{row.willingToRelocate}</td>
                  <td className="px-3 py-3">{row.multilingual}</td>
                  <td className="px-3 py-3">{row.educationLevel}</td>
                  <td className="px-3 py-3">{row.volunteerExperience}</td>
                  <td className="px-3 py-3">{row.cadetAcademy}</td>
                  <td className="px-3 py-3">{row.veteran}</td>
                  <td className="px-3 py-3">
                    <Button className="min-h-7 px-3 text-[11px]" iconLeft={<Send className="h-3.5 w-3.5" />}>
                      Send Badge
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-500">
          <span>{dashboard.badgePoolPreview.resultLabel}</span>
          <div className="flex items-center gap-2">
            {["1", "2", "3", "...", "32"].map((page) => (
              <button
                key={page}
                type="button"
                className={cn(
                  "h-8 min-w-8 rounded-md border border-[color:var(--border-muted)] px-2 font-bold text-slate-600",
                  page === "1" && "border-[color:var(--navy)] bg-[color:var(--navy)] text-white"
                )}
              >
                {page}
              </button>
            ))}
            <button type="button" className="flex h-8 w-8 items-center justify-center rounded-md border border-[color:var(--border-muted)] text-slate-600">
              <ChevronRight className="h-4 w-4" />
            </button>
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
              className="flex items-center justify-between gap-3 rounded-md p-2 transition hover:bg-[color:var(--surface-muted)]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-[color:var(--blue)]" />
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-[color:var(--blue-deep)]">{action.label}</span>
                  <span className="block text-xs leading-5 text-[color:var(--muted)]">{action.detail}</span>
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[color:var(--blue)]" />
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

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <BadgePoolPreview dashboard={dashboard} />
        <div className="grid content-start gap-4">
          <QuickActions dashboard={dashboard} />
          <DashboardSection title="Need support?">
            <div className="flex items-start gap-3 rounded-md bg-blue-50 p-4">
              <CircleHelp className="h-6 w-6 shrink-0 text-[color:var(--blue)]" />
              <div>
                <p className="text-sm font-bold text-[color:var(--navy)]">We're happy to help.</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  Call us at <span className="font-bold text-[color:var(--navy)]">{dashboard.support.phone}</span> or email{" "}
                  <span className="font-bold text-[color:var(--navy)]">{dashboard.support.email}</span>.
                </p>
              </div>
            </div>
          </DashboardSection>
          <RestrictedActions dashboard={dashboard} />
        </div>
      </div>
    </div>
  );
}
