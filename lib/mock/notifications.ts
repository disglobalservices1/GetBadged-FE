import type { Notification } from "@/types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "notification_department_direct_application_1",
    recipientUserId: "user_department_admin_1",
    recipientRole: "department_admin",
    type: "direct_application_received",
    title: "New direct application",
    body: "A candidate applied to Entry Level Police Officer (New Recruit).",
    linkHref: "/department/applicants",
    createdAt: "2026-05-15T10:00:00.000Z"
  },
  {
    id: "notification_department_approval_returned_1",
    recipientUserId: "user_department_admin_1",
    recipientRole: "department_admin",
    type: "approval_returned",
    title: "Job post needs revisions",
    body: "Certified Police Officer needs additional salary details before approval.",
    linkHref: "/department/jobs/job_5/edit",
    createdAt: "2026-05-14T13:00:00.000Z"
  },
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
