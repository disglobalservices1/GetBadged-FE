import type { Application } from "@/types/application";

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
    candidateProfileId: "candidate_1",
    departmentId: "department_1",
    departmentName: "Westview Police Department",
    jobPostId: "job_1",
    jobTitle: "Entry Level Police Officer (New Recruit)",
    jobType: "entry_level",
    source: "accepted_badge",
    status: "reviewing_application",
    submittedAt: "2026-05-13T11:20:00.000Z",
    viewedAt: "2026-05-14T09:05:00.000Z",
    isNewForDepartment: false,
    badgeRequestId: "badge_request_1"
  },
  {
    id: "application_3",
    candidateProfileId: "candidate_1",
    departmentId: "department_1",
    departmentName: "Westview Police Department",
    jobPostId: "job_1",
    jobTitle: "Entry Level Police Officer (New Recruit)",
    jobType: "entry_level",
    source: "direct_application",
    status: "initial_contact_made",
    submittedAt: "2026-05-10T14:45:00.000Z",
    viewedAt: "2026-05-11T10:15:00.000Z",
    isNewForDepartment: false
  }
];
