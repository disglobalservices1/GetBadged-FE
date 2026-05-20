import { FileText, LockKeyhole, StickyNote, UserRound } from "lucide-react";
import { ApplicationReviewActions } from "@/components/department/applicants/application-review-actions";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";
import type { DepartmentApplicationDetailViewModel } from "@/features/department/applicants/get-mock-department-applicant-pool";

export function DepartmentApplicationDetail({ model }: { model: DepartmentApplicationDetailViewModel | null }) {
  if (!model) {
    return (
      <EmptyState
        icon={<FileText className="h-8 w-8" />}
        title="Application not found"
        description="Return to the Applicant Pool to review available direct applications and accepted Badges."
      />
    );
  }

  const { application } = model;
  const contactHidden = shouldHideContact(application.status);

  return (
    <div className="gb-print-package grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          eyebrow="Application review"
          title={application.candidateName}
          description={`${application.jobLabel} | ${application.sourceLabel} | Submitted ${application.submittedAtLabel}`}
        />
        <ApplicationReviewActions model={model} />
      </div>

      <Card>
        <CardHeader className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Application status</CardTitle>
            <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">Department-only review state for this application package.</p>
          </div>
          <StatusChip label={application.statusLabel} tone={application.statusTone} />
        </CardHeader>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Candidate profile</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <InfoItem label="Name" value={application.candidateName} />
              <InfoItem label="Email" value={contactHidden ? "Hidden until candidate membership is active" : application.candidate.email} />
              <InfoItem label="Phone" value={contactHidden ? "Hidden until candidate membership is active" : application.candidate.phone} />
              <InfoItem label="Location" value={`${application.candidate.city}, ${application.candidate.state} ${application.candidate.zipCode}`} />
              <InfoItem label="Track" value={application.candidate.track} />
              <InfoItem label="Membership" value={application.candidate.membershipStatus} />
              <InfoItem label="Education" value={application.candidate.highestEducation ?? "Not provided"} />
              <InfoItem label="Credentials" value={application.candidate.credentials.length ? application.candidate.credentials.join(", ").toUpperCase() : "None listed"} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cover letter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-[color:var(--muted)]">{application.coverLetterText ?? "No cover letter was submitted with this application."}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {model.documents.map((document) => (
                <div key={document.id} className="flex items-start justify-between gap-3 rounded-md border border-[color:var(--border-muted)] p-3">
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 text-[color:var(--blue)]" />
                    <div>
                      <p className="text-sm font-bold text-[color:var(--navy)]">{document.label}</p>
                      <p className="mt-1 text-xs text-[color:var(--muted)]">{document.fileName}</p>
                    </div>
                  </div>
                  <StatusChip label={document.status.replace(/_/g, " ")} tone={document.status === "received" ? "success" : "warning"} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change log</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {model.changeLog.map((entry) => (
                <div key={entry.id} className="rounded-md border border-[color:var(--border-muted)] p-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="text-sm font-bold text-[color:var(--navy)]">{entry.action}</p>
                    <p className="text-xs font-semibold text-slate-500">{formatDate(entry.createdAt)}</p>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-600">{entry.actorName}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{entry.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid content-start gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <UserRound className="h-5 w-5 text-[color:var(--blue)]" />
                <CardTitle>Application source</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3">
              <InfoItem label="Source" value={application.sourceLabel} compact />
              <InfoItem label="Job" value={application.jobLabel} compact />
              <InfoItem label="Viewed" value={application.viewedAtLabel} compact />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <StickyNote className="h-5 w-5 text-[color:var(--blue)]" />
                <CardTitle>Department notes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3">
              {model.notes.map((note) => (
                <div key={note.id} className="rounded-md bg-slate-50 p-3">
                  <p className="text-sm leading-6 text-slate-700">{note.body}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    {note.authorName} | {formatDate(note.createdAt)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <LockKeyhole className="h-5 w-5 text-[color:var(--blue)]" />
                <CardTitle>Private files</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3">
              {model.privateFiles.length > 0 ? (
                model.privateFiles.map((file) => (
                  <div key={file.id} className="rounded-md border border-[color:var(--border-muted)] p-3">
                    <p className="text-sm font-bold text-[color:var(--navy)]">{file.label}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">{file.fileName}</p>
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      {file.uploadedByName} | {formatDate(file.uploadedAt)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-[color:var(--muted)]">No department-private files have been attached yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className={compact ? "grid min-w-0 gap-1" : "min-w-0 rounded-md border border-[color:var(--border-muted)] p-3"}>
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold leading-6 text-[color:var(--navy)]">{value}</p>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function shouldHideContact(status: string) {
  return status === "inactive_membership" || status === "no_longer_meets_requirements";
}
