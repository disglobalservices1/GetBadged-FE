import type { Application, ApplicationChangeLogEntry, DepartmentApplicationNote, DepartmentApplicationPrivateFile } from "@/types/application";

export const mockApplications: Application[] = [
  {
    id: "application_1",
    candidateProfileId: "candidate_1",
    departmentId: "department_1",
    departmentName: "Westview Police Department",
    jobPostId: "job_1",
    jobTitle: "Entry Level Police Officer (New Recruit)",
    jobType: "entry_level",
    source: "direct_application",
    status: "inactive_membership",
    submittedAt: "2026-05-17T10:15:00.000Z",
    isNewForDepartment: true,
    coverLetterText: "Mock application created for dashboard display.",
    tokenLedgerEntryId: "token_ledger_1"
  },
  {
    id: "application_2",
    candidateProfileId: "candidate_2",
    departmentId: "department_1",
    departmentName: "Westview Police Department",
    jobPostId: "job_2",
    jobTitle: "Lateral Police Officer (POST Certified)",
    jobType: "certified_officer",
    source: "accepted_badge",
    status: "reviewing_application",
    submittedAt: "2026-05-13T11:20:00.000Z",
    viewedAt: "2026-05-14T09:05:00.000Z",
    isNewForDepartment: false,
    badgeRequestId: "badge_request_1"
  },
  {
    id: "application_3",
    candidateProfileId: "candidate_3",
    departmentId: "department_1",
    departmentName: "Westview Police Department",
    jobPostId: "job_6",
    jobTitle: "Public Safety Dispatcher",
    jobType: "dispatcher_ops",
    source: "direct_application",
    status: "initial_contact_made",
    submittedAt: "2026-05-10T14:45:00.000Z",
    viewedAt: "2026-05-11T10:15:00.000Z",
    isNewForDepartment: false,
    coverLetterText: "I am interested in supporting Westview's emergency communications team and bringing strong call-handling discipline to the role."
  }
];

export const mockDepartmentApplicationNotes: DepartmentApplicationNote[] = [
  {
    id: "application_note_1",
    applicationId: "application_1",
    authorUserId: "user_department_admin_1",
    authorName: "Morgan Reyes",
    body: "New ELR application. Confirm membership activation before moving to interview scheduling.",
    createdAt: "2026-05-17T13:30:00.000Z"
  },
  {
    id: "application_note_2",
    applicationId: "application_2",
    authorUserId: "user_department_admin_1",
    authorName: "Morgan Reyes",
    body: "Badge accepted. POST certification and prior patrol experience look strong for lateral review.",
    createdAt: "2026-05-14T10:15:00.000Z"
  },
  {
    id: "application_note_3",
    applicationId: "application_3",
    authorUserId: "user_department_user_1",
    authorName: "Taylor Kim",
    body: "Candidate has relevant call-taker training. Add to dispatcher shortlist.",
    createdAt: "2026-05-11T12:45:00.000Z"
  }
];

export const mockDepartmentApplicationPrivateFiles: DepartmentApplicationPrivateFile[] = [
  {
    id: "private_file_1",
    applicationId: "application_2",
    label: "Internal phone screen notes",
    fileName: "avery-cole-phone-screen.pdf",
    fileUrl: "/mock/private-files/avery-cole-phone-screen.pdf",
    uploadedByUserId: "user_department_admin_1",
    uploadedByName: "Morgan Reyes",
    uploadedAt: "2026-05-14T16:20:00.000Z"
  },
  {
    id: "private_file_2",
    applicationId: "application_3",
    label: "Dispatcher shortlist worksheet",
    fileName: "dispatcher-shortlist-notes.pdf",
    fileUrl: "/mock/private-files/dispatcher-shortlist-notes.pdf",
    uploadedByUserId: "user_department_user_1",
    uploadedByName: "Taylor Kim",
    uploadedAt: "2026-05-12T09:10:00.000Z"
  }
];

export const mockApplicationChangeLogs: ApplicationChangeLogEntry[] = [
  {
    id: "application_log_1",
    applicationId: "application_1",
    actorName: "Jordan Smith",
    action: "Application submitted",
    detail: "Direct application entered the Westview Applicant Pool.",
    createdAt: "2026-05-17T10:15:00.000Z"
  },
  {
    id: "application_log_2",
    applicationId: "application_1",
    actorName: "System",
    action: "Eligibility flag added",
    detail: "Candidate membership is inactive, so department review is blocked until activation.",
    createdAt: "2026-05-17T10:16:00.000Z"
  },
  {
    id: "application_log_3",
    applicationId: "application_2",
    actorName: "Avery Cole",
    action: "Badge Request accepted",
    detail: "Full application package released to Westview Police Department.",
    createdAt: "2026-05-13T11:20:00.000Z"
  },
  {
    id: "application_log_4",
    applicationId: "application_2",
    actorName: "Morgan Reyes",
    action: "Status updated",
    detail: "Moved from New Applicant to Reviewing Application.",
    createdAt: "2026-05-14T09:05:00.000Z"
  },
  {
    id: "application_log_5",
    applicationId: "application_3",
    actorName: "Taylor Kim",
    action: "Status updated",
    detail: "Initial contact made after dispatcher application review.",
    createdAt: "2026-05-11T10:15:00.000Z"
  }
];
