import { ArrowRight, BriefcaseBusiness, Building2, CalendarDays, CheckCircle2, Lock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";
import { formatDate, formatJobTypeLabel, getMockCandidateJobs, type CandidateJobMatch } from "@/features/candidate/jobs/get-mock-candidate-jobs";

export function CandidateJobsPage() {
  const matches = getMockCandidateJobs();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Candidate Jobs"
        title="Browse jobs matched to your profile."
        description="See eligibility signals before applying. Direct Apply requires active membership, available tokens, and candidate consent."
      />

      <section className="grid gap-4">
        {matches.map((match) => (
          <CandidateJobCard key={match.job.id} match={match} />
        ))}
      </section>
    </div>
  );
}

function CandidateJobCard({ match }: { match: CandidateJobMatch }) {
  const tone = match.eligibilityStatus === "eligible" ? "success" : match.eligibilityStatus === "needs_review" ? "warning" : "danger";
  const label = match.alreadyApplied ? "Already Applied" : match.eligibilityStatus === "eligible" ? "Eligible" : match.eligibilityStatus === "needs_review" ? "Needs Review" : "Blocked";

  return (
    <Card>
      <CardContent className="grid gap-5 px-6 pb-6 pt-8 xl:grid-cols-[1fr_auto] xl:items-center">
        <div className="grid gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              {match.alreadyApplied ? <Lock className="h-6 w-6" /> : <BriefcaseBusiness className="h-6 w-6" />}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-[color:var(--navy)]">{match.job.title}</h2>
                <StatusChip label={label} tone={tone} />
                <StatusChip label={formatJobTypeLabel(match.job.jobType)} tone="muted" />
              </div>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[color:var(--muted)]">
                <MapPin className="h-4 w-4" />
                {match.job.departmentName} · {match.job.city}, {match.job.state}
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Meta icon={<CalendarDays className="h-4 w-4" />} label="Posted" value={formatDate(match.job.postedAt)} />
            <Meta icon={<BriefcaseBusiness className="h-4 w-4" />} label="Openings" value={match.job.numberOfOpenings ?? "Pending"} />
            <Meta icon={<Building2 className="h-4 w-4" />} label="Timeline" value={match.job.hiringTimeline ?? "Pending"} />
          </div>

          <div className="grid gap-2">
            {match.matchedRequirements.slice(0, 3).map((requirement) => (
              <p key={requirement} className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
                <CheckCircle2 className="h-4 w-4 text-[color:var(--success)]" />
                {requirement}
              </p>
            ))}
            {match.missingRequirements.length > 0 ? <p className="text-sm font-semibold text-amber-700">Needs review: {match.missingRequirements.join(", ")}</p> : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 xl:justify-end">
          <Button href={`/candidate/jobs/${match.job.id}`} variant="secondary">
            View details
          </Button>
          {match.alreadyApplied ? (
            <Button type="button" disabled>
              Already applied
            </Button>
          ) : (
            <Button href={`/candidate/apply/${match.job.id}`} iconRight={<ArrowRight size={18} />}>
              Apply
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 rounded-md border border-[color:var(--border-muted)] p-3">
      <div className="mt-0.5 text-[color:var(--blue)]">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-[color:var(--navy)]">{value}</p>
      </div>
    </div>
  );
}
