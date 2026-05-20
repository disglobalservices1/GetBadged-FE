import { mockApplications } from "@/lib/mock/applications";
import { mockCandidateProfiles } from "@/lib/mock/candidates";
import { mockJobPosts } from "@/lib/mock/jobs";
import { mockTokenLedgerEntries } from "@/lib/mock/tokens";
import type { Application } from "@/types/application";
import type { CandidateProfile } from "@/types/candidate";
import type { JobRequirement, PublicJobDetail } from "@/types/job";

export type CandidateJobMatch = {
  job: PublicJobDetail;
  eligibilityStatus: "eligible" | "needs_review" | "blocked";
  matchedRequirements: string[];
  missingRequirements: string[];
  alreadyApplied: boolean;
  existingApplication?: Application;
};

export function getMockCandidateJobs(candidateProfileId = "candidate_1") {
  const candidate = getCandidate(candidateProfileId);
  const jobs = mockJobPosts.filter((job) => job.status === "active");

  return jobs.map((job) => getCandidateJobMatch(job, candidate));
}

export function getMockCandidateJobById(jobId: string, candidateProfileId = "candidate_1") {
  const candidate = getCandidate(candidateProfileId);
  const job = mockJobPosts.find((item) => item.id === jobId && item.status === "active");

  return job ? getCandidateJobMatch(job, candidate) : undefined;
}

export function getCandidateApplyState(jobId: string, candidateProfileId = "candidate_1") {
  const match = getMockCandidateJobById(jobId, candidateProfileId);
  const candidate = getCandidate(candidateProfileId);
  const tokenBalance = getTokenBalance(candidateProfileId);
  const isMembershipBlocked = candidate.membershipStatus !== "active";

  return {
    match,
    candidate,
    tokenBalance,
    isMembershipBlocked,
    canSubmit: Boolean(match) && !match?.alreadyApplied && !isMembershipBlocked && tokenBalance > 0
  };
}

export function formatJobTypeLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatDate(value?: string) {
  if (!value) {
    return "Pending";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function getCandidateJobMatch(job: PublicJobDetail, candidate: CandidateProfile): CandidateJobMatch {
  const matchedRequirements = job.minimumRequirements.filter((requirement) => doesCandidateMeetRequirement(candidate, requirement)).map((requirement) => requirement.label);
  const missingRequirements = job.minimumRequirements.filter((requirement) => !doesCandidateMeetRequirement(candidate, requirement)).map((requirement) => requirement.label);
  const existingApplication = mockApplications.find((application) => application.candidateProfileId === candidate.id && application.jobPostId === job.id);
  const alreadyApplied = Boolean(existingApplication);
  const eligibilityStatus = alreadyApplied ? "blocked" : missingRequirements.length === 0 ? "eligible" : missingRequirements.length <= 1 ? "needs_review" : "blocked";

  return {
    job,
    eligibilityStatus,
    matchedRequirements,
    missingRequirements,
    alreadyApplied,
    existingApplication
  };
}

function doesCandidateMeetRequirement(candidate: CandidateProfile, requirement: JobRequirement) {
  switch (requirement.requirementType) {
    case "citizenship":
      return candidate.isUsCitizen === true;
    case "drivers_license":
      return candidate.hasValidDriversLicense === true;
    case "exam_score":
      return Boolean(candidate.civilServiceExamStatus);
    case "education":
      return Boolean(candidate.highestEducation);
    case "certification":
      return candidate.credentials.length > 0 || candidate.hasActivePostCertification === true;
    case "academy":
      return candidate.hasCompletedFullTimeAcademy === true;
    case "experience":
      return candidate.hasPriorPublicSafetyExperience === true || candidate.hasPriorPoliceEmployment === true;
    case "residency":
      return candidate.city === requirement.value || candidate.isWillingToRelocate === true;
    case "other":
      return true;
    default:
      return true;
  }
}

function getCandidate(candidateProfileId: string) {
  return mockCandidateProfiles.find((candidate) => candidate.id === candidateProfileId) ?? mockCandidateProfiles[0];
}

function getTokenBalance(candidateProfileId: string) {
  const latestEntry = mockTokenLedgerEntries
    .filter((entry) => entry.candidateProfileId === candidateProfileId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

  return latestEntry?.balanceAfter ?? 0;
}
