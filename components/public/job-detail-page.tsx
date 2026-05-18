import { ArrowRight, BriefcaseBusiness, Building2, Calendar, CheckCircle2, Clock, DollarSign, MapPin, Users } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";
import { formatEmploymentType, formatJobType, formatPostedDate, formatSalaryRange, getPublicJobs } from "@/features/public/directory";
import type { PublicJobDetail } from "@/types/job";

type JobDetailPageProps = {
  job: PublicJobDetail;
};

export function JobDetailPage({ job }: JobDetailPageProps) {
  const relatedJobs = getPublicJobs({ departmentId: job.departmentId }).filter((relatedJob) => relatedJob.id !== job.id);
  const departmentLogoUrl = job.departmentLogoUrl ?? "https://placehold.co/160x160/0a2a55/f5b82e?text=GB";
  const departmentCoverImageUrl = job.departmentCoverImageUrl ?? "https://placehold.co/1200x700/0a2a55/f5b82e?text=GetBadged";

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8">
      <nav className="text-sm font-semibold text-[color:var(--muted)]">
        <a href="/jobs" className="text-[color:var(--blue)]">
          Jobs
        </a>{" "}
        / {job.title}
      </nav>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-6">
          <Card>
            <CardContent className="grid gap-6 p-6 lg:grid-cols-[1fr_360px]">
              <div className="grid content-start gap-5">
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={departmentLogoUrl} alt={`${job.departmentName} logo`} className="h-28 w-28 rounded-lg object-cover" />
                  <div>
                    <StatusChip label={formatEmploymentType(job.employmentType)} tone="warning" />
                    <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[color:var(--navy)]">{job.title}</h1>
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[color:var(--muted)]">
                      <MapPin className="h-4 w-4" />
                      {job.city}, {job.state}
                    </p>
                  </div>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">{job.departmentProfileIntro}</p>
                <div className="flex flex-wrap gap-3">
                  <Button href={`/auth/signup/candidate?jobId=${job.id}`} iconRight={<ArrowRight size={18} />}>
                    Apply now
                  </Button>
                  <Button href={`/departments/${job.departmentSlug}`} variant="secondary">
                    Department profile
                  </Button>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={departmentCoverImageUrl} alt={`${job.departmentName} station`} className="h-full min-h-64 w-full object-cover" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-6 px-6 pb-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-[color:var(--navy)]">About the role</h2>
              </div>
              <p className="text-sm leading-6 text-[color:var(--muted)]">{job.responsibilities}</p>
              <div className="grid gap-4 md:grid-cols-4">
                <Meta icon={<Calendar className="h-4 w-4" />} label="Posted" value={formatPostedDate(job.postedAt)} />
                <Meta icon={<Clock className="h-4 w-4" />} label="Timeline" value={job.hiringTimeline ?? "Pending"} />
                <Meta icon={<Users className="h-4 w-4" />} label="Openings" value={job.numberOfOpenings ?? "Pending"} />
                <Meta icon={<DollarSign className="h-4 w-4" />} label="Salary" value={formatSalaryRange(job)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-6 px-6 pb-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-[color:var(--navy)]">Requirements</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <RequirementList title="Minimum requirements" items={job.minimumRequirements.map((requirement) => requirement.label)} />
                <RequirementList title="Preferred qualifications" items={job.preferredRequirements.map((requirement) => requirement.label)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-6 px-6 pb-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <Building2 className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-[color:var(--navy)]">Schedule, pay, and benefits</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <RequirementList title="Benefits" items={job.benefits} />
                <RequirementList title="Hiring process" items={job.hiringProcess} />
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="grid content-start gap-4">
          <Card>
            <CardContent className="grid gap-4 px-5 pb-5 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <h2 className="font-bold uppercase text-[color:var(--navy)]">Job details</h2>
              </div>
              <Meta icon={<BriefcaseBusiness className="h-4 w-4" />} label="Job type" value={formatJobType(job.jobType)} />
              <Meta icon={<Building2 className="h-4 w-4" />} label="Department" value={job.departmentName} />
              <Meta icon={<MapPin className="h-4 w-4" />} label="Location" value={`${job.city}, ${job.state}`} />
              <Button href={`/auth/signup/candidate?jobId=${job.id}`}>Apply now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-4 px-5 pb-5 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="font-bold uppercase text-[color:var(--navy)]">Why join?</h2>
              </div>
              <ul className="grid gap-3">
                {job.whyJoin.map((reason) => (
                  <li key={reason} className="flex items-start gap-2 text-sm font-semibold text-[color:var(--muted)]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--success)]" />
                    {reason}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </section>

      {relatedJobs.length > 0 ? (
        <section className="grid gap-4">
          <h2 className="text-2xl font-bold text-[color:var(--navy)]">More positions from {job.departmentName}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedJobs.map((relatedJob) => (
              <a key={relatedJob.id} href={`/jobs/${relatedJob.id}`} className="grid gap-3 rounded-lg border border-[color:var(--border-muted)] bg-white p-5 hover:bg-[color:var(--surface-muted)]">
                <StatusChip label={formatEmploymentType(relatedJob.employmentType)} tone="success" />
                <h3 className="font-bold text-[color:var(--navy)]">{relatedJob.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[color:var(--blue)]">
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function RequirementList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-bold text-[color:var(--navy)]">{title}</h3>
      <ul className="mt-3 grid gap-3">
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

function Meta({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
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
