import { mockBadgePoolCandidates } from "@/lib/mock/badgePool";
import { mockDepartments } from "@/lib/mock/departments";
import { mockJobPosts } from "@/lib/mock/jobs";
import type { BadgePoolCandidate } from "@/types/badge";
import type { CandidateCredential, CandidateTrack } from "@/types/candidate";
import type { JobPost, JobType } from "@/types/job";

const departmentId = "department_1";

export type DepartmentBadgePoolCandidate = BadgePoolCandidate & {
  anonymousLabel: string;
  qualificationCount: number;
};

export type DepartmentBadgePoolViewModel = {
  department: {
    id: string;
    name: string;
    badgeCreditsRemaining: number;
    badgeCreditsSent: number;
  };
  candidates: DepartmentBadgePoolCandidate[];
  activeJobs: Pick<JobPost, "id" | "title" | "jobType">[];
  filters: {
    tracks: { label: string; value: CandidateTrack | "all" }[];
    credentials: { label: string; value: CandidateCredential | "all" }[];
    distanceRanges: { label: string; value: string }[];
    jobTypes: { label: string; value: JobType | "all" }[];
  };
  privacyChecklist: string[];
};

export function getMockDepartmentBadgePool(): DepartmentBadgePoolViewModel {
  const department = mockDepartments.find((item) => item.id === departmentId) ?? mockDepartments[0];
  const activeJobs = mockJobPosts.filter((job) => job.departmentId === department.id && job.status === "active");
  const jobTypes = Array.from(new Set(activeJobs.map((job) => job.jobType)));

  return {
    department: {
      id: department.id,
      name: department.departmentName,
      badgeCreditsRemaining: department.badgeCreditsRemaining,
      badgeCreditsSent: department.badgeCreditsSent
    },
    candidates: mockBadgePoolCandidates.map((candidate, index) => ({
      ...candidate,
      anonymousLabel: `Candidate ${candidate.track}-${String(index + 1).padStart(3, "0")}`,
      qualificationCount: getQualificationCount(candidate)
    })),
    activeJobs: activeJobs.map((job) => ({ id: job.id, title: job.title, jobType: job.jobType })),
    filters: {
      tracks: [
        { label: "All tracks", value: "all" },
        { label: "Entry Level Recruit", value: "ELR" },
        { label: "Certified / Lateral", value: "CXO" },
        { label: "Operations", value: "OPS" }
      ],
      credentials: [
        { label: "Any credential", value: "all" },
        { label: "CPR", value: "cpr" },
        { label: "EMT", value: "emt" },
        { label: "LTC", value: "ltc" }
      ],
      distanceRanges: [
        { label: "Any distance", value: "all" },
        { label: "Within 25 miles", value: "25" },
        { label: "Within 50 miles", value: "50" },
        { label: "Within 75 miles", value: "75" }
      ],
      jobTypes: [
        { label: "Any job type", value: "all" },
        ...jobTypes.map((jobType) => ({ label: formatJobType(jobType), value: jobType }))
      ]
    },
    privacyChecklist: ["Name", "Email", "Phone", "Street address", "Date of birth", "Last 4 SSN", "Gender", "Ethnicity"]
  };
}

function getQualificationCount(candidate: BadgePoolCandidate) {
  return [
    candidate.isWillingToRelocate,
    candidate.isMultilingual,
    candidate.hasVolunteerExperience,
    candidate.hasCadetOrCitizensAcademy,
    candidate.hasMilitaryService,
    candidate.hasCompletedFullTimeAcademy,
    candidate.hasPriorPoliceEmployment,
    candidate.hasPriorPublicSafetyExperience,
    candidate.hasActivePostCertification,
    candidate.examScorePercent !== undefined,
    candidate.credentials.length > 0
  ].filter(Boolean).length;
}

export function formatJobType(jobType: JobType) {
  const labels: Record<JobType, string> = {
    campus_police: "Campus Police",
    certified_officer: "Certified Officer",
    corrections: "Corrections",
    court_officer: "Court Officer",
    deputy_sheriff: "Deputy Sheriff",
    dispatcher_ops: "Dispatcher / Ops",
    entry_level: "Entry Level",
    experienced_officer: "Experienced Officer",
    other: "Other",
    security: "Security",
    specialty_command: "Specialty / Command"
  };

  return labels[jobType];
}
