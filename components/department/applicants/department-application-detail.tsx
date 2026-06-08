"use client";

import { useEffect, useState } from "react";
import {
  Archive,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Download,
  FileText,
  GraduationCap,
  Mail,
  MessageSquareText,
  NotebookPen,
  NotebookText,
  Paperclip,
  ShieldCheck,
  ShieldQuestion,
  Star,
  UserRound
} from "lucide-react";
import { getCurrentMockRole } from "@/lib/auth/mock-session";
import { EmptyState } from "@/components/common/empty-state";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { ApplicationReviewActions } from "@/components/department/applicants/application-review-actions";
import type { DepartmentApplicationDetailViewModel } from "@/features/department/applicants/get-mock-department-applicant-pool";
import { cn } from "@/lib/utils/cn";
import type { CandidateProfile } from "@/types/candidate";

export function DepartmentApplicationDetail({ model }: { model: DepartmentApplicationDetailViewModel | null }) {
  const [departmentRole, setDepartmentRole] = useState<"department_admin" | "department_user">("department_admin");
  const [actionFeedback, setActionFeedback] = useState("");

  useEffect(() => {
    const nextRole = getCurrentMockRole(["department_admin", "department_user"]);
    if (nextRole === "department_admin" || nextRole === "department_user") {
      setDepartmentRole(nextRole);
    }
  }, []);

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
  const candidate = application.candidate;
  const shouldShowNewApplicationLabel = application.isNewForDepartment && application.status !== "inactive_membership";
  const displayStatus = shouldShowNewApplicationLabel ? "New application" : application.statusLabel;
  const contactAccess = model.contactAccess;
  const membershipTone = candidate.membershipStatus === "active" ? "success" : "warning";
  const isDepartmentUser = departmentRole === "department_user";
  const isExpired = model.departmentAccountStatus === "expired";
  const isPendingApproval = model.departmentAccountStatus === "pending_approval";
  const canMessageCandidate = !isDepartmentUser && !isExpired && !isPendingApproval;
  const canEditApplicationNotes = !isExpired;
  const quickActionMessage = isDepartmentUser
    ? "Department User can review the full application, print it, and download the package, but messaging stays admin-only."
    : isExpired
      ? "Membership is expired. Review, print, and download remain available, but messaging and workflow updates stay locked until renewal."
      : isPendingApproval
        ? "Department approval is still pending. Review actions are available, but candidate outreach is locked until approval completes."
        : "Department Admin can message the candidate, add internal notes, archive the application, print, and download the package.";

  return (
    <div className="grid gap-4">
      <ApplicationReviewActions model={model} />

      <div className="gb-print-package mx-auto max-w-7xl">
        <section className="rounded-lg border border-[color:var(--border-muted)] bg-white p-5 shadow-sm sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5 pb-5">
            <div className="grid gap-7">
              <Logo />
              <div>
                <h1 className="text-2xl font-extrabold uppercase leading-tight text-[color:var(--blue-deep)] sm:text-3xl">
                  {application.candidateName}
                </h1>
                <p className="mt-1 text-sm font-bold text-[color:var(--gold)]">
                  {trackLabel(candidate.track)} | {application.jobType === "entry_level" ? "New Recruit" : application.sourceLabel}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <StatusChip label={application.sourceLabel} tone={application.source === "accepted_badge" ? "success" : "navy"} />
                  <StatusChip label={`Received ${formatCompactDate(application.submittedAt)}`} tone="muted" />
                  <StatusChip label={`Membership ${formatValue(candidate.membershipStatus)}`} tone={membershipTone} />
                </div>
              </div>
            </div>

            <div className="grid justify-items-start gap-3 sm:justify-items-end">
              <div className="text-left sm:text-right">
                <p className="text-sm font-extrabold uppercase text-[color:var(--blue-deep)]">Candidate application</p>
                <p className="mt-1 text-xs font-semibold text-slate-600">Application ID: {application.id.replace("application_", "GB-25-000")}</p>
                <p className="text-xs font-semibold text-slate-600">Submitted: {formatCompactDate(application.submittedAt)}</p>
              </div>
              <div className="rounded-md bg-[color:var(--blue-deep)] px-5 py-3 text-center text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-wide">Application status</p>
                <p className="mt-1 whitespace-nowrap text-sm font-extrabold uppercase">{displayStatus}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <main className="min-w-0">
              <ContactInformation candidate={candidate} contactAccess={contactAccess} />
              <FullApplicationSections model={model} />
            </main>

            <aside className="grid content-start gap-4 lg:order-last">
              <QuickSummary candidate={candidate} />
              <QuickActions
                canMessageCandidate={canMessageCandidate}
                canEditApplicationNotes={canEditApplicationNotes}
                isDepartmentUser={isDepartmentUser}
                isExpired={isExpired}
                isPendingApproval={isPendingApproval}
                onFeedback={setActionFeedback}
              />
              <div
                className={cn(
                  "rounded-md border px-4 py-3 text-sm font-semibold leading-6",
                  isExpired ? "border-rose-200 bg-rose-50 text-rose-700" : isPendingApproval ? "border-amber-200 bg-amber-50 text-amber-800" : "border-slate-200 bg-slate-50 text-slate-700"
                )}
              >
                {quickActionMessage}
              </div>
              {actionFeedback ? <p className="text-sm font-semibold text-[color:var(--muted)]">{actionFeedback}</p> : null}
            </aside>
          </div>

          <p className="mt-10 text-xs leading-5 text-[color:var(--navy)]">
            This candidate profile is confidential and intended for authorized personnel only.
            <br />
            © 2026 GetBadged. All rights reserved.
          </p>
        </section>
      </div>
    </div>
  );
}

function ContactInformation({
  candidate,
  contactAccess
}: {
  candidate: CandidateProfile;
  contactAccess: DepartmentApplicationDetailViewModel["contactAccess"];
}) {
  const fields = [
    {
      label: "Address",
      value: contactAccess.isContactHidden ? "Hidden by contact visibility rules" : `${candidate.streetAddress}\n${candidate.city}, ${candidate.state} ${candidate.zipCode}`
    },
    { label: "Gender", value: formatValue(candidate.gender) },
    { label: "Phone", value: contactAccess.isContactHidden ? "Hidden by contact visibility rules" : candidate.phone },
    { label: "Ethnicity", value: candidate.ethnicity ?? "Not provided" },
    { label: "Date of Birth", value: formatProfileDate(candidate.dateOfBirth) },
    { label: "Multilingual", value: candidate.isMultilingual ? `Yes - ${candidate.languages.join(", ")}` : "No" },
    { label: "Last 4 of SSN", value: candidate.last4Ssn },
    { label: "Willing to Relocate", value: yesNo(candidate.isWillingToRelocate) },
    { label: "U.S. Citizen", value: yesNo(candidate.isUsCitizen) },
    { label: "Education", value: candidate.highestEducation ?? "Not provided" },
    { label: "Valid Driver's License", value: yesNo(candidate.hasValidDriversLicense) },
    { label: "Email", value: contactAccess.isContactHidden ? "Hidden by contact visibility rules" : candidate.email }
  ];

  return (
    <section>
      <SectionHeading
        icon={<UserRound className="h-5 w-5" />}
        title="Contact information"
        trailing={
          contactAccess.showExpiryCountdown ? (
            <div className="group relative">
              <span className="inline-flex cursor-help items-center rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                Contact access expires in {contactAccess.remainingDays} day{contactAccess.remainingDays === 1 ? "" : "s"}
              </span>
              <div className="pointer-events-none absolute right-0 top-full z-10 mt-2 hidden w-72 rounded-md border border-amber-200 bg-white p-3 text-left text-[11px] font-semibold leading-5 text-slate-700 shadow-lg group-hover:block">
                {contactAccess.hoverLabel}
              </div>
            </div>
          ) : null
        }
      />
      {contactAccess.helperLabel ? (
        <div
          className={cn(
            "mt-4 rounded-md border px-3 py-2 text-[12px] font-semibold",
            contactAccess.isContactHidden ? "border-rose-200 bg-rose-50 text-rose-700" : "border-amber-200 bg-amber-50 text-amber-900"
          )}
        >
          {contactAccess.helperLabel}
        </div>
      ) : null}
      <div className="grid gap-x-8 gap-y-5 py-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="grid min-w-0 grid-cols-[120px_minmax(0,1fr)] gap-3 text-sm">
            <p className="font-extrabold text-[color:var(--blue-deep)]">{field.label}:</p>
            <p className="whitespace-pre-line font-semibold leading-5 text-slate-700">{field.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FullApplicationSections({ model }: { model: DepartmentApplicationDetailViewModel }) {
  const { application } = model;
  const coverLetterSubmittedAt = `Submitted ${formatCompactDate(application.submittedAt)}`;

  return (
    <div className="mt-2 grid gap-6 border-t border-[color:var(--blue-deep)] pt-4">
      <ApplicationSection
        title="Training & Experience"
        icon={<BadgeCheck className="h-5 w-5" />}
        items={[
          labelValue("Academy", application.candidate.academyType ?? "Not provided"),
          labelValue("Prior public safety", application.candidate.priorPublicSafetyDetails ?? yesNo(application.candidate.hasPriorPublicSafetyExperience)),
          labelValue("Additional skills", application.candidate.additionalSkills ?? "Not provided")
        ]}
      />

      <ApplicationSection
        title="Background"
        icon={<BriefcaseBusiness className="h-5 w-5" />}
        items={[
          labelValue("Military", application.candidate.hasMilitaryService ? "U.S. Army - Veteran" : "No military service listed"),
          labelValue("Driver's license", yesNo(application.candidate.hasValidDriversLicense)),
          labelValue("LTC eligibility", formatValue(application.candidate.ltcEligibility))
        ]}
      />

      <ApplicationSection
        title="Certifications & Credentials"
        icon={<ShieldCheck className="h-5 w-5" />}
        items={[
          labelValue("Credentials", application.candidate.credentials.length ? application.candidate.credentials.join(", ").toUpperCase() : "None listed"),
          labelValue("POST status", application.candidate.hasActivePostCertification ? "POST Certified" : "Not POST Certified")
        ]}
      />

      <ApplicationSection
        title="Cover Letter / Essay Response"
        icon={<MessageSquareText className="h-5 w-5" />}
        helper={application.coverLetterText ? coverLetterSubmittedAt : undefined}
        items={[application.coverLetterText ?? "No cover letter submitted"]}
      />

      <ApplicationSection icon={<Paperclip className="h-5 w-5" />} title="Supporting Documents">
        <div className="grid gap-3">
          {model.documents.map((document) => (
            <div key={document.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[color:var(--border-muted)] px-4 py-3">
              <div>
                <p className="font-bold text-[color:var(--navy)]">{document.label}</p>
                <p className="text-sm font-semibold text-slate-600">{document.fileName}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusChip label={formatValue(document.status)} tone={document.status === "review_needed" ? "warning" : document.status === "missing" ? "danger" : "success"} />
                <a
                  href={document.fileUrl}
                  className="text-sm font-bold text-[color:var(--blue)] underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  View file
                </a>
              </div>
            </div>
          ))}
        </div>
      </ApplicationSection>

      <ApplicationSection
        title="Department Notes"
        icon={<NotebookText className="h-5 w-5" />}
        helper="Full department notes details"
      >
        <div className="grid gap-3">
          {model.notes.length ? (
            model.notes.map((note) => (
              <div key={note.id} className="rounded-md border border-[color:var(--border-muted)] px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-bold text-[color:var(--navy)]">{note.authorName}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{formatLongDate(note.createdAt)}</p>
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{note.body}</p>
              </div>
            ))
          ) : (
            <p className="text-sm font-semibold text-slate-600">No department notes have been added.</p>
          )}
        </div>
      </ApplicationSection>

      <ApplicationSection
        title="Department Private Files"
        icon={<Download className="h-5 w-5" />}
        helper="Internal-only files attached to this application"
      >
        <div className="grid gap-3">
          {model.privateFiles.length ? (
            model.privateFiles.map((file) => (
              <div key={file.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[color:var(--border-muted)] px-4 py-3">
                <div>
                  <p className="font-bold text-[color:var(--navy)]">{file.label}</p>
                  <p className="text-sm font-semibold text-slate-600">{file.fileName}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Uploaded by {file.uploadedByName} on {formatLongDate(file.uploadedAt)}
                  </p>
                </div>
                <a
                  href={file.fileUrl}
                  className="text-sm font-bold text-[color:var(--blue)] underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open file
                </a>
              </div>
            ))
          ) : (
            <p className="text-sm font-semibold text-slate-600">No department-private files have been attached.</p>
          )}
        </div>
      </ApplicationSection>

      <ApplicationSection
        title="Application Change Log"
        icon={<NotebookPen className="h-5 w-5" />}
        helper="Change log appears only on the full application page and includes this department’s own application record history."
      >
        <div className="grid gap-3">
          {model.changeLog.length ? (
            model.changeLog.map((entry) => (
              <div key={entry.id} className="rounded-md border border-[color:var(--border-muted)] px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-bold text-[color:var(--navy)]">{entry.action}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{formatLongDate(entry.createdAt)}</p>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-700">{entry.actorName}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{entry.detail}</p>
              </div>
            ))
          ) : (
            <p className="text-sm font-semibold text-slate-600">No application changes have been recorded.</p>
          )}
        </div>
      </ApplicationSection>
    </div>
  );
}

function ApplicationSection({
  title,
  icon,
  items,
  helper,
  children
}: {
  title: string;
  icon: React.ReactNode;
  items?: string[];
  helper?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-md border border-[color:var(--border-muted)] bg-slate-50/40 p-5">
      <SectionHeading title={title} icon={icon} trailing={helper ? <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{helper}</p> : null} />
      <div className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-slate-700">
        {items?.map((item) => (
          <p key={item}>{item}</p>
        ))}
        {children}
      </div>
    </section>
  );
}

function QuickSummary({ candidate }: { candidate: CandidateProfile }) {
  const items = [
    { icon: <BookOpen className="h-4 w-4" />, label: "Exam Score", value: candidate.track === "ELR" ? "82.09%" : "Not applicable" },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Education", value: candidate.highestEducation ?? "Not provided" },
    { icon: <ShieldCheck className="h-4 w-4" />, label: "FT Academy", value: candidate.academyType ?? "Not provided" },
    { icon: <ShieldQuestion className="h-4 w-4" />, label: "POST Status", value: candidate.hasActivePostCertification ? "POST Certified" : "Not POST Certified" },
    { icon: <Star className="h-4 w-4" />, label: "Military", value: candidate.hasMilitaryService ? "U.S. Army - Veteran" : "None listed" },
    {
      icon: <BadgeCheck className="h-4 w-4" />,
      label: "Certifications",
      value: candidate.credentials.length ? candidate.credentials.join(", ").toUpperCase() : "None listed"
    },
    { icon: <ShieldCheck className="h-4 w-4" />, label: "Languages", value: candidate.languages.length ? candidate.languages.join(", ") : "None listed" }
  ];

  return (
    <section className="rounded-md border border-slate-300 bg-slate-50 p-4">
      <h2 className="border-b border-slate-300 pb-2 text-sm font-extrabold uppercase text-[color:var(--blue-deep)]">Quick summary</h2>
      <div className="mt-4 grid gap-4">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[20px_minmax(0,1fr)] gap-3">
            <span className="text-[color:var(--blue-deep)]">{item.icon}</span>
            <div>
              <p className="text-xs font-extrabold text-[color:var(--blue-deep)]">{item.label}</p>
              <p className="mt-0.5 text-xs font-semibold leading-5 text-slate-700">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickActions({
  canMessageCandidate,
  canEditApplicationNotes,
  isDepartmentUser,
  isExpired,
  isPendingApproval,
  onFeedback
}: {
  canMessageCandidate: boolean;
  canEditApplicationNotes: boolean;
  isDepartmentUser: boolean;
  isExpired: boolean;
  isPendingApproval: boolean;
  onFeedback: (value: string) => void;
}) {
  const actions = [
    {
      label: "Message Candidate",
      icon: <Mail className="h-4 w-4" />,
      disabled: !canMessageCandidate,
      handler: () =>
        onFeedback(
          isDepartmentUser
            ? "Department User access is view-only for candidate messaging."
            : isExpired
              ? "Renew membership before messaging candidates from the full application view."
              : isPendingApproval
                ? "Department approval must complete before candidate outreach is enabled."
                : "Message Candidate remains a mock action in this workspace."
        )
    },
    {
      label: "Add Internal Note",
      icon: <NotebookText className="h-4 w-4" />,
      disabled: !canEditApplicationNotes,
      handler: () =>
        onFeedback(
          isExpired ? "Renew membership before adding or editing department notes." : "Add Internal Note remains a mock action in this workspace."
        )
    },
    {
      label: "Archive Application",
      icon: <Archive className="h-4 w-4" />,
      disabled: isExpired,
      handler: () =>
        onFeedback(
          isExpired ? "Renew membership before archiving or updating candidate application records." : "Archive Application remains a mock action in this workspace."
        )
    }
  ];

  return (
    <section className="rounded-md border border-slate-300 bg-slate-50 p-4">
      <h2 className="border-b border-slate-300 pb-2 text-sm font-extrabold uppercase text-[color:var(--blue-deep)]">Quick actions</h2>
      <div className="mt-4 grid gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            type="button"
            variant="secondary"
            iconLeft={action.icon}
            className="w-full justify-start border-slate-300 px-3 text-xs text-[color:var(--navy)]"
            disabled={action.disabled}
            onClick={action.handler}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ title, icon, trailing }: { title: string; icon: React.ReactNode; trailing?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--blue-deep)] pb-3">
      <h2 className="flex items-center gap-3 text-sm font-extrabold uppercase text-[color:var(--blue-deep)]">
        {icon}
        {title}
      </h2>
      {trailing}
    </div>
  );
}

function labelValue(label: string, value: string) {
  return `${label}: ${value}`;
}

function formatCompactDate(value: string) {
  const date = new Date(value);
  return `${String(date.getUTCMonth() + 1).padStart(2, "0")}/${String(date.getUTCDate()).padStart(2, "0")}/${date.getUTCFullYear()}`;
}

function formatProfileDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${date.getUTCDate()}/${month}/${date.getUTCFullYear()}`;
}

function formatLongDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function trackLabel(track: CandidateProfile["track"]) {
  if (track === "ELR") return "Entry Level";
  if (track === "CXO") return "Certified Officer";
  return "Operations";
}

function yesNo(value: boolean | null) {
  if (value === null) return "Not provided";
  return value ? "Yes" : "No";
}

function formatValue(value: string | null | undefined) {
  if (!value) return "Not provided";
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
