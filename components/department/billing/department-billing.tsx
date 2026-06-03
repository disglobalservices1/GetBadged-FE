"use client";

import { BadgeDollarSign, CalendarClock, ChevronRight, CreditCard, FileText, Receipt, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/status-chip";
import { cn } from "@/lib/utils/cn";
import { getMockDepartmentBilling } from "@/features/department/billing/get-mock-department-billing";

export function DepartmentBilling() {
  const billing = getMockDepartmentBilling();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Manage"
        title="Billing"
        description="Review department membership status, payment details, invoice history, and badge credit usage."
      />

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-[26px] font-bold text-[color:var(--navy)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[color:var(--blue)]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              Membership Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <StatusChip label={billing.membershipStatusLabel} tone={billing.isExpired ? "danger" : billing.isPendingApproval ? "warning" : "success"} />
              <StatusChip label={billing.accountStatusLabel} tone={billing.isExpired ? "danger" : billing.isPendingApproval ? "warning" : "navy"} />
            </div>

            <div
              className={cn(
                "rounded-xl border px-4 py-3",
                billing.renewalTone === "danger" && "border-red-200 bg-red-50 text-rose-700",
                billing.renewalTone === "warning" && "border-amber-200 bg-yellow-50 text-amber-800",
                billing.renewalTone === "success" && "border-green-200 bg-green-50 text-[color:var(--success)]"
              )}
            >
              <p className="text-[14px] font-bold">{billing.renewalLabel}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <BillingDetail icon={<ShieldCheck className="h-4 w-4" />} label="Department" value={billing.departmentName} />
              <BillingDetail icon={<CalendarClock className="h-4 w-4" />} label="Member Since" value={billing.memberSinceLabel} />
              <BillingDetail icon={<Receipt className="h-4 w-4" />} label="Plan" value={billing.membershipPlanLabel} />
              <BillingDetail icon={<CalendarClock className="h-4 w-4" />} label="Renews On" value={billing.renewsAtLabel} />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="/department/billing" variant="secondary" className="!min-h-9 !text-[13px]">
                Renew Membership
              </Button>
              <Button href="/department/settings" variant="ghost" className="!min-h-9 !text-[13px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
                Update Billing Contact
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-[26px] font-bold text-[color:var(--navy)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[color:var(--blue)]">
                <BadgeDollarSign className="h-5 w-5" />
              </span>
              Badge Credits
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid grid-cols-2 gap-4">
              <BillingMetric value={billing.badgeCreditsRemaining} label="Remaining" />
              <BillingMetric value={`${billing.badgeCreditsUsed} / ${billing.monthlyBadgeCreditLimit}`} label="Used this cycle" />
            </div>

            <div className="h-4 rounded-full bg-slate-200">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  billing.badgeCreditsRemaining === 0 ? "bg-rose-500" : "bg-[color:var(--gold)]"
                )}
                style={{ width: `${Math.max(Math.min(billing.badgeUsagePercent, 100), 0)}%` }}
              />
            </div>

            {billing.badgeCreditWarning ? (
              <div
                className={cn(
                  "rounded-xl border px-4 py-3",
                  billing.badgeCreditsRemaining === 0 || billing.isExpired
                    ? "border-red-200 bg-red-50 text-rose-700"
                    : "border-amber-200 bg-yellow-50 text-amber-800"
                )}
              >
                <p className="text-[14px] font-bold">{billing.badgeCreditWarning}</p>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Button href="/department/billing" variant="secondary" className="!min-h-9 !text-[13px]">
                Add Credits
              </Button>
              <Button href="/department/badge-pool" variant="ghost" className="!min-h-9 !text-[13px] !font-bold !text-[color:var(--blue)]" iconRight={<ChevronRight className="h-3.5 w-3.5" />}>
                Review Badge Pool Usage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-[22px] font-bold text-[color:var(--navy)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[color:var(--blue)]">
                <CreditCard className="h-5 w-5" />
              </span>
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-xl border border-[color:var(--border-muted)] px-4 py-4">
              <p className="text-[12px] font-bold uppercase tracking-wide text-slate-500">Default card</p>
              <p className="mt-2 text-[20px] font-bold text-[color:var(--navy)]">
                {billing.paymentMethod.brand} ending in {billing.paymentMethod.last4}
              </p>
              <p className="mt-1 text-[13px] font-semibold text-slate-600">Expires {billing.paymentMethod.expirationLabel}</p>
            </div>
            <div className="rounded-xl border border-[color:var(--border-muted)] px-4 py-4">
              <p className="text-[12px] font-bold uppercase tracking-wide text-slate-500">Billing contact</p>
              <p className="mt-2 text-[18px] font-bold text-[color:var(--navy)]">{billing.paymentMethod.billingContactEmail}</p>
              <p className="mt-1 text-[13px] font-semibold text-slate-600">{billing.paymentMethod.autopayLabel}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-[22px] font-bold text-[color:var(--navy)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[color:var(--blue)]">
                <Receipt className="h-5 w-5" />
              </span>
              Recent Invoices
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {billing.invoices.map((invoice) => (
              <div key={invoice.id} className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[color:var(--border-muted)] px-4 py-4">
                <div className="min-w-0">
                  <p className="text-[16px] font-bold text-[color:var(--navy)]">{invoice.title}</p>
                  <p className="mt-1 text-[13px] font-semibold text-slate-600">{invoice.detail}</p>
                  <p className="mt-2 text-[12px] font-bold text-slate-500">{invoice.issuedAtLabel}</p>
                </div>
                <div className="grid justify-items-end gap-2">
                  <p className="text-[18px] font-extrabold text-[color:var(--navy)]">{invoice.amountLabel}</p>
                  <StatusChip label={invoice.statusLabel} tone={invoice.statusTone} />
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
              <FileText className="h-5 w-5" />
            </span>
            Badge Credit Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {billing.creditActivity.map((entry) => (
            <div key={entry.id} className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[color:var(--border-muted)] px-4 py-4">
              <div className="min-w-0">
                <p className="text-[16px] font-bold text-[color:var(--navy)]">{entry.label}</p>
                <p className="mt-1 text-[13px] font-semibold text-slate-600">{entry.detail}</p>
              </div>
              <div className="grid justify-items-end gap-1">
                <p className={cn("text-[18px] font-extrabold", entry.deltaLabel.startsWith("+") ? "text-[color:var(--success)]" : "text-[color:var(--navy)]")}>
                  {entry.deltaLabel}
                </p>
                <p className="text-[12px] font-bold text-slate-500">{entry.occurredAtLabel}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function BillingMetric({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="grid justify-items-center gap-2 rounded-xl border border-[color:var(--border-muted)] px-4 py-5 text-center">
      <p className="text-[34px] font-extrabold leading-none text-[color:var(--navy)]">{value}</p>
      <p className="text-[12px] font-bold text-slate-600">{label}</p>
    </div>
  );
}

function BillingDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--border-muted)] px-4 py-4">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <p className="text-[12px] font-bold uppercase tracking-wide">{label}</p>
      </div>
      <p className="mt-2 text-[18px] font-bold text-[color:var(--navy)]">{value}</p>
    </div>
  );
}
