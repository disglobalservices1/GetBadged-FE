import type { Notification } from "@/types/notification";

export const mockNotifications: Notification[] = [
  {
    id: "notification_department_direct_application_1",
    recipientUserId: "user_department_admin_1",
    recipientRole: "department_admin",
    type: "direct_application_received",
    title: "New direct application",
    body: "A candidate applied to Entry Level Police Officer (New Recruit).",
    linkHref: "/department/applicant-pools/job_1/applications/application_1",
    createdAt: "2026-05-15T10:00:00.000Z"
  },
  {
    id: "notification_department_approval_returned_1",
    recipientUserId: "user_department_admin_1",
    recipientRole: "department_admin",
    type: "approval_returned",
    title: "Job post needs revisions",
    body: "Certified Police Officer needs additional salary details before approval.",
    linkHref: "/department/jobs",
    createdAt: "2026-05-14T13:00:00.000Z"
  },
  {
    id: "notification_department_badge_accepted_1",
    recipientUserId: "user_department_admin_1",
    recipientRole: "department_admin",
    type: "badge_accepted",
    title: "Badge Request accepted",
    body: "Avery Cole accepted Westview's Badge Request for Lateral Police Officer.",
    linkHref: "/department/applicant-pools/job_2/applications/application_2",
    readAt: "2026-05-14T17:00:00.000Z",
    createdAt: "2026-05-14T16:20:00.000Z"
  },
  {
    id: "notification_department_message_1",
    recipientUserId: "user_department_admin_1",
    recipientRole: "department_admin",
    type: "system",
    title: "Unread candidate message",
    body: "Jordan Smith replied in Application follow-up.",
    linkHref: "/department/messages/message_thread_1",
    createdAt: "2026-05-15T10:10:00.000Z"
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
