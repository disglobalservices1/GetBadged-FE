import {
  mockApplicationChangeLogs,
  mockApplications,
  mockDepartmentApplicationNotes,
  mockDepartmentApplicationPrivateFiles
} from "@/lib/mock/applications";
import { mockDepartmentDashboard } from "@/lib/mock/departmentDashboard";
import { mockDepartments } from "@/lib/mock/departments";
import { getMockDepartmentApplicantPool, type DepartmentApplicantPoolRow } from "@/features/department/applicants/get-mock-department-applicant-pool";

export type DepartmentReportRow = DepartmentApplicantPoolRow & {
  archivedLabel: string;
  contactStatusLabel: string;
  departmentNotesExport: string;
  departmentNotesCountLabel: string;
  qualificationsLabel: string;
  essayResponseLabel: string;
  privateFilesCount: number;
  privateFilesLabel: string;
  changeLogCount: number;
  changeLogCountLabel: string;
  changeLogSummary: string;
};

export function getMockDepartmentReports() {
  const applicantPool = getMockDepartmentApplicantPool();
  const department = mockDepartments.find((item) => item.id === mockDepartmentDashboard.departmentId) ?? mockDepartments[0];
  const rows = applicantPool.rows.map((row) => toReportRow(row));
  const archivedRows = rows.filter((row) => row.archivedAt);
  const activeRows = rows.filter((row) => !row.archivedAt);

  return {
    departmentName: applicantPool.departmentName,
    accountStatusLabel: toStartCase(department.accountStatus),
    isExpired: department.accountStatus === "expired",
    isPendingApproval: department.accountStatus === "pending_approval",
    rows,
    jobs: applicantPool.jobs,
    stats: {
      totalApplicants: rows.length,
      activeApplicants: activeRows.length,
      archivedApplicants: archivedRows.length,
      directApplications: rows.filter((row) => row.source === "direct_application").length,
      acceptedBadges: rows.filter((row) => row.source === "accepted_badge").length,
      changeLogEntries: rows.reduce((total, row) => total + row.changeLogCount, 0)
    }
  };
}

export type DepartmentReportsViewModel = ReturnType<typeof getMockDepartmentReports>;

function toReportRow(row: DepartmentApplicantPoolRow): DepartmentReportRow {
  const notes = mockDepartmentApplicationNotes.filter((note) => note.applicationId === row.id);
  const privateFiles = mockDepartmentApplicationPrivateFiles.filter((file) => file.applicationId === row.id);
  const changeLog = mockApplicationChangeLogs.filter((entry) => entry.applicationId === row.id);
  const application = mockApplications.find((item) => item.id === row.id);

  return {
    ...row,
    archivedLabel: row.archivedAt ? "Archived" : "Active",
    contactStatusLabel: row.contactAccess.isContactHidden ? "Hidden until contact access is restored" : "Visible",
    departmentNotesExport: notes.length > 0 ? notes.map((note) => `${note.authorName}: ${note.body}`).join(" | ") : "No department notes",
    departmentNotesCountLabel: `${notes.length}`,
    qualificationsLabel: getQualificationsLabel(row),
    essayResponseLabel: application?.coverLetterText?.trim() || "No essay or cover letter submitted",
    privateFilesCount: privateFiles.length,
    privateFilesLabel: privateFiles.length > 0 ? `${privateFiles.length} private file${privateFiles.length === 1 ? "" : "s"}` : "No private files",
    changeLogCount: changeLog.length,
    changeLogCountLabel: `${changeLog.length}`,
    changeLogSummary: changeLog.length > 0 ? changeLog.map((entry) => `${entry.actorName}: ${entry.action} (${formatDate(entry.createdAt)})`).join(" | ") : "No change log entries"
  };
}

function getQualificationsLabel(row: DepartmentApplicantPoolRow) {
  const qualifications = [
    row.postCertifiedLabel === "Yes" ? "POST certified" : null,
    row.fullTimeAcademyLabel === "Yes" ? "Full-time academy" : null,
    row.multilingualLabel === "Yes" ? "Multilingual" : null,
    row.veteranLabel !== "No" ? row.veteranLabel : null,
    row.priorPoliceLabel === "Yes" ? "Prior police experience" : null,
    row.priorPublicSafetyLabel === "Yes" ? "Prior public safety experience" : null,
    row.volunteerLabel === "Yes" ? "Volunteer/community service" : null,
    row.cadetAcademyLabel === "Yes" ? "Cadet/citizens academy" : null,
    row.candidate.isWillingToRelocate ? "Willing to relocate" : null
  ].filter(Boolean);

  return qualifications.length > 0 ? qualifications.join(", ") : "No highlighted qualifications";
}

function toStartCase(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
