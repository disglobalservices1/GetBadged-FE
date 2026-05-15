import type { UserRole } from "./auth";

export type Notification = {
  id: string;
  recipientUserId: string;
  recipientRole: UserRole;
  type:
    | "badge_request_received"
    | "badge_accepted"
    | "direct_application_received"
    | "application_status_changed"
    | "membership_changed"
    | "exam_registered"
    | "exam_reminder"
    | "score_posted"
    | "approval_requested"
    | "approval_returned"
    | "system";
  title: string;
  body: string;
  linkHref?: string;
  readAt?: string;
  createdAt: string;
};
