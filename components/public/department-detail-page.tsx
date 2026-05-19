import { ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, Calendar, CheckCircle2, ChevronDown, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";
import { getJobsForDepartment } from "@/features/public/directory";
import type { PublicDepartmentProfile } from "@/types/department";
import { DepartmentMediaCarousel } from "./department-media-carousel";
import { SmoothScrollButton } from "./smooth-scroll-button";

type DepartmentDetailPageProps = {
  department: PublicDepartmentProfile;
};

export function DepartmentDetailPage({ department }: DepartmentDetailPageProps) {
  const jobs = getJobsForDepartment(department.id);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8">
      <nav className="text-sm font-semibold text-[color:var(--muted)]">
        <a href="/departments" className="text-[color:var(--blue)]">
          Departments
        </a>{" "}
        / {department.departmentName}
      </nav>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-6">
          <Card>
            <CardContent className="grid gap-6 !p-8 lg:grid-cols-[180px_1fr_320px]">
              <div className="flex items-start justify-center lg:justify-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={department.badgeImageUrl} alt={`${department.departmentName} badge`} className="h-36 w-36 rounded-lg object-cover" />
              </div>
              <div className="grid content-start gap-4">
                <div>
                  <h1 className="text-4xl font-extrabold leading-tight text-[color:var(--navy)]">{department.departmentName}</h1>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[color:var(--muted)]">
                    <MapPin className="h-4 w-4" />
                    {department.city}, {department.state}
                  </p>
                </div>
                <p className="text-sm leading-6 text-[color:var(--muted)]">{department.profileIntro}</p>
                <SmoothScrollButton targetId="media" variant="secondary" className="whitespace-nowrap">
                  View department media
                </SmoothScrollButton>
              </div>
              <div className="overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={department.coverImageUrl} alt={`${department.departmentName} station`} className="h-full min-h-56 w-full object-cover" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-6 px-6 pb-6 pt-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                    <BadgeCheck className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-[color:var(--navy)]">At a glance</h2>
                </div>
                <StatusChip label={department.departmentType} tone="navy" />
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                <Meta label="Chief" value={department.chiefName} />
                <Meta label="Chief sworn in" value={department.chiefSwornIn} />
                <Meta label="Population" value={department.population} />
                <Meta label="Department size" value={department.departmentSize} />
                <Meta label="Patrol officers" value={department.patrolOfficers} />
                <Meta label="Call volume" value={department.callVolume} />
                <Meta label="Hiring timeline" value={department.hiringTimeline} />
                <Meta label="Community type" value={department.communityType} />
              </div>
              <a href="#sections" className="inline-flex items-center justify-center gap-2 text-sm font-bold uppercase text-[color:var(--blue)]">
                View more about our department
                <ChevronDown className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <section id="media" className="grid scroll-mt-24 gap-4">
            <h2 className="text-2xl font-bold text-[color:var(--navy)]">Explore {department.city}</h2>
            <DepartmentMediaCarousel departmentName={department.departmentName} images={department.media} />
          </section>

          <section id="sections" className="grid gap-4 md:grid-cols-3">
            {department.sections.map((section) => (
              <Card key={section.id}>
                <CardContent className="grid gap-4 px-5 pb-5 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-[color:var(--navy)]">{section.title}</h3>
                  </div>
                  <p className="text-sm leading-6 text-[color:var(--muted)]">{section.summary}</p>
                  <div className="grid gap-3">
                    {section.highlights.map((highlight) => (
                      <Meta key={highlight.label} label={highlight.label} value={highlight.value} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>

        <aside className="grid content-start gap-4">
          <Card>
            <CardContent className="grid gap-4 px-5 pb-5 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <h2 className="font-bold uppercase text-[color:var(--navy)]">Available positions</h2>
              </div>
              {jobs.map((job) => (
                <a key={job.id} href={`/jobs/${job.id}`} className="grid gap-2 rounded-md border border-[color:var(--border-muted)] p-4 hover:bg-[color:var(--surface-muted)]">
                  <h3 className="font-bold text-[color:var(--navy)]">{job.title}</h3>
                  <p className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
                    <MapPin className="h-4 w-4" />
                    {job.city}, {job.state}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[color:var(--blue)]">
                    View details <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
              <Button href={`/jobs?departmentId=${department.id}`}>View all positions</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-4 px-5 pb-5 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="font-bold uppercase text-[color:var(--navy)]">Why join {department.city}?</h2>
              </div>
              <ul className="grid gap-3">
                {department.whyJoin.map((reason) => (
                  <li key={reason} className="flex items-start gap-2 text-sm font-semibold text-[color:var(--muted)]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--success)]" />
                    {reason}
                  </li>
                ))}
              </ul>
              <Button href="/auth/signup/candidate" variant="secondary" iconRight={<ArrowRight size={18} />}>
                Create candidate profile
              </Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[color:var(--navy)]">{value}</p>
    </div>
  );
}
