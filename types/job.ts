import type { ApprovalStatus } from "./department";

export type JobType =
  | "entry_level"
  | "certified_officer"
  | "experienced_officer"
  | "dispatcher_ops"
  | "specialty_command"
  | "campus_police"
  | "corrections"
  | "deputy_sheriff"
  | "security"
  | "court_officer"
  | "other";

export type JobRequirement = {
  id: string;
  label: string;
  requirementType: "citizenship" | "drivers_license" | "exam_score" | "education" | "residency" | "certification" | "academy" | "experience" | "fitness" | "other";
  value?: string | number | boolean | string[];
  isRequired: boolean;
};

export type SalaryRange = {
  startingSalary?: number;
  topStepSalary?: number;
  academySalary?: number;
  payFrequency?: "hourly" | "weekly" | "bi_weekly" | "monthly" | "annually";
};

export type JobPost = {
  id: string;
  departmentId: string;
  departmentName: string;
  status: ApprovalStatus;
  title: string;
  jobType: JobType;
  positionCategory: string;
  city: string;
  state: "MA";
  employmentType: "full_time" | "part_time" | "contract" | "other";
  postedAt?: string;
  applicationDeadline?: string;
  hiringTimeline?: string;
  numberOfOpenings?: string;
  minimumRequirements: JobRequirement[];
  preferredRequirements: JobRequirement[];
  salary: SalaryRange;
  benefits: string[];
  responsibilities: string;
  hiringProcess: string[];
  approvalNotes?: string;
  createdAt: string;
  updatedAt: string;
};

export type PublicJobSummary = Pick<
  JobPost,
  | "id"
  | "departmentId"
  | "departmentName"
  | "title"
  | "jobType"
  | "positionCategory"
  | "city"
  | "state"
  | "employmentType"
  | "postedAt"
  | "hiringTimeline"
  | "numberOfOpenings"
> & {
  departmentSlug: string;
  coverImageUrl?: string;
};

export type PublicJobDetail = JobPost & {
  departmentSlug: string;
  departmentLogoUrl?: string;
  departmentCoverImageUrl?: string;
  departmentProfileIntro: string;
  whyJoin: string[];
};
