import { mockAuditLogs } from "@/lib/mock/auditLogs";
import { mockDepartments } from "@/lib/mock/departments";
import { mockJobPosts } from "@/lib/mock/jobs";

export function getMockAdminDashboard() {
  return {
    pendingDepartments: mockDepartments.filter((department) => department.approvalStatus === "pending_approval").length,
    pendingProfiles: 0,
    pendingJobs: mockJobPosts.filter((job) => job.status === "pending_approval").length,
    auditEventsToday: mockAuditLogs.length
  };
}
