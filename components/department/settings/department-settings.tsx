"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Mail, Settings2, ShieldCheck, UserPlus, Users } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusChip } from "@/components/ui/status-chip";
import { cn } from "@/lib/utils/cn";
import { getMockDepartmentSettings } from "@/features/department/settings/get-mock-department-settings";
import { getCurrentMockRole } from "@/lib/auth/mock-session";

export function DepartmentSettings() {
  const [departmentRole, setDepartmentRole] = useState<"department_admin" | "department_user">("department_admin");
  const settings = getMockDepartmentSettings(departmentRole);
  const [inviteEmail, setInviteEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const nextRole = getCurrentMockRole(["department_admin", "department_user"]);
    if (nextRole === "department_admin" || nextRole === "department_user") {
      setDepartmentRole(nextRole);
    }
  }, []);

  function handleInvite() {
    if (!settings.isDepartmentAdmin) {
      setFeedback("Department User access is view-only. User invites are disabled.");
      return;
    }

    if (settings.isExpired) {
      setFeedback("Renew membership before inviting or managing department users.");
      return;
    }

    if (!inviteEmail.trim()) {
      setFeedback("Enter an email address before sending a mock invite.");
      return;
    }

    setFeedback(`Mock invite prepared for ${inviteEmail.trim()}.`);
    setInviteEmail("");
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Manage"
        title="Settings / Users"
        description="Manage department user seats, role permissions, and workspace contact details."
      />

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-[26px] font-bold text-[color:var(--navy)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[color:var(--blue)]">
                <Users className="h-5 w-5" />
              </span>
              Seat Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <StatusChip label={settings.accountStatusLabel} tone={settings.isExpired ? "danger" : settings.isPendingApproval ? "warning" : "success"} />
              <StatusChip label={settings.departmentName} tone="navy" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SeatCard label="Department Admin" used={settings.seatSummary.adminSeatsUsed} limit={settings.seatSummary.adminSeatsLimit} />
              <SeatCard label="Department Users" used={settings.seatSummary.userSeatsUsed} limit={settings.seatSummary.userSeatsLimit} />
            </div>

            <div
              className={cn(
                "rounded-xl border px-4 py-3",
                !settings.isDepartmentAdmin && "border-slate-200 bg-slate-50 text-slate-700",
                settings.isDepartmentAdmin && settings.isExpired && "border-red-200 bg-red-50 text-rose-700",
                settings.isDepartmentAdmin && !settings.isExpired && "border-blue-100 bg-blue-50 text-[color:var(--blue)]"
              )}
            >
              <p className="text-[14px] font-bold">
                {!settings.isDepartmentAdmin
                  ? "Department User mode is view-only for user management."
                  : settings.isExpired
                    ? "Membership is expired. Renew before inviting or updating department seats."
                    : "Department Admin can invite users and maintain workspace access."}
              </p>
            </div>

            <div className="grid gap-3 rounded-xl border border-[color:var(--border-muted)] p-4">
              <div className="flex items-center gap-3 text-[color:var(--navy)]">
                <UserPlus className="h-5 w-5" />
                <p className="text-[16px] font-bold">Invite Department User</p>
              </div>
              <Input label="User email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="reviewer@westviewpd.gov" />
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" className="!min-h-9 !text-[13px]" onClick={handleInvite} disabled={!settings.isDepartmentAdmin || settings.isExpired}>
                  Send Invite
                </Button>
                <Button href="/department/billing" variant="ghost" className="!min-h-9 !text-[13px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
                  Review Seat Access Policy
                </Button>
              </div>
              {feedback ? <p className="text-[12px] font-semibold text-slate-600">{feedback}</p> : null}
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-[26px] font-bold text-[color:var(--navy)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[color:var(--blue)]">
                <Settings2 className="h-5 w-5" />
              </span>
              Current Users
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {settings.users.map((user) => (
              <div key={user.id} className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[color:var(--border-muted)] px-4 py-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[16px] font-bold text-[color:var(--navy)]">{user.name}</p>
                    <StatusChip label={user.roleLabel} tone={user.tone} />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4" />
                    <p className="text-[13px] font-semibold">{user.email}</p>
                  </div>
                  <p className="mt-2 text-[12px] font-bold text-slate-500">Joined {user.joinedAtLabel}</p>
                </div>
                <div className="grid justify-items-end gap-2">
                  <StatusChip label={user.accountStatusLabel} tone={user.accountStatusLabel === "Active" ? "success" : user.accountStatusLabel === "Pending Approval" ? "warning" : "muted"} />
                  <Button type="button" variant="ghost" className="!min-h-8 !px-0 !text-[12px] !font-bold !text-[color:var(--blue)]" onClick={() => setFeedback(`${user.name} user management remains mock-only in this workspace.`)}>
                    Manage Access
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-[22px] font-bold text-[color:var(--navy)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[color:var(--blue)]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            Role Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {settings.permissions.map((permission) => (
            <div key={permission.label} className="rounded-xl border border-[color:var(--border-muted)] px-4 py-4">
              <p className="text-[16px] font-bold text-[color:var(--navy)]">{permission.label}</p>
              <p className="mt-2 text-[13px] font-semibold leading-6 text-slate-600">{permission.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function SeatCard({ label, used, limit }: { label: string; used: number; limit: number }) {
  return (
    <div className="grid justify-items-center gap-2 rounded-xl border border-[color:var(--border-muted)] px-4 py-5 text-center">
      <p className="text-[34px] font-extrabold leading-none text-[color:var(--navy)]">
        {used} / {limit}
      </p>
      <p className="text-[12px] font-bold text-slate-600">{label}</p>
    </div>
  );
}
