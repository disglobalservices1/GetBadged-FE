import { mockCandidateMemberships } from "@/lib/mock/memberships";
import type { MembershipStatus } from "@/types/candidate";

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const CONTACT_GRACE_DAYS = 90;
const MOCK_NOW = new Date("2026-06-03T12:00:00.000Z");

export type DepartmentContactAccessState = {
  isContactHidden: boolean;
  hideReason: "department_expired" | "candidate_grace_expired" | null;
  expiresAt: string | null;
  expiresAtLabel: string | null;
  remainingDays: number | null;
  showExpiryCountdown: boolean;
  helperLabel: string | null;
  hoverLabel: string | null;
};

export function getDepartmentContactAccessState(candidateProfileId: string, departmentAccountStatus: string): DepartmentContactAccessState {
  if (departmentAccountStatus === "expired") {
    return {
      isContactHidden: true,
      hideReason: "department_expired",
      expiresAt: null,
      expiresAtLabel: null,
      remainingDays: null,
      showExpiryCountdown: false,
      helperLabel: "Department membership is expired, so candidate contact information is hidden.",
      hoverLabel: null
    };
  }

  const membership = mockCandidateMemberships.find((item) => item.candidateProfileId === candidateProfileId);

  if (!membership) {
    return {
      isContactHidden: false,
      hideReason: null,
      expiresAt: null,
      expiresAtLabel: null,
      remainingDays: null,
      showExpiryCountdown: false,
      helperLabel: null,
      hoverLabel: null
    };
  }

  if (membership.status === "active") {
    return {
      isContactHidden: false,
      hideReason: null,
      expiresAt: null,
      expiresAtLabel: null,
      remainingDays: null,
      showExpiryCountdown: false,
      helperLabel: null,
      hoverLabel: null
    };
  }

  const lapseStartedAt = getLapseStartedAt(membership.status, membership);

  if (!lapseStartedAt) {
    return {
      isContactHidden: true,
      hideReason: "candidate_grace_expired",
      expiresAt: null,
      expiresAtLabel: null,
      remainingDays: null,
      showExpiryCountdown: false,
      helperLabel: "Candidate membership is inactive, so contact information is hidden.",
      hoverLabel: null
    };
  }

  const expiresAtDate = new Date(lapseStartedAt.getTime() + CONTACT_GRACE_DAYS * MS_PER_DAY);
  const remainingDays = Math.max(0, Math.ceil((expiresAtDate.getTime() - MOCK_NOW.getTime()) / MS_PER_DAY));
  const expiresAt = expiresAtDate.toISOString();
  const expiresAtLabel = formatShortDate(expiresAt);
  const isHidden = remainingDays === 0;

  return {
    isContactHidden: isHidden,
    hideReason: isHidden ? "candidate_grace_expired" : null,
    expiresAt,
    expiresAtLabel,
    remainingDays: isHidden ? 0 : remainingDays,
    showExpiryCountdown: !isHidden,
    helperLabel: isHidden
      ? `Candidate contact access expired on ${expiresAtLabel} because membership remained inactive.`
      : `Candidate contact access stays available until ${expiresAtLabel}.`,
    hoverLabel: !isHidden
      ? `${remainingDays} day${remainingDays === 1 ? "" : "s"} of department contact access remain before phone, email, and full address are hidden.`
      : null
  };
}

function getLapseStartedAt(
  status: MembershipStatus,
  membership: (typeof mockCandidateMemberships)[number]
) {
  if (status === "cancelled" && membership.cancelledAt) return new Date(membership.cancelledAt);
  if ((status === "expired" || status === "inactive" || status === "none") && membership.expiresAt) return new Date(membership.expiresAt);
  return null;
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}
