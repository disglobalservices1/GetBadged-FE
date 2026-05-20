"use client";

import {
  ArrowRight,
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock3,
  FileBadge2,
  Landmark,
  MapPin,
  PlayCircle,
  Shield,
  Users,
  X
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatEmploymentType, formatJobType, formatPostedDate, getPublicJobs } from "@/features/public/directory";
import { cn } from "@/lib/utils/cn";
import type { PublicJobDetail } from "@/types/job";

type JobDetailPageProps = {
  job: PublicJobDetail;
};

const mediaItems = [
  {
    id: "station",
    label: "Station exterior",
    imageUrl: "https://images.unsplash.com/photo-1693329900318-9686ec84b1cd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "officers",
    label: "Patrol team",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "community",
    label: "Community event",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "training",
    label: "Training room",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "equipment",
    label: "Equipment",
    imageUrl: "https://images.unsplash.com/photo-1525186402429-b4ff38bedec6?auto=format&fit=crop&w=900&q=80"
  }
];

const atAGlanceItems = [
  { label: "Department", value: "Westview Police Department", icon: <Landmark /> },
  { label: "Population", value: "11,600 Residents", icon: <Users /> },
  { label: "Patrol Officers", value: "20 - 30", icon: <FileBadge2 /> },
  { label: "Call Volume", value: "Moderate", icon: <Clock3 /> },
  { label: "Department Size", value: "50 - 60", icon: <Building2 /> },
  { label: "Community", value: "Residential, Urban", icon: <MapPin /> },
  { label: "On-Site Mental Health", value: "Yes", icon: <CheckCircle2 /> },
  { label: "Chief", value: "James Smith", icon: <Users /> }
];

const responsibilities = [
  "Respond to calls for service and emergency situations",
  "Patrol assigned areas and engage with the community",
  "Enforce laws and department policies with integrity and respect",
  "Prepare accurate reports and maintain records",
  "Work collaboratively with team members and other agencies",
  "Other duties as assigned"
];

const tabItems = [
  { id: "overview", label: "Overview" },
  { id: "requirements", label: "Requirements" },
  { id: "schedule", label: "Schedule & Pay" },
  { id: "benefits", label: "Benefits" }
] as const;

type TabId = (typeof tabItems)[number]["id"];

const fallbackAvailablePositions = [
  {
    href: "/jobs/job_2",
    title: "Lateral Police Officer (POST Certified)",
    city: "Westview",
    postedAt: "May 2, 2026"
  },
  {
    href: "/jobs/job_6",
    title: "Police Dispatcher",
    city: "Westview",
    postedAt: "Apr 28, 2026"
  },
  {
    href: "/jobs/job_5",
    title: "School Resource Officer",
    city: "Westview",
    postedAt: "Apr 25, 2026"
  }
];

export function JobDetailPage({ job }: JobDetailPageProps) {
  const [activeMediaId, setActiveMediaId] = useState(mediaItems[0].id);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const relatedJobs = getPublicJobs({ departmentId: job.departmentId }).filter((relatedJob) => relatedJob.id !== job.id).slice(0, 3);
  const availablePositions =
    relatedJobs.length >= 3
      ? relatedJobs.map((relatedJob) => ({
          href: `/jobs/${relatedJob.id}`,
          title: relatedJob.title,
          city: relatedJob.city,
          postedAt: formatPostedDate(relatedJob.postedAt)
        }))
      : fallbackAvailablePositions;
  const activeMedia = useMemo(() => mediaItems.find((item) => item.id === activeMediaId) ?? mediaItems[0], [activeMediaId]);

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 py-6">
      <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-[color:var(--muted)]">
        <a href="/" className="text-[color:var(--blue)]">
          Home
        </a>
        <span>/</span>
        <a href="/departments" className="text-[color:var(--blue)]">
          Departments
        </a>
        <span>/</span>
        <a href={`/departments/${job.departmentSlug}`} className="text-[color:var(--blue)]">
          {job.departmentName}
        </a>
        <span>/</span>
        <span>{job.title}</span>
      </nav>

      <section className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_30vw] 2xl:grid-cols-[minmax(0,1fr)_576px]">
        <div className="grid gap-7 md:grid-cols-[180px_minmax(0,1fr)]">
          <WestviewBadge />
          <div className="grid content-start gap-5">
            <span className="w-fit rounded-md bg-[color:var(--gold)] px-3 py-1 text-xs font-extrabold uppercase text-[color:var(--navy)]">{formatEmploymentType(job.employmentType)}</span>
            <div>
              <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-[color:var(--navy)] md:text-4xl">{job.title}</h1>
              <p className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-700">
                <MapPin className="h-5 w-5 text-slate-500" />
                {job.city}, Massachusetts
              </p>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">{job.departmentProfileIntro}</p>
          </div>

          <div className="md:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <HeroMeta icon={<CalendarDays />} label="Posted" value={formatPostedDate(job.postedAt)} />
              <HeroMeta icon={<Clock3 />} label="Hiring Timeline" value={job.hiringTimeline ?? "Pending"} />
              <HeroMeta icon={<Users />} label="# of Openings" value={job.numberOfOpenings ?? "Pending"} />
              <HeroMeta icon={<Landmark />} label="Department Type" value="Civil Service" />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`/auth/signup/candidate?jobId=${job.id}`} className="min-w-48 uppercase">
                Apply now
              </Button>
              <Button type="button" variant="secondary" iconLeft={<Bookmark className="h-5 w-5" />} className="min-w-44 uppercase">
                Save job
              </Button>
            </div>
          </div>
        </div>

        <div className="grid min-w-0 content-start gap-4">
          <div className="overflow-hidden rounded-lg border border-[color:var(--border-muted)] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeMedia.imageUrl} alt={activeMedia.label} className="aspect-[16/10] w-full object-cover" />
          </div>
          <div className="grid min-w-0 grid-cols-5 gap-3">
            {mediaItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveMediaId(item.id)}
                className={cn(
                  "relative overflow-hidden rounded-md border-2 bg-white transition",
                  activeMediaId === item.id ? "border-[color:var(--blue-deep)]" : "border-transparent hover:border-[color:var(--border)]"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.label} className="aspect-[4/3] w-full object-cover" />
                {index === mediaItems.length - 1 ? <span className="absolute inset-0 grid place-items-center bg-slate-950/45 text-sm font-extrabold text-white">+6</span> : null}
              </button>
            ))}
          </div>
          <Button type="button" variant="secondary" iconLeft={<PlayCircle className="h-5 w-5" />} className="w-full uppercase" onClick={() => setIsVideoOpen(true)}>
            Watch video (0:45)
          </Button>
        </div>
      </section>

      <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="min-w-0 overflow-hidden">
          <div className="flex max-w-full overflow-x-auto border-b border-[color:var(--border-muted)] px-2 sm:px-4">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative min-h-16 shrink-0 px-4 text-sm font-extrabold uppercase text-[color:var(--navy)] transition hover:text-[color:var(--blue)] sm:px-5",
                  activeTab === tab.id && "text-[color:var(--blue-deep)]"
                )}
              >
                {tab.label}
                <span className={cn("absolute bottom-0 left-4 right-4 h-1 rounded-t-full bg-[color:var(--blue-deep)] transition-opacity", activeTab === tab.id ? "opacity-100" : "opacity-0")} />
              </button>
            ))}
          </div>
          <CardContent className="grid gap-8 p-6 md:p-8">
            {activeTab === "overview" ? <OverviewPanel job={job} /> : null}
            {activeTab === "requirements" ? <RequirementPanel job={job} /> : null}
            {activeTab === "schedule" ? <SchedulePanel job={job} /> : null}
            {activeTab === "benefits" ? <BenefitsPanel job={job} /> : null}
          </CardContent>
        </Card>

        <aside className="grid content-start gap-5">
          <Card>
            <CardContent className="grid gap-6 px-4 sm:px-6 pb-6 pt-8">
              <h2 className="text-lg font-extrabold uppercase text-[color:var(--navy)]">Job Details</h2>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                <SidebarMeta icon={<BriefcaseIcon />} label="Job Type" value={formatEmploymentType(job.employmentType)} />
                <SidebarMeta icon={<Users />} label="Position Type" value={job.positionCategory} />
                <SidebarMeta icon={<MapPin />} label="Location" value={`${job.city}, Massachusetts`} />
                <SidebarMeta icon={<Shield />} label="Department" value={job.departmentName} />
                <SidebarMeta icon={<CalendarDays />} label="Posted" value={formatPostedDate(job.postedAt)} />
                <SidebarMeta icon={<Clock3 />} label="Hiring Timeline" value={job.hiringTimeline ?? "Pending"} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-5 px-4 sm:px-6 pb-6 pt-8">
              <h2 className="text-lg font-extrabold uppercase text-[color:var(--navy)]">Why join Westview?</h2>
              <ul className="grid gap-4">
                {job.whyJoin.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 fill-green-100 text-[color:var(--success)]" />
                    {reason}
                  </li>
                ))}
              </ul>
              <a href={`/departments/${job.departmentSlug}`} className="mt-2 inline-flex items-center gap-2 text-sm font-extrabold uppercase text-[color:var(--blue-deep)]">
                Learn more about our department <ArrowRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <div className="rounded-lg bg-blue-50 p-6">
            <div className="flex items-start gap-4">
              <CircleHelp className="h-10 w-10 shrink-0 text-[color:var(--blue-deep)]" />
              <div>
                <h2 className="text-lg font-extrabold uppercase text-[color:var(--navy)]">Questions?</h2>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">Contact our recruiting team.</p>
                <a href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold uppercase text-[color:var(--blue-deep)]">
                  Contact us <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {availablePositions.length > 0 ? (
        <section className="rounded-lg border border-[color:var(--border-muted)] bg-white p-6 md:p-8">
          <h2 className="text-lg font-extrabold uppercase text-[color:var(--navy)]">Available positions</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {availablePositions.map((relatedJob) => (
              <AvailablePositionCard key={relatedJob.title} href={relatedJob.href} title={relatedJob.title} city={relatedJob.city} postedAt={relatedJob.postedAt} />
            ))}
            <a href={`/jobs?departmentId=${job.departmentId}`} className="grid min-h-52 place-items-center rounded-lg border border-[color:var(--border-muted)] p-5 text-center transition hover:bg-[color:var(--surface-muted)]">
              <div className="grid justify-items-center gap-3">
                <Users className="h-12 w-12 text-[color:var(--blue-deep)]" />
                <h3 className="font-extrabold text-[color:var(--blue-deep)]">View All Opportunities</h3>
                <p className="text-sm leading-6 text-[color:var(--muted)]">Explore all open positions at Westview PD.</p>
                <span className="inline-flex items-center gap-2 text-sm font-extrabold uppercase text-[color:var(--blue-deep)]">
                  View all positions <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </section>
      ) : null}

      {isVideoOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="font-extrabold text-[color:var(--navy)]">Westview recruiting video</h2>
              <button type="button" aria-label="Close video" className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100" onClick={() => setIsVideoOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <video controls autoPlay className="aspect-video w-full rounded-md bg-slate-950">
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function WestviewBadge() {
  return (
    <div className="mx-auto grid justify-items-center md:mx-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/westview-police-badge.png" alt="Westview Police Mass. badge" className="h-auto w-36 object-contain drop-shadow-sm md:w-44" />
    </div>
  );
}

function OverviewPanel({ job }: { job: PublicJobDetail }) {
  return (
    <>
      <SectionBlock icon={<FileBadge2 />} title="About the role">
        <p className="text-sm leading-7 text-slate-700">
          As an {job.title}, you will be the front line of our department and community. You&apos;ll respond to calls for service, build relationships with residents, and work alongside
          dedicated professionals to keep Westview safe.
        </p>
      </SectionBlock>

      <SectionBlock icon={<Users />} title="Responsibilities">
        <ul className="grid gap-3">
          {responsibilities.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[color:var(--blue-deep)]" />
              {item}
            </li>
          ))}
        </ul>
      </SectionBlock>

      <div className="border-t border-[color:var(--border-muted)] pt-8">
        <SectionBlock icon={<Shield />} title="At a glance">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlanceItems.map((item) => (
              <SidebarMeta key={item.label} icon={item.icon} label={item.label} value={item.value} />
            ))}
          </div>
        </SectionBlock>
      </div>

      <div className="grid gap-5 rounded-md bg-blue-50 p-5 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
        <Shield className="h-12 w-12 text-[color:var(--blue-deep)]" />
        <div>
          <p className="font-extrabold uppercase text-[color:var(--blue-deep)]">Ready to make a difference?</p>
          <p className="mt-1 text-sm text-[color:var(--muted)]">Join a team that&apos;s committed to excellence and community.</p>
        </div>
        <Button href={`/auth/signup/candidate?jobId=${job.id}`} className="uppercase">
          Apply now
        </Button>
      </div>
    </>
  );
}

function RequirementPanel({ job }: { job: PublicJobDetail }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <RequirementList title="Minimum requirements" items={job.minimumRequirements.map((requirement) => requirement.label)} />
      <RequirementList title="Preferred qualifications" items={job.preferredRequirements.map((requirement) => requirement.label)} />
    </div>
  );
}

function SchedulePanel({ job }: { job: PublicJobDetail }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <InfoBox label="Hiring timeline" value={job.hiringTimeline ?? "Pending"} />
      <InfoBox label="Openings" value={job.numberOfOpenings ?? "Pending"} />
      <InfoBox label="Starting salary" value={job.salary.startingSalary ? `$${job.salary.startingSalary.toLocaleString()}` : "Pending"} />
      <InfoBox label="Top step salary" value={job.salary.topStepSalary ? `$${job.salary.topStepSalary.toLocaleString()}` : "Pending"} />
    </div>
  );
}

function BenefitsPanel({ job }: { job: PublicJobDetail }) {
  return <RequirementList title="Benefits" items={job.benefits} />;
}

function SectionBlock({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 md:grid-cols-[36px_minmax(0,1fr)]">
      <div className="text-[color:var(--blue-deep)] [&_svg]:h-7 [&_svg]:w-7">{icon}</div>
      <div>
        <h2 className="text-lg font-extrabold uppercase text-[color:var(--blue-deep)]">{title}</h2>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}

function RequirementList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-extrabold text-[color:var(--navy)]">{title}</h3>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
            <Check className="mt-1 h-4 w-4 shrink-0 text-[color:var(--blue-deep)]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeroMeta({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-[color:var(--blue-deep)] [&_svg]:h-8 [&_svg]:w-8">{icon}</div>
      <div>
        <p className="text-xs font-extrabold text-slate-600">{label}</p>
        <p className="mt-1 text-sm font-semibold text-[color:var(--navy)]">{value}</p>
      </div>
    </div>
  );
}

function SidebarMeta({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[color:var(--blue-deep)] [&_svg]:h-6 [&_svg]:w-6">{icon}</div>
      <div>
        <p className="text-xs font-extrabold uppercase text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold leading-6 text-[color:var(--navy)]">{value}</p>
      </div>
    </div>
  );
}

function AvailablePositionCard({ href, title, city, postedAt }: { href: string; title: string; city: string; postedAt: string }) {
  return (
    <a href={href} className="grid min-h-52 content-between rounded-lg border border-[color:var(--border-muted)] p-5 transition hover:bg-[color:var(--surface-muted)]">
      <div>
        <h3 className="text-lg font-extrabold text-[color:var(--blue-deep)]">{title}</h3>
        <span className="mt-3 inline-flex w-fit rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-700">Full-Time</span>
        <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <MapPin className="h-4 w-4 text-slate-500" />
          {city}, MA
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <CalendarDays className="h-4 w-4 text-slate-500" />
          Posted {postedAt}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold uppercase text-[color:var(--blue-deep)]">
        View details <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[color:var(--border-muted)] p-5">
      <p className="text-xs font-extrabold uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-extrabold text-[color:var(--navy)]">{value}</p>
    </div>
  );
}

function BriefcaseIcon() {
  return <Building2 />;
}
