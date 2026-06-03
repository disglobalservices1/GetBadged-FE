import { mockDepartmentDashboard } from "@/lib/mock/departmentDashboard";
import { mockDepartments } from "@/lib/mock/departments";

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function getDaysUntil(value: string) {
  const now = new Date();
  const target = new Date(value);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.ceil((target.getTime() - now.getTime()) / millisecondsPerDay);
}

function toStartCase(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getMockDepartmentBilling() {
  const department = mockDepartments.find((item) => item.id === mockDepartmentDashboard.departmentId) ?? mockDepartments[0];
  const isExpired = department.accountStatus === "expired";
  const isPendingApproval = department.accountStatus === "pending_approval";
  const monthlyBadgeCreditLimit = mockDepartmentDashboard.monthlyBadgeCreditLimit;
  const badgeCreditsUsed = mockDepartmentDashboard.badgeTokensUsed;
  const badgeCreditsRemaining = Math.max(monthlyBadgeCreditLimit - badgeCreditsUsed, 0);
  const badgeUsagePercent = monthlyBadgeCreditLimit > 0 ? Math.round((badgeCreditsUsed / monthlyBadgeCreditLimit) * 100) : 0;
  const daysUntilRenewal = getDaysUntil(mockDepartmentDashboard.planRenewsAt);

  const renewalTone = isExpired ? "danger" : daysUntilRenewal <= 30 ? "warning" : "success";
  const renewalLabel = isExpired
    ? "Membership expired. Renew now to restore full recruiting access."
    : daysUntilRenewal <= 30
      ? `Membership renews in ${daysUntilRenewal} day${daysUntilRenewal === 1 ? "" : "s"}.`
      : `Membership renews on ${formatShortDate(mockDepartmentDashboard.planRenewsAt)}.`;

  const badgeCreditWarning = isExpired
    ? "Badge credits remain on file, but Badge Pool recruiting and exports stay blocked until membership is renewed."
    : badgeCreditsRemaining === 0
      ? "No badge credits remaining. Add credits to continue recruiting from Badge Pool."
      : badgeCreditsRemaining === 2
        ? "Only 2 badge credits remaining. Add credits soon to avoid recruiting interruptions."
        : null;

  return {
    departmentName: department.departmentName,
    location: `${department.city}, ${department.state}`,
    accountStatus: department.accountStatus,
    accountStatusLabel: toStartCase(department.accountStatus),
    membershipPlanLabel: mockDepartmentDashboard.membershipPlanLabel,
    membershipStatus: mockDepartmentDashboard.membershipStatus,
    membershipStatusLabel: toStartCase(mockDepartmentDashboard.membershipStatus),
    memberSinceLabel: formatShortDate(mockDepartmentDashboard.memberSince),
    renewsAtLabel: formatShortDate(mockDepartmentDashboard.planRenewsAt),
    daysUntilRenewal,
    renewalTone,
    renewalLabel,
    isExpired,
    isPendingApproval,
    monthlyBadgeCreditLimit,
    badgeCreditsUsed,
    badgeCreditsRemaining,
    badgeUsagePercent,
    badgeCreditWarning,
    paymentMethod: {
      brand: "Visa",
      last4: "4242",
      expirationLabel: "08/2028",
      billingContactEmail: "billing@westviewpd.gov",
      autopayLabel: isExpired ? "Autopay failed after membership lapse." : "Autopay is enabled for monthly membership renewal."
    },
    invoices: [
      {
        id: "invoice_2026_05_membership",
        title: "Professional Plan Renewal",
        detail: "Monthly department membership",
        amountLabel: "$249.00",
        statusLabel: isExpired ? "Past Due" : "Paid",
        statusTone: isExpired ? "danger" : "success",
        issuedAtLabel: "May 31, 2026"
      },
      {
        id: "invoice_2026_05_topup",
        title: "Badge Credit Top-Up",
        detail: "10 additional badge credits",
        amountLabel: "$75.00",
        statusLabel: "Paid",
        statusTone: "success",
        issuedAtLabel: "May 12, 2026"
      },
      {
        id: "invoice_2026_04_membership",
        title: "Professional Plan Renewal",
        detail: "Monthly department membership",
        amountLabel: "$249.00",
        statusLabel: "Paid",
        statusTone: "success",
        issuedAtLabel: "Apr 30, 2026"
      }
    ] as Array<{
      id: string;
      title: string;
      detail: string;
      amountLabel: string;
      statusLabel: string;
      statusTone: "success" | "warning" | "danger";
      issuedAtLabel: string;
    }>,
    creditActivity: [
      {
        id: "credit_activity_1",
        label: "10 badge credits added",
        detail: "Top-up purchase completed",
        deltaLabel: "+10",
        occurredAtLabel: "May 12, 2026"
      },
      {
        id: "credit_activity_2",
        label: "Badge sent to Avery Cole",
        detail: "Lateral Police Officer (POST Certified)",
        deltaLabel: "-1",
        occurredAtLabel: "May 14, 2026"
      },
      {
        id: "credit_activity_3",
        label: "Badge sent to Jordan Smith",
        detail: "Entry Level Police Officer (New Recruit)",
        deltaLabel: "-1",
        occurredAtLabel: "May 15, 2026"
      }
    ]
  };
}
