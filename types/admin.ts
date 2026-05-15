import type { UserRole } from "./auth";

export type AuditLog = {
  id: string;
  actorUserId: string;
  actorRole: UserRole;
  targetType:
    | "user"
    | "candidate_profile"
    | "department"
    | "department_profile"
    | "job_post"
    | "application"
    | "exam"
    | "score"
    | "message"
    | "payment"
    | "impersonation"
    | "system";
  targetId: string;
  action: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
};
