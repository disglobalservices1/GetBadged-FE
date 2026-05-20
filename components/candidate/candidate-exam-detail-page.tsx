import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, CalendarDays, CheckCircle2, Clock, CreditCard, Laptop, MapPin, ShieldCheck, Users } from "lucide-react";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusChip } from "@/components/ui/status-chip";
import { formatExamDate, formatExamFormat, formatMoney, formatRegistrationStatus, getCandidateExamById } from "@/features/candidate/exams/get-mock-candidate-exams";

type CandidateExamDetailPageProps = {
  examId: string;
};

export function CandidateExamDetailPage({ examId }: CandidateExamDetailPageProps) {
  const exam = getCandidateExamById(examId);

  if (!exam) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="ELR Exam Registration"
        title={exam.title}
        description={exam.isRegistered ? "Review your mock exam registration and score state." : "Confirm exam details, accept acknowledgements, and continue to mock checkout."}
      />

      <div>
        <Button href="/candidate/exams" variant="secondary" iconLeft={<ArrowLeft size={18} />}>
          Back to exams
        </Button>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <Card>
            <CardContent className="grid gap-6 px-6 pb-6 pt-8">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  {exam.format === "online" ? <Laptop className="h-6 w-6" /> : <MapPin className="h-6 w-6" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-[color:var(--navy)]">Exam details</h2>
                    <StatusChip label={formatExamFormat(exam.format)} tone="navy" />
                    <StatusChip label={formatRegistrationStatus(exam.registration?.status)} tone={exam.isRegistered ? "success" : "muted"} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Registration closes {formatExamDate(exam.registrationDeadline)}. Seats are limited and confirmation instructions are sent after registration.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Meta icon={<CalendarDays className="h-4 w-4" />} label="Exam date" value={formatExamDate(exam.examDate)} />
                <Meta icon={<Clock className="h-4 w-4" />} label="Exam time" value={exam.examTime} />
                <Meta icon={<Clock className="h-4 w-4" />} label="Check-in" value={exam.checkInTime ?? "Sent after registration"} />
                <Meta icon={<Users className="h-4 w-4" />} label="Seats remaining" value={`${exam.seatsRemaining}`} />
                <Meta icon={<MapPin className="h-4 w-4" />} label="Location" value={exam.format === "online" ? "Online exam access sent by email" : `${exam.locationName}, ${exam.streetAddress}, ${exam.city}, ${exam.state}`} />
                <Meta icon={<CreditCard className="h-4 w-4" />} label="Mock checkout" value={`${formatMoney(9900)} ELR exam product`} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-4 px-6 pb-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-[color:var(--navy)]">Acknowledgements</h2>
              </div>
              <div className="grid gap-3">
                <Checkbox label="I understand this ELR exam registration is a mock checkout handoff until Stripe is connected." defaultChecked={exam.isRegistered} />
                <Checkbox label="I understand exam instructions and reminders will be sent by email/SMS in the backend phase." defaultChecked={exam.isRegistered} />
                <Checkbox label="I confirm I am registering for the Massachusetts ELR exam product only." defaultChecked={exam.isRegistered} />
              </div>
              {!exam.isRegistered ? (
                <Button href={`/candidate/exams/${exam.id}?checkout=mock`} iconRight={<CreditCard size={18} />}>
                  Continue to mock checkout
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <aside className="grid content-start gap-4">
          <Card className={exam.isRegistered ? "border-green-100 bg-green-50" : "border-amber-200 bg-amber-50"}>
            <CardContent className="grid gap-3 px-5 pb-5 pt-8">
              <div className="flex items-center gap-3">
                {exam.isRegistered ? <CheckCircle2 className="h-5 w-5 text-[color:var(--success)]" /> : <AlertTriangle className="h-5 w-5 text-amber-700" />}
                <h2 className="font-bold text-[color:var(--navy)]">{exam.isRegistered ? "Registration active" : "Registration needed"}</h2>
              </div>
              <p className="text-sm leading-6 text-slate-700">
                {exam.isRegistered
                  ? `Registered on ${exam.registration ? formatExamDate(exam.registration.registeredAt.slice(0, 10)) : "mock date"}. Purchase status: ${exam.purchaseStatus ?? "pending"}.`
                  : "Accept the acknowledgements and continue to checkout to reserve this exam sitting."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-3 px-5 pb-5 pt-8">
              <h2 className="font-bold text-[color:var(--navy)]">Score status</h2>
              {exam.score ? (
                <div className="grid gap-2">
                  <p className="text-4xl font-bold text-[color:var(--success)]">{exam.score.scorePercent}%</p>
                  <StatusChip label={exam.score.status.replace("_", " ")} tone="warning" />
                  <p className="text-sm text-[color:var(--muted)]">Valid until {exam.score.validUntil ? formatExamDate(exam.score.validUntil) : "pending"}.</p>
                </div>
              ) : (
                <p className="text-sm leading-6 text-[color:var(--muted)]">Score will display after completion/import and verification by GB Admin.</p>
              )}
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}

function Meta({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
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
