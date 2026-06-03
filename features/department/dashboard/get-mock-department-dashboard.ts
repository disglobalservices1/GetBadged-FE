import { mockApplications } from "@/lib/mock/applications";
import { mockCandidateProfiles } from "@/lib/mock/candidates";
import { mockDepartmentDashboard } from "@/lib/mock/departmentDashboard";
import { mockDepartments } from "@/lib/mock/departments";
import { mockJobPosts } from "@/lib/mock/jobs";
import { mockMessageThreads } from "@/lib/mock/messages";
import { mockNotifications } from "@/lib/mock/notifications";
import { getMockDepartmentApplicantPool } from "@/features/department/applicants/get-mock-department-applicant-pool";
import { getMockDepartmentResources } from "@/features/department/resources/get-mock-department-resources";
import type { UserRole } from "@/types/auth";

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

function getDaysUntil(value: string) {
  const now = new Date();
  const target = new Date(value);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.ceil((target.getTime() - now.getTime()) / millisecondsPerDay);
}

export function getMockDepartmentDashboard(roleOverride: Extract<UserRole, "department_admin" | "department_user"> = "department_admin") {
  const department = mockDepartments.find((item) => item.id === mockDepartmentDashboard.departmentId) ?? mockDepartments[0];
  const isPendingApproval = department.accountStatus === "pending_approval";
  const departmentJobs = mockJobPosts.filter((job) => job.departmentId === department.id);
  const departmentApplications = mockApplications.filter((application) => application.departmentId === department.id);
  const applicantPool = getMockDepartmentApplicantPool();
  const rawDepartmentThreads = mockMessageThreads.filter((thread) => thread.departmentId === department.id);
  const rawDepartmentNotifications = mockNotifications
    .filter((notification) => notification.recipientRole === "department_admin")
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime());
  const badgeCreditsSent = mockDepartmentDashboard.badgeTokensUsed;
  const monthlyBadgeCreditLimit = mockDepartmentDashboard.monthlyBadgeCreditLimit;
  const badgeCreditsRemaining = Math.max(monthlyBadgeCreditLimit - badgeCreditsSent, 0);
  const badgeUsagePercent = monthlyBadgeCreditLimit > 0 ? Math.round((badgeCreditsSent / monthlyBadgeCreditLimit) * 100) : 0;
  const newApplicants = departmentApplications.filter((application) => application.isNewForDepartment).length;
  const acceptedBadges = departmentApplications.filter((application) => application.source === "accepted_badge").length;
  const directApplications = departmentApplications.filter((application) => application.source === "direct_application").length;
  const activeApplicants = applicantPool.rows.filter((row) => !row.archivedAt).length;
  const archivedApplicants = applicantPool.rows.filter((row) => row.archivedAt).length;
  const pendingJobs = departmentJobs.filter((job) => job.status === "pending_approval").length;
  const draftJobs = departmentJobs.filter((job) => job.status === "draft").length;
  const revisionsNeededJobs = departmentJobs.filter((job) => job.status === "revisions_needed").length;
  const inactiveJobs = departmentJobs.filter((job) => job.status === "inactive" || job.status === "closed").length;
  const isExpired = department.accountStatus === "expired";
  const canReceiveNotifications = department.accountStatus === "active";
  const canUseMessages = department.accountStatus === "active";
  const departmentThreads = canUseMessages ? rawDepartmentThreads : [];
  const departmentNotifications = canReceiveNotifications ? rawDepartmentNotifications : [];
  const unreadDepartmentNotifications = departmentNotifications.filter((notification) => !notification.readAt);
  const badgePoolActionDisabled = isExpired || isPendingApproval || badgeCreditsRemaining === 0;
  const badgePoolActionDisabledReason = isExpired
    ? "Renew membership to browse Badge Pool and send Badges."
    : isPendingApproval
      ? "Badge Pool access unlocks after department approval."
    : badgeCreditsRemaining === 0
      ? "Add credits to browse Badge Pool and send Badges."
      : null;
  const badgeCreditWarningLabel = badgeCreditsRemaining === 0
    ? "No badge credits remaining. Add credits to continue recruiting from Badge Pool."
    : badgeCreditsRemaining === 2
      ? "Only 2 badge credits remaining. Add credits soon to avoid interruptions."
      : null;
  const daysUntilRenewal = getDaysUntil(mockDepartmentDashboard.planRenewsAt);
  const renewalWarningLabel = isExpired
    ? "Membership expired. Renew now to restore recruiting access."
    : daysUntilRenewal <= 30
      ? `Membership renews in ${daysUntilRenewal} day${daysUntilRenewal === 1 ? "" : "s"}.`
      : null;

  return {
    department,
    adminName: roleOverride === "department_admin" ? "Angela Wilson" : "Taylor Kim",
    adminRoleLabel: roleOverride === "department_admin" ? "Department Admin" : "Department User",
    departmentName: department.departmentName,
    location: `${department.city}, ${department.state}`,
    memberSinceLabel: formatShortDate(mockDepartmentDashboard.memberSince),
    accountStatusLabel: department.accountStatus.replace(/_/g, " "),
    approvalStatusLabel: approvalLabels[department.approvalStatus],
    isPendingApproval,
    isExpired,
    tierLabel: tierLabels[department.tier],
    membershipPlanLabel: mockDepartmentDashboard.membershipPlanLabel,
    membershipStatus: mockDepartmentDashboard.membershipStatus,
    planRenewsAt: mockDepartmentDashboard.planRenewsAt,
    planRenewsAtLabel: formatShortDate(mockDepartmentDashboard.planRenewsAt),
    daysUntilRenewal,
    renewalWarningLabel,
    activeJobs: departmentJobs.filter((job) => job.status === "active").length,
    pendingJobs,
    draftJobs,
    revisionsNeededJobs,
    inactiveJobs,
    badgeCreditsRemaining,
    badgeCreditsSent,
    monthlyBadgeCreditLimit,
    badgeUsagePercent,
    badgeCreditWarningLabel,
    badgePoolActionDisabled,
    badgePoolActionDisabledReason,
    applicantCount: departmentApplications.length,
    activeApplicants,
    archivedApplicants,
    newApplicants,
    directApplications,
    acceptedBadges,
    applicantPoolJobLinks: departmentJobs
      .filter((job) => job.departmentId === department.id)
      .map((job) => ({
        id: job.id,
        title: job.title,
        applicantCount: applicantPool.rows.filter((row) => row.jobPostId === job.id && !row.archivedAt).length,
        href: `/department/applicant-pools?jobId=${job.id}`
      }))
      .filter((job) => job.applicantCount > 0)
      .sort((first, second) => second.applicantCount - first.applicantCount)
      .slice(0, 2),
    unreadThreads: departmentThreads.filter((thread) => thread.unreadCountForCurrentUser > 0).length,
    unreadMessages: departmentThreads.reduce((total, thread) => total + thread.unreadCountForCurrentUser, 0),
    messageThreadPreviews: departmentThreads
      .sort((first, second) => new Date(second.lastMessageAt).getTime() - new Date(first.lastMessageAt).getTime())
      .slice(0, 2)
      .map((thread) => {
        const candidate = mockCandidateProfiles.find((profile) => profile.id === thread.candidateProfileId);

        return {
          id: thread.id,
          subject: thread.subject,
          candidateName: candidate ? `${candidate.firstName} ${candidate.lastName}` : "Candidate",
          unreadCount: thread.unreadCountForCurrentUser,
          lastMessageLabel: formatShortDate(thread.lastMessageAt),
          href: `/department/messages/${thread.id}`
        };
      }),
    unreadNotifications: unreadDepartmentNotifications.length,
    profileApprovalStatusLabel: mockDepartmentDashboard.profileApprovalStatus,
    profileApprovalRequestedAtLabel: mockDepartmentDashboard.profileApprovalRequestedAt ? formatShortDate(mockDepartmentDashboard.profileApprovalRequestedAt) : null,
    profilePublishedAtLabel: mockDepartmentDashboard.profilePublishedAt ? formatShortDate(mockDepartmentDashboard.profilePublishedAt) : null,
    profileApprovalNotes: mockDepartmentDashboard.profileApprovalNotes || null,
    profileApprovalDetail: mockDepartmentDashboard.profileApprovalDetail,
    jobApprovalSummary: pendingJobs > 0 ? `${pendingJobs} job pending GB Admin approval` : "No job posts waiting on approval",
    activeJobLinks: departmentJobs
      .filter((job) => job.status === "active")
      .sort((first, second) => new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime())
      .slice(0, 2)
      .map((job) => ({
        id: job.id,
        title: job.title,
        href: `/department/applicant-pools?jobId=${job.id}`
      }))
      .filter(() => !isPendingApproval),
    pendingReviewJobs: departmentJobs
      .filter((job) => job.status === "pending_approval" || job.status === "revisions_needed")
      .map((job) => ({
        id: job.id,
        title: job.title,
        statusLabel: approvalLabels[job.status],
        href: `/department/jobs/${job.id}`
      })),
    recentJobs: departmentJobs.slice(0, 3).map((job) => ({
      id: job.id,
      title: job.title,
      statusLabel: approvalLabels[job.status],
      applicants: departmentApplications.filter((application) => application.jobPostId === job.id).length,
      updatedAtLabel: formatShortDate(job.updatedAt)
    })),
    notifications: departmentNotifications.map((notification) => ({
      id: notification.id,
      type: notification.type,
      title: notification.title,
      body: notification.body,
      linkHref: notification.linkHref,
      isUnread: !notification.readAt,
      createdAtLabel: formatShortDate(notification.createdAt)
    })),
    applicantActivity: mockDepartmentDashboard.applicantActivity,
    recentActivity: mockDepartmentDashboard.recentActivity,
    resourceCenter: getMockDepartmentResources(),
    applicantPoolSnapshots: mockDepartmentDashboard.applicantPoolSnapshots,
    badgePoolPreview: mockDepartmentDashboard.badgePoolPreview,
    quickActions: mockDepartmentDashboard.quickActions,
    support: mockDepartmentDashboard.support,
    nextActions: mockDepartmentDashboard.nextActions,
    accountRestrictions: isExpired
      ? [
          "Candidate contact information is hidden.",
          "Messages are disabled.",
          "Application status updates are disabled.",
          "Badge sending is disabled."
        ]
      : [],
    pendingState: isPendingApproval
      ? {
          title: "Department approval pending",
          description: "Your registration is under review. You can finish profile and job drafts now, but recruiting, messaging, and notifications unlock after approval."
        }
      : null,
    restrictedState: isExpired
      ? {
          title: "Department account expired",
          description: "Renew the department plan to create jobs, send Badges, message candidates, and export Applicant Pool data.",
          actions: mockDepartmentDashboard.restrictedActionsWhenExpired
        }
      : null
  };
}
