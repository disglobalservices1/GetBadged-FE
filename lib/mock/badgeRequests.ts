import type { BadgeRequest } from "@/types/badge";

export const mockBadgeRequests: BadgeRequest[] = [
  {
    id: "badge_request_1",
    candidateProfileId: "candidate_1",
    departmentId: "department_1",
    departmentName: "Westview Police Department",
    jobPostId: "job_2",
    jobType: "certified_officer",
    status: "sent",
    sentByUserId: "user_department_admin_1",
    sentAt: "2026-05-16T14:30:00.000Z"
  }
];
