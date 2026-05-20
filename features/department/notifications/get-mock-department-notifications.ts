import { mockNotifications } from "@/lib/mock/notifications";

export function getMockDepartmentNotifications() {
  const notifications = mockNotifications
    .filter((notification) => notification.recipientRole === "department_admin")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((notification) => ({
      ...notification,
      createdAtLabel: formatDate(notification.createdAt),
      typeLabel: notification.type.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    }));

  return {
    notifications,
    stats: {
      total: notifications.length,
      unread: notifications.filter((notification) => !notification.readAt).length,
      applicationEvents: notifications.filter((notification) => notification.type.includes("application") || notification.type.includes("badge")).length
    }
  };
}

export type DepartmentNotification = ReturnType<typeof getMockDepartmentNotifications>["notifications"][number];

function formatDate(value: string) {
  const date = new Date(value);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()];
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
