import { ArrowRight, CalendarDays, CheckCircle2, Clock, Laptop, MapPin, ReceiptText, Users } from "lucide-react";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";
import { formatExamDate, formatExamFormat, formatMoney, formatRegistrationStatus, getMockCandidateExamDashboard } from "@/features/candidate/exams/get-mock-candidate-exams";

export function CandidateExamsPage() {
  const dashboard = getMockCandidateExamDashboard();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="ELR Exam Registration"
        title="Register for an Entry Level Recruit exam."
        description="Browse online and in-person ELR exam sittings. Personality and physical fitness assessment products are intentionally excluded from MVP."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard icon={<CalendarDays className="h-6 w-6" />} label="Available Exams" value={dashboard.exams.length} detail="Published ELR sittings." />
        <SummaryCard icon={<ReceiptText className="h-6 w-6" />} label="Registration" value={dashboard.hasActiveRegistration ? "Active" : "None"} detail={dashboard.registeredExam?.title ?? "Choose a sitting to register."} />
        <SummaryCard icon={<CheckCircle2 className="h-6 w-6" />} label="Latest Score" value={dashboard.latestScore ? `${dashboard.latestScore.scorePercent}%` : "Pending"} detail={dashboard.latestScore ? `Status: ${dashboard.latestScore.status.replace("_", " ")}` : "Scores appear after exam completion."} />
      </section>

      {dashboard.hasActiveRegistration && dashboard.registeredExam ? (
        <Card className="border-green-100 bg-green-50">
          <CardContent className="grid gap-4 px-6 pb-6 pt-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white text-[color:var(--success)]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[color:var(--navy)]">Registered for {dashboard.registeredExam.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {formatExamDate(dashboard.registeredExam.examDate)} at {dashboard.registeredExam.examTime}. Check-in starts {dashboard.registeredExam.checkInTime ?? "before exam time"}.
                </p>
              </div>
            </div>
            <Button href={`/candidate/exams/${dashboard.registeredExam.id}`} variant="secondary">
              View registration
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <section className="grid gap-4">
        {dashboard.exams.map((exam) => (
          <Card key={exam.id}>
            <CardContent className="grid gap-5 px-6 pb-6 pt-8 xl:grid-cols-[1fr_auto] xl:items-center">
              <div className="grid gap-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                      {exam.format === "online" ? <Laptop className="h-6 w-6" /> : <MapPin className="h-6 w-6" />}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold text-[color:var(--navy)]">{exam.title}</h2>
                        <StatusChip label={formatExamFormat(exam.format)} tone="navy" />
                        <StatusChip label={formatRegistrationStatus(exam.registration?.status)} tone={exam.isRegistered ? "success" : "muted"} />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                        Registration deadline: {formatExamDate(exam.registrationDeadline)}. Mock checkout price: {formatMoney(9900)}.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-4">
                  <Meta icon={<CalendarDays className="h-4 w-4" />} label="Exam date" value={formatExamDate(exam.examDate)} />
                  <Meta icon={<Clock className="h-4 w-4" />} label="Exam time" value={exam.examTime} />
                  <Meta icon={<Users className="h-4 w-4" />} label="Seats left" value={`${exam.seatsRemaining}`} />
                  <Meta icon={<MapPin className="h-4 w-4" />} label="Location" value={exam.format === "online" ? "Online exam" : `${exam.locationName}, ${exam.city}`} />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 xl:justify-end">
                <Button href={`/candidate/exams/${exam.id}`} iconRight={<ArrowRight size={18} />}>
                  {exam.isRegistered ? "View details" : "Register"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

function SummaryCard({ icon, label, value, detail }: { icon: ReactNode; label: string; value: string | number; detail: string }) {
  return (
    <Card>
      <CardContent className="grid gap-3 px-5 pb-5 pt-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">{icon}</div>
          <div>
            <p className="text-sm font-semibold uppercase text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-[color:var(--navy)]">{value}</p>
          </div>
        </div>
        <p className="text-sm leading-5 text-[color:var(--muted)]">{detail}</p>
      </CardContent>
    </Card>
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
