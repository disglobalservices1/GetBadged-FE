import {
  ArrowRight,
  ChevronDown,
  Globe,
  Handshake,
  Lock,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Users
} from "lucide-react";

const pathwayCards = [
  {
    title: "Entry Level New Recruit",
    body: "Take the first step toward your law enforcement career.",
    cta: "Join & Register for My Exam",
    tone: "blue" as const,
    icon: ShieldCheck
  },
  {
    title: "Certified Lateral Transfers",
    body: "POST certified and ready for your next opportunity.",
    cta: "Join This Path",
    tone: "gold" as const,
    icon: Shield
  },
  {
    title: "Other Public Safety",
    body: "Dispatch, corrections, security, EMS and more.",
    cta: "Join This Path",
    tone: "navy" as const,
    icon: Globe
  }
];

const benefitCards = [
  {
    icon: ShieldCheck,
    tone: "gold" as const,
    title: "Pre-vetted.",
    copy: "Pre-qualified. Ready to serve."
  },
  {
    icon: Handshake,
    tone: "white" as const,
    title: "Two-way consent built into",
    copy: "every connection."
  },
  {
    icon: Lock,
    tone: "gold" as const,
    title: "No names.",
    copy: "No phone numbers. Until you both agree."
  },
  {
    icon: Globe,
    tone: "white" as const,
    title: "Built for today.",
    copy: "Expanding for tomorrow."
  }
];

const footerColumns = [
  {
    title: "Candidates",
    links: ["All Paths & Info", "Available Jobs", "Exam Information", "Resources"]
  },
  {
    title: "Departments",
    links: ["Why GetBadged", "How It Works", "Pricing", "Department Resources"]
  },
  {
    title: "Resources",
    links: ["Exam Information", "Help & FAQ", "Candidate Resources", "Department Resources"]
  },
  {
    title: "Company",
    links: ["About Us", "Contact Us", "Privacy Policy", "Terms of Service"]
  }
];

export function HomePage() {
  return (
    <div className="bg-white text-[color:var(--navy)]">
      <section className="bg-[color:var(--navy)]">
        <div className="grid">
          <div
            className="relative grid min-h-[500px] overflow-hidden bg-[color:var(--navy)] bg-cover bg-[center_right] bg-no-repeat lg:min-h-[610px] lg:grid-cols-[1.02fr_0.98fr]"
            style={{ backgroundImage: "url('/images/public-hero-bg.png')" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,33,0.96)_0%,rgba(4,13,33,0.88)_28%,rgba(4,13,33,0.45)_52%,rgba(4,13,33,0.12)_70%,rgba(4,13,33,0.06)_100%)]" />

            <div className="relative z-10 grid gap-7 px-7 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
              <div className="max-w-[760px]">
                <h1 className="max-w-[720px] text-[38px] font-black uppercase leading-[0.93] text-white sm:text-[54px] lg:text-[72px]">
                  The Smarter Way
                  <br />
                  To <span className="text-[color:var(--gold)]">Get Hired.</span>
                  <br />
                  The Better Way
                  <br />
                  <span className="text-[color:var(--gold)]">To Hire.</span>
                </h1>
                <p className="mt-5 max-w-[450px] text-[16px] leading-8 text-white/86 lg:text-[17px]">
                  GetBadged is the two-way consent marketplace for law enforcement and public safety.
                </p>
                <p className="mt-2 max-w-[520px] text-[16px] leading-8 text-[color:var(--gold)] lg:text-[17px]">
                  Our pre-vetted pool is verified, meets your requirements, and is ready to go.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/auth/signup/candidate"
                  className="inline-flex min-h-[66px] min-w-[270px] items-center justify-between gap-4 rounded-[4px] bg-[color:var(--gold)] px-6 py-3 text-[color:var(--navy)] transition hover:brightness-95"
                >
                  <span className="grid text-left leading-none">
                    <span className="text-[14px] font-black">I&apos;m a Candidate</span>
                    <span className="mt-2 text-[13px] font-semibold">Join &amp; Apply for Jobs</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </a>
                <a
                  href="/auth/signup/department"
                  className="inline-flex min-h-[66px] min-w-[270px] items-center justify-between gap-4 rounded-[4px] border border-white/40 bg-[rgba(10,18,38,0.28)] px-6 py-3 text-white transition hover:bg-white/8"
                >
                  <span className="grid text-left leading-none">
                    <span className="text-[14px] font-black">I&apos;m a Department</span>
                    <span className="mt-2 text-[13px] font-semibold text-white/82">Find &amp; Badge Candidates</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </a>
              </div>
            </div>

            <div className="relative min-h-[280px] lg:min-h-[610px]">
              <div className="absolute bottom-6 left-6 right-6 rounded-[10px] border border-white/16 bg-[rgba(7,14,31,0.58)] px-5 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)] backdrop-blur-[5px] sm:max-w-[248px] lg:bottom-[30%] lg:right-auto lg:left-[-5%] lg:w-[248px] xl:right-[24%] 2xl:right-[28%]">
                <div className="grid gap-3">
                  <HeroPeopleIcon className="h-[34px] w-[38px] text-white" />
                  <div>
                    <p className="text-[14px] font-bold leading-[1.3] text-white">The nation&apos;s two-way marketplace for public safety.</p>
                    <p className="mt-2 text-[11px] font-medium leading-[1.45] text-white/88">
                      Connecting driven candidates with forward-thinking agencies across the country.
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
          {benefitCards.map((card, index) => (
            <div
              key={card.title}
              className={
                index === benefitCards.length - 1
                  ? "grid grid-cols-[48px_1fr] items-center gap-4 px-8 py-6"
                  : "relative grid grid-cols-[48px_1fr] items-center gap-4 border-b border-[rgba(255,255,255,0.12)] px-8 py-6 md:border-b-0"
              }
            >
              {index !== benefitCards.length - 1 ? (
                <span className="pointer-events-none absolute bottom-5 right-0 top-5 hidden w-px bg-[rgba(255,255,255,0.12)] xl:block" aria-hidden="true" />
              ) : null}
              <div className={card.tone === "gold" ? "text-[color:var(--gold)]" : "text-white"}>
                <card.icon className={card.icon === Handshake ? "h-12 w-12" : "h-11 w-11"} strokeWidth={1.9} />
              </div>
              <div className="max-w-[188px] text-[13px] font-semibold leading-[1.42] text-white/94 lg:text-[14px]">
                <p>{card.title}</p>
                <p>{card.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-[26px] font-black uppercase leading-none text-[color:var(--navy)] sm:text-[34px]">
            Three Pathways. One Purpose.
          </h2>
          <p className="mt-2 text-[15px] font-medium text-slate-500">
            Choose the path that fits you. Get vetted. Get visible. Get hired.
          </p>
        </div>

        <div className="mx-auto mt-7 grid max-w-[1060px] gap-4 lg:grid-cols-3">
          {pathwayCards.map((card) => (
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
                <a
                  href="/auth/signup/candidate"
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
                </a>
                <a href="/resources" className="mt-4 inline-flex items-center justify-center gap-2 text-[13px] font-bold text-[color:var(--blue)]">
                  Learn more about this path
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[18px] border border-[color:var(--border-muted)] bg-[#f7f9fc] px-5 py-4 shadow-[0_6px_18px_rgba(4,18,46,0.04)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--navy)] text-[color:var(--gold)]">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[14px] font-black text-[color:var(--navy)]">Looking for prep resources, assessments, and more?</p>
                <p className="mt-1 max-w-[690px] text-[13px] font-medium leading-6 text-slate-600">
                  Visit our Resource Center to explore study guides, assessments, and professional development products.
                </p>
              </div>
            </div>
            <a
              href="/resources"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[color:var(--navy)]/20 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
            >
              Explore Resources
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-[22px] border border-[color:var(--navy)]/12 bg-[color:var(--navy)] text-white shadow-[0_16px_38px_rgba(4,18,46,0.12)]">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-[300px] border-b border-white/10 bg-[linear-gradient(145deg,#14284d_0%,#0a1731_62%,#081127_100%)] lg:border-b-0 lg:border-r lg:border-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(254,191,63,0.22),transparent_26%),radial-gradient(circle_at_72%_14%,rgba(255,255,255,0.08),transparent_22%)]" />
              <div className="absolute bottom-5 left-5 grid h-16 w-16 place-items-center rounded-[18px] border border-[color:var(--gold)]/30 bg-[rgba(0,0,0,0.24)]">
                <img src="/images/getbadged-mark.png" alt="" className="h-10 w-10 object-contain" />
              </div>
              <div className="absolute left-5 top-5 rounded-[20px] border border-white/10 bg-[rgba(255,255,255,0.06)] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                <div className="grid h-[168px] w-[220px] place-items-center rounded-[16px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] text-center text-[13px] font-semibold text-white/70">
                  Background image
                  <br />
                  placeholder
                </div>
              </div>
            </div>

            <div className="grid gap-5 px-6 py-6 sm:px-8 sm:py-7">
              <div className="grid gap-3">
                <p className="text-[13px] font-black uppercase tracking-[0.08em] text-[color:var(--gold)]">For Departments</p>
                <h2 className="max-w-[460px] text-[34px] font-black leading-[0.96] text-white">
                  Two ways to hire. Total control.
                </h2>
                <p className="max-w-[520px] text-[14px] leading-6 text-white/85">
                  With GetBadged, agencies have 2 ways to hire: receive unlimited directly submitted applications from only candidates who&apos;ve met your requirements, or search our anonymous pool of pre-vetted candidates who are ready to go and send Badge Requests.
                </p>
                <p className="max-w-[520px] text-[14px] leading-6 text-white/85">
                  Customize your membership to your agency&apos;s unique criteria because no one size fits all.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[18px] border border-[color:var(--gold)]/22 bg-[rgba(255,255,255,0.03)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)]/35 text-[color:var(--gold)]">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="text-[18px] font-bold text-white">Direct Applications</h3>
                  </div>
                  <p className="mt-3 text-[14px] leading-6 text-white/78">
                    Receive applications only from pre-qualified candidates who meet your requirements.
                  </p>
                </div>
                <div className="rounded-[18px] border border-[color:var(--gold)]/22 bg-[rgba(255,255,255,0.03)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)]/35 text-[color:var(--gold)]">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h3 className="text-[18px] font-bold text-white">Badge Candidates</h3>
                  </div>
                  <p className="mt-3 text-[14px] leading-6 text-white/78">
                    Search our anonymous, pre-vetted pool and send badges to the candidates you want to meet.
                  </p>
                </div>
              </div>

              <div>
                <a
                  href="/auth/signup/department"
                  className="inline-flex min-h-12 items-center gap-3 rounded-md bg-[color:var(--gold)] px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:brightness-95"
                >
                  Learn More for Departments
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-4 rounded-[18px] border border-[color:var(--border-muted)] bg-[#f8fafc] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[22px] font-black leading-none text-[color:var(--navy)]">Ready to make the right connection?</h3>
            <p className="mt-2 text-[14px] font-medium text-slate-500">
              Whether you&apos;re starting your career or building your team, GetBadged is here to help.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/auth/signup/candidate"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[color:var(--gold)] px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:brightness-95"
            >
              I&apos;m a Candidate
            </a>
            <a
              href="/auth/signup/department"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[color:var(--blue-deep)]/25 bg-white px-5 text-[14px] font-bold text-[color:var(--navy)] transition hover:bg-slate-50"
            >
              I&apos;m a Department
            </a>
          </div>
        </div>
      </section>
    </div>
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

export function PublicHeaderNavItems() {
  return (
    <>
      <PublicNavLink href="/jobs" withCaret>
        For Candidates
      </PublicNavLink>
      <PublicNavLink href="/departments" withCaret>
        For Departments
      </PublicNavLink>
      <PublicNavLink href="/resources" withCaret>
        Resources
      </PublicNavLink>
      <PublicNavLink href="/about" withCaret>
        About Us
      </PublicNavLink>
      <PublicNavLink href="/pricing">Pricing</PublicNavLink>
    </>
  );
}

export function PublicNavLink({
  href,
  withCaret = false,
  children
}: {
  href: string;
  withCaret?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/86 transition hover:text-white">
      {children}
      {withCaret ? <ChevronDown className="h-3.5 w-3.5" /> : null}
    </a>
  );
}

export function PublicFooterColumns() {
  return (
    <>
      {footerColumns.map((column) => (
        <div key={column.title}>
          <h4 className="text-[11px] font-black uppercase tracking-[0.08em] text-white">{column.title}</h4>
          <div className="mt-3 grid gap-2">
            {column.links.map((link) => (
              <a key={link} href="/" className="text-[13px] font-medium text-white/74 transition hover:text-white">
                {link}
              </a>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
