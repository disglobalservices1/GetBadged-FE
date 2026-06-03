import { mockDepartmentDashboard } from "@/lib/mock/departmentDashboard";
import { mockDepartments } from "@/lib/mock/departments";
import { mockNotifications } from "@/lib/mock/notifications";

export function getMockDepartmentNotifications() {
  const department = mockDepartments.find((item) => item.id === mockDepartmentDashboard.departmentId) ?? mockDepartments[0];
  const isPendingApproval = department.accountStatus === "pending_approval";
  const isExpired = department.accountStatus === "expired";
  const notificationsEnabled = department.accountStatus === "active";
  const availableNotifications = mockNotifications
    .filter((notification) => notification.recipientRole === "department_admin")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((notification) => ({
      ...notification,
      createdAtLabel: formatDate(notification.createdAt),
      typeLabel: notification.type.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    }));
  const notifications = notificationsEnabled ? availableNotifications : [];

  return {
    departmentName: department.departmentName,
    accountStatusLabel: toStartCase(department.accountStatus),
    isPendingApproval,
    isExpired,
    notificationsEnabled,
    stateMessage: isExpired
      ? "Department membership is expired. Renew membership to restore live notifications and candidate alerts."
      : isPendingApproval
        ? "Notifications unlock after GetBadged approves the department registration."
        : "Review department alerts, approval updates, application events, and account notices.",
    stateAction: isExpired
      ? { label: "Renew Membership", href: "/department/billing" }
      : isPendingApproval
        ? { label: "Open Department Profile", href: "/department/profile" }
        : null,
    notifications,
    stats: {
      total: notifications.length,
      unread: notifications.filter((notification) => !notification.readAt).length,
      applicationEvents: notifications.filter((notification) => notification.type.includes("application") || notification.type.includes("badge")).length
    }
  };
}

export type DepartmentNotification = ReturnType<typeof getMockDepartmentNotifications>["notifications"][number];

function toStartCase(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
