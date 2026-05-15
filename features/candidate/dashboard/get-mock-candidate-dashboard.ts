import { mockBadgeRequests } from "@/lib/mock/badgeRequests";
import { mockCandidateProfiles } from "@/lib/mock/candidates";
import { mockApplications } from "@/lib/mock/applications";

export function getMockCandidateDashboard() {
  const candidate = mockCandidateProfiles[0];

  return {
    firstName: candidate.firstName,
    track: candidate.track,
    statusDescription:
      candidate.accountStatus === "free"
        ? "Free account: complete your profile and purchase requirements to activate applications."
        : "Membership active.",
    tokenBalance: 4,
    profileCompletionPercent: candidate.profileCompletionPercent,
    badgeRequestCount: mockBadgeRequests.length,
    applicationCount: mockApplications.length
  };
}
