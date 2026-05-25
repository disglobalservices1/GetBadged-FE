import { mockApplications } from "@/lib/mock/applications";
import { mockDepartmentDashboard } from "@/lib/mock/departmentDashboard";
import { mockDepartments } from "@/lib/mock/departments";
import { mockJobPosts } from "@/lib/mock/jobs";
import { mockMessageThreads } from "@/lib/mock/messages";
import { mockNotifications } from "@/lib/mock/notifications";

const tierLabels = {
  small: "Small Department",
  medium: "Medium Department",
  large: "Large Department",
  xl: "XL Department",
  custom: "Custom Plan"
};

const approvalLabels = {
  draft: "Draft",
  pending_approval: "Pending Approval",
  approved: "Approved",
  active: "Active",
  revisions_needed: "Revisions Needed",
  inactive: "Inactive",
  closed: "Closed"
};

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export function getMockDepartmentDashboard() {
  const department = mockDepartments[0];
  const departmentJobs = mockJobPosts.filter((job) => job.departmentId === department.id);
  const departmentApplications = mockApplications.filter((application) => application.departmentId === department.id);
  const departmentThreads = mockMessageThreads.filter((thread) => thread.departmentId === department.id);
  const departmentNotifications = mockNotifications.filter(
    (notification) => notification.recipientRole === "department_admin" && !notification.readAt
  );
  const badgeCreditsSent = mockDepartmentDashboard.badgeTokensUsed;
  const monthlyBadgeCreditLimit = mockDepartmentDashboard.monthlyBadgeCreditLimit;
  const badgeCreditsRemaining = Math.max(monthlyBadgeCreditLimit - badgeCreditsSent, 0);
  const badgeUsagePercent = monthlyBadgeCreditLimit > 0 ? Math.round((badgeCreditsSent / monthlyBadgeCreditLimit) * 100) : 0;
  const newApplicants = departmentApplications.filter((application) => application.isNewForDepartment).length;
  const acceptedBadges = departmentApplications.filter((application) => application.source === "accepted_badge").length;
  const directApplications = departmentApplications.filter((application) => application.source === "direct_application").length;
  const pendingJobs = departmentJobs.filter((job) => job.status === "pending_approval").length;
  const draftJobs = departmentJobs.filter((job) => job.status === "draft").length;
  const isExpired = department.accountStatus === "expired";

  return {
    department,
    adminName: mockDepartmentDashboard.adminName,
    adminRoleLabel: mockDepartmentDashboard.adminRoleLabel,
    departmentName: department.departmentName,
    location: `${department.city}, ${department.state}`,
    memberSinceLabel: formatShortDate(mockDepartmentDashboard.memberSince),
    accountStatusLabel: department.accountStatus.replace(/_/g, " "),
    approvalStatusLabel: approvalLabels[department.approvalStatus],
    tierLabel: tierLabels[department.tier],
    membershipPlanLabel: mockDepartmentDashboard.membershipPlanLabel,
    membershipStatus: mockDepartmentDashboard.membershipStatus,
    planRenewsAtLabel: formatShortDate(mockDepartmentDashboard.planRenewsAt),
    activeJobs: departmentJobs.filter((job) => job.status === "active").length,
    pendingJobs,
    draftJobs,
    badgeCreditsRemaining,
    badgeCreditsSent,
    monthlyBadgeCreditLimit,
    badgeUsagePercent,
    applicantCount: departmentApplications.length,
    newApplicants,
    directApplications,
    acceptedBadges,
    unreadMessages: departmentThreads.reduce((total, thread) => total + thread.unreadCountForCurrentUser, 0),
    unreadNotifications: departmentNotifications.length,
    profileApprovalStatusLabel: mockDepartmentDashboard.profileApprovalStatus,
    profileApprovalDetail: mockDepartmentDashboard.profileApprovalDetail,
    jobApprovalSummary: pendingJobs > 0 ? `${pendingJobs} job pending GB Admin approval` : "No job posts waiting on approval",
    recentJobs: departmentJobs.slice(0, 3).map((job) => ({
      id: job.id,
      title: job.title,
      statusLabel: approvalLabels[job.status],
      applicants: departmentApplications.filter((application) => application.jobPostId === job.id).length,
      updatedAtLabel: formatShortDate(job.updatedAt)
    })),
    notifications: departmentNotifications.map((notification) => ({
      id: notification.id,
      title: notification.title,
      body: notification.body,
      linkHref: notification.linkHref,
      createdAtLabel: formatShortDate(notification.createdAt)
    })),
    applicantActivity: mockDepartmentDashboard.applicantActivity,
    resourceCenter: mockDepartmentDashboard.resourceCenter,
    applicantPoolSnapshots: mockDepartmentDashboard.applicantPoolSnapshots,
    badgePoolPreview: mockDepartmentDashboard.badgePoolPreview,
    quickActions: mockDepartmentDashboard.quickActions,
    support: mockDepartmentDashboard.support,
    nextActions: mockDepartmentDashboard.nextActions,
    restrictedState: isExpired
      ? {
          title: "Department account expired",
          description: "Renew the department plan to create jobs, send Badges, message candidates, and export Applicant Pool data.",
          actions: mockDepartmentDashboard.restrictedActionsWhenExpired
        }
      : null
  };
}
