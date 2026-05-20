import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, FileText, MapPin, XCircle } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";
import { formatJobTypeLabel, getMockCandidateJobById } from "@/features/candidate/jobs/get-mock-candidate-jobs";

type CandidateJobDetailPageProps = {
  jobId: string;
};

export function CandidateJobDetailPage({ jobId }: CandidateJobDetailPageProps) {
  const match = getMockCandidateJobById(jobId);

  if (!match) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Candidate Job Detail" title={match.job.title} description={`${match.job.departmentName} · ${match.job.city}, ${match.job.state}`} />

      <div>
        <Button href="/candidate/jobs" variant="secondary" iconLeft={<ArrowLeft size={18} />}>
          Back to jobs
        </Button>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <Card>
            <CardContent className="grid gap-5 px-6 pb-6 pt-8">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-[color:var(--navy)]">Role overview</h2>
                    <StatusChip label={formatJobTypeLabel(match.job.jobType)} tone="navy" />
                    <StatusChip label={match.alreadyApplied ? "Already Applied" : match.eligibilityStatus.replace("_", " ")} tone={match.eligibilityStatus === "eligible" ? "success" : "warning"} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{match.job.responsibilities}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-5 px-6 pb-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-[color:var(--navy)]">Minimum requirements</h2>
              </div>
              <div className="grid gap-3">
                {match.job.minimumRequirements.map((requirement) => {
                  const met = match.matchedRequirements.includes(requirement.label);
                  return (
                    <div key={requirement.id} className="flex items-start gap-3 rounded-md border border-[color:var(--border-muted)] p-4">
                      {met ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-[color:var(--success)]" /> : <XCircle className="mt-0.5 h-5 w-5 text-amber-700" />}
                      <div>
                        <p className="font-bold text-[color:var(--navy)]">{requirement.label}</p>
                        <p className="mt-1 text-sm text-[color:var(--muted)]">{met ? "Matched from your profile." : "Needs review before applying."}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-5 px-6 pb-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-[color:var(--navy)]">Benefits and hiring process</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <List title="Benefits" items={match.job.benefits} />
                <List title="Hiring process" items={match.job.hiringProcess} />
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="grid content-start gap-4">
          <Card>
            <CardContent className="grid gap-4 px-5 pb-5 pt-8">
              <h2 className="font-bold text-[color:var(--navy)]">Application status</h2>
              {match.alreadyApplied ? (
                <p className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">You already applied to this job. Duplicate applications are blocked.</p>
              ) : (
                <p className="text-sm leading-6 text-[color:var(--muted)]">Review eligibility and continue to Direct Apply to use one token after consent.</p>
              )}
              {match.alreadyApplied ? (
                <Button type="button" disabled>
                  Already applied
                </Button>
              ) : (
                <Button href={`/candidate/apply/${match.job.id}`} iconRight={<ArrowRight size={18} />}>
                  Continue to apply
                </Button>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="grid gap-3 px-5 pb-5 pt-8">
              <Meta icon={<Building2 className="h-4 w-4" />} label="Department" value={match.job.departmentName} />
              <Meta icon={<MapPin className="h-4 w-4" />} label="Location" value={`${match.job.city}, ${match.job.state}`} />
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-bold text-[color:var(--navy)]">{title}</h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[color:var(--muted)]">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--success)]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 text-[color:var(--blue)]">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-[color:var(--navy)]">{value}</p>
      </div>
    </div>
  );
}
