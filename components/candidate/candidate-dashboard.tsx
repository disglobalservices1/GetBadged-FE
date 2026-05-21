import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Dumbbell,
  FileText,
  Headphones,
  HelpCircle,
  Megaphone,
  PauseCircle,
  Shield,
  ShoppingCart,
  Star,
  Ticket
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { getMockCandidateDashboard } from "@/features/candidate/dashboard/get-mock-candidate-dashboard";

type DashboardTrack = "ELR" | "CXO" | "OPS";

type DashboardMetric = {
  label: string;
  value: string;
  lines: string[];
  icon: LucideIcon | null;
  notice?: string;
};

export function CandidateDashboard() {
  const dashboard = getMockCandidateDashboard();
  const track = dashboard.track as DashboardTrack;
  const isEntryLevel = track === "ELR";

  return (
    <div className="mx-auto grid max-w-[1540px] gap-6">
      <header>
        <h1 className="text-[34px] font-extrabold leading-tight tracking-normal text-[#071739]">Welcome back, {dashboard.firstName}.</h1>
        <p className="mt-2 text-sm font-bold text-[color:var(--blue)]">
          {isEntryLevel ? "ELR Candidate" : "CXO Candidate"} <span className="mx-2 text-slate-400">•</span> Membership active <span className="mx-2 text-slate-400">•</span> Member since May 14, 2026
        </p>
      </header>

      <div className="grid gap-6 min-[1500px]:grid-cols-[minmax(0,1fr)_400px]">
        <main className="grid gap-6">
          <HeroCta isEntryLevel={isEntryLevel} />
          <MetricGrid isEntryLevel={isEntryLevel} />
          <section className="grid gap-6 lg:grid-cols-2">
            <RecentActivityCard />
            {isEntryLevel ? <BadgeRequestsCard /> : <EligibilityChecklistCard />}
          </section>
          {isEntryLevel ? <AdditionalProducts /> : null}
        </main>

        <aside className="grid content-start gap-6 xl:grid-cols-2 min-[1500px]:grid-cols-1">
          <ResourceCenter isEntryLevel={isEntryLevel} />
          <MembershipCard isEntryLevel={isEntryLevel} />
        </aside>
      </div>
    </div>
  );
}

function HeroCta({ isEntryLevel }: { isEntryLevel: boolean }) {
  return (
    <section className="grid gap-5 rounded-lg border border-[#f6c458] bg-white px-8 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] xl:grid-cols-[auto_1fr_auto] xl:items-center">
      <div className="flex h-20 w-20 items-center justify-center text-[#071739]">
        <Shield className="h-20 w-20 stroke-[1.8]" />
      </div>
      <div>
        <h2 className="text-[24px] font-extrabold uppercase leading-tight tracking-normal text-[#071739]">
          {isEntryLevel ? "Your future. Your mission." : "Your experience. Their future."}
        </h2>
        <p className="mt-2 max-w-[560px] text-[15px] font-bold leading-6 text-[#182747]">
          {isEntryLevel
            ? "Explore departments. Find the right fit. Apply with confidence."
            : "Departments are looking for proven professionals like you. Explore opportunities. Make your next move."}
        </p>
      </div>
      <a href="/candidate/jobs" className="inline-flex h-12 items-center justify-center gap-3 rounded-md bg-[color:var(--gold)] px-7 text-sm font-extrabold text-[#071739] shadow-sm xl:w-fit">
        Browse Departments & Jobs
        <ArrowRight className="h-5 w-5" />
      </a>
    </section>
  );
}

function MetricGrid({ isEntryLevel }: { isEntryLevel: boolean }) {
  const metrics: DashboardMetric[] = isEntryLevel
    ? [
        { label: "Application Tokens", value: "4", lines: ["Remaining", "6 Month Membership"], icon: Ticket },
        { label: "Exam Score", value: "82.00%", lines: ["Passing (≥ 70%)", "Exam Date: 04/15/2026", "Score Received: 04/18/2026"], icon: Shield, notice: "Valid for 12 months from 04/15/2026. If renewed before 10/15/2026." },
        { label: "Open Applications", value: "5", lines: ["3 Under Review", "2 Awaiting Dept Action"], icon: FileText },
        { label: "Profile Completeness", value: "94%", lines: ["Upload your driving record to hit 100%"], icon: null }
      ]
    : [
        { label: "Application Tokens", value: "4", lines: ["Remaining", "6 Month Membership"], icon: Ticket },
        { label: "Open Applications", value: "3", lines: ["2 Under Review", "1 Awaiting Dept Action"], icon: FileText },
        { label: "Profile Completeness", value: "94%", lines: ["Upload your driving record to hit 100%"], icon: null },
        { label: "Account Status", value: "Active", lines: ["Member since May 14, 2026", "Valid until Nov 14, 2026"], icon: CheckCircle2 }
      ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="min-h-[210px] rounded-lg border border-[color:var(--border-muted)] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] font-extrabold uppercase tracking-normal text-[color:var(--blue)]">{metric.label}</p>
            {metric.icon ? (
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                <metric.icon className="h-6 w-6" />
              </span>
            ) : (
              <ProgressRing />
            )}
          </div>
          <p className="mt-5 text-[34px] font-extrabold leading-none text-[#071739]">{metric.value}</p>
          <div className="mt-4 grid gap-3 text-[13px] font-bold leading-5 text-[color:var(--blue)]">
            {metric.lines.map((line, index) => (
              <p key={line} className={index === 0 && (line.includes("Passing") || line.includes("Upload")) ? "text-[color:var(--success)]" : ""}>
                {line}
              </p>
            ))}
          </div>
          {metric.notice ? (
            <p className="mt-4 rounded-md bg-green-50 px-3 py-2 text-xs font-bold leading-5 text-[#075e34]">✓ {metric.notice}</p>
          ) : null}
        </div>
      ))}
    </section>
  );
}

function ProgressRing() {
  return (
    <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[conic-gradient(#169b54_0_76%,#e5e7eb_76%_100%)]">
      <span className="h-8 w-8 rounded-full bg-white" />
    </span>
  );
}

function ResourceCenter({ isEntryLevel }: { isEntryLevel: boolean }) {
  const items = isEntryLevel
    ? [
        { icon: BookOpen, title: "Exam Study Guide", body: "Prepare smarter. Study with confidence." },
        { icon: Dumbbell, title: "Fitness Prep & Standards", body: "Train with purpose. Meet the standards." },
        { icon: Megaphone, title: "News & Announcements", body: "Stay informed. What's new in law enforcement.", isNew: true },
        { icon: HelpCircle, title: "Help & FAQ", body: "Get answers. We're here to help." }
      ]
    : [
        { icon: Megaphone, title: "News & Announcements", body: "Stay informed. What's new in law enforcement.", isNew: true },
        { icon: HelpCircle, title: "Help & FAQ", body: "Get answers. We're here to help." }
      ];

  return (
    <section className="rounded-lg border border-[color:var(--border-muted)] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <h2 className="text-lg font-extrabold uppercase tracking-normal text-[color:var(--blue)]">Resource Center</h2>
      <div className="mt-6 grid gap-5">
        {items.map((item) => (
          <a key={item.title} href="/resources" className="grid grid-cols-[56px_1fr_auto] items-center gap-4 rounded-md py-1 text-[#182747]">
            <item.icon className="h-10 w-10 text-[color:var(--blue)]" />
            <span>
              <span className="flex items-center gap-3 text-base font-extrabold text-[color:var(--blue)]">
                {item.title}
                {item.isNew ? <span className="text-sm font-extrabold text-red-600">NEW</span> : null}
              </span>
              <span className="mt-1 block text-sm font-bold text-[color:var(--blue)]/80">{item.body}</span>
            </span>
            <ArrowRight className="h-5 w-5 text-[color:var(--blue)]" />
          </a>
        ))}
      </div>
      <a href="/resources" className="mt-8 flex items-center justify-center gap-3 text-base font-extrabold text-[color:var(--blue)]">
        Explore All Resources
        <ArrowRight className="h-5 w-5" />
      </a>
    </section>
  );
}

function RecentActivityCard() {
  const activities = [
    { title: "Ashland PD sent you a Badge Request", meta: "2 hours ago • Patrol Officer", status: "Accept", tone: "bg-[#ffd77a] text-[#071739]" },
    { title: "Concord PD marked your application Under Review", meta: "Yesterday • Patrol Officer", status: "Under Review", tone: "bg-[#ffd77a] text-[#071739]" },
    { title: "Wellesley PD Badge Request accepted", meta: "3 days ago • Patrol Officer", status: "Accepted", tone: "bg-green-100 text-[#087443]" },
    { title: "Belmont PD application submitted", meta: "5 days ago • Token used", status: "Submitted", tone: "bg-blue-100 text-[color:var(--blue)]" }
  ];

  return (
    <section className="rounded-lg border border-[color:var(--border-muted)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-extrabold uppercase tracking-normal text-[color:var(--blue)]">Recent Activity</h2>
        <a href="/candidate/applications" className="flex items-center gap-2 text-sm font-extrabold text-[color:var(--blue)]">
          View all <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="mt-6 grid gap-4">
        {activities.map((activity) => (
          <div key={activity.title} className="grid grid-cols-[44px_1fr_auto] items-center gap-4">
            <DepartmentBadge />
            <div>
              <p className="text-sm font-extrabold text-[color:var(--blue)]">{activity.title}</p>
              <p className="mt-1 text-xs font-bold text-[color:var(--blue)]/80">{activity.meta}</p>
            </div>
            <span className={`rounded px-3 py-2 text-xs font-extrabold uppercase ${activity.tone}`}>{activity.status}</span>
          </div>
        ))}
      </div>
      <a href="/candidate/applications" className="mt-7 flex items-center gap-3 text-base font-extrabold text-[color:var(--blue)]">
        View All Activity
        <ArrowRight className="h-5 w-5" />
      </a>
    </section>
  );
}

function BadgeRequestsCard() {
  return (
    <section className="rounded-lg border border-[color:var(--border-muted)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-extrabold uppercase tracking-normal text-[color:var(--blue)]">Badge Requests</h2>
        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[color:var(--gold)] px-2 text-sm font-extrabold text-[#071739]">3</span>
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-[#f5cf7b]">
        <div className="grid gap-3 border-b border-[#f5cf7b] p-5 md:grid-cols-[44px_1fr_auto] md:items-center">
          <DepartmentBadge />
          <div>
            <p className="text-sm font-extrabold text-[color:var(--blue)]">Ashland Police Department</p>
            <p className="text-xs font-bold text-[color:var(--blue)]/80">Patrol Officer</p>
            <p className="text-xs font-bold text-[color:var(--blue)]/80">Requested 2 hours ago</p>
          </div>
          <a href="/candidate/badge-requests" className="rounded-md bg-[color:var(--gold)] px-6 py-3 text-center text-sm font-extrabold text-[#071739]">Accept</a>
        </div>
        <div className="bg-[#fffaf0] p-5 text-sm font-bold leading-6 text-[color:var(--blue)]">
          <p className="font-extrabold">Interested? Accept</p>
          <p>& your application package is unlocked & forwarded to the PD.</p>
          <p className="mt-3 font-extrabold">Not interested?</p>
          <p>Don't do anything & none of your info will be released.</p>
        </div>
      </div>
      <a href="/candidate/badge-requests" className="mt-5 flex items-center gap-3 text-base font-extrabold text-[color:var(--blue)]">
        View All Badge Requests
        <ArrowRight className="h-5 w-5" />
      </a>
    </section>
  );
}

function EligibilityChecklistCard() {
  return (
    <section className="rounded-lg border border-[color:var(--border-muted)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-extrabold uppercase tracking-normal text-[color:var(--blue)]">Your Eligibility Checklist</h2>
        <span className="rounded bg-green-100 px-3 py-2 text-xs font-extrabold uppercase text-[#087443]">Active</span>
      </div>
      <div className="mt-7 grid gap-7">
        <EligibilityRow icon={<CalendarDays className="h-5 w-5" />} title="Membership active" status="Valid through Nov 14, 2026" />
        <EligibilityRow icon={<FileText className="h-5 w-5" />} title="Resume & POST Certificate Upload" status="Uploaded 3 weeks ago" />
      </div>
      <p className="mt-24 text-sm font-bold leading-6 text-[color:var(--blue)]">
        Applications are active only when all items are complete. If any lapse, your open applications pause until eligibility is restored.
      </p>
      <a href="/candidate/profile" className="mt-7 flex items-center gap-3 text-base font-extrabold text-[color:var(--blue)]">
        Learn more about eligibility
        <ArrowRight className="h-5 w-5" />
      </a>
    </section>
  );
}

function EligibilityRow({ icon, title, status }: { icon: ReactNode; title: string; status: string }) {
  return (
    <div className="grid grid-cols-[36px_1fr_auto] items-center gap-4">
      <span className="flex h-8 w-8 items-center justify-center rounded bg-blue-50 text-[color:var(--blue)]">{icon}</span>
      <p className="text-sm font-extrabold text-[color:var(--blue)]">{title}</p>
      <span className="rounded bg-green-100 px-3 py-2 text-xs font-extrabold uppercase text-[#087443]">✓ {status}</span>
    </div>
  );
}

function MembershipCard({ isEntryLevel }: { isEntryLevel: boolean }) {
  return (
    <section className="rounded-lg border border-[color:var(--gold)] bg-[#001b3f] p-8 text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
      <div className="flex items-start gap-6">
        <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-md border-4 border-[color:var(--gold)] text-2xl font-extrabold text-[color:var(--gold)]">GB</div>
        <div>
          <h2 className="text-2xl font-extrabold uppercase tracking-normal">Your Membership</h2>
          <p className="mt-2 text-xl font-extrabold uppercase text-[color:var(--gold)]">
            6 Months <span className="mx-2 text-white">•</span> <span className="text-green-400">Active</span>
          </p>
        </div>
      </div>

      <div className="mt-9 grid grid-cols-[90px_1fr] items-center gap-5">
        <p className="text-[64px] font-extrabold leading-none">4</p>
        <p className="text-xl font-bold leading-8">Application Tokens<br />Remaining</p>
      </div>
      <div className="mt-7 h-4 max-w-[300px] rounded-full bg-white/20">
        <div className="h-full w-[70%] rounded-full bg-[color:var(--gold)]" />
      </div>
      <a href="/candidate/tokens" className="mt-8 inline-flex h-14 w-full max-w-[360px] items-center justify-center rounded-md border border-white/50 text-base font-extrabold text-white">
        View Membership Details
      </a>

      <div className="mt-8 border-t border-white/25 pt-7">
        {isEntryLevel ? <EntryLevelMembershipActions /> : <CertifiedMembershipActions />}
      </div>
    </section>
  );
}

function EntryLevelMembershipActions() {
  return (
    <div>
      <h3 className="text-lg font-extrabold uppercase">Manage Membership</h3>
      <MembershipAction icon={<FileText />} title="Exam Retest Registration" body="Register for an exam retest." />
      <MembershipAction icon={<CalendarDays />} title="Renew Your Membership" body="Renew before your 6 month expiration date to keep your score valid." />
      <div className="mt-6 border-t border-white/25 pt-6">
        <MembershipAction icon={<PauseCircle />} title="Pause or Cancel Membership" body="Pause or cancel your membership. Your applications will be affected." />
      </div>
    </div>
  );
}

function CertifiedMembershipActions() {
  return (
    <div>
      <h3 className="text-lg font-extrabold uppercase text-[color:var(--gold)]">Need More Tokens?</h3>
      <p className="mt-2 text-sm font-bold">Apply to additional opportunities.</p>
      <a href="/candidate/tokens" className="mt-4 inline-flex h-12 items-center gap-3 rounded-md border border-white/50 px-5 text-sm font-extrabold">
        <ShoppingCart className="h-5 w-5" />
        Re-Up Token Pack
      </a>
      <div className="mt-7 border-t border-white/25 pt-6">
        <h3 className="text-base font-bold">Manage Membership</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-md border border-white/50 px-4 text-sm font-bold"><PauseCircle className="h-5 w-5" /> Pause Membership</button>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-md border border-white/50 px-4 text-sm font-bold">× Cancel Membership</button>
        </div>
        <p className="mt-5 text-sm font-bold leading-6">Pausing or cancelling will not affect applications you've already submitted.</p>
      </div>
    </div>
  );
}

function MembershipAction({ icon, title, body }: { icon: ReactElement<{ className?: string }>; title: string; body: string }) {
  return (
    <a href="/candidate/tokens" className="mt-6 grid grid-cols-[56px_1fr_auto] items-center gap-4 text-white">
      <span className="text-white">{icon}</span>
      <span>
        <span className="block text-base font-extrabold">{title}</span>
        <span className="mt-1 block text-sm font-bold leading-6 text-white/90">{body}</span>
      </span>
      <ArrowRight className="h-6 w-6" />
    </a>
  );
}

function AdditionalProducts() {
  const products = [
    { icon: Star, title: "Your Pathway to the Badge: The Hiring Playbook for Aspiring Officers", body: "A step-by-step guide to help you navigate the hiring process." },
    { icon: BookOpen, title: "Exam Study Guide", body: "Ace your exam with our comprehensive study guide." },
    { icon: Headphones, title: "Need support, we're happy to help!", body: "Call us at 781.645.6005 or email info@getbadged.com" }
  ];

  return (
    <section className="rounded-lg border border-[color:var(--border-muted)] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <h2 className="text-lg font-extrabold uppercase tracking-normal text-[color:var(--blue)]">Additional Products You May Be Interested In</h2>
      <div className="mt-4 grid gap-5 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.title} className="grid min-h-[140px] grid-cols-[86px_1fr] gap-5 rounded-md bg-blue-50/60 p-6">
            <product.icon className="h-16 w-16 text-[color:var(--blue)]" />
            <div>
              <h3 className="text-lg font-extrabold leading-6 text-[color:var(--blue)]">{product.title}</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-[#182747]">{product.body}</p>
              {!product.title.startsWith("Need support") ? (
                <a href="/resources" className="mt-5 inline-flex items-center gap-3 text-base font-extrabold text-[color:var(--blue)]">
                  Learn More <ArrowRight className="h-5 w-5" />
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DepartmentBadge() {
  return (
    <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#092b66] ring-2 ring-[color:var(--gold)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/westview-police-badge.png" alt="" className="h-full w-full object-cover" />
    </span>
  );
}
