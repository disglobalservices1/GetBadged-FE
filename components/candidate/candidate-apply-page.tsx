"use client";

import { useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, FileText, Lock, WalletCards } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusChip } from "@/components/ui/status-chip";
import { Textarea } from "@/components/ui/textarea";
import { getCandidateApplyState } from "@/features/candidate/jobs/get-mock-candidate-jobs";

type CandidateApplyPageProps = {
  jobId: string;
};

export function CandidateApplyPage({ jobId }: CandidateApplyPageProps) {
  const applyState = getCandidateApplyState(jobId);
  const [consented, setConsented] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!applyState.match) {
    return (
      <div className="grid gap-6">
        <PageHeader eyebrow="Direct Apply" title="Job not found" description="This job is no longer available for candidate applications." />
        <Button href="/candidate/jobs" variant="secondary" iconLeft={<ArrowLeft size={18} />}>
          Back to jobs
        </Button>
      </div>
    );
  }

  const match = applyState.match;

  function submitApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consented) {
      setError("You must consent before submitting a direct application.");
      return;
    }

    if (coverLetter.trim().length < 20) {
      setError("Add a short cover letter or note with at least 20 characters.");
      return;
    }

    setError("");
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="grid gap-6">
        <PageHeader eyebrow="Direct Apply" title="Application submitted." description={`${match.job.departmentName} can now review your candidate application packet for ${match.job.title}.`} />
        <Card className="border-green-100 bg-green-50">
          <CardContent className="grid gap-4 px-6 pb-6 pt-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-6 w-6 text-[color:var(--success)]" />
              <div>
                <h2 className="text-xl font-bold text-[color:var(--navy)]">Mock success state</h2>
                <p className="mt-2 text-sm leading-6 text-slate-700">One application token would be deducted after the backend confirms the application write.</p>
              </div>
            </div>
            <Button href="/candidate">Back to dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Direct Apply" title={`Apply to ${match.job.title}`} description={`${match.job.departmentName} · ${match.job.city}, ${match.job.state}`} />

      <div>
        <Button href={`/candidate/jobs/${match.job.id}`} variant="secondary" iconLeft={<ArrowLeft size={18} />}>
          Back to job detail
        </Button>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <main className="grid gap-6">
          {match.alreadyApplied ? <BlockedCard title="Duplicate application blocked" body="You already applied to this job. GetBadged prevents duplicate applications to the same job post." /> : null}
          {applyState.isMembershipBlocked ? <BlockedCard title="Membership activation required" body="Free accounts can browse jobs, but Direct Apply remains blocked until membership and track requirements are active." /> : null}
          {applyState.tokenBalance <= 0 ? <BlockedCard title="No application tokens available" body="Direct Apply requires one available token. Token balance is shown before every apply action." /> : null}

          <Card>
            <CardContent className="grid gap-5 px-6 pb-6 pt-8">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[color:var(--navy)]">Application packet</h2>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Submitting shares your profile, documents, essays, contact details, and cover letter with this department.
                  </p>
                </div>
              </div>

              <form className="grid gap-4" onSubmit={submitApplication}>
                <Textarea label="Cover letter / note" value={coverLetter} onChange={(event) => setCoverLetter(event.target.value)} placeholder="Write a short note for the department..." />
                <Checkbox
                  label="I consent to share my full candidate application packet with this department for this job."
                  checked={consented}
                  onChange={(event) => setConsented(event.target.checked)}
                  error={error && !consented ? error : undefined}
                />
                {error && consented ? <p className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-[color:var(--danger)]">{error}</p> : null}
                <Button type="submit" disabled={!applyState.canSubmit || match.alreadyApplied}>
                  Submit mock application
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>

        <aside className="grid content-start gap-4">
          <Card>
            <CardContent className="grid gap-4 px-5 pb-5 pt-8">
              <div className="flex items-center gap-3">
                <WalletCards className="h-5 w-5 text-[color:var(--blue)]" />
                <h2 className="font-bold text-[color:var(--navy)]">Token balance</h2>
              </div>
              <p className="text-4xl font-bold text-[color:var(--navy)]">{applyState.tokenBalance}</p>
              <p className="text-sm leading-6 text-[color:var(--muted)]">A successful Direct Apply uses one token.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="grid gap-3 px-5 pb-5 pt-8">
              <h2 className="font-bold text-[color:var(--navy)]">Eligibility</h2>
              <StatusChip label={match.eligibilityStatus.replace("_", " ")} tone={match.eligibilityStatus === "eligible" ? "success" : "warning"} />
              {match.missingRequirements.length > 0 ? <p className="text-sm leading-6 text-amber-700">Needs review: {match.missingRequirements.join(", ")}</p> : <p className="text-sm leading-6 text-[color:var(--muted)]">Minimum requirements matched from your profile.</p>}
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}

function BlockedCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardContent className="flex items-start gap-3 px-6 pb-6 pt-8">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-amber-700">
          {title.includes("Duplicate") ? <Lock className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
        </div>
        <div>
          <h2 className="text-lg font-bold text-[color:var(--navy)]">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
        </div>
      </CardContent>
    </Card>
  );
}
