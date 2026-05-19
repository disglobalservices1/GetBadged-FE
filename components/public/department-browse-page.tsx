import { ArrowRight, Building2, Clock, MapPin, Users } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { getDepartmentFilterOptions, getPublicDepartments } from "@/features/public/directory";

type DepartmentBrowsePageProps = {
  filters?: {
    city?: string;
    departmentType?: string;
  };
};

export function DepartmentBrowsePage({ filters = {} }: DepartmentBrowsePageProps) {
  const departments = getPublicDepartments(filters);
  const filterOptions = getDepartmentFilterOptions();
  const filterFormKey = `${filters.city ?? ""}-${filters.departmentType ?? ""}`;

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10">
      <section className="grid gap-3">
        <p className="text-sm font-bold uppercase text-[color:var(--blue)]">Departments</p>
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-[color:var(--navy)]">Explore public-safety departments hiring through GetBadged.</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
              Compare approved department profiles, open positions, community fit, and hiring timelines before you apply.
            </p>
          </div>
          <Button href="/jobs" variant="secondary" iconRight={<ArrowRight size={18} />}>
            Browse jobs
          </Button>
        </div>
      </section>

      <form key={filterFormKey} className="grid gap-4 rounded-lg border border-[color:var(--border-muted)] bg-white p-4 md:grid-cols-3" action="/departments">
        <Select
          label="City"
          name="city"
          defaultValue={filters.city ?? ""}
          options={[{ label: "All cities", value: "" }, ...filterOptions.cities.map((city) => ({ label: city, value: city }))]}
        />
        <Select
          label="Department type"
          name="departmentType"
          defaultValue={filters.departmentType ?? ""}
          options={[{ label: "All types", value: "" }, ...filterOptions.departmentTypes.map((type) => ({ label: type, value: type }))]}
        />
        <div className="flex items-end gap-3">
          <Button type="submit" className="w-full">
            Apply filters
          </Button>
          <Button href="/departments" variant="secondary" className="w-full">
            Reset
          </Button>
        </div>
      </form>

      <section className="grid gap-5">
        {departments.length === 0 ? (
          <Card>
            <CardContent className="grid gap-3 px-6 pb-6 pt-8 text-center">
              <h2 className="text-xl font-bold text-[color:var(--navy)]">No departments match those filters.</h2>
              <p className="text-sm leading-6 text-[color:var(--muted)]">Try another city or department type to broaden the results.</p>
              <div>
                <Button href="/departments" variant="secondary">
                  Reset filters
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
        {departments.map((department) => (
          <Card key={department.id} className="overflow-hidden">
            <CardContent className="grid gap-0 p-0 md:grid-cols-[260px_1fr]">
              <div className="px-6 pb-0 pt-8 md:pb-6 md:pr-0">
                <div className="h-56 overflow-hidden rounded-md bg-slate-200">
                {department.coverImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={department.coverImageUrl} alt={`${department.departmentName} station`} className="h-full w-full object-cover" />
                ) : null}
                </div>
              </div>
              <div className="grid gap-5 px-6 pb-6 pt-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                      <Building2 className="h-7 w-7" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-[color:var(--navy)]">{department.departmentName}</h2>
                      <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-[color:var(--muted)]">
                        <MapPin className="h-4 w-4" />
                        {department.city}, {department.state}
                      </p>
                    </div>
                  </div>
                  <StatusChip label={department.departmentType} tone="navy" />
                </div>

                <p className="max-w-3xl text-sm leading-6 text-[color:var(--muted)]">{department.profileIntro}</p>

                <div className="grid grid-cols-3 gap-3">
                  <MetaItem icon={<Users className="h-4 w-4" />} label="Open positions" value={department.openPositions} />
                  <MetaItem icon={<Clock className="h-4 w-4" />} label="Hiring timeline" value={department.hiringTimeline} />
                  <MetaItem icon={<Building2 className="h-4 w-4" />} label="Active jobs" value={`${department.activeJobCount}`} />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button href={`/departments/${department.slug}`} iconRight={<ArrowRight size={18} />}>
                    View profile
                  </Button>
                  <Button href={`/jobs?departmentId=${department.id}`} variant="secondary">
                    View jobs
                  </Button>
                </div>
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
    <div className="flex min-w-0 flex-col gap-2 rounded-md border border-[color:var(--border-muted)] p-3 sm:flex-row sm:items-start">
      <div className="mt-0.5 text-[color:var(--blue)]">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-[color:var(--navy)]">{value}</p>
      </div>
    </div>
  );
}
