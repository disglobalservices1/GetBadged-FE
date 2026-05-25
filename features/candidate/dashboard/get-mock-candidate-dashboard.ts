import { mockApplications } from "@/lib/mock/applications";
import { mockBadgeRequests } from "@/lib/mock/badgeRequests";
import { mockCandidateProfiles } from "@/lib/mock/candidates";
import { mockCandidateMemberships } from "@/lib/mock/memberships";
import { mockTokenLedgerEntries } from "@/lib/mock/tokens";
import type { Application } from "@/types/application";
import type { BadgeRequest } from "@/types/badge";
import type { CandidateProfile } from "@/types/candidate";

export type CandidateDashboardChecklistItem = {
  id: string;
  label: string;
  status: "complete" | "in_progress" | "blocked" | "not_started";
  description: string;
};

export type CandidateDashboardActivity = {
  id: string;
  label: string;
  detail: string;
  occurredAt: string;
};

export function getMockCandidateDashboard(candidateProfileId?: string) {
  const candidate = mockCandidateProfiles.find((item) => item.id === candidateProfileId) ?? mockCandidateProfiles[0];
  const membership = mockCandidateMemberships.find((item) => item.candidateProfileId === candidate.id);
  const tokenBalance = getTokenBalance(candidate.id);
  const badgeRequests = mockBadgeRequests.filter((request) => request.candidateProfileId === candidate.id);
  const applications = mockApplications.filter((application) => application.candidateProfileId === candidate.id);
  const isFreeAccount = candidate.accountStatus === "free" || candidate.membershipStatus === "none";
  const checklist = getEligibilityChecklist(candidate, tokenBalance);

  return {
    firstName: candidate.firstName,
    fullName: `${candidate.firstName} ${candidate.lastName}`,
    track: candidate.track,
    accountStatus: candidate.accountStatus,
    membershipStatus: candidate.membershipStatus,
    membershipPlanLabel: membership?.planLabel ?? "No active membership",
    statusDescription: isFreeAccount
      ? "Free account: build your profile now. Applying, Badge Pool visibility, and Badge Request acceptance unlock after purchase and eligibility requirements."
      : "Membership active.",
    isFreeAccount,
    tokenBalance,
    profileCompletionPercent: candidate.profileCompletionPercent,
    currentStepLabel: formatStepLabel(candidate.currentStepKey),
    badgeRequestCount: badgeRequests.length,
    applicationCount: applications.length,
    badgeRequests,
    applications,
    checklist,
    recentActivity: getRecentActivity(badgeRequests, applications),
    trackState: getTrackState(candidate),
    blockedActions: getBlockedActions(isFreeAccount)
  };
}

function getTokenBalance(candidateProfileId: string) {
  const latestEntry = mockTokenLedgerEntries
    .filter((entry) => entry.candidateProfileId === candidateProfileId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

  return latestEntry?.balanceAfter ?? 0;
}

function getEligibilityChecklist(candidate: CandidateProfile, tokenBalance: number): CandidateDashboardChecklistItem[] {
  return [
    {
      id: "profile",
      label: "Complete candidate profile",
      status: candidate.profileCompletionPercent >= 100 ? "complete" : "in_progress",
      description: `${candidate.profileCompletionPercent}% complete. Current step: ${formatStepLabel(candidate.currentStepKey)}.`
    },
    {
      id: "membership",
      label: "Activate membership",
      status: candidate.membershipStatus === "active" ? "complete" : "blocked",
      description: "Required before applying, accepting Badges, or entering the Badge Pool."
    },
    {
      id: "tokens",
      label: "Keep application tokens available",
      status: tokenBalance > 0 ? "complete" : "blocked",
      description: `${tokenBalance} token${tokenBalance === 1 ? "" : "s"} available for direct applications or accepted Badge Requests.`
    },
    {
      id: "exam",
      label: "Track requirements",
      status: candidate.track === "ELR" && candidate.civilServiceExamStatus ? "complete" : "not_started",
      description: candidate.track === "ELR" ? "ELR candidates need exam and profile requirements before full activation." : "Track-specific requirements will appear here."
    }
  ];
}

function getRecentActivity(badgeRequests: BadgeRequest[], applications: Application[]): CandidateDashboardActivity[] {
  const badgeActivities = badgeRequests.map((request) => ({
    id: request.id,
    label: "Badge Request received",
    detail: `${request.departmentName} sent a Badge Request for ${formatJobType(request.jobType)}.`,
    occurredAt: request.sentAt
  }));

  const applicationActivities = applications.map((application) => ({
    id: application.id,
    label: "Application submitted",
    detail: `${application.departmentName}: ${application.jobTitle}.`,
    occurredAt: application.submittedAt
  }));

  return [...badgeActivities, ...applicationActivities].sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime());
}

function getTrackState(candidate: CandidateProfile) {
  if (candidate.track === "ELR") {
    return {
      label: "Entry Level | New Recruit",
      description: "ELR dashboard prioritizes profile completion, exam readiness, tokens, and membership activation."
    };
  }

  return {
    label: candidate.track,
    description: "Track-specific dashboard requirements will update as the profile is completed."
  };
}

function getBlockedActions(isFreeAccount: boolean) {
  if (!isFreeAccount) {
    return [];
  }

  return ["Direct Apply", "Accept Badge Requests", "Badge Pool visibility"];
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export function formatStatusLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatJobType(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatStepLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
