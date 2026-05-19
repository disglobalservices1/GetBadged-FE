import type { AuditLog } from "@/types/admin";

export const mockAuditLogs: AuditLog[] = [
  {
    id: "audit_department_registration_1",
    actorUserId: "user_department_admin_pending",
    actorRole: "department_admin",
    targetType: "department",
    targetId: "department_pending_1",
    action: "department_registration_submitted",
    metadata: {
      requestedTier: "small",
      approvalStatus: "pending_approval"
    },
    createdAt: "2026-05-15T09:02:00.000Z"
  }
];
