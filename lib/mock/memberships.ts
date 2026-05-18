import type { CandidateTrack, MembershipStatus } from "@/types/candidate";

export type CandidateMembership = {
  id: string;
  candidateProfileId: string;
  track: CandidateTrack;
  status: MembershipStatus;
  startedAt?: string;
  renewsAt?: string;
  expiresAt?: string;
  cancelledAt?: string;
  stripeSubscriptionId?: string;
  planLabel: string;
};

export const mockCandidateMemberships: CandidateMembership[] = [
  {
    id: "membership_candidate_1",
    candidateProfileId: "candidate_1",
    track: "ELR",
    status: "none",
    planLabel: "No active membership"
  }
];
