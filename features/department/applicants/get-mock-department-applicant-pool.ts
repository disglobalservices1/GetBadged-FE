import {
  mockApplicationChangeLogs,
  mockApplications,
  mockDepartmentApplicationNotes,
  mockDepartmentApplicationPrivateFiles
} from "@/lib/mock/applications";
import { mockCandidateProfiles } from "@/lib/mock/candidates";
import { mockJobPosts } from "@/lib/mock/jobs";
import type { Application, ApplicationChangeLogEntry, DepartmentApplicationNote, DepartmentApplicationPrivateFile } from "@/types/application";
import type { CandidateProfile } from "@/types/candidate";
import type { JobPost } from "@/types/job";

export type DepartmentApplicantPoolRow = Application & {
  candidate: CandidateProfile;
  candidateName: string;
  submittedAtLabel: string;
  viewedAtLabel: string;
  sourceLabel: string;
  statusLabel: string;
  statusTone: "navy" | "success" | "warning" | "danger" | "muted";
  jobLabel: string;
  locationLabel: string;
  profileSummary: string;
};

export type DepartmentApplicantDocument = {
  id: string;
  label: string;
  fileName: string;
  status: "received" | "missing" | "review_needed";
};

export type DepartmentApplicantPoolViewModel = {
  departmentId: string;
  departmentName: string;
  jobs: { id: string; label: string }[];
  rows: DepartmentApplicantPoolRow[];
  stats: {
    total: number;
    newApplicants: number;
    directApplications: number;
    acceptedBadges: number;
  };
};

export type DepartmentApplicationDetailViewModel = {
  application: DepartmentApplicantPoolRow;
  documents: DepartmentApplicantDocument[];
  notes: DepartmentApplicationNote[];
  privateFiles: DepartmentApplicationPrivateFile[];
  changeLog: ApplicationChangeLogEntry[];
};

const CURRENT_DEPARTMENT_ID = "department_1";

export function getMockDepartmentApplicantPool(): DepartmentApplicantPoolViewModel {
  const rows = getRows();
  const departmentJobs = mockJobPosts
    .filter((job) => job.departmentId === CURRENT_DEPARTMENT_ID)
    .map((job) => ({ id: job.id, label: job.title }));

  return {
    departmentId: CURRENT_DEPARTMENT_ID,
    departmentName: "Westview Police Department",
    jobs: [{ id: "all", label: "All jobs" }, ...departmentJobs],
    rows,
    stats: {
      total: rows.length,
      newApplicants: rows.filter((row) => row.isNewForDepartment).length,
      directApplications: rows.filter((row) => row.source === "direct_application").length,
      acceptedBadges: rows.filter((row) => row.source === "accepted_badge").length
    }
  };
}

export function getMockDepartmentApplicationDetail(applicationId: string): DepartmentApplicationDetailViewModel | null {
  const application = getRows().find((row) => row.id === applicationId);

  if (!application) return null;

  return {
    application,
    documents: getApplicationDocuments(application),
    notes: mockDepartmentApplicationNotes.filter((note) => note.applicationId === application.id),
    privateFiles: mockDepartmentApplicationPrivateFiles.filter((file) => file.applicationId === application.id),
    changeLog: mockApplicationChangeLogs.filter((entry) => entry.applicationId === application.id)
  };
}

function getRows(): DepartmentApplicantPoolRow[] {
  return mockApplications
    .filter((application) => application.departmentId === CURRENT_DEPARTMENT_ID)
    .map((application) => {
      const candidate = mockCandidateProfiles.find((profile) => profile.id === application.candidateProfileId);
      const job = mockJobPosts.find((post) => post.id === application.jobPostId);

      if (!candidate) {
        throw new Error(`Missing candidate profile for application ${application.id}`);
      }

      return toApplicantRow(application, candidate, job);
    });
}

function toApplicantRow(application: Application, candidate: CandidateProfile, job?: JobPost): DepartmentApplicantPoolRow {
  return {
    ...application,
    candidate,
    candidateName: `${candidate.firstName} ${candidate.lastName}`,
    submittedAtLabel: formatDate(application.submittedAt),
    viewedAtLabel: application.viewedAt ? formatDate(application.viewedAt) : "New",
    sourceLabel: application.source === "accepted_badge" ? "Accepted Badge" : "Direct application",
    statusLabel: formatStatus(application.status),
    statusTone: getStatusTone(application.status),
    jobLabel: job?.title ?? application.jobTitle,
    locationLabel: `${candidate.city}, ${candidate.state}`,
    profileSummary: getProfileSummary(candidate)
  };
}

function getProfileSummary(candidate: CandidateProfile) {
  const parts = [
    candidate.track,
    candidate.highestEducation,
    candidate.isMultilingual ? `Multilingual: ${candidate.languages.join(", ")}` : null,
    candidate.hasActivePostCertification ? "Active POST" : null,
    candidate.hasPriorPublicSafetyExperience ? "Prior public safety" : null,
    candidate.hasMilitaryService ? "Military service" : null
  ].filter(Boolean);

  return parts.join(" | ");
}

function getApplicationDocuments(application: DepartmentApplicantPoolRow): DepartmentApplicantDocument[] {
  const baseDocuments: DepartmentApplicantDocument[] = [
    {
      id: `${application.id}_resume`,
      label: "Resume",
      fileName: `${slugify(application.candidateName)}-resume.pdf`,
      status: "received"
    },
    {
      id: `${application.id}_profile`,
      label: "Candidate profile package",
      fileName: `${slugify(application.candidateName)}-profile.pdf`,
      status: "received"
    }
  ];

  if (application.candidate.track === "CXO") {
    baseDocuments.push({
      id: `${application.id}_post`,
      label: "POST certificate",
      fileName: `${slugify(application.candidateName)}-post-certificate.pdf`,
      status: "received"
    });
  }

  if (application.candidate.track === "ELR") {
    baseDocuments.push({
      id: `${application.id}_exam`,
      label: "Entry exam score",
      fileName: `${slugify(application.candidateName)}-entry-exam.pdf`,
      status: application.status === "inactive_membership" ? "review_needed" : "received"
    });
  }

  return baseDocuments;
}

function formatStatus(status: string) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getStatusTone(status: string): DepartmentApplicantPoolRow["statusTone"] {
  if (status === "hired") return "success";
  if (status === "inactive_membership" || status === "more_info_requested" || status === "reviewing_application") return "warning";
  if (status === "not_selected" || status === "disqualified" || status === "does_not_meet_requirements") return "danger";
  if (status === "new_applicant" || status === "received_application") return "navy";
  return "muted";
}

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
