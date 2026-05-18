import { mockDepartments } from "@/lib/mock/departments";
import { mockJobPosts } from "@/lib/mock/jobs";
import { mockTemplateFields, mockTemplateSections } from "@/lib/mock/templates";
import type { ApprovalStatus } from "@/types/department";
import type { JobPost } from "@/types/job";
import type { TemplateField } from "@/types/template";

export type JobPostFormSection = {
  id: string;
  sectionKey: string;
  title: string;
  order: number;
  fields: TemplateField[];
};

function getStatusLabel(status: ApprovalStatus) {
  const labels: Record<ApprovalStatus, string> = {
    active: "Active",
    approved: "Approved",
    closed: "Closed",
    draft: "Draft",
    inactive: "Inactive",
    pending_approval: "Pending approval",
    revisions_needed: "Revisions needed"
  };

  return labels[status];
}

function formatDate(value?: string) {
  if (!value) return "Not scheduled";

  const parts = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  })
    .formatToParts(new Date(value))
    .reduce<Record<string, string>>((dateParts, part) => {
      dateParts[part.type] = part.value;
      return dateParts;
    }, {});

  return `${parts.month} ${parts.day}, ${parts.year}`;
}

function getJobTemplateSections(): JobPostFormSection[] {
  return mockTemplateSections
    .filter((section) => section.templateType === "job_post" && section.isActive)
    .sort((first, second) => first.order - second.order)
    .map((section) => ({
      id: section.id,
      sectionKey: section.sectionKey,
      title: section.title,
      order: section.order,
      fields: mockTemplateFields
        .filter((field) => field.sectionId === section.id && field.isActive)
        .sort((first, second) => first.order - second.order)
    }));
}

export function getMockDepartmentJobPosts() {
  const department = mockDepartments.find((item) => item.id === "department_1") ?? mockDepartments[0];
  const jobs = mockJobPosts
    .filter((job) => job.departmentId === department.id)
    .map((job) => ({
      ...job,
      statusLabel: getStatusLabel(job.status),
      updatedAtLabel: formatDate(job.updatedAt),
      deadlineLabel: formatDate(job.applicationDeadline)
    }));

  return {
    department,
    jobs
  };
}

export function getMockDepartmentJobPostBuilder(jobId?: string) {
  const department = mockDepartments.find((item) => item.id === "department_1") ?? mockDepartments[0];
  const job = jobId ? mockJobPosts.find((item) => item.id === jobId) : undefined;
  const templateSections = getJobTemplateSections();
  const draftJob: JobPost =
    job ??
    ({
      id: "job_new",
      departmentId: department.id,
      departmentName: department.departmentName,
      status: "draft",
      title: "",
      jobType: "entry_level",
      positionCategory: "Entry Level",
      city: department.city,
      state: department.state,
      employmentType: "full_time",
      numberOfOpenings: "",
      minimumRequirements: [],
      preferredRequirements: [],
      salary: { payFrequency: "annually" },
      benefits: [],
      responsibilities: "",
      hiringProcess: [],
      createdAt: "2026-05-18T08:00:00.000Z",
      updatedAt: "2026-05-18T08:00:00.000Z"
    } satisfies JobPost);

  return {
    department,
    job: draftJob,
    statusLabel: getStatusLabel(draftJob.status),
    updatedAtLabel: formatDate(draftJob.updatedAt),
    templateSections
  };
}
