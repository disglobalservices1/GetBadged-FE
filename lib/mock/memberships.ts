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
    status: "expired",
    expiresAt: "2026-03-31T08:00:00.000Z",
    planLabel: "Membership expired"
  },
  {
    id: "membership_candidate_2",
    candidateProfileId: "candidate_2",
    track: "CXO",
    status: "active",
    startedAt: "2026-01-10T08:00:00.000Z",
    renewsAt: "2026-07-10T08:00:00.000Z",
    planLabel: "6 Month Membership"
  },
  {
    id: "membership_candidate_3",
    candidateProfileId: "candidate_3",
    track: "OPS",
    status: "active",
    startedAt: "2026-02-01T08:00:00.000Z",
    renewsAt: "2026-08-01T08:00:00.000Z",
    planLabel: "6 Month Membership"
  }
];
