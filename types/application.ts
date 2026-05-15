import type { JobType } from "./job";

export type ApplicationSource = "direct_application" | "accepted_badge";

export type ApplicationStatusKey =
  | "new_applicant"
  | "received_application"
  | "reviewing_application"
  | "does_not_meet_requirements"
  | "initial_contact_made"
  | "more_info_requested"
  | "inactive_membership"
  | "no_longer_meets_requirements"
  | "hired"
  | "not_selected"
  | "candidate_withdrew"
  | "disqualified"
  | string;

export type Application = {
  id: string;
  candidateProfileId: string;
  departmentId: string;
  departmentName: string;
  jobPostId: string;
  jobTitle: string;
  jobType: JobType;
  source: ApplicationSource;
  status: ApplicationStatusKey;
  submittedAt: string;
  viewedAt?: string;
  archivedAt?: string;
  isNewForDepartment: boolean;
  coverLetterText?: string;
  coverLetterFileUrl?: string;
  badgeRequestId?: string;
  tokenLedgerEntryId?: string;
};
