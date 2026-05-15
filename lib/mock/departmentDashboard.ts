export const mockDepartmentDashboard = {
  departmentId: "department_1",
  planRenewsAt: "2026-06-30T08:00:00.000Z",
  monthlyBadgeCreditLimit: 20,
  profileApprovalStatus: "approved",
  profileApprovalDetail: "Public profile approved and visible to candidates.",
  restrictedActionsWhenExpired: ["Create job posts", "Send Badges", "Export Applicant Pool", "Message candidates"],
  nextActions: [
    {
      label: "Review new applicants",
      href: "/department/applicants",
      detail: "Prioritize new direct applications and accepted Badges."
    },
    {
      label: "Update Department Profile",
      href: "/department/profile/edit",
      detail: "Keep public hiring details and media current."
    },
    {
      label: "Draft a new job post",
      href: "/department/jobs/new",
      detail: "Use templates for repeatable department job posts."
    }
  ]
};
