"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, CheckCircle2, EyeOff, Filter, Send, ShieldCheck, TicketCheck, X } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { Table } from "@/components/ui/table";
import { getMockDepartmentBadgePool, formatJobType, type DepartmentBadgePoolCandidate, type DepartmentBadgePoolViewModel } from "@/features/department/badge-pool/get-mock-department-badge-pool";
import type { CandidateCredential, CandidateTrack } from "@/types/candidate";
import type { JobType } from "@/types/job";

type FilterState = {
  track: CandidateTrack | "all";
  credential: CandidateCredential | "all";
  distance: string;
  jobType: JobType | "all";
};

const initialFilters: FilterState = {
  track: "all",
  credential: "all",
  distance: "all",
  jobType: "all"
};

function formatBoolean(value: boolean | null) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "Not provided";
}

function formatCredential(value: CandidateCredential) {
  const labels: Record<CandidateCredential, string> = {
    cpr: "CPR",
    emt: "EMT",
    ltc: "LTC"
  };

  return labels[value];
}

function getTrackLabel(track: CandidateTrack) {
  const labels: Record<CandidateTrack, string> = {
    CXO: "Certified / Lateral",
    ELR: "Entry Level Recruit",
    OPS: "Operations"
  };

  return labels[track];
}

function getTrackForJobType(jobType: JobType | "all") {
  if (jobType === "entry_level") return "ELR";
  if (jobType === "certified_officer" || jobType === "experienced_officer" || jobType === "campus_police") return "CXO";
  if (jobType === "dispatcher_ops" || jobType === "corrections" || jobType === "deputy_sheriff" || jobType === "security" || jobType === "court_officer") return "OPS";
  return "all";
}

function candidateMatches(candidate: DepartmentBadgePoolCandidate, filters: FilterState) {
  const jobTrack = getTrackForJobType(filters.jobType);
  const distanceLimit = filters.distance === "all" ? null : Number(filters.distance);

  if (filters.track !== "all" && candidate.track !== filters.track) return false;
  if (jobTrack !== "all" && candidate.track !== jobTrack) return false;
  if (filters.credential !== "all" && !candidate.credentials.includes(filters.credential)) return false;
  if (distanceLimit !== null && (candidate.distanceMiles === undefined || candidate.distanceMiles > distanceLimit)) return false;

  return true;
}

function CandidateSignalList({ candidate }: { candidate: DepartmentBadgePoolCandidate }) {
  const signals = [
    candidate.highestEducation,
    candidate.examScorePercent ? `Exam ${candidate.examScorePercent.toFixed(2)}%` : null,
    candidate.hasActivePostCertification ? "Active POST" : null,
    candidate.hasCompletedFullTimeAcademy ? candidate.academyType ?? "Academy complete" : null,
    candidate.credentials.length > 0 ? candidate.credentials.map(formatCredential).join(", ") : null,
    candidate.hasMilitaryService ? "Military service" : null
  ].filter(Boolean);

  return (
    <div className="flex flex-wrap gap-2">
      {signals.map((signal) => (
        <span key={signal} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
          {signal}
        </span>
      ))}
    </div>
  );
}

function SendBadgeModal({
  candidate,
  model,
  onClose,
  onSend
}: {
  candidate: DepartmentBadgePoolCandidate;
  model: DepartmentBadgePoolViewModel;
  onClose: () => void;
  onSend: (jobPostId: string) => void;
}) {
  const [selectedJobId, setSelectedJobId] = useState(model.activeJobs[0]?.id ?? "");
  const selectedJob = model.activeJobs.find((job) => job.id === selectedJobId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="send-badge-title">
      <Card className="relative w-full max-w-xl shadow-xl">
        <CardHeader className="pr-14">
          <div>
            <CardTitle id="send-badge-title">Send Badge Request</CardTitle>
            <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
              Request consent from {candidate.anonymousLabel}. Full candidate details stay hidden until the candidate accepts.
            </p>
          </div>
        </CardHeader>
        <button
          type="button"
          className="absolute right-4 top-4 rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-[color:var(--navy)]"
          onClick={onClose}
          aria-label="Close send Badge Request modal"
        >
          <X className="h-5 w-5" />
        </button>
        <CardContent className="grid gap-5">
          <div className="rounded-lg border border-[color:var(--border-muted)] bg-[color:var(--surface-muted)] p-4">
            <p className="text-xs font-bold uppercase text-slate-500">Candidate summary</p>
            <p className="mt-1 font-bold text-[color:var(--navy)]">
              {getTrackLabel(candidate.track)} | {candidate.city}, {candidate.state}
            </p>
            <p className="mt-1 text-sm text-[color:var(--muted)]">{candidate.qualificationCount} visible qualification signals</p>
          </div>
          <Select
            label="Job post *"
            value={selectedJobId}
            onChange={(event) => setSelectedJobId(event.target.value)}
            options={model.activeJobs.map((job) => ({
              label: `${job.title} (${formatJobType(job.jobType)})`,
              value: job.id
            }))}
          />
          {selectedJob ? (
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              This will use one badge credit and send a request tied to <strong className="text-[color:var(--navy)]">{selectedJob.title}</strong>.
            </p>
          ) : null}
          <div className="flex flex-wrap justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" iconRight={<Send className="h-4 w-4" />} onClick={() => onSend(selectedJobId)} disabled={!selectedJobId}>
              Send Badge Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DepartmentBadgePool({ model }: { model: DepartmentBadgePoolViewModel }) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sentCandidateIds, setSentCandidateIds] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<DepartmentBadgePoolCandidate | null>(null);
  const [feedback, setFeedback] = useState("");

  const filteredCandidates = useMemo(() => model.candidates.filter((candidate) => candidateMatches(candidate, filters)), [filters, model.candidates]);
  const remainingCredits = Math.max(model.department.badgeCreditsRemaining - sentCandidateIds.length, 0);
  const sentCount = model.department.badgeCreditsSent + sentCandidateIds.length;

  function updateFilter<K extends keyof FilterState>(field: K, value: FilterState[K]) {
    setFilters((current) => ({ ...current, [field]: value }));
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  function sendBadgeRequest(jobPostId: string) {
    if (!selectedCandidate || !jobPostId || remainingCredits < 1) return;

    setSentCandidateIds((current) => [...current, selectedCandidate.id]);
    setFeedback(`Badge Request sent to ${selectedCandidate.anonymousLabel}. Candidate details remain private until acceptance.`);
    setSelectedCandidate(null);
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          eyebrow="Department Badge Pool"
          title="Anonymous Candidate Pool"
          description="Review eligible candidates by safe summary signals and send Badge Requests tied to active job posts."
        />
        <Button href="/department/jobs" variant="secondary">
          Manage job posts
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={<TicketCheck className="h-5 w-5" />} label="Badge Credits" value={remainingCredits} detail={`${sentCount} sent this cycle`} />
        <StatCard icon={<BadgeCheck className="h-5 w-5" />} label="Visible Candidates" value={filteredCandidates.length} detail={`${model.candidates.length} total safe pool records`} />
        <StatCard icon={<ShieldCheck className="h-5 w-5" />} label="Privacy Guard" value="On" detail="Protected candidate fields are hidden." />
      </div>

      {feedback ? (
        <div className="rounded-lg border border-green-100 bg-green-50 p-4 text-sm font-semibold text-[color:var(--success)]">{feedback}</div>
      ) : null}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              <Filter className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Pool filters</CardTitle>
              <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Filters are dropdown-only for this mock workflow.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-5">
          <Select
            label="Track"
            value={filters.track}
            onChange={(event) => updateFilter("track", event.target.value as FilterState["track"])}
            options={model.filters.tracks}
          />
          <Select
            label="Credential"
            value={filters.credential}
            onChange={(event) => updateFilter("credential", event.target.value as FilterState["credential"])}
            options={model.filters.credentials}
          />
          <Select
            label="Distance"
            value={filters.distance}
            onChange={(event) => updateFilter("distance", event.target.value)}
            options={model.filters.distanceRanges}
          />
          <Select
            label="Job type"
            value={filters.jobType}
            onChange={(event) => updateFilter("jobType", event.target.value as FilterState["jobType"])}
            options={model.filters.jobTypes}
          />
          <div className="flex items-end">
            <Button type="button" variant="secondary" className="w-full" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {filteredCandidates.length > 0 ? (
        <Table className="min-w-[1100px] table-fixed">
          <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
            <tr>
              <th className="w-[210px] px-4 py-3">Candidate</th>
              <th className="w-[140px] px-4 py-3">Track</th>
              <th className="w-[150px] px-4 py-3">Location</th>
              <th className="w-[330px] px-4 py-3">Visible signals</th>
              <th className="w-[170px] px-4 py-3">Availability</th>
              <th className="w-[100px] px-4 py-3">Status</th>
              <th className="w-[130px] px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => {
              const alreadySent = candidate.alreadyBadgedByDepartment || sentCandidateIds.includes(candidate.id);
              const canSend = !alreadySent && remainingCredits > 0;

              return (
                <tr key={candidate.id} className="border-t border-[color:var(--border-muted)]">
                  <td className="px-4 py-4 align-top">
                    <p className="font-bold text-[color:var(--navy)]">{candidate.anonymousLabel}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">{candidate.qualificationCount} qualification signals</p>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <StatusChip label={candidate.track} tone="navy" />
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-slate-700">
                    <p>
                      {candidate.city}, {candidate.state}
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">{candidate.distanceMiles ?? "Mock"} miles away</p>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <CandidateSignalList candidate={candidate} />
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-slate-700">
                    <p>Relocate: {formatBoolean(candidate.isWillingToRelocate)}</p>
                    <p className="mt-1">Multilingual: {formatBoolean(candidate.isMultilingual)}</p>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <StatusChip label={alreadySent ? "Sent" : "Available"} tone={alreadySent ? "success" : "muted"} />
                  </td>
                  <td className="px-4 py-4 text-right align-top">
                    <Button
                      type="button"
                      variant={canSend ? "primary" : "secondary"}
                      className="min-h-10 whitespace-nowrap px-3"
                      disabled={!canSend}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      {alreadySent ? "Sent" : "Send"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Card>
          <CardContent className="grid justify-items-center gap-3 !p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              <Filter className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-[color:var(--navy)]">No candidates match these filters</h2>
            <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">
              Try widening the distance, choosing a different track, or resetting filters to view the full anonymous Badge Pool.
            </p>
            <Button type="button" variant="secondary" onClick={resetFilters}>
              Reset filters
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              <EyeOff className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Privacy checklist</CardTitle>
              <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">These protected fields are intentionally excluded from Badge Pool records.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {model.privacyChecklist.map((field) => (
            <div key={field} className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-[color:var(--success)]" />
              {field} hidden
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedCandidate ? <SendBadgeModal candidate={selectedCandidate} model={model} onClose={() => setSelectedCandidate(null)} onSend={sendBadgeRequest} /> : null}
    </div>
  );
}
