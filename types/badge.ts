import type { JobType } from "./job";

export type BadgeRequestStatus = "sent" | "accepted" | "inactive_candidate" | "expired_department" | "superseded_by_direct_apply";

export type BadgeRequest = {
  id: string;
  candidateProfileId: string;
  departmentId: string;
  departmentName: string;
  jobPostId: string;
  jobType: JobType;
  status: BadgeRequestStatus;
  sentByUserId: string;
  sentAt: string;
  acceptedAt?: string;
  resultingApplicationId?: string;
};
