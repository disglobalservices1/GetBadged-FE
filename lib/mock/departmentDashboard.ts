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
  profileApprovalStatus: "approved",
  profileApprovalDetail: "Public profile approved and visible to candidates.",
  applicantActivity: {
    submittedApplications: 65,
    submittedChangePercent: 18,
    acceptedBadges: 23,
    acceptedChangePercent: 28
  },
  resourceCenter: [
    {
      label: "Upcoming Exams",
      detail: "View scheduled exam dates and details.",
      href: "/department"
    },
    {
      label: "Help & FAQ",
      detail: "Get answers. We're here to help.",
      href: "/department/messages"
    },
    {
      label: "More Resources",
      detail: "More tools and information coming soon.",
      href: "/department"
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
      href: "/department/applicants"
    },
    {
      jobType: "Certified | Lateral Transfer",
      status: "active",
      totalApplicants: 64,
      minoritiesPercent: 28,
      higherEducationPercent: 62,
      femalePercent: 18,
      href: "/department/applicants"
    },
    {
      jobType: "Dispatcher",
      status: "active",
      totalApplicants: 22,
      minoritiesPercent: 22,
      higherEducationPercent: 68,
      femalePercent: 82,
      href: "/department/applicants"
    },
    {
      jobType: "Other Public Safety",
      status: "active",
      totalApplicants: 18,
      minoritiesPercent: 39,
      higherEducationPercent: 56,
      femalePercent: 33,
      href: "/department/applicants"
    },
    {
      jobType: "All Job Types",
      status: "combined",
      totalApplicants: 232,
      minoritiesPercent: 31,
      higherEducationPercent: 52,
      femalePercent: 41,
      href: "/department/applicants"
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
      label: "Invite Team Members",
      detail: "Add or manage department users.",
      href: "/department"
    }
  ],
  support: {
    phone: "781.645.6005",
    email: "info@getbadged.com"
  },
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
