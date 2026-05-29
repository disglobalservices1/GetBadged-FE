import { CalendarDays, ChevronRight, CircleX, FileText, PauseCircle, Shield, ShoppingCart } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

type MembershipCardProps = {
  title?: string;
  planLabel?: string;
  statusLabel?: string;
  tokenCount?: string;
  tokenLabel?: ReactNode;
  detailsHref?: string;
  detailsLabel?: string;
  children: ReactNode;
};

type CandidateMembershipCardProps = {
  isEntryLevel: boolean;
};

export function CandidateMembershipCard({ isEntryLevel }: CandidateMembershipCardProps) {
  return (
    <MembershipCard>
      {isEntryLevel ? <EntryLevelMembershipActions /> : <CertifiedMembershipActions />}
    </MembershipCard>
  );
}

export function MembershipCard({
  title = "Your Membership",
  planLabel = "6 Months",
  statusLabel = "Active",
  tokenCount = "4",
  tokenLabel = (
    <>
      Application Tokens
      <br />
      Remaining
    </>
  ),
  detailsHref = "/candidate/tokens",
  detailsLabel = "View Membership Details",
  children
}: MembershipCardProps) {
  return (
    <section className="rounded-lg border border-[color:var(--gold)] bg-[#001b3f] px-6 py-5 text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
      <div className="flex items-start gap-5">
        <MembershipBadgeMark />
        <div className="min-w-0 pt-1">
          <h2 className="text-[16px] font-semibold uppercase leading-tight tracking-normal">{title}</h2>
          <p className="mt-1.5 text-[14px] font-semibold uppercase text-[color:var(--gold)]">
            {planLabel} <span className="mx-2 text-white">•</span> <span className="text-green-400">{statusLabel}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[78px_1fr] items-center gap-0">
        <p className="text-[56px] font-extrabold leading-none">{tokenCount}</p>
        <p className="text-[14px] font-semibold leading-6">{tokenLabel}</p>
      </div>
      <div className="mt-5 h-3 w-[66%] min-w-[240px] max-w-[400px] overflow-hidden rounded-full bg-white/20">
        <div className="h-full w-[62%] rounded-full bg-[color:var(--gold)]" />
      </div>
      <a href={detailsHref} className="mt-6 inline-flex h-12 w-[66%] min-w-[240px] max-w-[400px] items-center justify-center rounded-md border border-white/50 text-[14px] font-semibold text-white transition hover:border-white hover:bg-white/10">
        {detailsLabel}
      </a>

      <div className="mt-5 border-t border-white/25 pt-4">{children}</div>
    </section>
  );
}

function MembershipBadgeMark() {
  return (
    <span className="relative flex h-[58px] w-[52px] shrink-0 items-center justify-center text-[color:var(--gold)]">
      <Shield className="absolute h-full w-full stroke-[1.4]" />
      <span className="relative text-[20px] font-bold leading-none">GB</span>
    </span>
  );
}

function EntryLevelMembershipActions() {
  return (
    <div>
      <h3 className="text-[13px] font-medium uppercase">Manage Membership</h3>
      <div className="mt-4 grid gap-4">
        <MembershipAction icon={<FileText />} title="Exam Retest Registration" body="Register for an exam retest." />
        <MembershipAction icon={<CalendarDays />} title="Renew Your Membership" body="Renew before your 6 month expiration date to keep your score valid." />
      </div>
      <div className="mt-4 border-t border-white/25 pt-3">
        <MembershipAction icon={<PauseCircle />} title="Pause or Cancel Membership" body="Pause or cancel your membership. Your applications will be affected." />
      </div>
    </div>
  );
}

function CertifiedMembershipActions() {
  return (
    <div>
      <h3 className="text-[13px] font-medium uppercase text-[color:var(--gold)]">Need More Tokens?</h3>
      <p className="mt-2 text-[11px] font-medium leading-5 text-white/90">Apply to additional opportunities.</p>
      <a href="/candidate/tokens" className="mt-3 inline-flex h-9 w-fit items-center gap-3 rounded-md border border-white/50 px-4 text-[12px] font-bold leading-none text-white transition hover:border-white hover:bg-white/10">
        <ShoppingCart className="h-4 w-4 shrink-0" />
        Re-Up Token Pack
      </a>
      <div className="mt-5 border-t border-white/25 pt-5">
        <h3 className="text-[13px] font-medium">Manage Membership</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" className="inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-md border border-white/50 px-3 !text-[12px] !font-bold leading-none text-white transition hover:border-white hover:bg-white/10">
            <PauseCircle className="h-4 w-4 shrink-0" /> <span className="truncate">Pause Membership</span>
          </button>
          <button type="button" className="inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-md border border-white/50 px-3 !text-[12px] !font-bold leading-none text-white transition hover:border-white hover:bg-white/10">
            <CircleX className="h-4 w-4 shrink-0" /> <span className="truncate">Cancel Membership</span>
          </button>
        </div>
        <p className="mt-4 text-[11px] font-medium leading-5 text-white/90">Pausing or cancelling will not affect applications you've already submitted.</p>
      </div>
    </div>
  );
}

function MembershipAction({ icon, title, body }: { icon: ReactElement<{ className?: string }>; title: string; body: string }) {
  return (
    <a href="/candidate/tokens" className="grid grid-cols-[38px_1fr_auto] items-center gap-4 text-white transition hover:text-white/90">
      <span className="flex h-9 w-9 items-center justify-center text-white [&_svg]:h-8 [&_svg]:w-8 [&_svg]:stroke-[1.1]">{icon}</span>
      <span>
        <span className="block text-[12px] font-bold leading-5">{title}</span>
        <span className="mt-1 block text-[11px] font-medium leading-5 text-white/90">{body}</span>
      </span>
      <ChevronRight className="h-5 w-5" />
    </a>
  );
}
