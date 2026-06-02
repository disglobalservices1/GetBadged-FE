export const mockDepartmentDashboard = {
  departmentId: "department_1",
  adminName: "Angela Wilson",
  adminRoleLabel: "Department Admin",
  memberSince: "2026-01-15T08:00:00.000Z",
  planRenewsAt: "2026-06-30T08:00:00.000Z",
  membershipPlanLabel: "Professional Plan",
  membershipStatus: "active",
  monthlyBadgeCreditLimit: 50,
  badgeTokensUsed: 34,
  profileApprovalStatus: "draft",
  profileApprovalRequestedAt: "2026-05-20T08:00:00.000Z",
  profilePublishedAt: "2026-05-24T08:00:00.000Z",
  profileApprovalNotes: "",
  profileApprovalDetail: "Public profile approved and visible to candidates.",
  applicantActivity: {
    submittedApplications: 65,
    submittedChangePercent: 18,
    acceptedBadges: 23,
    acceptedChangePercent: 28
  },
  recentActivity: [
    {
      id: "department_activity_1",
      type: "direct_application_received",
      title: "New direct application received",
      detail: "Jordan Smith applied to Entry Level Police Officer (New Recruit).",
      occurredAtLabel: "May 15, 2026",
      href: "/department/applicant-pools/application_1"
    },
    {
      id: "department_activity_2",
      type: "badge_accepted",
      title: "Badge accepted",
      detail: "Avery Cole accepted a Badge Request for Lateral Police Officer.",
      occurredAtLabel: "May 14, 2026",
      href: "/department/applicant-pools/application_2"
    },
    {
      id: "department_activity_3",
      type: "profile_returned",
      title: "Department profile returned for revisions",
      detail: "GB Admin requested updated staffing details before profile approval.",
      occurredAtLabel: "May 14, 2026",
      href: "/department/profile"
    },
    {
      id: "department_activity_4",
      type: "message_response",
      title: "Candidate response received",
      detail: "Jordan Smith replied in Application follow-up.",
      occurredAtLabel: "May 15, 2026",
      href: "/department/messages/message_thread_1"
    }
  ],
  resourceCenter: [
    {
      id: "elr-exam-schedule",
      label: "ELR Exam Schedule",
      detail: "View scheduled entry-level exam dates and registration details.",
      href: "/department/resources/elr-exam-schedule"
    },
    {
      id: "help-faq",
      label: "Help & FAQs",
      detail: "Get answers to recruiting workflow and platform questions.",
      href: "/department/resources/help-faq"
    },
    {
      id: "department-hiring-guide",
      label: "Department Hiring Guide",
      detail: "Review GB guidance for job posts, badges, and applicant follow-up.",
      href: "/department/resources/department-hiring-guide"
    }
  ],
  applicantPoolSnapshots: [
    {
      jobType: "Entry Level Recruit",
      status: "active",
      totalApplicants: 128,
      minoritiesPercent: 34,
      higherEducationPercent: 48,
      femalePercent: 40,
      href: "/department/applicant-pools"
    },
    {
      jobType: "Certified | Lateral Transfer",
      status: "active",
      totalApplicants: 64,
      minoritiesPercent: 28,
      higherEducationPercent: 62,
      femalePercent: 18,
      href: "/department/applicant-pools"
    },
    {
      jobType: "Dispatcher",
      status: "active",
      totalApplicants: 22,
      minoritiesPercent: 22,
      higherEducationPercent: 68,
      femalePercent: 82,
      href: "/department/applicant-pools"
    },
    {
      jobType: "Other Public Safety",
      status: "active",
      totalApplicants: 18,
      minoritiesPercent: 39,
      higherEducationPercent: 56,
      femalePercent: 33,
      href: "/department/applicant-pools"
    },
    {
      jobType: "All Job Types",
      status: "combined",
      totalApplicants: 232,
      minoritiesPercent: 31,
      higherEducationPercent: 52,
      femalePercent: 41,
      href: "/department/applicant-pools"
    }
  ],
  badgePoolPreview: {
    tabs: [
      { label: "Entry Level (Anonymous)", count: 156, active: true },
      { label: "Certified | Lateral Transfers (Anonymous)", count: 87, active: false },
      { label: "Other Public Safety (Anonymous)", count: 64, active: false }
    ],
    filters: {
      distance: "Within 25 miles of",
      location: "Ashland, MA",
      status: "All Status"
    },
    rows: [
      {
        id: "badge_pool_preview_1",
        examScore: "82%",
        cityTown: "Framingham, MA",
        willingToRelocate: "Yes",
        multilingual: "Yes",
        educationLevel: "Bachelor's Degree",
        volunteerExperience: "Yes",
        cadetAcademy: "Yes",
        veteran: "No"
      },
      {
        id: "badge_pool_preview_2",
        examScore: "76%",
        cityTown: "Worcester, MA",
        willingToRelocate: "Yes",
        multilingual: "No",
        educationLevel: "Some College",
        volunteerExperience: "Yes",
        cadetAcademy: "No",
        veteran: "Yes"
      },
      {
        id: "badge_pool_preview_3",
        examScore: "88%",
        cityTown: "Marlborough, MA",
        willingToRelocate: "No",
        multilingual: "Yes",
        educationLevel: "Associate's Degree",
        volunteerExperience: "No",
        cadetAcademy: "Yes",
        veteran: "No"
      },
      {
        id: "badge_pool_preview_4",
        examScore: "71%",
        cityTown: "Natick, MA",
        willingToRelocate: "Yes",
        multilingual: "No",
        educationLevel: "Bachelor's Degree",
        volunteerExperience: "Yes",
        cadetAcademy: "No",
        veteran: "Yes"
      },
      {
        id: "badge_pool_preview_5",
        examScore: "85%",
        cityTown: "Hopkinton, MA",
        willingToRelocate: "Yes",
        multilingual: "Yes",
        educationLevel: "Master's Degree",
        volunteerExperience: "Yes",
        cadetAcademy: "Yes",
        veteran: "No"
      }
    ],
    resultLabel: "Showing 1 to 5 of 156 profiles"
  },
  quickActions: [
    {
      label: "Create New Job Posting",
      detail: "Post a new job opportunity.",
      href: "/department/jobs/new"
    },
    {
      label: "View All Job Postings",
      detail: "Manage and update your job posts.",
      href: "/department/jobs"
    },
    {
      label: "View Reports & Analytics",
      detail: "Insights on your applicants and hiring.",
      href: "/department/reports"
    },
    {
      label: "Manage Settings / Users",
      detail: "Update workspace settings and department user access.",
      href: "/department/settings"
    }
  ],
  support: {
    phone: "781.645.6005",
    email: "info@getbadged.com"
  },
  restrictedActionsWhenExpired: ["Create job posts", "Send Badges", "Export Applicant Pools", "Message candidates"],
  nextActions: [
    {
      label: "Review new applicants",
      href: "/department/applicant-pools",
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
