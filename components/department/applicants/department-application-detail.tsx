import {
  Archive,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  Download,
  FileText,
  GraduationCap,
  Mail,
  MessageSquareText,
  NotebookText,
  Paperclip,
  ShieldCheck,
  ShieldQuestion,
  Star,
  UserRound
} from "lucide-react";
import { EmptyState } from "@/components/common/empty-state";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import type { DepartmentApplicationDetailViewModel } from "@/features/department/applicants/get-mock-department-applicant-pool";
import { cn } from "@/lib/utils/cn";
import type { CandidateProfile } from "@/types/candidate";

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
  const candidate = application.candidate;
  const displayStatus = application.isNewForDepartment ? "New application" : application.statusLabel;

  return (
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
              <p className="mt-1 text-sm font-extrabold uppercase">{displayStatus}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <main className="min-w-0">
            <ContactInformation candidate={candidate} />
            <ReviewSectionRows model={model} />
          </main>

          <aside className="grid content-start gap-4 lg:order-last">
            <QuickSummary candidate={candidate} />
            <QuickActions />
          </aside>
        </div>

        <p className="mt-10 text-xs leading-5 text-[color:var(--navy)]">
          This candidate profile is confidential and intended for authorized personnel only.
          <br />
          © 2026 GetBadged. All rights reserved.
        </p>
      </section>
    </div>
  );
}

function ContactInformation({ candidate }: { candidate: CandidateProfile }) {
  const fields = [
    {
      label: "Address",
      value: `${candidate.streetAddress}\n${candidate.city}, ${candidate.state} ${candidate.zipCode}`
    },
    { label: "Gender", value: formatValue(candidate.gender) },
    { label: "Phone", value: candidate.phone },
    { label: "Ethnicity", value: candidate.ethnicity ?? "Not provided" },
    { label: "Date of Birth", value: formatProfileDate(candidate.dateOfBirth) },
    { label: "Multilingual", value: candidate.isMultilingual ? `Yes - ${candidate.languages.join(", ")}` : "No" },
    { label: "Last 4 of SSN", value: candidate.last4Ssn },
    { label: "Willing to Relocate", value: yesNo(candidate.isWillingToRelocate) },
    { label: "U.S. Citizen", value: yesNo(candidate.isUsCitizen) },
    { label: "Education", value: candidate.highestEducation ?? "Not provided" },
    { label: "Valid Driver's License", value: yesNo(candidate.hasValidDriversLicense) }
  ];

  return (
    <section>
      <SectionHeading icon={<UserRound className="h-5 w-5" />} title="Contact information" />
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

function ReviewSectionRows({ model }: { model: DepartmentApplicationDetailViewModel }) {
  const { application } = model;
  const rows = [
    {
      title: "Training & Experience",
      icon: <BadgeCheck className="h-5 w-5" />,
      content: [
        labelValue("Academy", application.candidate.academyType ?? "Not provided"),
        labelValue("Prior public safety", application.candidate.priorPublicSafetyDetails ?? yesNo(application.candidate.hasPriorPublicSafetyExperience)),
        labelValue("Additional skills", application.candidate.additionalSkills ?? "Not provided")
      ]
    },
    {
      title: "Background",
      icon: <BriefcaseBusiness className="h-5 w-5" />,
      content: [
        labelValue("Military", application.candidate.hasMilitaryService ? "U.S. Army - Veteran" : "No military service listed"),
        labelValue("Driver's license", yesNo(application.candidate.hasValidDriversLicense)),
        labelValue("LTC eligibility", formatValue(application.candidate.ltcEligibility))
      ]
    },
    {
      title: "Certifications & Credentials",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: [
        labelValue("Credentials", application.candidate.credentials.length ? application.candidate.credentials.join(", ").toUpperCase() : "None listed"),
        labelValue("POST status", application.candidate.hasActivePostCertification ? "POST Certified" : "Not POST Certified")
      ]
    },
    {
      title: "Essay Responses",
      icon: <MessageSquareText className="h-5 w-5" />,
      content: [application.coverLetterText ?? "No cover letter or essay response was submitted with this application."]
    },
    {
      title: "Attachments",
      icon: <Paperclip className="h-5 w-5" />,
      content: model.documents.map((document) => `${document.label}: ${document.fileName}`)
    },
    {
      title: "Internal Notes",
      icon: <NotebookText className="h-5 w-5" />,
      content: model.notes.length ? model.notes.map((note) => `${note.authorName}: ${note.body}`) : ["No internal notes have been added."]
    }
  ];

  return (
    <div className="mt-2">
      {rows.map((row) => (
        <details key={row.title} className="group border-t border-[color:var(--blue-deep)] last:border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[color:var(--blue-deep)] marker:hidden">
            <span className="flex items-center gap-3 text-sm font-extrabold uppercase">
              {row.icon}
              {row.title}
            </span>
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <div className="grid gap-2 pb-4 pl-8 text-sm font-semibold leading-6 text-slate-700">
            {row.content.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
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

function QuickActions() {
  const actions = [
    { label: "Download PDF", icon: <Download className="h-4 w-4" /> },
    { label: "Message Candidate", icon: <Mail className="h-4 w-4" /> },
    { label: "Add Internal Note", icon: <NotebookText className="h-4 w-4" /> },
    { label: "Archive Application", icon: <Archive className="h-4 w-4" /> }
  ];

  return (
    <section className="rounded-md border border-slate-300 bg-slate-50 p-4">
      <h2 className="border-b border-slate-300 pb-2 text-sm font-extrabold uppercase text-[color:var(--blue-deep)]">Quick actions</h2>
      <div className="mt-4 grid gap-3">
        {actions.map((action) => (
          <Button key={action.label} type="button" variant="secondary" iconLeft={action.icon} className="w-full justify-start border-slate-300 px-3 text-xs text-[color:var(--navy)]">
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="border-y border-[color:var(--blue-deep)] py-3">
      <h2 className="flex items-center gap-3 text-sm font-extrabold uppercase text-[color:var(--blue-deep)]">
        {icon}
        {title}
      </h2>
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
