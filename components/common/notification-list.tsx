import { Bell } from "lucide-react";
import type { Notification } from "@/types/notification";

type NotificationListProps = {
  notifications: Notification[];
};

export function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="rounded-lg border border-[color:var(--border-muted)] bg-white p-5 text-sm text-[color:var(--muted)]">
        No notifications yet.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {notifications.map((notification) => (
        <article key={notification.id} className="flex gap-3 rounded-lg border border-[color:var(--border-muted)] bg-white p-4">
          <Bell className="mt-1 h-4 w-4 text-[color:var(--blue)]" />
          <div className="grid gap-1">
            <h3 className="text-sm font-bold text-[color:var(--navy)]">{notification.title}</h3>
            <p className="text-sm leading-5 text-[color:var(--muted)]">{notification.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
