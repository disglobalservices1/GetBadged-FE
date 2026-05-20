import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Home,
  Landmark,
  MapPin,
  PlayCircle,
  ShieldCheck,
  Star,
  UserRound,
  Users,
  Volume2
} from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getJobsForDepartment, formatEmploymentType, formatPostedDate } from "@/features/public/directory";
import type { PublicDepartmentProfile, PublicDepartmentProfileSection } from "@/types/department";
import type { PublicJobSummary } from "@/types/job";

type DepartmentDetailPageProps = {
  department: PublicDepartmentProfile;
};

const exploreTiles = [
  {
    title: "Inside the Department",
    copy: "Learn about our facilities, team, and culture.",
    imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Training & Specialty Units",
    copy: "Explore our training opportunities and specialized units.",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "The Community",
    copy: "Discover what makes Westview a great place to live and work.",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Schools & Housing",
    copy: "Information about schools, housing options, and more.",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=700&q=80"
  }
];

export function DepartmentDetailPage({ department }: DepartmentDetailPageProps) {
  const jobs = getJobsForDepartment(department.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-[color:var(--navy)]">
        <a href="/" className="hover:text-[color:var(--blue)]">
          Home
        </a>
        <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[color:var(--muted)]" />
        <a href="/departments" className="hover:text-[color:var(--blue)]">
          Departments
        </a>
        <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[color:var(--muted)]" />
        <span>{department.departmentName}</span>
      </nav>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
        <main className="grid min-w-0 gap-5">
          <section className="grid gap-8 lg:grid-cols-[230px_minmax(220px,1fr)_minmax(340px,440px)]">
            <div className="flex items-start justify-center lg:justify-start">
              <DepartmentBadge departmentName={department.departmentName} />
            </div>

            <div className="grid content-start gap-5 pt-2">
              <div>
                <h1 className="max-w-sm text-4xl font-extrabold leading-[1.08] text-[color:var(--navy)]">{department.departmentName}</h1>
                <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[color:var(--muted)]">
                  <MapPin className="h-4 w-4" />
                  {department.city}, Massachusetts
                </p>
              </div>
              <p className="max-w-xs text-base font-semibold leading-7 text-[color:var(--navy)]">{department.profileIntro}</p>
              <Button
                href="#media"
                variant="secondary"
                className="h-11 w-fit px-7 text-xs uppercase"
                iconLeft={<PlayCircle className="h-4 w-4" />}
              >
                Watch video (0:45)
              </Button>
            </div>

            <HeroMedia department={department} />
          </section>

          <Card>
            <CardContent className="px-6 pb-8 pt-8">
              <SectionHeading>At a glance</SectionHeading>
              <div className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 xl:grid-cols-5">
                <GlanceItem icon={<UserRound />} label="Chief" value={department.chiefName} />
                <GlanceItem icon={<ClipboardCheck />} label="Chief Sworn In" value={department.chiefSwornIn} />
                <GlanceItem icon={<Star />} label="Department Type" value={department.departmentType} />
                <GlanceItem icon={<Users />} label="Population" value={department.population.replace(" Residents", "")} />
                <GlanceItem icon={<Landmark />} label="Department Size" value={department.departmentSize} />
                <GlanceItem icon={<ShieldCheck />} label="Patrol Officers" value={department.patrolOfficers} />
                <GlanceItem icon={<Volume2 />} label="Call Volume" value={department.callVolume} />
                <GlanceItem icon={<CalendarDays />} label="Hiring Timeline" value={department.hiringTimeline} />
                <GlanceItem icon={<BadgeIcon />} label="Open Positions" value={department.openPositions} />
                <GlanceItem icon={<Home />} label="Community Type" value={department.communityType} />
              </div>
              <a href="#sections" className="mt-10 flex items-center justify-center gap-2 text-xs font-extrabold uppercase text-[color:var(--blue-deep)]">
                View more about our department
                <ChevronDown className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <Card id="media" className="scroll-mt-24">
            <CardContent className="px-6 pb-6 pt-8">
              <SectionHeading>Explore {department.city}</SectionHeading>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {exploreTiles.map((tile) => (
                  <ExploreTile key={tile.title} {...tile} />
                ))}
              </div>
            </CardContent>
          </Card>

          <section id="sections" className="grid scroll-mt-24 gap-5 xl:grid-cols-3">
            {department.sections.slice(0, 3).map((section) => (
              <ProfileInfoCard key={section.id} section={section} />
            ))}
          </section>

          <Card>
            <CardContent className="flex flex-col gap-5 px-6 pb-6 pt-8 sm:flex-row sm:items-center">
              <Landmark className="h-12 w-12 shrink-0 text-[color:var(--blue-deep)]" />
              <div className="min-w-0">
                <h2 className="text-base font-extrabold uppercase text-[color:var(--navy)]">Equal Opportunity Employer</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[color:var(--navy)]">
                  The {department.departmentName} is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an
                  inclusive environment for all employees.
                </p>
                <a href="#sections" className="mt-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase text-[color:var(--blue-deep)]">
                  View our full EOE statement
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        </main>

        <DepartmentSidebar department={department} jobs={jobs} />
      </div>
    </div>
  );
}

function DepartmentBadge({ departmentName }: { departmentName: string }) {
  return (
    <div
      aria-label={`${departmentName} badge`}
      className="grid h-64 w-52 place-items-center bg-[color:var(--navy)] px-5 py-8 text-center text-white shadow-sm"
      style={{ clipPath: "polygon(50% 0%, 94% 14%, 88% 72%, 50% 100%, 12% 72%, 6% 14%)" }}
    >
      <div className="grid h-full w-full place-items-center rounded-[42%] border-4 border-[#f5b82e] px-4">
        <div>
          <p className="text-2xl font-extrabold leading-none tracking-[0.1em]">WESTVIEW</p>
          <p className="mt-1 text-xl font-extrabold leading-none tracking-[0.1em]">POLICE</p>
          <div className="mx-auto my-4 grid h-16 w-16 place-items-center rounded-full border-2 border-[#f5b82e] bg-[#2f6f83]">
            <ShieldCheck className="h-8 w-8 text-[#f5b82e]" />
          </div>
          <p className="text-2xl font-extrabold leading-none tracking-[0.1em]">MASS.</p>
        </div>
      </div>
    </div>
  );
}

function HeroMedia({ department }: { department: PublicDepartmentProfile }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-[color:var(--border-muted)] bg-white shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={department.coverImageUrl} alt={`${department.departmentName} station`} className="h-64 w-full object-cover sm:h-80 lg:h-full" />
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {[0, 1, 2, 3].map((dot) => (
          <span key={dot} className="h-3 w-3 rounded-full bg-white/80 shadow-sm" />
        ))}
      </div>
      <span className="absolute bottom-4 right-4 rounded-md bg-black/70 px-3 py-1.5 text-sm font-bold text-white">1 / 6</span>
    </div>
  );
}

function DepartmentSidebar({ department, jobs }: { department: PublicDepartmentProfile; jobs: PublicJobSummary[] }) {
  return (
    <aside className="grid content-start gap-5 lg:sticky lg:top-6">
      <Card className="overflow-hidden">
        <div className="bg-[color:var(--navy)] px-6 py-5 text-white">
          <div className="flex items-center gap-4">
            <BriefcaseBusiness className="h-7 w-7" />
            <SectionHeading inverse>Available positions</SectionHeading>
          </div>
        </div>
        <div className="grid gap-4 p-0">
          {jobs.map((job) => (
            <SidebarJobCard key={job.id} job={job} />
          ))}
          <div className="px-1 pb-2">
            <Button href={`/jobs?departmentId=${department.id}`} className="w-full uppercase">
              View all positions
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <CardContent className="px-6 pb-6 pt-8">
          <SectionHeading>Why join {department.city}?</SectionHeading>
          <ul className="mt-7 grid gap-4">
            {department.whyJoin.map((reason) => (
              <li key={reason} className="flex items-center gap-3 text-sm font-bold text-[color:var(--navy)]">
                <CheckCircle2 className="h-5 w-5 shrink-0 fill-[color:var(--success)] text-white" />
                {reason}
              </li>
            ))}
          </ul>
          <a href="#sections" className="mt-8 inline-flex items-center gap-3 text-xs font-extrabold uppercase text-[color:var(--blue-deep)]">
            Learn more about our team
            <ArrowRight className="h-5 w-5" />
          </a>
        </CardContent>
      </Card>

      <Card className="border-0 bg-blue-50">
        <CardContent className="flex items-center gap-5 px-6 pb-6 pt-8">
          <CircleHelp className="h-12 w-12 shrink-0 text-[color:var(--blue-deep)]" />
          <div>
            <h2 className="text-base font-extrabold text-[color:var(--navy)]">Have Questions?</h2>
            <p className="mt-1 text-sm font-semibold text-[color:var(--muted)]">Contact our recruiting team.</p>
            <a href="/about" className="mt-4 inline-flex items-center gap-3 text-xs font-extrabold uppercase text-[color:var(--blue-deep)]">
              Contact us
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

function SidebarJobCard({ job }: { job: PublicJobSummary }) {
  return (
    <a href={`/jobs/${job.id}`} className="grid gap-4 border-b border-[color:var(--border-muted)] px-6 py-6 last:border-b-0 hover:bg-[color:var(--surface-muted)]">
      <h3 className="text-lg font-extrabold leading-snug text-[color:var(--navy)]">{job.title}</h3>
      <span className="w-fit rounded-md bg-green-100 px-3 py-1 text-sm font-bold text-green-800">{formatEmploymentType(job.employmentType)}</span>
      <p className="flex items-center gap-3 text-sm font-bold text-[color:var(--muted)]">
        <MapPin className="h-4 w-4 text-[color:var(--navy)]" />
        {job.city}, {job.state}
      </p>
      <p className="flex items-center gap-3 text-sm font-bold text-[color:var(--muted)]">
        <CalendarDays className="h-4 w-4 text-[color:var(--navy)]" />
        Posted {formatPostedDate(job.postedAt)}
      </p>
      <span className="inline-flex items-center justify-center gap-4 text-xs font-extrabold uppercase text-[color:var(--blue-deep)]">
        View details
        <ArrowRight className="h-5 w-5" />
      </span>
    </a>
  );
}

function SectionHeading({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <div>
      <h2 className={`text-lg font-extrabold uppercase ${inverse ? "text-white" : "text-[color:var(--navy)]"}`}>{children}</h2>
      <div className="mt-3 h-0.5 w-12 bg-[color:var(--gold)]" />
    </div>
  );
}

function GlanceItem({ icon, label, value }: { icon: ReactElement; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center text-[color:var(--blue-deep)] [&_svg]:h-8 [&_svg]:w-8">{icon}</span>
      <div>
        <p className="text-xs font-extrabold text-[color:var(--navy)]">{label}</p>
        <p className="mt-1 text-sm font-semibold text-[color:var(--navy)]">{value}</p>
      </div>
    </div>
  );
}

function ExploreTile({ title, copy, imageUrl }: { title: string; copy: string; imageUrl: string }) {
  return (
    <a href="#sections" className="group relative min-h-64 overflow-hidden rounded-md border border-[color:var(--border-muted)] bg-[color:var(--navy)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 transition group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)] via-[color:var(--navy)]/60 to-transparent" />
      <div className="relative flex h-full min-h-64 flex-col justify-end p-5 text-white">
        <h3 className="text-xl font-extrabold leading-tight">{title}</h3>
        <p className="mt-3 text-sm font-semibold leading-6">{copy}</p>
        <ArrowRight className="mt-6 h-5 w-5" />
      </div>
    </a>
  );
}

function ProfileInfoCard({ section }: { section: PublicDepartmentProfileSection }) {
  const iconMap = [Landmark, ShieldCheck, Users];

  return (
    <Card>
      <CardContent className="grid h-full gap-8 px-6 pb-6 pt-8">
        <h2 className="text-base font-extrabold uppercase text-[color:var(--navy)]">{section.title}</h2>
        <div className="grid gap-8">
          {section.highlights.slice(0, 3).map((highlight, index) => {
            const Icon = iconMap[index] ?? Building2;
            return (
              <div key={highlight.label} className="flex gap-4">
                <Icon className="h-8 w-8 shrink-0 text-[color:var(--blue-deep)]" />
                <div>
                  <p className="text-xs font-extrabold text-[color:var(--navy)]">{highlight.label}</p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-[color:var(--navy)]">{highlight.value}</p>
                </div>
              </div>
            );
          })}
        </div>
        <a href="#sections" className="mt-auto inline-flex items-center gap-3 text-xs font-extrabold uppercase text-[color:var(--blue-deep)]">
          View more
          <ArrowRight className="h-5 w-5" />
        </a>
      </CardContent>
    </Card>
  );
}

function BadgeIcon() {
  return <BriefcaseBusiness />;
}
