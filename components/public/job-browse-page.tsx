import { ArrowRight, BriefcaseBusiness, Building2, Calendar, Clock, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { formatEmploymentType, formatJobType, formatPostedDate, getJobFilterOptions, getPublicJobs } from "@/features/public/directory";

type JobBrowsePageProps = {
  filters?: {
    city?: string;
    jobType?: string;
    departmentId?: string;
  };
};

export function JobBrowsePage({ filters = {} }: JobBrowsePageProps) {
  const jobs = getPublicJobs(filters);
  const filterOptions = getJobFilterOptions();
  const filterFormKey = `${filters.city ?? ""}-${filters.jobType ?? ""}-${filters.departmentId ?? ""}`;

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 py-10">
      <section className="grid gap-3">
        <p className="text-sm font-bold uppercase text-[color:var(--blue)]">Available positions</p>
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-[color:var(--navy)]">Browse Massachusetts public-safety jobs.</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              Review active openings, minimum requirements, department fit, and hiring timelines before starting an application.
            </p>
          </div>
          <Button href="/departments" variant="secondary" iconRight={<ArrowRight size={18} />}>
            Browse departments
          </Button>
        </div>
      </section>

      <form key={filterFormKey} className="grid gap-4 rounded-lg border border-[color:var(--border-muted)] bg-white p-4 md:grid-cols-4" action="/jobs">
        <Select label="City" name="city" defaultValue={filters.city ?? ""} options={[{ label: "All cities", value: "" }, ...filterOptions.cities.map((city) => ({ label: city, value: city }))]} />
        <Select
          label="Job type"
          name="jobType"
          defaultValue={filters.jobType ?? ""}
          options={[{ label: "All job types", value: "" }, ...filterOptions.jobTypes.map((type) => ({ label: formatJobType(type), value: type }))]}
        />
        <Select label="Department" name="departmentId" defaultValue={filters.departmentId ?? ""} options={[{ label: "All departments", value: "" }, ...filterOptions.departments]} />
        <div className="flex items-end gap-3">
          <Button type="submit" className="w-full">
            Apply
          </Button>
          <Button href="/jobs" variant="secondary" className="w-full">
            Reset
          </Button>
        </div>
      </form>

      <section className="grid gap-4 md:grid-cols-2">
        {jobs.length === 0 ? (
          <Card className="md:col-span-2">
            <CardContent className="grid gap-3 px-6 pb-6 pt-8 text-center">
              <h2 className="text-xl font-bold text-[color:var(--navy)]">No jobs match those filters.</h2>
              <p className="text-sm leading-6 text-[color:var(--muted)]">Try another city, department, or job type to broaden the results.</p>
              <div>
                <Button href="/jobs" variant="secondary">
                  Reset filters
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="grid gap-5 px-6 pb-6 pt-8">
              <div className="flex min-w-0 items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                    <BriefcaseBusiness className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <StatusChip label={formatEmploymentType(job.employmentType)} tone="success" />
                    <h2 className="mt-3 block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-bold text-[color:var(--navy)]" title={job.title}>
                      {job.title}
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-[color:var(--muted)]">
                      <MapPin className="h-4 w-4" />
                      {job.city}, {job.state}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <MetaItem icon={<Building2 className="h-4 w-4" />} label="Department" value={job.departmentName} />
                <MetaItem icon={<Calendar className="h-4 w-4" />} label="Posted" value={formatPostedDate(job.postedAt)} />
                <MetaItem icon={<Clock className="h-4 w-4" />} label="Timeline" value={job.hiringTimeline ?? "Pending"} />
                <MetaItem icon={<BriefcaseBusiness className="h-4 w-4" />} label="Openings" value={job.numberOfOpenings ?? "Pending"} />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button href={`/jobs/${job.id}`} iconRight={<ArrowRight size={18} />}>
                  View details
                </Button>
                <Button href={`/departments/${job.departmentSlug}`} variant="secondary">
                  Department profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

function MetaItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
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
