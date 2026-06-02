import { ArrowRight, Bell, BriefcaseBusiness, Building2, Calendar, Clock, MapPin } from "lucide-react";
import { RoleAwarePublicLink } from "@/components/public/role-aware-public-link";
import {
  aboutPrinciples,
  homeBenefitCards,
  homeCandidateSection,
  homeDepartmentSection,
  homeDepartmentsPreviewSection,
  homeFinalCta,
  homeHeroContent,
  homeJobsPreviewSection,
  homeAnnouncements,
  homeAnnouncementsSection,
  homeAboutSection,
  homePathwayCards,
  homeResourceCallout,
  homeStatsSection,
  publicHeroStats,
  publicTrustCards,
  resourceGroups
} from "@/features/public/marketing-content";
import { formatEmploymentType, formatPostedDate, getPublicDepartments, getPublicJobs } from "@/features/public/directory";

export function HomePage() {
  const ResourceIcon = homeResourceCallout.icon;
  const featuredJobs = getPublicJobs().slice(0, 3);
  const featuredDepartments = getPublicDepartments().slice(0, 3);

  return (
    <div className="bg-white text-[color:var(--navy)]">
      <section className="bg-[color:var(--navy)]" aria-label="GetBadged intro">
        <div className="grid">
          <div
            className="relative grid min-h-[500px] overflow-hidden bg-[color:var(--navy)] bg-cover bg-[center_right] bg-no-repeat lg:min-h-[610px] lg:grid-cols-[1.02fr_0.98fr]"
            style={{ backgroundImage: "url('/images/public-hero-bg.png')" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,33,0.96)_0%,rgba(4,13,33,0.88)_28%,rgba(4,13,33,0.45)_52%,rgba(4,13,33,0.12)_70%,rgba(4,13,33,0.06)_100%)]" />

            <div className="relative z-10 grid gap-7 px-7 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
              <div className="max-w-[760px]">
                <HeroHeadline />
                <p className="mt-5 max-w-[450px] text-[16px] leading-8 text-white/86 lg:text-[17px]">
                  {homeHeroContent.body}
                </p>
                <p className="mt-2 max-w-[520px] text-[16px] leading-8 text-[color:var(--gold)] lg:text-[17px]">
                  {homeHeroContent.accent}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <RoleAwarePublicLink
                  intent="candidate"
                  className="inline-flex min-h-[66px] min-w-[270px] items-center justify-between gap-4 rounded-[4px] bg-[color:var(--gold)] px-6 py-3 text-[color:var(--navy)] transition hover:brightness-95"
                >
                  <span className="grid text-left leading-none">
                    <span className="text-[14px] font-black">{homeHeroContent.candidateCta.label}</span>
                    <span className="mt-2 text-[13px] font-semibold">{homeHeroContent.candidateCta.sublabel}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </RoleAwarePublicLink>
                <RoleAwarePublicLink
                  intent="department"
                  className="inline-flex min-h-[66px] min-w-[270px] items-center justify-between gap-4 rounded-[4px] border border-white/40 bg-[rgba(10,18,38,0.28)] px-6 py-3 text-white transition hover:bg-white/8"
                >
                  <span className="grid text-left leading-none">
                    <span className="text-[14px] font-black">{homeHeroContent.departmentCta.label}</span>
                    <span className="mt-2 text-[13px] font-semibold text-white/82">{homeHeroContent.departmentCta.sublabel}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </RoleAwarePublicLink>
              </div>

              <div className="flex flex-wrap gap-5 text-[13px] font-bold text-white/86">
                {homeHeroContent.browseCtas.map((cta) => (
                  <a key={cta.label} href={cta.href} className="inline-flex items-center gap-2 transition hover:text-white">
                    {cta.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative min-h-[280px] lg:min-h-[610px]">
              <div className="absolute bottom-6 left-6 right-6 rounded-[10px] border border-white/16 bg-[rgba(7,14,31,0.58)] px-5 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)] backdrop-blur-[5px] sm:max-w-[248px] lg:bottom-[30%] lg:right-auto lg:left-[-5%] lg:w-[248px] xl:right-[24%] 2xl:right-[28%]">
                <div className="grid gap-3">
                  <HeroPeopleIcon className="h-[34px] w-[38px] text-white" />
                  <div>
                    <p className="text-[14px] font-bold leading-[1.3] text-white">{homeHeroContent.noteTitle}</p>
                    <p className="mt-2 text-[11px] font-medium leading-[1.45] text-white/88">
                      {homeHeroContent.noteBody}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(255,255,255,0.18)] bg-[#071126]">
        <div className="grid grid-cols-1 text-white md:grid-cols-2 xl:grid-cols-4">
          {homeBenefitCards.map((card, index) => (
            <div
              key={card.title}
              className={
                index === homeBenefitCards.length - 1
                  ? "grid grid-cols-[48px_1fr] items-center gap-4 px-8 py-6"
                  : "relative grid grid-cols-[48px_1fr] items-center gap-4 border-b border-[rgba(255,255,255,0.12)] px-8 py-6 md:border-b-0"
              }
            >
              {index !== homeBenefitCards.length - 1 ? (
                <span className="pointer-events-none absolute bottom-5 right-0 top-5 hidden w-px bg-[rgba(255,255,255,0.12)] xl:block" aria-hidden="true" />
              ) : null}
              <div className={card.tone === "gold" ? "text-[color:var(--gold)]" : "text-white"}>
                <card.icon className="h-11 w-11" strokeWidth={1.9} />
              </div>
              <div className="max-w-[188px] text-[13px] font-semibold leading-[1.42] text-white/94 lg:text-[14px]">
                <p>{card.title}</p>
                <p>{card.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8" aria-label="Home page sections">
        <div id="candidate-path" className="scroll-mt-24 text-center">
          <h2 className="text-[26px] font-black uppercase leading-none text-[color:var(--navy)] sm:text-[34px]">
            {homeCandidateSection.title}
          </h2>
          <p className="mx-auto mt-2 max-w-[760px] text-[15px] font-medium leading-7 text-slate-500">
            {homeCandidateSection.body}
          </p>
        </div>

        <div className="mx-auto mt-7 grid max-w-[1060px] gap-4 lg:grid-cols-3">
          {homePathwayCards.map((card) => (
            <article key={card.title} className="rounded-[18px] border border-[color:var(--border-muted)] bg-white px-6 py-6 shadow-[0_10px_22px_rgba(4,18,46,0.05)]">
              <div className="flex items-start gap-4">
                <div
                  className={
                    card.tone === "gold"
                      ? "grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#f2d08b] bg-[#fff8e8] text-[#c88a12]"
                      : card.tone === "navy"
                        ? "grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#d7dcea] bg-[#f7f9fc] text-[color:var(--navy)]"
                        : "grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#d9e1ff] bg-[#f4f7ff] text-[color:var(--blue)]"
                  }
                >
                  <card.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3
                    className={
                      card.tone === "gold"
                        ? "text-[25px] font-black uppercase leading-[1.02] text-[#c88a12]"
                        : "text-[25px] font-black uppercase leading-[1.02] text-[color:var(--navy)]"
                    }
                  >
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-[285px] text-[14px] font-medium leading-6 text-slate-600">{card.body}</p>
                </div>
              </div>

              <div className="mt-8">
                <RoleAwarePublicLink
                  intent="candidate"
                  className={
                    card.tone === "gold"
                      ? "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[color:var(--gold)] px-4 text-[14px] font-bold text-[color:var(--navy)] transition hover:brightness-95"
                      : card.tone === "navy"
                        ? "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[color:var(--navy)] px-4 text-[14px] font-bold text-white transition hover:bg-[#011530]"
                        : "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[color:var(--blue)] px-4 text-[14px] font-bold text-white transition hover:bg-[color:var(--blue-deep)]"
                  }
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </RoleAwarePublicLink>
                <a href={card.learnHref} className="mt-4 inline-flex items-center justify-center gap-2 text-[13px] font-bold text-[color:var(--blue)]">
                  Learn more about this path
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-4">
          {homeCandidateSection.secondaryCtas.map((cta) => (
            cta.href === "/auth/login" ? (
              <RoleAwarePublicLink key={cta.label} intent="sign_in" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--blue-deep)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50">
                {cta.label}
                <ArrowRight className="h-4 w-4" />
              </RoleAwarePublicLink>
            ) : (
              <a key={cta.label} href={cta.href} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--blue-deep)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50">
                {cta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            )
          ))}
        </div>

        <div className="mt-6 rounded-[18px] border border-[color:var(--border-muted)] bg-[#f7f9fc] px-5 py-4 shadow-[0_6px_18px_rgba(4,18,46,0.04)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--navy)] text-[color:var(--gold)]">
                <ResourceIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[14px] font-black text-[color:var(--navy)]">{homeResourceCallout.title}</p>
                <p className="mt-1 max-w-[690px] text-[13px] font-medium leading-6 text-slate-600">
                  {homeResourceCallout.body}
                </p>
              </div>
            </div>
            <a
              href={homeResourceCallout.cta.href}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--navy)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
            >
              {homeResourceCallout.cta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div id="department-path" className="mt-7 scroll-mt-24 overflow-hidden rounded-[22px] border border-[color:var(--navy)]/12 bg-[color:var(--navy)] text-white shadow-[0_16px_38px_rgba(4,18,46,0.12)]">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-[360px] border-b border-white/10 bg-[linear-gradient(145deg,#14284d_0%,#0a1731_62%,#081127_100%)] p-5 lg:min-h-[420px] lg:border-b-0 lg:border-r lg:border-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(254,191,63,0.22),transparent_26%),radial-gradient(circle_at_72%_14%,rgba(255,255,255,0.08),transparent_22%)]" />
              <div className="relative z-10 flex h-full min-h-[320px] flex-col gap-5">
                <div className="grid h-16 w-16 place-items-center rounded-[18px] border border-[color:var(--gold)]/30 bg-[rgba(0,0,0,0.24)]">
                  <img src="/images/getbadged-mark.png" alt="" className="h-10 w-10 object-contain" />
                </div>
                <div className="grid w-[260px] max-w-full gap-3 rounded-[18px] border border-white/14 bg-[rgba(255,255,255,0.06)] p-5 text-[13px] font-semibold text-white/80 shadow-[0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                  {homeDepartmentSection.previewItems.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--gold)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 px-6 py-6 sm:px-8 sm:py-7">
              <div className="grid gap-3">
                <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--gold)]">{homeDepartmentSection.eyebrow}</p>
                <h2 className="max-w-[460px] text-[34px] font-black leading-[0.96] text-white">
                  {homeDepartmentSection.title}
                </h2>
                {homeDepartmentSection.body.map((paragraph) => (
                  <p key={paragraph} className="max-w-[520px] text-[14px] leading-6 text-white/85">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {homeDepartmentSection.cards.map((card) => (
                  <div key={card.title} className="rounded-[18px] border border-[color:var(--gold)]/22 bg-[rgba(255,255,255,0.03)] p-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)]/35 text-[color:var(--gold)]">
                        <card.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-[18px] font-bold text-white">{card.title}</h3>
                    </div>
                    <p className="mt-3 text-[14px] leading-6 text-white/78">{card.body}</p>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex flex-wrap gap-3">
                  {homeDepartmentSection.ctas.map((cta) => {
                    const intent = cta.href === "/auth/signup/department" ? "department" : cta.href === "/auth/login" ? "sign_in" : undefined;

                    if (intent) {
                      return (
                        <RoleAwarePublicLink
                          key={cta.label}
                          intent={intent}
                          className={
                            cta.variant === "primary"
                              ? "inline-flex min-h-12 items-center gap-3 rounded-md bg-[color:var(--gold)] px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:brightness-95"
                              : "inline-flex min-h-12 items-center gap-3 rounded-md border border-white/25 px-5 text-[14px] font-bold text-white transition hover:bg-white/8"
                          }
                        >
                          {cta.label}
                          <ArrowRight className="h-4 w-4" />
                        </RoleAwarePublicLink>
                      );
                    }

                    return (
                      <a
                        key={cta.label}
                        href={cta.href}
                        className={
                          cta.variant === "primary"
                            ? "inline-flex min-h-12 items-center gap-3 rounded-md bg-[color:var(--gold)] px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:brightness-95"
                            : "inline-flex min-h-12 items-center gap-3 rounded-md border border-white/25 px-5 text-[14px] font-bold text-white transition hover:bg-white/8"
                        }
                      >
                        {cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-5" aria-labelledby="home-jobs-preview-heading">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">{homeJobsPreviewSection.eyebrow}</p>
              <h2 id="home-jobs-preview-heading" className="mt-2 max-w-[720px] text-[32px] font-black leading-[1.02] text-[color:var(--navy)]">{homeJobsPreviewSection.title}</h2>
              <p className="mt-3 max-w-[760px] text-[15px] leading-7 text-slate-500">{homeJobsPreviewSection.body}</p>
            </div>
            <a
              href={homeJobsPreviewSection.cta.href}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--blue-deep)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
            >
              {homeJobsPreviewSection.cta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {featuredJobs.map((job) => (
              <article key={job.id} className="grid gap-3 rounded-[18px] border border-[color:var(--border-muted)] bg-white p-4 shadow-[0_10px_22px_rgba(4,18,46,0.05)]">
                <div className="flex items-start gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d9e1ff] bg-[#f4f7ff] text-[color:var(--blue)]">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">{job.positionCategory}</p>
                    <h3 className="mt-1 text-[20px] font-black leading-tight text-[color:var(--navy)]">{job.title}</h3>
                    <p className="mt-2 text-[14px] font-semibold text-slate-600">{job.departmentName}</p>
                  </div>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  <HomeMetaCard icon={<MapPin className="h-4 w-4" />} label="Location" value={`${job.city}, ${job.state}`} />
                  <HomeMetaCard icon={<Calendar className="h-4 w-4" />} label="Posted" value={formatPostedDate(job.postedAt)} />
                  <HomeMetaCard icon={<Clock className="h-4 w-4" />} label="Timeline" value={job.hiringTimeline ?? "Pending"} />
                  <HomeMetaCard icon={<BriefcaseBusiness className="h-4 w-4" />} label="Type" value={formatEmploymentType(job.employmentType)} />
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={`/jobs/${job.id}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[color:var(--blue)] px-5 text-[14px] font-bold text-white transition hover:bg-[color:var(--blue-deep)]"
                  >
                    View Job Details
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={`/departments/${job.departmentSlug}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--blue-deep)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
                  >
                    Department Profile
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5" aria-labelledby="home-departments-preview-heading">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">{homeDepartmentsPreviewSection.eyebrow}</p>
              <h2 id="home-departments-preview-heading" className="mt-2 max-w-[760px] text-[32px] font-black leading-[1.02] text-[color:var(--navy)]">{homeDepartmentsPreviewSection.title}</h2>
              <p className="mt-3 max-w-[760px] text-[15px] leading-7 text-slate-500">{homeDepartmentsPreviewSection.body}</p>
            </div>
            <a
              href={homeDepartmentsPreviewSection.cta.href}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--blue-deep)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
            >
              {homeDepartmentsPreviewSection.cta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {featuredDepartments.map((department) => (
              <article key={department.id} className="overflow-hidden rounded-[18px] border border-[color:var(--border-muted)] bg-white shadow-[0_10px_22px_rgba(4,18,46,0.05)]">
                <div className="h-44 bg-slate-200">
                  {department.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={department.coverImageUrl} alt={`${department.departmentName} cover`} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="grid gap-4 p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d9e1ff] bg-[#f4f7ff] text-[color:var(--blue)]">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[12px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">{department.departmentType}</p>
                      <h3 className="mt-1 text-[20px] font-black leading-tight text-[color:var(--navy)]">{department.departmentName}</h3>
                      <p className="mt-2 text-[14px] font-semibold text-slate-600">{department.city}, {department.state}</p>
                    </div>
                  </div>

                  <p className="text-[14px] leading-6 text-slate-600">{department.profileIntro}</p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <HomeMetaCard icon={<BriefcaseBusiness className="h-4 w-4" />} label="Active jobs" value={`${department.activeJobCount}`} centered />
                    <HomeMetaCard icon={<Clock className="h-4 w-4" />} label="Timeline" value={department.hiringTimeline} centered />
                    <HomeMetaCard icon={<MapPin className="h-4 w-4" />} label="Openings" value={department.openPositions} centered />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`/departments/${department.slug}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[color:var(--blue)] px-5 text-[14px] font-bold text-white transition hover:bg-[color:var(--blue-deep)]"
                    >
                      View Department Profile
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={`/jobs?departmentId=${department.id}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--blue-deep)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
                    >
                      Available Jobs
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[22px] border border-[color:var(--border-muted)] bg-[#071126] px-5 py-6 text-white shadow-[0_16px_34px_rgba(4,18,46,0.1)] sm:px-7" aria-labelledby="home-stats-heading">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--gold)]">{homeStatsSection.eyebrow}</p>
              <h2 id="home-stats-heading" className="mt-2 max-w-[760px] text-[32px] font-black leading-[1.02]">{homeStatsSection.title}</h2>
              <p className="mt-3 max-w-[760px] text-[15px] leading-7 text-white/76">{homeStatsSection.body}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {publicHeroStats.map((stat) => (
              <div key={stat.label} className="rounded-[18px] border border-white/12 bg-white/5 p-5">
                <p className="text-[12px] font-black uppercase tracking-[0.08em] text-[color:var(--gold)]">{stat.label}</p>
                <p className="mt-3 text-[36px] font-black leading-none text-white">{stat.value}</p>
                <p className="mt-3 text-[14px] leading-6 text-white/76">{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="resources" className="mt-10 scroll-mt-24 grid gap-5" aria-labelledby="home-resources-heading">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">Resources</p>
              <h2 id="home-resources-heading" className="mt-2 max-w-[760px] text-[32px] font-black leading-[1.02] text-[color:var(--navy)]">Public resource groups built to become CMS-managed content.</h2>
              <p className="mt-3 max-w-[760px] text-[15px] leading-7 text-slate-500">
                Candidate guides, department playbooks, and platform updates can all be managed as public-safe content blocks.
              </p>
            </div>
            <a
              href="/resources"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--blue-deep)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
            >
              View All Resources
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {resourceGroups.map((group) => (
              <article key={group.title} className="grid gap-4 rounded-[18px] border border-[color:var(--border-muted)] bg-white p-5 shadow-[0_10px_22px_rgba(4,18,46,0.05)]">
                <div className="flex items-start gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d9e1ff] bg-[#f4f7ff] text-[color:var(--blue)]">
                    <group.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[12px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">{group.contentType ?? "Resource"}</p>
                    <h3 className="mt-1 text-[20px] font-black leading-tight text-[color:var(--navy)]">{group.title}</h3>
                    <p className="mt-2 text-[14px] leading-6 text-slate-600">{group.description}</p>
                  </div>
                </div>
                <div className="grid gap-2">
                  {group.links.slice(0, 3).map((link) => (
                    <a key={link} href="/resources" className="inline-flex items-center justify-between rounded-md border border-[color:var(--border-muted)] px-3 py-3 text-[13px] font-semibold text-[color:var(--navy)] transition hover:bg-slate-50">
                      <span>{link}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5" aria-labelledby="home-announcements-heading">
          <div>
            <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">{homeAnnouncementsSection.eyebrow}</p>
            <h2 id="home-announcements-heading" className="mt-2 max-w-[760px] text-[32px] font-black leading-[1.02] text-[color:var(--navy)]">{homeAnnouncementsSection.title}</h2>
            <p className="mt-3 max-w-[760px] text-[15px] leading-7 text-slate-500">{homeAnnouncementsSection.body}</p>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {homeAnnouncements.map((item) => (
              <article key={item.title} className="grid gap-4 rounded-[18px] border border-[color:var(--border-muted)] bg-[#f8fafc] p-5 shadow-[0_8px_20px_rgba(4,18,46,0.04)]">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--navy)] text-[color:var(--gold)]">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[12px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">{item.category}</p>
                    <h3 className="mt-1 text-[20px] font-black leading-tight text-[color:var(--navy)]">{item.title}</h3>
                    <p className="mt-2 text-[13px] font-semibold text-slate-500">{item.dateLabel}</p>
                  </div>
                </div>
                <p className="text-[14px] leading-6 text-slate-600">{item.body}</p>
                <a href={item.href} className="inline-flex items-center gap-2 text-[13px] font-bold text-[color:var(--blue)]">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="mt-10 scroll-mt-24 rounded-[22px] border border-[color:var(--border-muted)] bg-white px-5 py-6 shadow-[0_12px_28px_rgba(4,18,46,0.06)] sm:px-7" aria-labelledby="home-about-heading">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">{homeAboutSection.eyebrow}</p>
              <h2 id="home-about-heading" className="mt-2 max-w-[680px] text-[32px] font-black leading-[1.02] text-[color:var(--navy)]">{homeAboutSection.title}</h2>
              <p className="mt-3 max-w-[700px] text-[15px] leading-7 text-slate-500">{homeAboutSection.body}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                {homeAboutSection.ctas.map((cta, index) => {
                  const intent = cta.href === "/auth/signup/candidate" ? "candidate" : cta.href === "/auth/signup/department" ? "department" : undefined;

                  if (intent) {
                    return (
                      <RoleAwarePublicLink
                        key={cta.label}
                        intent={intent}
                        className={
                          index === 0
                            ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[color:var(--blue)] px-5 text-[14px] font-bold text-white transition hover:bg-[color:var(--blue-deep)]"
                            : "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--blue-deep)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
                        }
                      >
                        {cta.label}
                        <ArrowRight className="h-4 w-4" />
                      </RoleAwarePublicLink>
                    );
                  }

                  return (
                    <a
                      key={cta.label}
                      href={cta.href}
                      className={
                        index === 0
                          ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[color:var(--blue)] px-5 text-[14px] font-bold text-white transition hover:bg-[color:var(--blue-deep)]"
                          : "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--blue-deep)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
                      }
                    >
                      {cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4">
              {aboutPrinciples.map((principle) => (
                <div key={principle.title} className="flex items-start gap-4 rounded-[18px] border border-[color:var(--border-muted)] bg-[#f8fafc] p-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--navy)] text-[color:var(--gold)]">
                    <principle.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[color:var(--navy)]">{principle.title}</h3>
                    <p className="mt-2 text-[14px] leading-6 text-slate-600">{principle.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-5" aria-labelledby="home-trust-heading">
          <div>
            <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">Trust & Privacy</p>
            <h2 id="home-trust-heading" className="mt-2 max-w-[760px] text-[32px] font-black leading-[1.02] text-[color:var(--navy)]">Public-safe trust signals without exposing protected hiring data.</h2>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {publicTrustCards.map((card) => (
              <article key={card.title} className="grid gap-4 rounded-[18px] border border-[color:var(--border-muted)] bg-white p-5 shadow-[0_10px_22px_rgba(4,18,46,0.05)]">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-[#d9e1ff] bg-[#f4f7ff] text-[color:var(--blue)]">
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[20px] font-black leading-tight text-[color:var(--navy)]">{card.title}</h3>
                  <p className="mt-3 text-[14px] leading-6 text-slate-600">{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-7 flex flex-col gap-4 rounded-[18px] border border-[color:var(--border-muted)] bg-[#f8fafc] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[22px] font-black leading-none text-[color:var(--navy)]">{homeFinalCta.title}</h3>
            <p className="mt-2 text-[14px] font-medium text-slate-500">
              {homeFinalCta.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <RoleAwarePublicLink
              intent="candidate"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[color:var(--gold)] px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:brightness-95"
            >
              {homeFinalCta.candidateCta.label}
            </RoleAwarePublicLink>
            <RoleAwarePublicLink
              intent="department"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[color:var(--blue-deep)]/25 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
            >
              {homeFinalCta.departmentCta.label}
            </RoleAwarePublicLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function HomeMetaCard({
  icon,
  label,
  value,
  centered = false
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  centered?: boolean;
}) {
  return (
    <div
      className={
        centered
          ? "flex min-w-0 min-h-[108px] flex-col items-center justify-start gap-2 rounded-md border border-[color:var(--border-muted)] p-3 text-center"
          : "flex min-w-0 min-h-[84px] items-start gap-2 rounded-md border border-[color:var(--border-muted)] p-2.5"
      }
    >
      <div className={centered ? "shrink-0 text-[color:var(--blue)]" : "mt-0.5 shrink-0 text-[color:var(--blue)]"}>{icon}</div>
      <div className={centered ? "min-w-0" : "min-w-0 flex-1"}>
        <p className="text-[11px] font-black uppercase tracking-[0.08em] text-slate-500">{label}</p>
        <p className={centered ? "mt-1 text-[12px] font-semibold leading-6 text-[color:var(--navy)] sm:text-[13px]" : "mt-1 text-[12px] font-semibold leading-5 text-[color:var(--navy)] sm:text-[13px]"}>
          {value}
        </p>
      </div>
    </div>
  );
}

function HeroHeadline() {
  return (
    <h1 className="max-w-[720px] text-[38px] font-black uppercase leading-[0.93] text-white sm:text-[54px] lg:text-[72px]">
      {homeHeroContent.headlineLines.map((line) => {
        if (!line.highlight) {
          return (
            <span key={line.text} className="block">
              {line.text}
            </span>
          );
        }

        const [before, after] = line.text.split(line.highlight);

        return (
          <span key={line.text} className="block">
            {before}
            <span className="text-[color:var(--gold)]">{line.highlight}</span>
            {after}
          </span>
        );
      })}
    </h1>
  );
}

function HeroPeopleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="23" cy="11" r="5.5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="12" cy="13" r="4.4" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="34" cy="13" r="4.4" stroke="currentColor" strokeWidth="2.4" />
      <path d="M15.5 28.5C15.5 23.8056 19.3056 20 24 20H22C26.6944 20 30.5 23.8056 30.5 28.5V30H15.5V28.5Z" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 30V28.5C4.5 25.4624 6.96243 23 10 23H13.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M41.5 30V28.5C41.5 25.4624 39.0376 23 36 23H32.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
