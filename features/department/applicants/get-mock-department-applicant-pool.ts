import {
  mockApplicationChangeLogs,
  mockApplications,
  mockDepartmentApplicationNotes,
  mockDepartmentApplicationPrivateFiles
} from "@/lib/mock/applications";
import { mockCandidateProfiles } from "@/lib/mock/candidates";
import { mockCandidateExamRegistrations, mockCandidateExamScores, mockExamSittings } from "@/lib/mock/exams";
import { mockJobPosts } from "@/lib/mock/jobs";
import { mockDepartments } from "@/lib/mock/departments";
import { getDepartmentContactAccessState, type DepartmentContactAccessState } from "@/features/department/applicants/contact-visibility";
import type { Application, ApplicationChangeLogEntry, DepartmentApplicationNote, DepartmentApplicationPrivateFile } from "@/types/application";
import type { CandidateProfile } from "@/types/candidate";
import type { JobPost } from "@/types/job";

export type DepartmentApplicantPoolRow = Application & {
  candidate: CandidateProfile;
  candidateName: string;
  candidateLastName: string;
  submittedAtLabel: string;
  viewedAtLabel: string;
  sourceLabel: string;
  statusLabel: string;
  statusTone: "navy" | "success" | "warning" | "danger" | "muted";
  membershipStatusLabel: string;
  membershipStatusTone: "navy" | "success" | "warning" | "danger" | "muted";
  jobLabel: string;
  locationLabel: string;
  profileSummary: string;
  detailHref: string;
  contactAccess: DepartmentContactAccessState;
  departmentNotesCount: number;
  examScoreLabel: string;
  examScoreValue: number | null;
  examDateLabel: string;
  cityLabel: string;
  zipCodeLabel: string;
  phoneLabel: string;
  emailLabel: string;
  ageLabel: string;
  ageValue: number | null;
  citizenshipLabel: string;
  driversLicenseLabel: string;
  educationLabel: string;
  multilingualLabel: string;
  veteranLabel: string;
  priorPoliceLabel: string;
  priorPublicSafetyLabel: string;
  fullTimeAcademyLabel: string;
  academyTypeLabel: string;
  credentialsLabel: string;
  postCertifiedLabel: string;
  volunteerLabel: string;
  cadetAcademyLabel: string;
  civilServiceLabel: string;
  ltcEligibilityLabel: string;
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
  initialJobFilter: string;
  stats: {
    total: number;
    newApplicants: number;
    directApplications: number;
    acceptedBadges: number;
  };
};

export type DepartmentApplicationDetailViewModel = {
  poolId: string;
  application: DepartmentApplicantPoolRow;
  documents: DepartmentApplicantDocument[];
  notes: DepartmentApplicationNote[];
  privateFiles: DepartmentApplicationPrivateFile[];
  changeLog: ApplicationChangeLogEntry[];
  contactAccess: DepartmentContactAccessState;
  departmentAccountStatus: string;
};

const CURRENT_DEPARTMENT_ID = "department_1";
const CURRENT_DEPARTMENT = mockDepartments.find((item) => item.id === CURRENT_DEPARTMENT_ID) ?? mockDepartments[0];
const REFERENCE_DATE = new Date("2026-06-03T00:00:00.000Z");

export function getMockDepartmentApplicantPool({ initialJobFilter = "all" }: { initialJobFilter?: string } = {}): DepartmentApplicantPoolViewModel {
  const rows = getRows();
  const departmentJobs = mockJobPosts
    .filter((job) => job.departmentId === CURRENT_DEPARTMENT_ID)
    .map((job) => ({ id: job.id, label: job.title }));

  return {
    departmentId: CURRENT_DEPARTMENT_ID,
    departmentName: "Westview Police Department",
    jobs: [{ id: "all", label: "All jobs" }, ...departmentJobs],
    rows,
    initialJobFilter,
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
    poolId: application.jobPostId,
    application,
    documents: getApplicationDocuments(application),
    notes: mockDepartmentApplicationNotes.filter((note) => note.applicationId === application.id),
    privateFiles: mockDepartmentApplicationPrivateFiles.filter((file) => file.applicationId === application.id),
    changeLog: mockApplicationChangeLogs.filter((entry) => entry.applicationId === application.id),
    contactAccess: application.contactAccess,
    departmentAccountStatus: CURRENT_DEPARTMENT.accountStatus
  };
}

export function getDepartmentApplicationHref(poolId: string, applicationId: string) {
  return `/department/applicant-pools/${poolId}/applications/${applicationId}`;
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
  const contactAccess = getDepartmentContactAccessState(candidate.id, CURRENT_DEPARTMENT.accountStatus);
  const examScore = mockCandidateExamScores.find((item) => item.candidateProfileId === candidate.id);
  const examRegistration = mockCandidateExamRegistrations.find((item) => item.candidateProfileId === candidate.id);
  const examSitting = mockExamSittings.find((item) => item.id === (examScore?.examSittingId ?? examRegistration?.examSittingId));
  const notesCount = mockDepartmentApplicationNotes.filter((note) => note.applicationId === application.id).length;
  const ageValue = getAge(candidate.dateOfBirth);

  return {
    ...application,
    candidate,
    candidateName: `${candidate.firstName} ${candidate.lastName}`,
    candidateLastName: candidate.lastName,
    submittedAtLabel: formatDate(application.submittedAt),
    viewedAtLabel: application.viewedAt ? formatDate(application.viewedAt) : "New",
    sourceLabel: application.source === "accepted_badge" ? "Accepted Badge" : "Direct application",
    statusLabel: formatStatus(application.status),
    statusTone: getStatusTone(application.status),
    membershipStatusLabel: formatStatus(candidate.membershipStatus),
    membershipStatusTone: getMembershipTone(candidate.membershipStatus),
    jobLabel: job?.title ?? application.jobTitle,
    locationLabel: `${candidate.city}, ${candidate.state}`,
    profileSummary: getProfileSummary(candidate),
    detailHref: getDepartmentApplicationHref(application.jobPostId, application.id),
    contactAccess,
    departmentNotesCount: notesCount,
    examScoreLabel: examScore ? `${examScore.scorePercent.toFixed(2)}%` : "—",
    examScoreValue: examScore?.scorePercent ?? null,
    examDateLabel: examSitting ? formatDate(examSitting.examDate) : "—",
    cityLabel: candidate.city,
    zipCodeLabel: candidate.zipCode,
    phoneLabel: candidate.phone,
    emailLabel: candidate.email,
    ageLabel: ageValue === null ? "—" : `${ageValue}`,
    ageValue,
    citizenshipLabel: formatBooleanState(candidate.isUsCitizen, "U.S. Citizen"),
    driversLicenseLabel: formatBooleanState(candidate.hasValidDriversLicense, "Valid"),
    educationLabel: candidate.highestEducation ?? "—",
    multilingualLabel: candidate.isMultilingual ? "Yes" : "No",
    veteranLabel: candidate.hasMilitaryService ? (candidate.isQualifiedVeteran ? "Qualified veteran" : "Veteran") : "No",
    priorPoliceLabel: candidate.hasPriorPoliceEmployment ? "Yes" : "No",
    priorPublicSafetyLabel: candidate.hasPriorPublicSafetyExperience ? "Yes" : "No",
    fullTimeAcademyLabel: candidate.hasCompletedFullTimeAcademy ? "Yes" : "No",
    academyTypeLabel: candidate.academyType ?? "—",
    credentialsLabel: candidate.credentials.length > 0 ? candidate.credentials.map((value) => value.toUpperCase()).join(", ") : "—",
    postCertifiedLabel: candidate.track === "CXO" ? (candidate.hasActivePostCertification ? "Yes" : "No") : "—",
    volunteerLabel: candidate.hasVolunteerExperience ? "Yes" : "No",
    cadetAcademyLabel: candidate.hasCadetOrCitizensAcademy ? "Yes" : "No",
    civilServiceLabel: candidate.civilServiceExamStatus ?? "—",
    ltcEligibilityLabel: formatLtcEligibility(candidate.ltcEligibility)
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

function getMembershipTone(status: CandidateProfile["membershipStatus"]): DepartmentApplicantPoolRow["membershipStatusTone"] {
  if (status === "active") return "success";
  if (status === "expired" || status === "inactive" || status === "cancelled") return "danger";
  if (status === "paused") return "warning";
  return "muted";
}

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function getAge(dateOfBirth: string) {
  if (!dateOfBirth) return null;

  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return null;

  let age = REFERENCE_DATE.getUTCFullYear() - birthDate.getUTCFullYear();
  const hasNotHadBirthdayYet =
    REFERENCE_DATE.getUTCMonth() < birthDate.getUTCMonth() ||
    (REFERENCE_DATE.getUTCMonth() === birthDate.getUTCMonth() && REFERENCE_DATE.getUTCDate() < birthDate.getUTCDate());

  if (hasNotHadBirthdayYet) age -= 1;
  return age;
}

function formatBooleanState(value: boolean | null | undefined, yesLabel = "Yes") {
  if (value == null) return "—";
  return value ? yesLabel : "No";
}

function formatLtcEligibility(value: CandidateProfile["ltcEligibility"]) {
  if (!value) return "—";
  if (value === "eligible") return "Eligible";
  return "Restrictions may apply";
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
