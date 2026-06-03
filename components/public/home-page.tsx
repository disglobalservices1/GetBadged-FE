import { ArrowRight, Bell, BriefcaseBusiness, Clock, MapPin } from "lucide-react";
import { RoleAwarePublicLink } from "@/components/public/role-aware-public-link";
import {
  aboutPrinciples,
  homeBenefitCards,
  homeCandidateSection,
  homeDepartmentSection,
  homeFinalCta,
  homeHeroContent,
  homeAnnouncements,
  homeAnnouncementsSection,
  homeAboutSection,
  homePathwayCards,
  homeResourceCallout,
  homeStatsSection,
  publicHeroStats,
  publicTrustCards
} from "@/features/public/marketing-content";

export function HomePage() {
  const ResourceIcon = homeResourceCallout.icon;

  return (
    <div className="bg-white text-[color:var(--navy)]">
      <section className="bg-[color:var(--navy)]" aria-label="GetBadged intro">
        <div className="grid">
          <div
            className="relative grid min-h-[480px] overflow-hidden bg-[color:var(--navy)] bg-cover bg-[center_right] bg-no-repeat lg:min-h-[560px] lg:grid-cols-[1.02fr_0.98fr]"
            style={{ backgroundImage: "url('/images/public-hero-bg.png')" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,33,0.96)_0%,rgba(4,13,33,0.88)_28%,rgba(4,13,33,0.45)_52%,rgba(4,13,33,0.12)_70%,rgba(4,13,33,0.06)_100%)]" />

            <div className="flex z-8 grid gap-3 px-7 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-10">
              <div className="max-w-[760px]">
                <HeroHeadline />
                <p className="mt-4 max-w-[480px] text-[14px] leading-[27px] text-white/86 lg:text-[15px] lg:leading-[24px]">
                  {homeHeroContent.body}
                </p>
                <p className="mt-1.5 max-w-[520px] text-[14px] leading-[27px] text-[color:var(--gold)] lg:text-[15px] lg:leading-[24px]">
                  {homeHeroContent.accent}
                </p>
              </div>

              <div className="mt-1 grid max-w-[340px] gap-2.5 sm:max-w-[560px] sm:grid-cols-2 sm:gap-3 md:max-w-[320px] md:grid-cols-1 md:gap-3.5 xl:max-w-[560px] xl:grid-cols-2 xl:gap-3">
                <RoleAwarePublicLink
                  intent="candidate"
                  className="inline-flex min-h-[50px] w-full items-center justify-between gap-3 rounded-[4px] bg-[color:var(--gold)] px-4 py-2 text-[color:var(--navy)] transition hover:brightness-95 sm:min-h-[56px] sm:px-4 sm:py-2.5 md:min-h-[48px] md:px-5 md:py-2.5 xl:min-h-[42px] xl:px-5 xl:py-0"
                >
                  <span className="grid text-left leading-none">
                    <span className="text-[13px] font-black sm:text-[14px]">{homeHeroContent.candidateCta.label}</span>
                    <span className="mt-1 text-[11px] font-semibold sm:mt-1.5 sm:text-[12px]">{homeHeroContent.candidateCta.sublabel}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 sm:h-4.5 sm:w-4.5" />
                </RoleAwarePublicLink>
                <RoleAwarePublicLink
                  intent="department"
                  className="inline-flex min-h-[50px] w-full items-center justify-between gap-3 rounded-[4px] border border-white/40 bg-[rgba(10,18,38,0.28)] px-4 py-2 text-white transition hover:bg-white/8 sm:min-h-[56px] sm:px-4 sm:py-2.5 md:min-h-[48px] md:px-5 md:py-2.5 xl:min-h-[42px] xl:px-5 xl:py-0"
                >
                  <span className="grid text-left leading-none">
                    <span className="text-[13px] font-black sm:text-[14px]">{homeHeroContent.departmentCta.label}</span>
                    <span className="mt-1 text-[11px] font-semibold text-white/82 sm:mt-1.5 sm:text-[12px]">{homeHeroContent.departmentCta.sublabel}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 sm:h-4.5 sm:w-4.5" />
                </RoleAwarePublicLink>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-0.5 text-[13px] font-bold text-white/86">
                {homeHeroContent.browseCtas.map((cta) => (
                  <a key={cta.label} href={cta.href} className="inline-flex items-center gap-2 transition hover:text-white">
                    {cta.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative min-h-[170px] sm:min-h-[185px] lg:min-h-[610px]">
              <div className="absolute left-6 right-6 top-0 rounded-[10px] border border-white/16 bg-[rgba(7,14,31,0.58)] px-5 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)] backdrop-blur-[5px] sm:max-w-[248px] lg:bottom-[30%] lg:left-[-5%] lg:right-auto lg:top-auto lg:w-[248px] xl:right-[24%] 2xl:right-[28%]">
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

      <section className="mx-auto grid max-w-[1380px] px-4 py-10 sm:px-6 lg:px-5 xl:px-4" aria-label="Home page sections">
        <div id="candidate-path" className="scroll-mt-24 text-center">
          <h2 className="text-[24px] font-black uppercase leading-none text-[color:var(--navy)] sm:text-[28px]">
            {homeCandidateSection.title}
          </h2>
          <p className="mx-auto mt-1 max-w-[520px] text-[12px] font-medium leading-5 text-slate-500 sm:text-[13px]">
            {homeCandidateSection.body}
          </p>
        </div>

        <div className="mx-auto mt-5 grid max-w-[980px] gap-4 lg:grid-cols-3">
          {homePathwayCards.map((card) => (
            <article key={card.title} className="flex min-h-[224px] flex-col rounded-[8px] border border-[#dde5f3] bg-white px-5 py-5 shadow-none">
              <div className="min-h-[100px]">
                <div className="flex items-start gap-2.5">
                  <div className="grid h-9 w-9 shrink-0 self-start place-items-start text-[color:var(--gold)] translate-y-[1px]">
                    <PathwayIcon tone={card.tone} />
                  </div>
                  <h3 className="max-w-[178px] text-left text-[14px] font-black uppercase leading-[1.02] text-[color:var(--navy)] sm:text-[15px]">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-6 text-center text-[11px] font-medium leading-[1.45] text-slate-600 sm:text-[12px]">
                  {card.body}
                </p>
              </div>
              <div className="mt-1 border-t border-[#e6ebf5]" aria-hidden="true" />
              <div className="mt-4">
                <RoleAwarePublicLink
                  intent="candidate"
                  className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-[4px] bg-[#001F3F] px-4 text-[12px] font-bold text-white transition hover:bg-[#0b355f] hover:shadow-[0_8px_18px_rgba(0,31,63,0.22)]"
                >
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </RoleAwarePublicLink>
                <a href={card.learnHref} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-[10px] font-medium text-[#1B33B5] sm:text-[11px]">
                  Learn more about this path
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <div className="mt-auto" aria-hidden="true" />
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

        <div id="department-path" className="mt-7 scroll-mt-24 overflow-hidden rounded-[22px] border border-[color:var(--navy)]/12 bg-[linear-gradient(145deg,#102347_0%,#0a1731_28%,#081127_100%)] text-white shadow-[0_16px_38px_rgba(4,18,46,0.12)]">
          <div className="grid gap-0 lg:grid-cols-[360px_minmax(0,1fr)_360px] xl:grid-cols-[460px_minmax(0,1fr)_390px]">
            <div className="relative min-h-[220px] overflow-hidden lg:min-h-full">
              <div
                className="absolute inset-0 bg-cover bg-left-center bg-no-repeat opacity-[0.85]"
                style={{ backgroundImage: "url('/images/department-art.png')" }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,38,0.3)_0%,rgba(7,16,38,0.12)_44%,rgba(7,16,38,0.64)_100%)]" />
              <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(90deg,rgba(10,23,49,0)_0%,rgba(10,23,49,0.22)_42%,rgba(10,23,49,0.72)_100%)]" />
            </div>

            <div className="relative grid gap-4 px-6 py-6 sm:px-8 sm:py-7 lg:px-8 lg:py-8">
              <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--gold)]">{homeDepartmentSection.eyebrow}</p>
              <h2 className="max-w-[500px] text-[34px] font-black leading-[0.96] text-white">
                {homeDepartmentSection.title}
              </h2>
              {homeDepartmentSection.body.map((paragraph) => (
                <p key={paragraph} className="max-w-[560px] text-[14px] leading-7 text-white/85">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="relative grid gap-0 px-6 py-6 sm:px-8 sm:py-7 lg:px-8 lg:py-8">
              {homeDepartmentSection.cards.map((card, index) => (
                <div
                  key={card.title}
                  className={
                    index === 0
                      ? "grid gap-3 border-b border-white/14 pb-5"
                      : "grid gap-3 pt-5"
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--gold)]/55 text-[color:var(--gold)]">
                      <card.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-[18px] font-bold text-white">{card.title}</h3>
                  </div>
                  <p className="max-w-[320px] text-[14px] leading-7 text-white/82">{card.body}</p>
                </div>
              ))}

              <div className="mt-5">
                <RoleAwarePublicLink
                  intent="department"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-[color:var(--gold)] px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:brightness-95"
                >
                  Register Department
                  <ArrowRight className="h-4 w-4" />
                </RoleAwarePublicLink>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-[20px] border border-[color:var(--border-muted)] bg-[#071126] px-4 py-3 text-white shadow-[0_16px_34px_rgba(4,18,46,0.1)] sm:px-5 sm:py-3.5" aria-labelledby="home-stats-heading">
          <div className="grid gap-1.5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.08em] text-[color:var(--gold)]">{homeStatsSection.eyebrow}</p>
              <h2 id="home-stats-heading" className="mt-1 max-w-[520px] text-[21px] font-black leading-[1.01] sm:text-[23px]">{homeStatsSection.title}</h2>
              <p className="mt-1 max-w-[600px] text-[12px] leading-[18px] text-white/76">{homeStatsSection.body}</p>
            </div>
          </div>

          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {publicHeroStats.map((stat) => (
              <div key={stat.label} className="rounded-[14px] border border-white/12 bg-white/5 px-4 py-2">
                <p className="text-[10px] font-black uppercase tracking-[0.08em] text-[color:var(--gold)]">{stat.label}</p>
                <p className="mt-0.5 text-[20px] font-black leading-none text-white">{stat.value}</p>
                <p className="mt-0.5 text-[11px] leading-4 text-white/76">{stat.detail}</p>
              </div>
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
                            ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[color:var(--navy)] px-5 text-[14px] font-bold text-white transition hover:bg-[#011530]"
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
                          ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[color:var(--navy)] px-5 text-[14px] font-bold text-white transition hover:bg-[#011530]"
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

        <section className="mt-10 grid gap-3" aria-labelledby="home-trust-heading">
          <div>
            <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--blue)]">Trust & Privacy</p>
            <h2 id="home-trust-heading" className="mt-2 max-w-[680px] text-[28px] font-black leading-[1.04] text-[color:var(--navy)] sm:text-[30px]">Protected candidate identity stays private until consent.</h2>
          </div>

          <div className="grid gap-3">
            {publicTrustCards.map((card) => (
              <article key={card.title} className="flex gap-4 rounded-[18px] border border-[color:var(--border-muted)] bg-white px-5 py-4 shadow-[0_10px_22px_rgba(4,18,46,0.05)]">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d9e1ff] bg-[#f4f7ff] text-[color:var(--blue)]">
                  <card.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[18px] font-black leading-tight text-[color:var(--navy)]">{card.title}</h3>
                  <p className="mt-2 max-w-[760px] text-[14px] leading-6 text-slate-600">{card.body}</p>
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

function PathwayIcon({ tone }: { tone: "blue" | "gold" | "navy" }) {
  if (tone === "gold") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-9 w-9">
        <path
          d="M16 3.75 24.6 6.9v6.95c0 5.58-3.25 9.77-8.6 12.4-5.35-2.63-8.6-6.82-8.6-12.4V6.9L16 3.75Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M16 9.15 17.3 11.8l2.92.42-2.11 2.04.5 2.9L16 15.78l-2.61 1.38.5-2.9-2.11-2.04 2.92-.42L16 9.15Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M12.15 19.35h7.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13.4 21.7h5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (tone === "navy") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-9 w-9">
        <path
          d="M16 3.75 24.6 6.9v6.95c0 5.58-3.25 9.77-8.6 12.4-5.35-2.63-8.6-6.82-8.6-12.4V6.9L16 3.75Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="m12.2 10.15.72 1.45 1.6.23-1.16 1.12.27 1.59-1.43-.75-1.43.75.27-1.59-1.16-1.12 1.6-.23.72-1.45Zm7.6 0 .72 1.45 1.6.23-1.16 1.12.27 1.59-1.43-.75-1.43.75.27-1.59-1.16-1.12 1.6-.23.72-1.45Z"
          fill="currentColor"
        />
        <path d="M16 13.6v7.15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12.7 17.2H19.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13.85 20.6h4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-9 w-9">
      <path
        d="M16 3.75 24.6 6.9v6.95c0 5.58-3.25 9.77-8.6 12.4-5.35-2.63-8.6-6.82-8.6-12.4V6.9L16 3.75Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 9.2 17.35 11.94l3.03.44-2.19 2.12.52 3.02L16 16.09l-2.71 1.43.52-3.02-2.19-2.12 3.03-.44L16 9.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
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
    <h1 className="max-w-[720px] text-[29px] font-black uppercase leading-[0.93] text-white sm:text-[41px] lg:text-[55px]">
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
