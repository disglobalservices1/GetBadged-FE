import { mockApplications } from "@/lib/mock/applications";
import { mockDepartments } from "@/lib/mock/departments";
import { mockMessageThreads } from "@/lib/mock/messages";
import { mockJobPosts } from "@/lib/mock/jobs";

export function getMockDepartmentDashboard() {
  const department = mockDepartments[0];

  return {
    departmentName: department.departmentName,
    tierLabel: `${department.tier.toUpperCase()} Tier`,
    activeJobs: mockJobPosts.filter((job) => job.departmentId === department.id && job.status === "active").length,
    badgeCreditsRemaining: department.badgeCreditsRemaining,
    applicantCount: mockApplications.filter((application) => application.departmentId === department.id).length,
    unreadMessages: mockMessageThreads.reduce((total, thread) => total + thread.unreadCountForCurrentUser, 0)
  };
}
