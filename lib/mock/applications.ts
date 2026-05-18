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
  }
];
