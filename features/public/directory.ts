import { mockDepartments } from "@/lib/mock/departments";
import { mockJobPosts } from "@/lib/mock/jobs";
import type { PublicDepartmentProfile, PublicDepartmentSummary } from "@/types/department";
import type { JobType, PublicJobDetail, PublicJobSummary } from "@/types/job";

export type DepartmentBrowseFilters = {
  city?: string;
  departmentType?: string;
};

export type JobBrowseFilters = {
  city?: string;
  jobType?: string;
  departmentId?: string;
};

export function getPublicDepartments(filters: DepartmentBrowseFilters = {}): PublicDepartmentSummary[] {
  return mockDepartments
    .filter((department) => department.approvalStatus === "active")
    .filter((department) => (filters.city ? department.city === filters.city : true))
    .filter((department) => (filters.departmentType ? department.departmentType === filters.departmentType : true))
    .map((department) => ({
      id: department.id,
      departmentName: department.departmentName,
      slug: department.slug,
      city: department.city,
      state: department.state,
      logoUrl: department.logoUrl,
      coverImageUrl: department.coverImageUrl,
      profileIntro: department.profileIntro,
      activeJobCount: department.activeJobCount,
      departmentType: department.departmentType,
      hiringTimeline: department.hiringTimeline,
      openPositions: department.openPositions
    }));
}

export function getPublicDepartmentBySlug(slugOrId: string): PublicDepartmentProfile | undefined {
  return mockDepartments.find((department) => department.slug === slugOrId || department.id === slugOrId);
}

export function getPublicJobs(filters: JobBrowseFilters = {}): PublicJobSummary[] {
  return mockJobPosts
    .filter((job) => job.status === "active")
    .filter((job) => (filters.city ? job.city === filters.city : true))
    .filter((job) => (filters.jobType ? job.jobType === filters.jobType : true))
    .filter((job) => (filters.departmentId ? job.departmentId === filters.departmentId : true))
    .map((job) => ({
      id: job.id,
      departmentId: job.departmentId,
      departmentName: job.departmentName,
      departmentSlug: job.departmentSlug,
      title: job.title,
      jobType: job.jobType,
      positionCategory: job.positionCategory,
      city: job.city,
      state: job.state,
      employmentType: job.employmentType,
      postedAt: job.postedAt,
      hiringTimeline: job.hiringTimeline,
      numberOfOpenings: job.numberOfOpenings,
      coverImageUrl: job.departmentCoverImageUrl
    }));
}

export function getPublicJobById(jobId: string): PublicJobDetail | undefined {
  return mockJobPosts.find((job) => job.id === jobId);
}

export function getJobsForDepartment(departmentId: string): PublicJobSummary[] {
  return getPublicJobs({ departmentId });
}

export function getDepartmentFilterOptions() {
  return {
    cities: uniqueValues(mockDepartments.map((department) => department.city)),
    departmentTypes: uniqueValues(mockDepartments.map((department) => department.departmentType))
  };
}

export function getJobFilterOptions() {
  return {
    cities: uniqueValues(mockJobPosts.map((job) => job.city)),
    jobTypes: uniqueValues(mockJobPosts.map((job) => job.jobType)),
    departments: mockDepartments.map((department) => ({
      label: department.departmentName,
      value: department.id
    }))
  };
}

export function formatJobType(jobType: JobType | string): string {
  return jobType
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatEmploymentType(employmentType: string): string {
  return employmentType
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
}

export function formatPostedDate(value?: string): string {
  if (!value) {
    return "Not posted";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export function formatSalaryRange(job: Pick<PublicJobDetail, "salary">): string {
  const { startingSalary, topStepSalary, payFrequency } = job.salary;
  if (!startingSalary && !topStepSalary) {
    return "Salary details pending";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  const range = [startingSalary, topStepSalary].filter(Boolean).map((salary) => formatter.format(Number(salary))).join(" - ");
  return `${range} ${payFrequency ? `/${formatEmploymentType(payFrequency).toLowerCase()}` : ""}`.trim();
}

function uniqueValues(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}
