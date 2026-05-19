import type { JobType } from "./job";
import type { CandidateCredential, CandidateTrack } from "./candidate";

export type BadgePoolCandidate = {
  id: string;
  candidateProfileId: string;
  track: CandidateTrack;
  city: string;
  state: "MA";
  distanceMiles?: number;
  isWillingToRelocate: boolean | null;
  isMultilingual: boolean | null;
  highestEducation: string | null;
  hasVolunteerExperience: boolean | null;
  hasCadetOrCitizensAcademy: boolean | null;
  hasMilitaryService: boolean | null;
  hasCompletedFullTimeAcademy: boolean | null;
  academyType?: string;
  hasPriorPoliceEmployment: boolean | null;
  hasPriorPublicSafetyExperience: boolean | null;
  credentials: CandidateCredential[];
  examScorePercent?: number;
  hasActivePostCertification?: boolean | null;
  alreadyBadgedByDepartment: boolean;
  badgeSentAt?: string;
};

export type BadgeRequestStatus = "sent" | "accepted" | "inactive_candidate" | "expired_department" | "superseded_by_direct_apply";

export type BadgeRequest = {
  id: string;
  candidateProfileId: string;
  departmentId: string;
  departmentName: string;
  jobPostId: string;
  jobType: JobType;
  status: BadgeRequestStatus;
  sentByUserId: string;
  sentAt: string;
  acceptedAt?: string;
  resultingApplicationId?: string;
};
