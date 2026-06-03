"use client";

import { useMemo, useState } from "react";
import { Bell, CheckCircle2, ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatusChip } from "@/components/ui/status-chip";
import { cn } from "@/lib/utils/cn";
import type { DepartmentNotification } from "@/features/department/notifications/get-mock-department-notifications";

type NotificationFilter = "all" | "unread" | string;

type DepartmentNotificationsModel = {
  departmentName: string;
  accountStatusLabel: string;
  isPendingApproval: boolean;
  isExpired: boolean;
  notificationsEnabled: boolean;
  stateMessage: string;
  stateAction: { label: string; href: string } | null;
  notifications: DepartmentNotification[];
  stats: { total: number; unread: number; applicationEvents: number };
};

export function DepartmentNotifications({ model }: { model: DepartmentNotificationsModel }) {
  const [notifications, setNotifications] = useState(model.notifications);
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const typeOptions = useMemo(() => {
    const types = Array.from(new Set(model.notifications.map((notification) => notification.type)));
    return [
      { label: "All notifications", value: "all" },
      { label: "Unread only", value: "unread" },
      ...types.map((type) => ({ label: type.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), value: type }))
    ];
  }, [model.notifications]);

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.readAt;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter((notification) => !notification.readAt).length;

  function markRead(id: string) {
    setNotifications((current) => current.map((notification) => (notification.id === id ? { ...notification, readAt: new Date().toISOString() } : notification)));
  }

  function markAllRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, readAt: notification.readAt ?? new Date().toISOString() })));
  }

  return (
    <div className="grid gap-6">
      <PageHeader eyebrow="Notifications" title="Notification center" description={model.stateMessage} />

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={<Bell className="h-5 w-5" />} label="Total Notices" value={notifications.length} detail="Department notifications" />
        <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Unread" value={unreadCount} detail="Need department attention" />
        <StatCard icon={<ClipboardList className="h-5 w-5" />} label="Application Events" value={model.stats.applicationEvents} detail="Applications and Badge activity" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department notification access</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div
            className={cn(
              "rounded-xl border px-4 py-3",
              model.isExpired && "border-rose-200 bg-rose-50 text-rose-700",
              model.isPendingApproval && "border-amber-200 bg-amber-50 text-amber-800",
              model.notificationsEnabled && "border-blue-100 bg-blue-50 text-[color:var(--blue)]"
            )}
          >
            <div className="flex flex-wrap items-center gap-3">
              <StatusChip label={model.accountStatusLabel} tone={model.isExpired ? "danger" : model.isPendingApproval ? "warning" : "success"} />
              <StatusChip label={model.departmentName} tone="navy" />
            </div>
            <p className="mt-3 text-sm font-bold">{model.stateMessage}</p>
          </div>
          {model.notificationsEnabled ? (
            <div className="grid gap-4">
              <div>
                <p className="text-sm font-semibold leading-6 text-[color:var(--muted)]">Filter department alerts by unread state or event type.</p>
              </div>
              <Select label="View" value={filter} onChange={(event) => setFilter(event.target.value)} options={typeOptions} className="max-w-sm" />
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <CardTitle>{model.notificationsEnabled ? "Recent notifications" : "Notifications unavailable"}</CardTitle>
          {model.notificationsEnabled ? (
            <Button type="button" variant="secondary" onClick={markAllRead} disabled={unreadCount === 0} className="w-fit">
              Mark all read
            </Button>
          ) : model.stateAction ? (
            <Button href={model.stateAction.href} variant="secondary" className="w-fit">
              {model.stateAction.label}
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="grid gap-3">
          {!model.notificationsEnabled ? (
            <div className="rounded-md border border-dashed border-[color:var(--border-muted)] px-4 py-5 text-sm font-semibold text-slate-500">
              {model.isExpired
                ? "Live department notifications are paused while membership is expired. Renew the workspace to resume account alerts, candidate replies, and application event notices."
                : "Department notifications will begin once GetBadged approves the department registration."}
            </div>
          ) : (
            <>
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="flex flex-wrap items-start justify-between gap-4 rounded-md border border-[color:var(--border-muted)] p-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-[color:var(--navy)]">{notification.title}</p>
                      <StatusChip label={notification.readAt ? "Read" : "Unread"} tone={notification.readAt ? "muted" : "navy"} />
                      <StatusChip label={notification.typeLabel} tone="muted" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{notification.body}</p>
                    <p className="mt-1 text-xs font-bold uppercase text-slate-500">{notification.createdAtLabel}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {notification.linkHref ? (
                      <Button href={notification.linkHref} variant="secondary" className="min-h-10 px-3">
                        Open
                      </Button>
                    ) : null}
                    <Button type="button" variant="ghost" className="min-h-10 px-3" onClick={() => markRead(notification.id)} disabled={Boolean(notification.readAt)}>
                      Mark read
                    </Button>
                  </div>
                </div>
              ))}
              {filteredNotifications.length === 0 ? <p className="text-sm leading-6 text-[color:var(--muted)]">No notifications match this filter.</p> : null}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
