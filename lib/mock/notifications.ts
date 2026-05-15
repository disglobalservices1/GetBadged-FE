import type { Notification } from "@/types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "notification_admin_department_pending_1",
    recipientUserId: "user_gb_admin_1",
    recipientRole: "gb_admin",
    type: "approval_requested",
    title: "Department registration needs review",
    body: "East Harbor Police Department submitted a mock self-registration request.",
    linkHref: "/admin/approvals/departments",
    createdAt: "2026-05-15T09:02:00.000Z"
  }
];
