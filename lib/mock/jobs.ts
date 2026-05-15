import type { JobPost } from "@/types/job";

export const mockJobPosts: JobPost[] = [
  {
    id: "job_1",
    departmentId: "department_1",
    departmentName: "Westview Police Department",
    status: "active",
    title: "Entry Level Police Officer (New Recruit)",
    jobType: "entry_level",
    positionCategory: "Entry Level",
    city: "Westview",
    state: "MA",
    employmentType: "full_time",
    postedAt: "2026-05-02T08:00:00.000Z",
    hiringTimeline: "Within 3 Months",
    numberOfOpenings: "3 - 4 Officers",
    minimumRequirements: [],
    preferredRequirements: [],
    salary: { payFrequency: "annually" },
    benefits: ["Supportive leadership", "Modern equipment", "Opportunities for advancement"],
    responsibilities: "Respond to calls for service and support community safety.",
    hiringProcess: ["Submit application", "Department review", "Interview", "Background process"],
    createdAt: "2026-05-15T08:00:00.000Z",
    updatedAt: "2026-05-15T08:00:00.000Z"
  }
];
