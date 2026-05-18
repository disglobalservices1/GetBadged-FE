import { AlertTriangle, ArrowRight, BadgeCheck, CheckCircle2, ClipboardCheck, FileText, Lock, Shield, WalletCards } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusChip } from "@/components/ui/status-chip";
import { formatDate, formatStatusLabel, getMockCandidateDashboard, type CandidateDashboardChecklistItem } from "@/features/candidate/dashboard/get-mock-candidate-dashboard";

export function CandidateDashboard() {
  const dashboard = getMockCandidateDashboard();

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow={`${dashboard.trackState.label} Candidate`} title={`Welcome back, ${dashboard.firstName}.`} description={dashboard.statusDescription} />

      {dashboard.isFreeAccount ? (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="grid gap-4 px-6 pb-6 pt-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-amber-700">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[color:var(--navy)]">Limited free account</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">You can keep building your profile, but these actions are blocked until membership and requirements are complete.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {dashboard.blockedActions.map((action) => (
                    <StatusChip key={action} label={action} tone="warning" />
                  ))}
                </div>
              </div>
            </div>
            <Button href="/candidate/profile" iconRight={<ArrowRight size={18} />}>
              Continue profile
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<WalletCards />} label="Application Tokens" value={dashboard.tokenBalance} detail="Shown on dashboard and at apply." />
        <StatCard icon={<ClipboardCheck />} label="Profile Complete" value={`${dashboard.profileCompletionPercent}%`} detail={`Current step: ${dashboard.currentStepLabel}.`} />
        <StatCard icon={<BadgeCheck />} label="Badge Requests" value={dashboard.badgeRequestCount} detail="Accept after membership activation." />
        <StatCard icon={<FileText />} label="Applications" value={dashboard.applicationCount} detail="Direct and accepted Badges." />
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardContent className="grid gap-5 px-6 pb-6 pt-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <ClipboardCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[color:var(--navy)]">Profile progress</h2>
                  <p className="text-sm text-[color:var(--muted)]">Autosave wizard state for the candidate profile.</p>
                </div>
              </div>
              <StatusChip label={dashboard.membershipPlanLabel} tone={dashboard.membershipStatus === "active" ? "success" : "warning"} />
            </div>
            <Progress value={dashboard.profileCompletionPercent} label={`${dashboard.profileCompletionPercent}% complete`} />
            <div className="grid gap-3 md:grid-cols-2">
              {dashboard.checklist.map((item) => (
                <ChecklistCard key={item.id} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-5 px-6 pb-6 pt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[color:var(--navy)]">Track state</h2>
                <p className="text-sm text-[color:var(--muted)]">{dashboard.trackState.label}</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-[color:var(--muted)]">{dashboard.trackState.description}</p>
            <div className="grid gap-3">
              <Button href="/jobs" variant="secondary">
                Browse public jobs
              </Button>
              <Button href="/candidate/profile">Open profile wizard</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <DashboardPanel title="Recent activity" icon={<CheckCircle2 className="h-6 w-6" />}>
          {dashboard.recentActivity.length > 0 ? (
            dashboard.recentActivity.map((activity) => (
              <div key={activity.id} className="grid gap-1 border-b border-[color:var(--border-muted)] pb-3 last:border-0 last:pb-0">
                <p className="font-bold text-[color:var(--navy)]">{activity.label}</p>
                <p className="text-sm leading-6 text-[color:var(--muted)]">{activity.detail}</p>
                <p className="text-xs font-bold uppercase text-slate-500">{formatDate(activity.occurredAt)}</p>
              </div>
            ))
          ) : (
            <EmptyPanelText>No recent activity yet.</EmptyPanelText>
          )}
        </DashboardPanel>

        <DashboardPanel title="Badge Requests" icon={<BadgeCheck className="h-6 w-6" />}>
          {dashboard.badgeRequests.length > 0 ? (
            dashboard.badgeRequests.map((request) => (
              <div key={request.id} className="grid gap-2 rounded-md border border-[color:var(--border-muted)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-[color:var(--navy)]">{request.departmentName}</p>
                  <StatusChip label={formatStatusLabel(request.status)} tone="warning" />
                </div>
                <p className="text-sm text-[color:var(--muted)]">Sent {formatDate(request.sentAt)}</p>
                <Button href="/candidate/badge-requests" variant="secondary">
                  Review request
                </Button>
              </div>
            ))
          ) : (
            <EmptyPanelText>No Badge Requests yet.</EmptyPanelText>
          )}
        </DashboardPanel>

        <DashboardPanel title="Submitted Applications" icon={<FileText className="h-6 w-6" />}>
          {dashboard.applications.length > 0 ? (
            dashboard.applications.map((application) => (
              <div key={application.id} className="grid gap-2 rounded-md border border-[color:var(--border-muted)] p-4">
                <p className="font-bold text-[color:var(--navy)]">{application.jobTitle}</p>
                <p className="text-sm text-[color:var(--muted)]">{application.departmentName}</p>
                <div className="flex items-center justify-between gap-3">
                  <StatusChip label={formatStatusLabel(application.status)} tone={application.status === "inactive_membership" ? "warning" : "muted"} />
                  <span className="text-xs font-bold uppercase text-slate-500">{formatDate(application.submittedAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <EmptyPanelText>No submitted applications yet.</EmptyPanelText>
          )}
        </DashboardPanel>
      </section>
    </div>
  );
}

function ChecklistCard({ item }: { item: CandidateDashboardChecklistItem }) {
  const icon = item.status === "complete" ? <CheckCircle2 className="h-5 w-5" /> : item.status === "blocked" ? <Lock className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />;
  const tone = item.status === "complete" ? "success" : item.status === "blocked" ? "warning" : item.status === "in_progress" ? "navy" : "muted";

  return (
    <div className="flex items-start gap-3 rounded-md border border-[color:var(--border-muted)] p-4">
      <div className="mt-0.5 text-[color:var(--blue)]">{icon}</div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold text-[color:var(--navy)]">{item.label}</h3>
          <StatusChip label={formatStatusLabel(item.status)} tone={tone} />
        </div>
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{item.description}</p>
      </div>
    </div>
  );
}

function DashboardPanel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="grid gap-4 px-5 pb-5 pt-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">{icon}</div>
          <h2 className="text-lg font-bold text-[color:var(--navy)]">{title}</h2>
        </div>
        <div className="grid gap-4">{children}</div>
      </CardContent>
    </Card>
  );
}

function EmptyPanelText({ children }: { children: React.ReactNode }) {
  return <p className="rounded-md border border-[color:var(--border-muted)] bg-[color:var(--surface-muted)] p-4 text-sm text-[color:var(--muted)]">{children}</p>;
}
